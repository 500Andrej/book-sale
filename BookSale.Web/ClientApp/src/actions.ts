import { runInAction } from 'mobx';
import { RequestExecutionStatus, BookModel, IBook, CatalogModel } from './types';
import { Store, PromocodeStore } from './store';
import { handleResponse } from './utils';
import cogoToast from 'cogo-toast';


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

export async function Login() {
    runInAction(() => Store.loginRequestExecutionStatus = RequestExecutionStatus.InProgress);
    var responce = await fetch(`/PromoCode/CodeIsValid/${PromocodeStore.promoCode}`);
    if (responce.ok && await responce.text()) {
        runInAction(() => {
            Store.promoCode = PromocodeStore.promoCode;
            Store.loginRequestExecutionStatus = RequestExecutionStatus.Success;
        });
        resetPromoCodeStore();
    } else {
        runInAction(() => Store.loginRequestExecutionStatus = RequestExecutionStatus.Fail)
    }
}

export async function getCatalog(pageIndex: number, pageSize: number) {
    runInAction(() => Store.catalog = { ...Store.catalog, getCatalogRequestExecutionStatus: RequestExecutionStatus.InProgress });
    try {
        var responce = await fetch(`/book/catalog/${pageIndex}/${pageSize}`, {
            headers: { 'Authorization': Store.promoCode },
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

export function addToBasket(book: BookModel) {
    runInAction(() => {
        Store.basket = [...Store.basket, book];
    })
}

export function removeFromBasket(book: BookModel) {
    runInAction(() => {
        Store.basket = Store.basket.filter(b => b !== book)
    })
}

export function clearBasket() {
    runInAction(() => {
        Store.basket = []
    })
}

export async function buy() {
    if (Store.basket.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0) <= 2000) {
        cogoToast.error("Сумма слишком мала");
        return;
    }
    var responce = await fetch('/book/buy', {
        method: 'POST',
        headers: { 'Authorization': Store.promoCode, 'content-type': 'application/json; charset=utf-8' },
        body: JSON.stringify(Store.basket.map(book => { return { bookId: book.id, count: 1 } }))
    });
    if (responce.ok) {
        resetStore();
        cogoToast.success("Книги куплены");
    } else {
        cogoToast.error("Во время покупки произошла ошибка");
    }
}

function resetStore() {
    runInAction(() => {
        Store.basket = [];
        Store.promoCode = '';
        Store.catalog = new CatalogModel();
        Store.loginRequestExecutionStatus = RequestExecutionStatus.Undefined
    });
}

function resetPromoCodeStore() {
    runInAction(() => {
        PromocodeStore.promoCode = '';
        PromocodeStore.getPromocodeRequestExecutionStatus = RequestExecutionStatus.Undefined;
    })
}