"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validationSchemas_1 = require("./routes/validationSchemas");
const mysql = __importStar(require("mysql"));
const uuid = __importStar(require("uuid"));
const app = (0, express_1.default)();
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
app.use(express_1.default.json());
app.listen(port, () => {
    console.log(`Online server at http://localhost:${port}`);
});
app.get('/', (req, res) => {
    res.status(200).send('Testado com sucesso tomele pai é genio !');
});
app.post('/:person_id/clinical_backgrounds', async (req, res) => {
    try {
        const personId = req.params.person_id;
        const requestData = req.body;
        const updatedClinicalBackgrounds = await Promise.all(requestData.clinical_backgrounds.map(async (item) => {
            const transformedItem = validationSchemas_1.TransformedClinicalBackgrounItemSchema.parse(item);
            if (!validationSchemas_1.TransformedClinicalBackgrounItemSchema.safeParse(transformedItem).success) {
                res.status(400).json({ error: 'Invalid value for the given type' });
                throw new Error('Invalid value for the given type');
            }
            ;
            const formattedDate = new Date(item.created_at).toISOString().slice(0, 19).replace("T", " ");
            return {
                ...transformedItem,
                id: uuid.v4(),
                person_id: personId,
                created_at: formattedDate
            };
        }));
        for (const background of updatedClinicalBackgrounds) {
            db.query('INSERT INTO clinical_backgrounds SET ?', background, (error, results) => {
                if (error) {
                    console.error('ERROR IN INSERT TO DATABASE ', error);
                    res.status(500).json({ error: 'INTERNAL ERROR IN SERVER' });
                    return;
                }
                console.log('Success in inserting into the database: ', results);
            });
        }
        res.status(200).json({ clinical_backgrounds: updatedClinicalBackgrounds });
    }
    catch (err) {
        console.error('Error to process request:', err);
        res.status(500).json({ err: 'Internal Error' });
    }
});
async function storeUserInDatabase(personId) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO users (person_id) VALUES (?)', [personId], (error, results) => {
            if (error) {
                console.error('INSERT ERROR USER IN DATABASE:', error);
                reject(error);
            }
            else {
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
    }
    catch (err) {
        console.error('Error to process request:', err);
        res.status(500).json({ err: 'Internal Error' });
    }
});
