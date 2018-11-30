export interface Action<T extends string> {
    type: T;
}

export interface ActionWithData<T extends string, P> extends Action<T> {
    payload: P;
}

// tslint:disable:only-arrow-functions
export function createAction<T extends string>(type: T): Action<T>;
export function createAction<T extends string, P>(type: T, payload: P): ActionWithData<T, P>;
export function createAction<T extends string, P>(type: T, payload?: P) {
    return payload === undefined ? { type } : ({ type, payload });
}

// tslint:disable-next-line:no-any
type FunctionType = (...args: any[]) => any;
interface ActionCreatorMapObject { [actionCreator: string]: FunctionType; }
export type ActionsUnion<A extends ActionCreatorMapObject> = ReturnType<A[keyof A]>;