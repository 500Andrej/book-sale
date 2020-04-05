import React from 'react';
import 'semantic-ui-less/semantic.less';
import { Layout } from './components/layout'
import { observer } from 'mobx-react';
import { Store } from './store';
import { Login } from './components/login';

interface IAppProps {
    promoCode?: string;
}

function AppCompoent(props: IAppProps) {
    return props.promoCode
            ? <Layout /> 
            : <Login />
    ;
}

export const App = observer(() => <AppCompoent promoCode={Store.promoCode} />)