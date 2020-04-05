import React from 'react';
import { Segment, Input, Divider, Button, Message } from "semantic-ui-react";
import { RequestExecutionStatus } from '../types';
import { observer } from 'mobx-react';
import { PromocodeStore } from '../store';
import { getPromocode, SetPromocode, Login as LoginAction } from '../actions';

interface ILoginProps {
    promoCode: string;
    getPromocodeRequestExecutionStatus: RequestExecutionStatus;
}

export function LoginComponent(props: ILoginProps) {
    return (
        <Segment basic textAlign='center' >
            <Input
                action={{ color: 'blue', content: 'Войти', onClick: () => LoginAction(), disabled: !props.promoCode}}
                placeholder='Промокод'
                value={props.promoCode}
                onChange={(_, action)=> SetPromocode(action.value)}
            />

            <Divider horizontal>Или</Divider>

            <Button
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

export const Login = observer(() => <LoginComponent promoCode={PromocodeStore.promoCode} getPromocodeRequestExecutionStatus={PromocodeStore.getPromocodeRequestExecutionStatus} />)