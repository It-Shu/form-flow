import React, {ChangeEvent, useCallback, useState} from 'react';
import {FormContainer} from './components/Form/FormContainer';
import styles from './App.module.scss'
import {useAppSelector} from "./redux/hooks/useAppSelector";
import {useDispatch} from "react-redux";
import {setAge, setEmail, setName, setStep, setSurname} from "./redux/reducers/formReducer";

enum FormSteps {
    firstStep = 1,
    secondStep = 2,
    thirdStep = 3,
    forthStep = 4
}

function App() {

    const [inputValue, setInputValue] = useState<string>('')
    const [inputAgeValue, setInputAgeValue] = useState<number | null>(null)
    const step = useAppSelector((state) => state.form.step)
    const name = useAppSelector((state) => state.form.name)
    const surname = useAppSelector((state) => state.form.surname)
    const age = useAppSelector((state) => state.form.age)
    const email = useAppSelector((state) => state.form.email)

    const dispatch = useDispatch()

    const onSubmitForm = (e: ChangeEvent<HTMLInputElement>) => {
        if (typeof Number(e.currentTarget.value) === typeof Number) {
            setInputAgeValue(+(e.currentTarget.value))
        } else {
            setInputValue(e.currentTarget.value)
        }
    }

    const handleContinue = useCallback(() => {
        if (step === FormSteps.firstStep) {
            dispatch(setName(inputValue))
            setInputValue('')
        }
        if (step === FormSteps.secondStep) {
            dispatch(setSurname(inputValue))
            setInputValue('')
        }
        if (step === FormSteps.thirdStep && inputAgeValue !== null) {
            dispatch(setAge(inputAgeValue))
            setInputAgeValue(null)
        }
        if (step === FormSteps.forthStep) {
            dispatch(setEmail(inputValue))
            setInputValue('')
        }
    }, [step])

    const handleBack = useCallback(() => {
        if (step > FormSteps.firstStep) {
            dispatch(setStep(step - 1))
        }
    }, [step])


    console.log(step)
    console.log(name)
    console.log(surname)
    console.log(age)
    console.log(email)

    return (
        <div className={styles.App}>
            <FormContainer
                handleBack={handleBack}
                handleContinue={handleContinue}
                onSubmit={onSubmitForm}
                value={inputValue || inputAgeValue}
                backButtonActivator={true}
            />
        </div>
    );
}

export default App;
