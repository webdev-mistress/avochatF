import { CircularProgress, IconButton, IconButtonProps } from '@material-ui/core';
import React from 'react';

interface IProps extends IconButtonProps{
  isLoading: boolean,
  loaderSize?: string | number,
}

export const IconButtonWithLoader: React.FunctionComponent<IProps> = (props) => {
  const { isLoading, disabled, children, loaderSize, ...rest } = props;
  return (
    <>
      <IconButton
        {...rest} disabled={isLoading || disabled}
      >
        {!isLoading && children}
        {isLoading && <CircularProgress size={loaderSize} />}
      </IconButton>
    </>
  );
};
