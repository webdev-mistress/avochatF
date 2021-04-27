import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getLocationParam } from '@/helpers';
import { selectUserIsAuth } from '@/redux/store/user/selectors';
import { Auth, confirmUserRequest } from '@/redux/store/user/actions';
import styles from './styles.module.scss';
import { selectLoaderStatus } from '@/redux/store/ui/selectors';
import { CircularProgress } from '@material-ui/core';

export const ConfirmPage: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const userIsAuth = useSelector(selectUserIsAuth);
  const isConfirmLoading = useSelector(selectLoaderStatus(Auth.CONFIRM_USER));
  const history = useHistory();
  useEffect(() => {
    const token = getLocationParam('token');
    dispatch(confirmUserRequest(token));
  }, [dispatch]);

  useEffect(() => {
    if (userIsAuth) {
      history.push('/chat');
    }
  }, [history, userIsAuth]);

  return (
    <div className={styles.confirmWrapper}>
      <h1>Confirm Page</h1>
      {isConfirmLoading && <CircularProgress />}
    </div>
  );
};
