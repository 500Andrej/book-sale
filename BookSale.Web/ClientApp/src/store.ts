import { observable } from 'mobx';
import { IStore, RequestExecutionStatus, IPromocodeStore } from './types';

export const Store: IStore = observable(getDefaultState());

export const PromocodeStore: IPromocodeStore = observable(getDefaultPromocodeState());

export function getDefaultState(): IStore {
    return {
        promoCode: undefined,
        catalog: [],
        basket: [],
        getBooksRequestExecutionStatus: RequestExecutionStatus.Undefined
    }
}

export function getDefaultPromocodeState(): IPromocodeStore {
    return {
        promoCode: '',
        getPromocodeRequestExecutionStatus: RequestExecutionStatus.Undefined,
    }
}