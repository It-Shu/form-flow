import React, {ChangeEvent, FC} from 'react';
import styles from './Form.module.scss';

interface FormContainerProps {
    onSubmit: (e: ChangeEvent<HTMLInputElement>) => void
    value: string | number | null
    backButtonActivator?: boolean
    handleContinue: () => void
    handleBack: () => void

}

export const FormContainer: FC<FormContainerProps> = React.memo((props) => {

    const {onSubmit, value, backButtonActivator, handleContinue} = props

    return (
        <div className={styles.formContainer}>
            {value !== null && <input onChange={onSubmit} type='text' value={value} className={styles.formInput}/>}

            {backButtonActivator && <button className={styles.backButton}>Back</button>}

            <button className={styles.continueButton} onClick={handleContinue}>Continue</button>
        </div>
    );
});
