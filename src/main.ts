import express, { Request, Response } from 'express';
import { ClinicalBackground, ClinicalBackgroundRequest } from './routes/clinicalBg';
import { TransformedClinicalBackgrounItemSchema, validateClinicalBackgroundItem } from './routes/validationSchemas'
import * as mysql from 'mysql';
import * as uuid from 'uuid';

const app = express()
const port = 3006;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'API_PRONTUARIO'
});

db.connect((err) => {
    if (err) {
        console.error('Error to connect in database ', err);
    }
    console.log('Successful connection to the database !');
});

app.use(express.json());

app.listen(port, () => {
    console.log(`Online server at http://localhost:${port}`)
})

app.post('/:person_id/clinical_backgrounds', async (req, res) => {
    try {
        const personId = req.params.person_id;
        const requestData: ClinicalBackgroundRequest = req.body;

        const updatedClinicalBackgrounds = await Promise.all(requestData.clinical_backgrounds.map(async (item) => {
            const transformedItem = TransformedClinicalBackgrounItemSchema.parse(item);
            if (!TransformedClinicalBackgrounItemSchema.safeParse(transformedItem).success) {
                res.status(400).json({ error: 'Invalid value for the given type' });
                throw new Error('Invalid value for the given type');
            };
            const formattedDate = new Date(item.created_at).toISOString().slice(0, 19).replace("T", " ");
            return {
                ...transformedItem,
                id: uuid.v4(),
                person_id: personId,
                created_at: formattedDate
            }

        }));

        for (const background of updatedClinicalBackgrounds) {
            db.query('INSERT INTO clinical_backgrounds SET ?', background, (error, results) => {
                if (error) {
                    console.error('ERROR IN INSERT TO DATABASE ', error);
                    res.status(500).json({ error: 'INTERNAL ERROR IN SERVER' });
                    return;
                }
                console.log('Success in inserting into the database: ', results)
            });
        }
        res.status(200).json({ clinical_backgrounds: updatedClinicalBackgrounds });
    } catch (err) {
        console.error('Error to process request:', err);
        res.status(500).json({ err: 'Internal Error' })
    }
});

async function storeUserInDatabase(personId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        db.query('INSERT INTO users (person_id) VALUES (?)', [personId], (error, results) => {
            if (error) {
                console.error('INSERT ERROR USER IN DATABASE:', error);
                reject(error);
            } else {
                console.log('USER INSERT TO DATABASE:', results);
                resolve();
            }
        });
    });
}
app.get('/signup', async (req, res) => {
    try {
        const personId = uuid.v4();
        await storeUserInDatabase(personId);

        res.status(200).json({ person_id: personId });
    } catch (err) {
        console.error('Error to process request:', err);
        res.status(500).json({ err: 'Internal Error' });
    }
});
