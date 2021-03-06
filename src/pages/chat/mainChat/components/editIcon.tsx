import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import styles from '../styles.module.scss';

interface IProps {
  messageDateChange: string,
}

export const EditIcon: React.FunctionComponent<IProps> = ({
  messageDateChange,
}) => {
  return (
    <Tooltip
      title={messageDateChange}
      placement="right-start"
    >
      <BorderColorIcon className={styles.editIcon} />
    </Tooltip>
  );
};
