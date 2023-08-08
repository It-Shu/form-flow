import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface FormState {
    step: number;
    name: string;
    surname: string;
    age: number | null;
    email: string;
}

const initialState: FormState = {
    step: 1,
    name: '',
    surname: '',
    age: null,
    email: ''
};


const formSlice = createSlice({name: 'form', initialState,
    reducers: {
        setStep: (state, action: PayloadAction<number>) => {
            state.step = action.payload;
        },
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setSurname: (state, action: PayloadAction<string>) => {
            state.surname = action.payload;
        },
        setAge: (state, action: PayloadAction<number>) => {
            state.age = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        resetForm: (state) => {
            Object.assign(state, initialState);
        }
    }
});

export const { setStep, setName, setSurname, setAge, setEmail, resetForm } = formSlice.actions;

export default formSlice.reducer;

