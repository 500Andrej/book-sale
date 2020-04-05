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

export function SetPromocode(value: string) {
    runInAction(() => {
        PromocodeStore.promoCode = value;
    });
}

export function Login() {
    runInAction(() => {
        Store.promoCode = PromocodeStore.promoCode;
    });
}

export async function getCatalog(pageIndex: number, pageSize: number) {
    runInAction(() => Store.catalog = { ...Store.catalog, getCatalogRequestExecutionStatus: RequestExecutionStatus.InProgress });
    try {
        var responce = await fetch(`/book/catalog/${pageIndex}/${pageSize}`, {
            headers: {
                'Authorization': Store.promoCode ? Store.promoCode : ''
              },
        });
        var catalog = await handleResponse(responce);
        if (catalog) {
            runInAction(() => Store.catalog = {
                ...Store.catalog,
                books: catalog.books.map((book: IBook) => new BookModel(book)),
                totalCount: catalog.totalCount,
                getCatalogRequestExecutionStatus: RequestExecutionStatus.Success
            });
        }
    }
    catch {
        runInAction(() => runInAction(() => Store.catalog = { ...Store.catalog, getCatalogRequestExecutionStatus: RequestExecutionStatus.Fail }));
    }
} 