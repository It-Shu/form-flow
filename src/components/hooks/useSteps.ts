import {useDispatch} from "react-redux";
import {useAppSelector} from "../../redux/hooks/useAppSelector";
import {useCallback} from "react";
import {setStep} from "../../redux/reducers/formReducer";

export const useSteps = () => {

    const step = useAppSelector((state) => state.form.step);
    const dispatch = useDispatch();

    const handleBack = useCallback(() => {
        dispatch(setStep(step - 1));
    }, [step, dispatch]);

    const isBackButtonActive = step !== 1;

    return { step, handleBack, isBackButtonActive };
};
