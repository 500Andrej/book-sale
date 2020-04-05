import React from 'react';
import { Table, Image, Button, Menu, Message } from 'semantic-ui-react';
import { BookModel } from '../types';
import { removeFromBasket, clearBasket, buy } from '../actions';
import { observer } from 'mobx-react';
import { Store } from '../store';
interface IBasketProps {
    books: BookModel[];
}

export function BasketComponent(props: IBasketProps) {
    let totalAmount = props.books.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
    return props.books.length
        ? <>
            <span>Корзина</span>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Обложка</Table.HeaderCell>
                        <Table.HeaderCell>Название</Table.HeaderCell>
                        <Table.HeaderCell>Автор(ы)</Table.HeaderCell>
                        <Table.HeaderCell>ISBN</Table.HeaderCell>
                        <Table.HeaderCell>Год</Table.HeaderCell>
                        <Table.HeaderCell>Стоимость</Table.HeaderCell>
                        <Table.HeaderCell>Купить</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.books.map(book => {
                        return <Table.Row key={book.id}>
                            <Table.Cell>
                                <Image
                                    size='mini'
                                    src={book.picture}
                                />
                            </Table.Cell>
                            <Table.Cell>{book.name}</Table.Cell>
                            <Table.Cell>{book.authors}</Table.Cell>
                            <Table.Cell>{book.isbn}</Table.Cell>
                            <Table.Cell>{book.releaseDate.getFullYear()}</Table.Cell>
                            <Table.Cell>{book.amount} р.</Table.Cell>
                            <Table.Cell>
                                <Button
                                    color='red'
                                    content='Удалить из корзины'
                                    icon='remove'
                                    onClick={() => removeFromBasket(book)}
                                /></Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='7'>
                            <Message info>
                                Кнопка купить станет активно после того как вы наберете книг на сумму более 2000р.
                        </Message>
                            <Menu floated='right'>
                                <Menu.Item>
                                    <Button
                                        color='red'
                                        content='Очистить корзину'
                                        icon='remove'
                                        onClick={() => clearBasket()}
                                    />
                                </Menu.Item>
                                <Menu.Item>
                                    <Button
                                        color='teal'
                                        content='Купить'
                                        icon='add'
                                        onClick={() => buy()}
                                        disabled={totalAmount <= 2000}
                                    />
                                </Menu.Item>
                            </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </>
        : <span>Корзина пуста</span>
}

export const Basket = observer(() => <BasketComponent books={Store.basket} />)