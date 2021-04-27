import React, { useCallback } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { selectErrorInfo } from '@/redux/store/ui/selectors';
import { setToggleFailed } from '@/redux/store/ui/actions';
import { screamSnakeCaseWithSlicingError } from '@/redux/utils/redux';

export const SnackBarError: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const errorsInfo = useSelector(selectErrorInfo);
  const errorsInfoArray = Object.entries(errorsInfo);

  const onCloseError = useCallback((errorType: string) => () => {
    const type = screamSnakeCaseWithSlicingError(errorType);
    dispatch(setToggleFailed({ errorType: type, isError: false, textError: '' }));
  }, [dispatch]);

  return (
    <>
      {errorsInfoArray
        .filter(([ , error ]) => error.isError)
        .map(([ key, error ]) => (
          <Snackbar
            key={key}
            open={error.isError}
            autoHideDuration={5000}
            onClose={onCloseError(key)}
          >
            <Alert
              severity={'error'}
              variant="filled"
            >
              This is an error message!
            </Alert>
          </Snackbar>
        ))}
    </>
  );
};
