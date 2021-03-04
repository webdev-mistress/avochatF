import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { selectErrorMessage, selectIsAuthSpin } from '@/redux/store/user/selectors';
import { removeErrorMessage, requestUser } from '@/redux/store/user/actions';

export const useAuthForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const errorMessage = useSelector(selectErrorMessage);
    const isAuthSpin = useSelector(selectIsAuthSpin);
    const dispatch: Dispatch = useDispatch();

    useEffect(() => {
        errorMessage && setPassword('');
    }, [errorMessage]);

    const onAuth = useCallback((event) => {
        event.preventDefault();
        if (!login || !password) {
            return;
        }
        dispatch(requestUser({ login, password }));
    }, [dispatch, login, password]);

    const onAuthEnter = useCallback((event) => {
        event.key === 'Enter' && onAuth(event);
    }, [onAuth]);

    const onChange = useCallback((event, name, setState) => {
        const { value } = event.target;
        setState(name === 'login' ? value.trim() : value);

        if (errorMessage) {
            dispatch(removeErrorMessage());
        }
    }, [dispatch, errorMessage]);

    return {
        login,
        setLogin,
        password,
        setPassword,
        errorMessage,
        isAuthSpin,
        onAuthEnter,
        onChange,
        onAuth,
    };
};
