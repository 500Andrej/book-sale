import React from 'react';
import { Router, Switch, Route } from "react-router";
import { Catalog } from "./components/Catalog";
import { Basket } from "./components/Basket";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react"
import 'semantic-ui-less/semantic.less';
import { createBrowserHistory } from 'history';
import { observer } from 'mobx-react';
import { Store } from './store';
import { Login } from './Login';
const history = createBrowserHistory();

interface IAppProps {
    promoCode?: string;
}

function AppCompoent(props: IAppProps) {
    return (
        props.promoCode
            ? <Router history={history}>
                <div>
                    <Menu stackable>
                        <Menu.Item>
                            <img src='https://react.semantic-ui.com/logo.png' alt='лого' />
                        </Menu.Item>
                        <Menu.Item as={Link} name='catalog' to='/'>
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
                        <Route path="/basket">
                            <Basket />
                        </Route>
                        <Route path="/">
                            <Catalog />
                        </Route>
                    </Switch>
                </div>
            </Router>
            : <Login />
    );
}

export const App = observer(() => <AppCompoent promoCode={Store.promoCode} />)