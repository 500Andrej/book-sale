import React from 'react';
import { Table, Label, Menu, Icon, Message, Dimmer, Loader, Image, Button } from 'semantic-ui-react';
import { IBook, RequestExecutionStatus, BookModel } from '../types';
import { getCatalog } from '../actions';
import { observer } from 'mobx-react';
import { Store } from '../store';
import { RouteComponentProps, Link } from 'react-router-dom';

interface ICatalogProps extends RouteComponentProps<{ page: string }> {
  totalCount: number;
  books: BookModel[];
  getCatalogRequestExecutionStatus: RequestExecutionStatus;
}

class CatalogComponent extends React.Component<ICatalogProps>{
  pageSize = 20;

  componentDidMount() {
    let pageIndex = +this.props.match.params.page;
    getCatalog(pageIndex ? pageIndex : 1, this.pageSize);
  }

  render() {
    return this.props.getCatalogRequestExecutionStatus === RequestExecutionStatus.Fail
      ? <Message error>Во время загрузки каталога произошла ошибка</Message>
      : <div>
        {this.props.getCatalogRequestExecutionStatus === RequestExecutionStatus.InProgress
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
              <Table.HeaderCell>Купить</Table.HeaderCell>
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
                <Table.Cell>
                  <Button
                    color='teal'
                    content='Купить'
                    icon='add'
                  //onClick={() => getPromocode()}
                  //disabled={props.getPromocodeRequestExecutionStatus === RequestExecutionStatus.InProgress}
                  /></Table.Cell>
              </Table.Row>
            })}
          </Table.Body>
          {this.props.totalCount > this.pageSize
            ? <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan='8'>
                  <Menu floated='right' pagination>
                    {Array.from(Array(Math.ceil(this.props.totalCount / this.pageSize)).keys())
                      .map(i => {
                        let pageIndex = i + 1;
                        return <Menu.Item
                          as={Link} to={`/catalog/${pageIndex}`}
                          key={pageIndex}
                          onClick={() => getCatalog(pageIndex, this.pageSize)}>
                          {pageIndex}
                        </Menu.Item>
                      })}
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
            : null}
        </Table>
      </div>
  }
}

export const Catalog = observer((props: ICatalogProps) => <CatalogComponent
  {...props}
  {...Store.catalog}
/>)