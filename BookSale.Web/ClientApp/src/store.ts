import { observable } from 'mobx';
import { IStore, RequestExecutionStatus, IPromocodeStore, CatalogModel } from './types';

export const Store: IStore = observable(getDefaultState());

export const PromocodeStore: IPromocodeStore = observable(getDefaultPromocodeState());

export function getDefaultState(): IStore {
    return {
        promoCode: undefined,
        catalog: new CatalogModel(),
        basket: [],
    }
}

export function getDefaultPromocodeState(): IPromocodeStore {
    return {
        promoCode: '',
        getPromocodeRequestExecutionStatus: RequestExecutionStatus.Undefined,
    }
}