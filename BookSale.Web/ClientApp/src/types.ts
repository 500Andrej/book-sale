export enum RequestExecutionStatus {
    Undefined = 0,
    InProgress = 1,
    Success = 2,
    Fail = 3,
}

export interface IPromocodeStore {
    promoCode?: string;
    getPromocodeRequestExecutionStatus: RequestExecutionStatus;
}

export interface IStore {
    promoCode?: string;

    catalog: IBook[];
    basket: IBook[];
    getBooksRequestExecutionStatus: RequestExecutionStatus;
}

export interface IBook {
    name: string;
    releaseDate: Date;
    isbn: string;
    picture: string;
    amount: number;
    count: number;
    authors: string[];
} 