export enum RequestExecutionStatus {
    Undefined = 0,
    InProgress = 1,
    Success = 2,
    Fail = 3,
}

export interface IPromocodeStore {
    promoCode: string;
    getPromocodeRequestExecutionStatus: RequestExecutionStatus;
}

export interface IStore {
    promoCode: string;
    loginRequestExecutionStatus: RequestExecutionStatus;
    catalog: CatalogModel;
    basket: BookModel[];
}

export interface IBook {
    id: number;
    name: string;
    releaseDate: string;
    isbn: string;
    picture: string;
    amount: number;
    count: number;
    authors: string[];
}

export class CatalogModel {
    books: BookModel[];
    totalCount: number;

    getCatalogRequestExecutionStatus: RequestExecutionStatus;


    constructor(dto?: { books: IBook[], totalCount: number }) {
        this.books = []
        this.totalCount = 0;
        this.getCatalogRequestExecutionStatus = RequestExecutionStatus.Undefined;
    }
}

export class BookModel {
    id: number;
    name: string;
    releaseDate: Date;
    isbn: string;
    picture: string;
    amount: number;
    count: number;
    authors: string;

    constructor(bookDto: IBook) {
        this.id = bookDto.id;
        this.name = bookDto.name;
        this.releaseDate = new Date(bookDto.releaseDate);
        this.isbn = bookDto.isbn;
        this.picture = bookDto.picture ? bookDto.picture : 'https://react.semantic-ui.com/images/avatar/large/steve.jpg';
        this.amount = bookDto.amount;
        this.count = bookDto.count;
        this.authors = bookDto.authors.join(", ");
    }
}