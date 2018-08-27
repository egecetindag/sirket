import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon } from 'antd'
import '../assets/styles/login.css';
import {login} from '../actions/AuthActions'
const FormItem = Form.Item;

class Login extends Component<Props> {
    props: Props
    constructor(props) {
        super(props);
    }
    handleOk = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const dataToSend = {
                    email: values.email,
                    password: values.password,
                }
                this.props.login(dataToSend);
                this.props.form.resetFields()
            }
        });

    }
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#2C3A47' }}>
                <div className='login'>
                    <div style={{ width: '60%' }}>
                        <div style={{ textAlign: 'center', marginBottom: '10%' }}>
                            <Icon type="shopping-cart" style={{ color: 'white', fontSize: '8em' }} />
                        </div>
                        <Form onSubmit={this.handleOk}
                        >
                            <FormItem
                            >
                                {getFieldDecorator('email', {
                                    initialState: 'E-posta Adresi',
                                    rules: [{ type: 'email', message: 'Gecerli bir e-posta adresi girin!', }, {
                                        required: true, message: 'E-posta adresi girin!'
                                    }],
                                })(
                                    <Input className='input-login' prefix={<Icon type="user" style={{ color: 'white' }} />} placeholder='Kullanici Adi' />
                                )}
                            </FormItem>
                            <FormItem
                            >
                                {getFieldDecorator('password', {
                                    initialState: 'Sifre',
                                    rules: [{
                                        required: true, message: 'Sifre girin!'
                                    }],
                                })(
                                    <Input className='input-login' prefix={<Icon type="lock" style={{ color: 'white' }} />} type='password' placeholder='Sifre' />
                                )}
                            </FormItem>
                        </Form>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button onClick={this.handleOk} loading={this.props.loginRequest} style={{ width: '40%', fontSize: '1.2em' }} type='primary'>Giris</Button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
function mapStateToProps({ authReducer }) {
    const { loginRequest, loginSuccess } = authReducer;
    return {
        loginSuccess,
        loginRequest,
    }
}

const ConnectedPage = connect(mapStateToProps, {login})(Login);
const WrappedPage = Form.create()(ConnectedPage);
export { WrappedPage as Login }
