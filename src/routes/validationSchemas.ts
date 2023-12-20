import { z } from 'zod';
import { ClinicalBackground } from './clinicalBg';

enum DiseaseValues {
  Diabetes = 'Diabetes',
  Alzheimer = 'Alzheimer',
  Hypertension = 'Hypertension',
  Asthma = 'Asthma',
  Parkinson = 'Parkinson',
}

enum SurgicalValues {
  Mammoplasty = 'Mammoplasty',
  Liposuction = 'Liposuction',
  Blepharoplasty = 'Blepharoplasty',
  Rhinoplasty = 'Rhinoplasty',
  Abdominoplasty = 'Abdominoplasty',
}

enum VaccineValues {
  BCG = 'BCG',
  HPV = 'HPV',
  HepatitisA = 'HepatitisA',
  HepatitisB = 'HepatitisB',
  Influenza = 'Influenza',
}

enum MedicineValues {
  Aradois = 'Aradois',
  Paroxetine = 'Paroxetine',
  AdderaD3 = 'Addera D3',
  Xarelto = 'Xarelto',
  GlifageXR = 'Glifage XR',
}

const ClinicalBackgrounItemSchema = z.object({
  type: z.enum(['DISEASE', 'SURGICAL', 'VACCINE', 'MEDICINE']),
  value: z.string(),
});

const TransformedClinicalBackgrounItemSchema = ClinicalBackgrounItemSchema.transform((data) => {
  switch (data.type) {
    case 'DISEASE':
      return { ...data, value: z.enum([DiseaseValues.Diabetes, DiseaseValues.Alzheimer, DiseaseValues.Hypertension, DiseaseValues.Asthma, DiseaseValues.Parkinson]).parse(data.value) };
    case 'SURGICAL':
      return { ...data, value: z.enum([SurgicalValues.Mammoplasty, SurgicalValues.Liposuction, SurgicalValues.Blepharoplasty, SurgicalValues.Rhinoplasty, SurgicalValues.Abdominoplasty]).parse(data.value) };
    case 'VACCINE':
      return { ...data, value: z.enum([VaccineValues.BCG, VaccineValues.HPV, VaccineValues.HepatitisA, VaccineValues.HepatitisB, VaccineValues.Influenza]).parse(data.value) };
    case 'MEDICINE':
      return { ...data, value: z.enum([MedicineValues.Aradois, MedicineValues.Paroxetine, MedicineValues.AdderaD3, MedicineValues.Xarelto, MedicineValues.GlifageXR]).parse(data.value) };
    default:
      return data;
  }
});

export const validateClinicalBackgroundItem = (item: ClinicalBackground): boolean => {
    switch (item.type) {
      case 'DISEASE':
        return ['Diabetes', 'Alzheimer', 'Hypertension', 'Asthma', 'Parkinson'].includes(item.value);
      case 'SURGICAL':
        return ['Mammoplasty', 'Liposuction', 'Blepharoplasty', 'Rhinoplasty', 'Abdominoplasty'].includes(item.value);
      case 'VACCINE':
        return ['BCG', 'HPV', 'Hepatitis A', 'Hepatitis B', 'Influenza'].includes(item.value);
      case 'MEDICINE':
        return ['Aradois', 'Paroxetine', 'Addera D3', 'Xarelto', 'Glifage XR'].includes(item.value);
      default:
        return false;
    }
  };

export { TransformedClinicalBackgrounItemSchema };
