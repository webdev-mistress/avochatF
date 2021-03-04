// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getLocationParam } from '@/helpers';
import { requestConfirmUser } from '@/redux/store/user/actions';
import { selectUserIsAuth } from '@/redux/store/user/selectors';

export const ConfirmPage = () => {
    const dispatch = useDispatch();
    const userIsAuth = useSelector(selectUserIsAuth);
    const history = useHistory();
    useEffect(() => {
        const token = getLocationParam('token');
        dispatch(requestConfirmUser(token));
    }, [dispatch]);

    useEffect(() => {
        if (userIsAuth) {
            history.push('/chat');
        }
    }, [history, userIsAuth]);

    return (
        <div>Confirm Page</div>
    );
};
