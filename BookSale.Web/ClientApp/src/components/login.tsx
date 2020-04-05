import React from 'react';
import { Segment, Input, Divider, Button, Message } from "semantic-ui-react";
import { RequestExecutionStatus } from '../types';
import { observer } from 'mobx-react';
import { PromocodeStore, Store } from '../store';
import { getPromocode, SetPromocode, Login as LoginAction } from '../actions';

interface ILoginProps {
    promoCode: string;
    loginRequestExecutionStatus: RequestExecutionStatus;
    getPromocodeRequestExecutionStatus: RequestExecutionStatus;
}

export function LoginComponent(props: ILoginProps) {
    return (
        <Segment basic textAlign='center' >
            <Input
                action={{ color: 'blue', content: 'Войти', onClick: () => LoginAction(), disabled: props.loginRequestExecutionStatus === RequestExecutionStatus.InProgress }}
                placeholder='Промокод'
                value={props.promoCode}
                onChange={(_, action) => SetPromocode(action.value)}
            />
            {props.loginRequestExecutionStatus === RequestExecutionStatus.Fail
                ? <Message error>
                    Введеный вами промокод - не действителен.
                </Message>
                : null}

            <Divider horizontal>Или</Divider>

            <Button
                loading={props.getPromocodeRequestExecutionStatus === RequestExecutionStatus.InProgress}
                color='teal'
                content='Получить промокод'
                icon='add'
                labelPosition='left'
                onClick={() => getPromocode()}
                disabled={props.getPromocodeRequestExecutionStatus === RequestExecutionStatus.InProgress}
            />
            {props.getPromocodeRequestExecutionStatus === RequestExecutionStatus.Fail
                ? <Message error>
                    Во время получения промокода возникла ошибка.
                </Message>
                : null}
        </Segment>
    )
}

export const Login = observer(() => <LoginComponent
    promoCode={PromocodeStore.promoCode}
    loginRequestExecutionStatus={Store.loginRequestExecutionStatus}
    getPromocodeRequestExecutionStatus={PromocodeStore.getPromocodeRequestExecutionStatus} />)