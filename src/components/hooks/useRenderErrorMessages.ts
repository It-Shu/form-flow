import {useMemo} from "react";
import {FormStep} from "../../redux/state/formStepsJSON";
import {FieldErrors} from "react-hook-form";

export const useRenderErrorMessages = (name: string, errors: FieldErrors, currentStepObject: FormStep) => {

    const message = useMemo(() => {

        const error = errors[name];
        if (error) {

            let errorMessage = "Ошибка валидации";

            if (error.type === "required") {
                errorMessage = "Это поле обязательно";
            } else if (error.type === "maxLength") {
                errorMessage = `Максимальная длина ${currentStepObject.max_length} символов`;
            } else if (error.type === "minLength") {
                errorMessage = `Минимальная длина ${currentStepObject.min_length} символов`;
            } else if (error.type === "pattern") {
                errorMessage = "Неверный формат";
            } else if (error.type === "min") {
                errorMessage = `Минимальное значение ${currentStepObject.min}`;
            } else if (error.type === "max") {
                errorMessage = `Максимальное значение ${currentStepObject.max}`;
            }
            return errorMessage
        }
        return null;
    }, [errors[name]]);

    return {message}
}
