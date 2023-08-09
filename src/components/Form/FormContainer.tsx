import React, {ChangeEvent, FC} from 'react';
import styles from './Form.module.scss';

interface FormContainerProps {
    onSubmit: (e: ChangeEvent<HTMLInputElement>) => void
    value: string | number
    backButtonActivator?: boolean
    handleContinue: () => void
    handleBack: () => void
    label: string
    type: string
    name: string
}

export const FormContainer: FC<FormContainerProps> = React.memo((props) => {

    const {onSubmit, value, backButtonActivator, handleContinue, handleBack, label, type, name} = props

    return (
        <form className={styles.formContainer}>
            <label htmlFor={name}>
                <input
                    className={styles.formInput}
                    id={name}
                    placeholder={label}
                    onChange={onSubmit}
                    type={type}
                    value={value}
                    name={name}
                />
            </label>
            <div className={styles.buttonContainer}>
                {backButtonActivator &&
                <button onClick={handleBack} className={styles.backButton} type="button">Назад</button>}

                <button className={styles.continueButton} onClick={handleContinue} type="button">Продолжить</button>
            </div>

        </form>
    );
});
