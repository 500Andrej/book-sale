import React from 'react';
import { Segment, Input, Divider, Button } from "semantic-ui-react";
import { RequestExecutionStatus } from './types';
import { observer } from 'mobx-react';
import { Store, PromocodeStore } from './store';
import { getPromocode } from './actions';

interface ILoginProps {
    promoCode?: string;
    getPromocodeRequestExecutionStatus: RequestExecutionStatus;
}

export function LoginComponent(props: ILoginProps) {
    return (
        <Segment basic textAlign='center' >
            <Input
                action={{ color: 'blue', content: 'Войти' }}
                placeholder='Промокод'
                value={props.promoCode}
            />

            <Divider horizontal>Или</Divider>

            <Button
                color='teal'
                content='Получить промокод'
                icon='add'
                labelPosition='left'
                onClick={() => getPromocode()}
                disabled={props.getPromocodeRequestExecutionStatus === RequestExecutionStatus.InProgress || props.getPromocodeRequestExecutionStatus === RequestExecutionStatus.Success}
            />
        </Segment>
    )
}

export const Login = observer(() => <LoginComponent promoCode={PromocodeStore.promoCode} getPromocodeRequestExecutionStatus={PromocodeStore.getPromocodeRequestExecutionStatus} />)