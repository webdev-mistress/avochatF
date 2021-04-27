import { Button, ButtonProps, CircularProgress } from '@material-ui/core';
import React from 'react';

interface IProps extends ButtonProps{
  isLoading: boolean,
  text: string | any,
  loaderSize?: string | number,
}

export const ButtonWithLoader: React.FunctionComponent<IProps> = (props) => {
  const { isLoading, text, disabled, loaderSize, ...rest } = props;
  return (
    <>
      <Button
        {...rest} disabled={isLoading || disabled}
      >
        {text}
        {isLoading && <CircularProgress size={loaderSize} />}
      </Button>
    </>
  );
};

ButtonWithLoader.defaultProps = {
  loaderSize: 30,
};
