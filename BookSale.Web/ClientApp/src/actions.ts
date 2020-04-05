import { runInAction } from 'mobx';
import { RequestExecutionStatus, BookModel, IBook } from './types';
import { Store, PromocodeStore } from './store';
import { handleResponse } from './utils';

export async function getPromocode() {
    runInAction(() => PromocodeStore.getPromocodeRequestExecutionStatus = RequestExecutionStatus.InProgress);
    try {
        var responce = await fetch('/promocode/generatenew');
        var promoCode = await handleResponse(responce);
        if (promoCode) {
            runInAction(() => {
                PromocodeStore.promoCode = promoCode.promoCode;
                PromocodeStore.getPromocodeRequestExecutionStatus = RequestExecutionStatus.Success;
            });
        }
    }
    catch {
        runInAction(() => PromocodeStore.getPromocodeRequestExecutionStatus = RequestExecutionStatus.Fail);
    }
} 

export function SetPromocode(value: string){
    runInAction(() => {
        PromocodeStore.promoCode = value;
    });
}

export function Login(){
    runInAction(() => {
        Store.promoCode = PromocodeStore.promoCode;
    });
}

export async function getCatalog() {
    runInAction(() => Store.getBooksRequestExecutionStatus = RequestExecutionStatus.InProgress);
    try {
        var responce = await fetch('/book/all');
        var books = await handleResponse(responce);
        if (books) {
            runInAction(() => {
                Store.catalog = books.map((book: IBook) => new BookModel(book));
                Store.getBooksRequestExecutionStatus = RequestExecutionStatus.Success;
            });
        }
    }
    catch {
        runInAction(() => Store.getBooksRequestExecutionStatus = RequestExecutionStatus.Fail);
    }
} 