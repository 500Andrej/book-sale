import React from 'react';
import { Table, Label, Menu, Icon, Message, Dimmer, Loader, Image } from 'semantic-ui-react';
import { IBook, RequestExecutionStatus, BookModel } from '../types';
import { getCatalog } from '../actions';
import { observer } from 'mobx-react';
import { Store } from '../store';

interface ICatalogProps {
  books: BookModel[];
  getBooksRequestExecutionStatus: RequestExecutionStatus;
}

class CatalogComponent extends React.PureComponent<ICatalogProps>{
  componentDidMount() {
    getCatalog()
  }

  render() {
    return this.props.getBooksRequestExecutionStatus === RequestExecutionStatus.Fail
      ? <Message error>Во время загрузки каталога произошла ошибка</Message>
      : <div>
        {this.props.getBooksRequestExecutionStatus === RequestExecutionStatus.InProgress
          ? <Dimmer active inverted><Loader inverted>Загрузка</Loader></Dimmer>
          : null}
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Обложка</Table.HeaderCell>
              <Table.HeaderCell>Название</Table.HeaderCell>
              <Table.HeaderCell>Автор(ы)</Table.HeaderCell>
              <Table.HeaderCell>ISBN</Table.HeaderCell>
              <Table.HeaderCell>Год</Table.HeaderCell>
              <Table.HeaderCell>Стоимость</Table.HeaderCell>
              <Table.HeaderCell>Кол-во</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.books.map(book => {
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
                <Table.Cell>{book.count}</Table.Cell>
              </Table.Row>
            })}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='7'>
                <Menu floated='right' pagination>
                  <Menu.Item as='a' icon>
                    <Icon name='chevron left' />
                  </Menu.Item>
                  <Menu.Item as='a'>1</Menu.Item>
                  <Menu.Item as='a'>2</Menu.Item>
                  <Menu.Item as='a'>3</Menu.Item>
                  <Menu.Item as='a'>4</Menu.Item>
                  <Menu.Item as='a' icon>
                    <Icon name='chevron right' />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
  }
}

export const Catalog = observer(() => <CatalogComponent books={Store.catalog} getBooksRequestExecutionStatus={Store.getBooksRequestExecutionStatus} />)