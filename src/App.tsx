import React, {ChangeEvent, useCallback, useEffect} from "react";
import {FormContainer} from "./components/Form/FormContainer";
import styles from "./App.module.scss"
import {useAppSelector} from "./redux/hooks/useAppSelector";
import {useDispatch} from "react-redux";
import {actionsMap, setStep} from "./redux/reducers/formReducer";
import {formStepsJSON} from "./redux/state/formStepsJSON";
import {useSteps} from "./components/hooks/useSteps";
import {useForm} from "react-hook-form";

type FormValueKeys = "name" | "surname" | "age" | "email";

const App = React.memo(() => {

    const {
        handleSubmit,
        register,
        setValue,
        formState: {errors}
    } = useForm()
    const dispatch = useDispatch()

    const name = useAppSelector((state) => state.form.name)
    const surname = useAppSelector((state) => state.form.surname)
    const age = useAppSelector((state) => state.form.age)
    const email = useAppSelector((state) => state.form.email)

    const {step, handleBack, isBackButtonActive} = useSteps()

    const currentStepObject = formStepsJSON[step - 1]; // Defining an object for the current step, adjusting for zero-based array indexing

    const valuesMap: Record<FormValueKeys, string | number> = {
        "name": name,
        "surname": surname,
        "age": age,
        "email": email
    };

    const key = currentStepObject.name as FormValueKeys;
    const inputValue = valuesMap[key];

    useEffect(() => {
        setValue(currentStepObject.name, inputValue);
    }, [setValue, currentStepObject.name, inputValue])

    console.log("render APP")


    const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (currentStepObject.name) {
            const action = actionsMap[currentStepObject.name as string]
            const value = e.currentTarget.value;

            if (currentStepObject.name in actionsMap) {
                dispatch(action(value));
            } else {
                console.log("Ошибка - действия не существует")
            }
        } else {
            console.log("Ошибка - поле name не найдено")
        }
    };

    const handleContinue = useCallback(
        handleSubmit((data) => {
            if (formStepsJSON.length !== step) {
                dispatch(setStep(step + 1));
            } else {
                console.log("form result", data);
            }
        }),
        [handleSubmit, step, dispatch]
    );

    return (
        <div className={styles.App}>
            <FormContainer
                register={register}
                errors={errors}
                currentStepObject={currentStepObject}
                handleBack={handleBack}
                handleContinue={handleContinue}
                onSubmit={handleValueChange}
                value={inputValue}
                isBackButtonActive={isBackButtonActive}
                label={currentStepObject.label}
                type={currentStepObject.type}
                name={currentStepObject.name}
            />
        </div>
    );
});

export default App;
