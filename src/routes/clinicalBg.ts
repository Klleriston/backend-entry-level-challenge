export interface ClinicalBackground {
    id?: string;
    person_id: string;
    type: 'DISEASE' | 'SURGICAL' | 'VACCINE' | 'MEDICINE';
    value: string;
    created_at: string;
}

export interface ClinicalBackgroundRequest {
    clinical_backgrounds: ClinicalBackground[];
}