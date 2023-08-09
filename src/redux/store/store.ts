import {configureStore} from '@reduxjs/toolkit';
import formReducer from '../reducers/formReducer';

const store = configureStore({
    reducer: {
        form: formReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

