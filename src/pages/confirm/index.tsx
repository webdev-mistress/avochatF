import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getLocationParam } from '@/helpers';
// import { requestConfirmUser } from '@/redux/store/user/actions';
import { selectUserIsAuth } from '@/redux/store/user/selectors';
// import { confirmUserRequest } from '@/redux/common/actions/authActions';
import { confirmUserRequest } from '@/redux/store/user/actions';
import styles from './styles.module.scss';

export const ConfirmPage: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const userIsAuth = useSelector(selectUserIsAuth);
  const history = useHistory();
  useEffect(() => {
    const token = getLocationParam('token');
    dispatch(confirmUserRequest(token));
  }, [dispatch]);

  useEffect(() => {
    if (userIsAuth) {
      history.push('/oldChat');
    }
  }, [history, userIsAuth]);

  return (
    <div className={styles.confirmWrapper}>Confirm Page</div>
  );
};
