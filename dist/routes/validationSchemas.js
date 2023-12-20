"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformedClinicalBackgrounItemSchema = exports.validateClinicalBackgroundItem = void 0;
const zod_1 = require("zod");
var DiseaseValues;
(function (DiseaseValues) {
    DiseaseValues["Diabetes"] = "Diabetes";
    DiseaseValues["Alzheimer"] = "Alzheimer";
    DiseaseValues["Hypertension"] = "Hypertension";
    DiseaseValues["Asthma"] = "Asthma";
    DiseaseValues["Parkinson"] = "Parkinson";
})(DiseaseValues || (DiseaseValues = {}));
var SurgicalValues;
(function (SurgicalValues) {
    SurgicalValues["Mammoplasty"] = "Mammoplasty";
    SurgicalValues["Liposuction"] = "Liposuction";
    SurgicalValues["Blepharoplasty"] = "Blepharoplasty";
    SurgicalValues["Rhinoplasty"] = "Rhinoplasty";
    SurgicalValues["Abdominoplasty"] = "Abdominoplasty";
})(SurgicalValues || (SurgicalValues = {}));
var VaccineValues;
(function (VaccineValues) {
    VaccineValues["BCG"] = "BCG";
    VaccineValues["HPV"] = "HPV";
    VaccineValues["HepatitisA"] = "HepatitisA";
    VaccineValues["HepatitisB"] = "HepatitisB";
    VaccineValues["Influenza"] = "Influenza";
})(VaccineValues || (VaccineValues = {}));
var MedicineValues;
(function (MedicineValues) {
    MedicineValues["Aradois"] = "Aradois";
    MedicineValues["Paroxetine"] = "Paroxetine";
    MedicineValues["AdderaD3"] = "Addera D3";
    MedicineValues["Xarelto"] = "Xarelto";
    MedicineValues["GlifageXR"] = "Glifage XR";
})(MedicineValues || (MedicineValues = {}));
const ClinicalBackgrounItemSchema = zod_1.z.object({
    type: zod_1.z.enum(['DISEASE', 'SURGICAL', 'VACCINE', 'MEDICINE']),
    value: zod_1.z.string(),
});
const TransformedClinicalBackgrounItemSchema = ClinicalBackgrounItemSchema.transform((data) => {
    switch (data.type) {
        case 'DISEASE':
            return { ...data, value: zod_1.z.enum([DiseaseValues.Diabetes, DiseaseValues.Alzheimer, DiseaseValues.Hypertension, DiseaseValues.Asthma, DiseaseValues.Parkinson]).parse(data.value) };
        case 'SURGICAL':
            return { ...data, value: zod_1.z.enum([SurgicalValues.Mammoplasty, SurgicalValues.Liposuction, SurgicalValues.Blepharoplasty, SurgicalValues.Rhinoplasty, SurgicalValues.Abdominoplasty]).parse(data.value) };
        case 'VACCINE':
            return { ...data, value: zod_1.z.enum([VaccineValues.BCG, VaccineValues.HPV, VaccineValues.HepatitisA, VaccineValues.HepatitisB, VaccineValues.Influenza]).parse(data.value) };
        case 'MEDICINE':
            return { ...data, value: zod_1.z.enum([MedicineValues.Aradois, MedicineValues.Paroxetine, MedicineValues.AdderaD3, MedicineValues.Xarelto, MedicineValues.GlifageXR]).parse(data.value) };
        default:
            return data;
    }
});
exports.TransformedClinicalBackgrounItemSchema = TransformedClinicalBackgrounItemSchema;
const validateClinicalBackgroundItem = (item) => {
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
exports.validateClinicalBackgroundItem = validateClinicalBackgroundItem;
