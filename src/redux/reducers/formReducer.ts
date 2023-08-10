import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface FormState {
    step: number;
    name: string;
    surname: string;
    age: number;
    email: string;
}

const initialState: FormState = {
    step: 1,
    name: "",
    surname: "",
    age: 0,
    email: ""
};

const formSlice = createSlice({
    name: "form", initialState,
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
        }
    }
});

export const {setStep, setName, setSurname, setAge, setEmail} = formSlice.actions;

export default formSlice.reducer;

type ActionMapType = {
    [key: string]: (value: string) => ReturnType<typeof setName | typeof setSurname | typeof setAge | typeof setEmail>;
};

export const actionsMap: ActionMapType = {
    "name": setName,
    "surname": setSurname,
    "age": (value: string) => setAge(Number(value)),
    "email": setEmail
};
