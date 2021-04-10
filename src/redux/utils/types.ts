export interface ILoadings {
  [key: string]: boolean,
}

export interface IErrors {
  [key: string]: {
    isError: boolean,
    textError?: string,
  }
}

export interface ILoadersAndErrors {
  loaders: ILoadings,
  errors: IErrors,
}
