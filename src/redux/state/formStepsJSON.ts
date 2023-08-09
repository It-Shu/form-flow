export type FormStep = {
    name: string
    label: string;
    type: string;
    max_length?: number;
    min_length?: number;
    min?: number;
    max?: number;
    regex?: string;
};

export const formStepsJSON: FormStep[] = [
    {
        "name": "name",
        "label": "Имя",
        "type": "STRING",
        "max_length": 255,
        "min_length": 3,
        "regex": "^[a-zA-Z\s]+$"
    },
    {
        "name": "surname",
        "label": "Фамилия",
        "type": "STRING",
        "max_length": 255,
        "min_length": 3,
        "regex": "^[a-zA-Z\s]+$"
    },
    {
        "name": "age",
        "label": "Полных лет",
        "type": "NUMBER",
        "min": 1,
        "max": 100
    },
    {
        "name": "email",
        "label": "Email",
        "type": "EMAIL"
    }
];
