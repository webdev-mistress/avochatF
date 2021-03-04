import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectErrorMessage, selectIsAuthSpin } from '@/redux/store/user/selectors';
import { removeErrorMessage, requestCreateUser } from '@/redux/store/user/actions';

export const useRegForm = () => {
    const initialState = {
        email: '',
        name: '',
        login: '',
        password1: '',
        password2: '',
        disabledButton: false,
        errorText: '',
        isRegFinished: false,
    };
    const [state, setState] = useState(initialState);
    const { email, name, login, password1, password2, disabledButton } = state;
    const isAuthSpin = useSelector(selectIsAuthSpin);
    const errorMessage = useSelector(selectErrorMessage);
    const dispatch = useDispatch();

    const onCreateUser = useCallback((event) => {
        event.preventDefault();
        if (disabledButton) {
            return;
        }
        if(password1 !== password2) {
           setState((prev) => ({
               ...prev,
               errorText: 'Passwords are not equal!',
           }));

           return;
        }
        setState({ ...state, disabledButton: true, isRegFinished: true });
        dispatch(requestCreateUser({ email, name, login, password: password1 }));
    }, [disabledButton, dispatch, email, login, name, password1, password2, state]);

    const onChange = useCallback((event, name) => {
        if (errorMessage) {
            dispatch(removeErrorMessage());
        }
        const { value } = event.target;
        setState({
            ...state,
            [name]: name === 'login' || name === 'name' || name === 'email' ? value.trim() : value,
            disabledButton: false,
            errorText: '',
        });
    }, [dispatch, errorMessage, state]);

    const disabledRegFormButton = !name || !login || !password1 || !password2 || state.disabledButton;

        return {
            isAuthSpin,
            errorMessage,
            onCreateUser,
            onChange,
            disabledRegFormButton,
            login,
            password1,
            password2,
            name,
            email,
            state,
        };
};
