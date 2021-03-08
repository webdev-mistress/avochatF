import React from 'react';

export type ListItemEvent = React.MouseEvent<HTMLLIElement>
  | React.MouseEvent<HTMLAnchorElement>
  | React.MouseEvent<HTMLDivElement>

export type ButtonEvent =
  React.MouseEvent<HTMLElement>
  | React.MouseEvent<HTMLButtonElement>
