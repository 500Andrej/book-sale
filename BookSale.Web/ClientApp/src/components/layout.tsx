import React from 'react';
import { Router, Switch, Route, Redirect } from "react-router";
import { Catalog } from "./catalog";
import { Basket } from "./basket";
import { Link } from "react-router-dom";
import { Menu, Segment } from "semantic-ui-react";
import { Store } from '../store';
import { observer } from 'mobx-react';

import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

interface ILayoutProps {
    promoCode?: string;
}

export function LayoutComponent(props: ILayoutProps) {
    return (
        <Segment>
            <Router history={history}>
                <div>
                    <Menu stackable>
                        <Menu.Item>
                            <img src='https://react.semantic-ui.com/logo.png' alt='лого' />
                        </Menu.Item>
                        <Menu.Item as={Link} name='catalog' to='/catalog'>
                            Каталог
                        </Menu.Item>
                        <Menu.Item as={Link} name='basket' to='/basket'>
                            Корзина
                        </Menu.Item>
                        <Menu.Item>
                            Промокод: {props.promoCode}
                        </Menu.Item>
                    </Menu>
                    <Switch>
                        <Route path="/basket" component={Basket} />
                        <Route path="/catalog/:page?" component={Catalog} />
                        <Route path="/">
                            <Redirect to='/catalog' />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </Segment >
    )
}

export const Layout = observer(() => <LayoutComponent promoCode={Store.promoCode} />)