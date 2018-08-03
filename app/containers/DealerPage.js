import React, { Component } from 'react';
type Props = {};
import { Table, Button, Icon, Modal, Form, Input, InputNumber } from 'antd'
const Search = Input.Search;
const FormItem = Form.Item;
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {retrieveDealers,createDealer,editDealer} from '../actions/DealerActions'
import moment from 'moment'
class DealerPage extends Component<Props> {
    props: Props
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            // continue: false,
            // barkod: '',
            editVisible:false,
        }
    }
    componentDidMount(){
        this.props.retrieveDealers();
    }
    handleOk = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const dataToSend = {
                    name: values.name,
                    phone: values.phone,
                    email: values.email,
                    address: values.address,
                    type: "Tedarikçi"
                }
                console.log('data', dataToSend)
                this.props.createDealer(dataToSend);
                setTimeout(() => {
                    this.setState({
                        visible: false
                    })
                }, 1000);
            }
        });
    }
    handleEdit = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const dataToSend = {
                    name: values.name,
                    phone: values.phone,
                    email: values.email,
                    address: values.address,
                    type: "Tedarikçi"
                }
                console.log('data', dataToSend)     // ??
                this.props.editDealer(dataToSend);
                setTimeout(() => {
                    this.setState({
                        visible: true
                    })
                }, 1000);
            }
        });
    }
    handleCancel = () => {
        this.props.form.resetFields();
        this.setState({
            visible: false,
        })
    }
    handleModalOpen = () => {
        this.setState({
            visible: true,

        })
    }

    render() {
        const columns = [{
            title: 'İsim',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'Telefon',
            dataIndex: 'phone',
            key: 'phone',
        }, {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
            title: 'Adres',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Giris Tarihi',
            dataIndex: 'creationDate',
            key: 'creationDate',
            render: (text) => <div>{moment.unix(text).format('DD/MM/YYYY')}</div>
        },
        {
            title: 'Duzenle',
            render:() => <Button onClick={this.handleEdit} style={{border:'0', background:'transparent'}}><Icon type="edit" /></Button>
        }]
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div className='page-header' >
                    <div className='header-h'>Tedarikçiler</div>
                    <div style={{ display: 'flex' }}>
                        <Search
                            style={{ height: '32px', marginRight: '10px' }}
                            placeholder="Tedarikçi Ara"
                            onSearch={this.handleSearch}
                        />
                        <Button onClick={this.handleModalOpen} >Yeni Tedarikçi Girisi<Icon type='plus' /></Button>

                    </div>
                </div>
                <div className='page-body'>
                    <Table dataSource={this.props.dealers} columns={columns} />
                </div>


                <Modal
                    title="Yeni Tedarikçi"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button onClick={this.handleCancel}>Iptal</Button>,
                        <Button type="primary" onClick={this.handleOk}>
                            Kaydet
                        </Button>,
                    ]}
                >
                    <Form className='stock-form'>
                        <FormItem
                            label="İsim"
                            style={{ display: 'flex' }}
                        >
                            {getFieldDecorator('name', {
                                initialValue: this.state.name,
                                rules: [{
                                    required: false, message: 'İsim girin!'
                                }],
                            })(
                                <Input onChange={this.handleBarcode} /> // TODO : change here ... !!!
                            )}
                        </FormItem>
                        <div>
                            <FormItem
                                label="Telefon"
                                style={{ display: 'flex' }}
                            >
                                {getFieldDecorator('phone', {
                                    rules: [{
                                        required: true, message: 'Telefon girin!'
                                    }],
                                })(
                                    <Input />
                                )}

                            </FormItem>
                            <FormItem
                                label="Email"
                                style={{ display: 'flex' }}
                            >
                                {getFieldDecorator('email', {
                                    rules: [{
                                        required: false
                                    }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem
                                label="Adres"
                                style={{ display: 'flex' }}
                            >
                                {getFieldDecorator('address', {
                                    rules: [{
                                        required: false
                                    }],
                                })(
                                    <Input />
                                )}
                            </FormItem>

                        </div>

                    </Form>

                </Modal>
            </div>
        );
    }
}
function mapStateToProps({dealerReducer}) {
    const {dealers} = dealerReducer;
	return {
        dealers
    }
}

const ConnectedPage = connect (mapStateToProps,{retrieveDealers,createDealer,editDealer})(DealerPage);
const WrappedPage = Form.create()(ConnectedPage);
export { WrappedPage as DealerPage }
