import React, { Component } from 'react';
type Props = {};
import { Table, Button, Icon, Modal, Form, Input, InputNumber, Popconfirm } from 'antd'
const Search = Input.Search;
const FormItem = Form.Item;
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {retrieveDealers,createDealer,editDealer,deleteDealer} from '../actions/DealerActions'
import moment from 'moment'
import {lang} from '../services/config'

class DealerPage extends Component<Props> {
    props: Props
    constructor(props) {
        super(props);
        this.state = {
          visible: false,
          type:'edit',
          selected: {},
          name: ''
        }
    }
    componentDidMount(){
        this.props.retrieveDealers(this.state.name);
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
              if(this.state.type === 'create'){
                this.props.createDealer(dataToSend, this.state.name);
              }
              if(this.state.type === 'edit'){
                dataToSend.id =this.state.selected.id;
                this.props.editDealer(dataToSend, this.state.name);
              }
              setTimeout(() => {
                this.setState({
                  visible: false
                })
              }, 1000);
              this.props.form.resetFields()
            }
        });
    }
    handleSearch =(value) =>{
      this.props.retrieveDealers(value);
    }
    onSearchChange = (e) =>{
      this.setState({
        name: e.target.value
      })
      this.handleSearch(e.target.value);
    }
    handleDelete = () =>{
      this.props.deleteDealer(this.state.selected.id, this.state.name)
    }
    handleCancel = () => {
        this.props.form.resetFields();
        this.setState({
            visible: false,
        })
    }
    handleModalOpen = (type) => {
        this.setState({
            visible: true,
            type,
        })
    }

    render() {
        const columns = [{
          title: <div><Icon type="user" theme="outlined" style={{fontSize:'1.3em'}}/> {lang.name}</div>,
            dataIndex: 'name',
            key: 'name',
        }, {
          title: <div><Icon type="phone" theme="outlined" style={{fontSize:'1.3em'}} /> {lang.phone}</div>,
            dataIndex: 'phone',
            key: 'phone',
        }, {
          title: <div><Icon type="mail" theme="outlined" style={{fontSize:'1.3em'}} /> {lang.email} </div>,
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: <div><Icon type="phone" theme="outlined" style={{fontSize:'1.3em'}} /> {lang.address}</div>,
            dataIndex: 'address',
            key: 'address',
        },{
            title: <div><Icon type="idcard" theme="outlined" style={{fontSize:'1.3em'}} /> {lang.registrar} </div>,
            dataIndex: 'userName',
            key: 'userName',
          },
        {
          title: <div><Icon type="calendar" theme="outlined" style={{fontSize:'1.3em'}} /> {lang.registerDate} </div>,
            dataIndex: 'creationDate',
            key: 'creationDate',
            render: (text) => <div>{moment.unix(text).format('DD/MM/YYYY')}</div>
        },
          {
            title: lang.edit,
            render:() => <Button onClick={()=>this.handleModalOpen('edit')} style={{border:'0', background:'transparent'}}><Icon type="edit" /></Button>
          },
          {
            title: lang.delete,
            render:() =><Popconfirm placement="topLeft" title={lang.areUSureToRemoveItem} onConfirm={this.handleDelete} okText="Yes" cancelText="No"><Button style={{border:'0', background:'transparent'}}><Icon type="delete" /></Button></Popconfirm>
          },
        ]
        const { getFieldDecorator } = this.props.form;
        const {selected,type} = this.state ;
        console.log(selected);
        return (
            <div>
                <div className='page-header' >
                    <div className='header-h'>{lang.dealers}</div>
                    <div style={{ display: 'flex' }}>
                        <Search
                            style={{ height: '32px', marginRight: '10px' }}
                            placeholder={lang.searchDealers}
                            onSearch={this.handleSearch}
                            onChange = {this.onSearchChange}
                        />
                      <Button onClick={()=>this.handleModalOpen('create')} >{lang.newDealerEntry}<Icon type='plus' /></Button>

                    </div>
                </div>
                <div className='page-body'>
                    <Table dataSource={this.props.dealers}
                           columns={columns}
                           rowKey={(record) => {
                             return record.id+1;
                           }}
                           onRow={(record) => {
                             return {
                               onClick: () => this.setState({selected: record})
                             }
                           }}
                           pagination={{
                              showSizeChanger: true, 
                              pageSizeOptions: ["6","8","10","15","20"], 
                              hideOnSinglePage: true,
                              defaultPageSize: 8

                          }}
                    />
                </div>


                <Modal
                    title={this.state.type === 'edit' ? lang.editDealer: lang.newDealerEntry}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button onClick={this.handleCancel}>{lang.cancel}</Button>,
                        <Button type="primary" onClick={this.handleOk}>
                            {lang.save}
                        </Button>,
                    ]}
                >
                    <Form className='stock-form'>
                        <FormItem
                            label={lang.name}
                            style={{ display: 'flex' }}
                        >
                            {getFieldDecorator('name', {
                                initialValue: type === 'edit' ? selected.name : '',
                                rules: [{
                                    required: false, message: lang.typeName
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <div>
                            <FormItem
                                label={lang.phone}
                                style={{ display: 'flex' }}
                            >
                                {getFieldDecorator('phone', {
                                  initialValue: type === 'edit' ? selected.phone : '',
                                    rules: [{
                                        required: true, message: lang.typePhone
                                    }],
                                })(
                                    <Input />
                                )}

                            </FormItem>
                            <FormItem
                                label={lang.email}
                                style={{ display: 'flex' }}
                            >
                                {getFieldDecorator('email', {
                                  initialValue: type === 'edit' ? selected.email : '',
                                    rules: [{
                                        required: false
                                    }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem
                                label={lang.address}
                                style={{ display: 'flex' }}
                            >
                                {getFieldDecorator('address', {
                                  initialValue: type === 'edit' ? selected.address : '',
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

const ConnectedPage = connect (mapStateToProps,{retrieveDealers,createDealer,editDealer,deleteDealer})(DealerPage);
const WrappedPage = Form.create()(ConnectedPage);
export { WrappedPage as DealerPage }
