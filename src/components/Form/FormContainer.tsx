import React, {ChangeEvent, FC} from "react";
import styles from "./Form.module.scss";
import {FormStep} from "../../redux/state/formStepsJSON";
import {FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";
import {useErrorMessages} from "../hooks/useErrorMessages";

interface FormContainerProps {
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
    currentStepObject: FormStep
    handleValueChange: (e: ChangeEvent<HTMLInputElement>) => void
    value: string | number
    isBackButtonActive?: boolean
    handleContinue: () => void
    handleBack: () => void
    label: string
    type: string
    name: string
}

export const FormContainer: FC<FormContainerProps> = React.memo((props) => {

    const {
        errors,
        currentStepObject,
        register,
        handleValueChange,
        value,
        isBackButtonActive,
        handleContinue,
        handleBack,
        label,
        type,
        name
    } = props

    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleContinue();
    };

    const {message} = useErrorMessages(name, errors, currentStepObject)

    return (
        <form className={styles.formContainer} onSubmit={handleSubmitForm} key={currentStepObject.name}>
            <label htmlFor={name}>
                <input
                    {...register(name, {
                        required: true,
                        maxLength: currentStepObject.max_length,
                        minLength: currentStepObject.min_length,
                        pattern: currentStepObject.regex ? new RegExp(currentStepObject.regex) : undefined,
                        min: currentStepObject.min,
                        max: currentStepObject.max
                    })}
                    autoFocus
                    className={styles.formInput}
                    id={name}
                    placeholder={label}
                    onChange={handleValueChange}
                    type={type}
                    value={value}
                    name={name}
                />
            </label>

            {message && <p className={styles.error}>{message}</p>}

            <div className={styles.buttonContainer}>
                {isBackButtonActive &&
                <button onClick={handleBack} className={styles.backButton} type="button">Назад</button>}

                <button className={styles.continueButton} type="submit">Продолжить</button>

            </div>

        </form>
    );
});
