import React, {ChangeEvent, useCallback} from 'react';
import {FormContainer} from './components/Form/FormContainer';
import styles from './App.module.scss'
import {useAppSelector} from "./redux/hooks/useAppSelector";
import {useDispatch} from "react-redux";
import {actionsMap, setStep} from "./redux/reducers/formReducer";
import {formStepsJSON} from "./redux/state/formStepsJSON";
import {useSteps} from "./components/hooks/useSteps";

type FormValueKeys = 'name' | 'surname' | 'age' | 'email';

function App() {
    const name = useAppSelector((state) => state.form.name)
    const surname = useAppSelector((state) => state.form.surname)
    const age = useAppSelector((state) => state.form.age)
    const email = useAppSelector((state) => state.form.email)

    const {step, handleBack, isBackButtonActive} = useSteps()

    const dispatch = useDispatch()

    const currentStepObject = formStepsJSON[step - 1]; // Defining an object for the current step, adjusting for zero-based array indexing

    const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (currentStepObject.name) {
            const action = actionsMap[currentStepObject.name as string]
            const value = e.currentTarget.value;

            if (currentStepObject.name in actionsMap) {
                dispatch(action(value));
            } else {
                console.log('Ошибка - действия не существует')
            }
        } else {
            console.log('Ошибка - поле name не найдено')
        }
    };

    const handleContinue = useCallback(() => {
        if (formStepsJSON.length !== step) {
            dispatch(setStep(step + 1));
        } else {
            console.log('form result', {name: name, surname: surname, age: age, email: email});
        }
    }, [step, dispatch, name, surname, age, email]);

    const valuesMap: Record<FormValueKeys, string | number> = {
        'name': name,
        'surname': surname,
        'age': age,
        'email': email
    };

    const key = currentStepObject.name as FormValueKeys;
    const inputValue = valuesMap[key];

    return (
        <div className={styles.App}>
            <FormContainer
                handleBack={handleBack}
                handleContinue={handleContinue}
                onSubmit={handleValueChange}
                value={inputValue}
                backButtonActivator={isBackButtonActive}
                label={currentStepObject.label}
                type={currentStepObject.type}
                name={currentStepObject.name}
            />
        </div>
    );
}

export default App;
