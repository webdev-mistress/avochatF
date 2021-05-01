export interface IAction<T extends Record<string, unknown>> {
  action: string,
  payload: T,
}

let a: IAction<{ a: string }> = { action: 'some', payload: { a: 'some' } };
