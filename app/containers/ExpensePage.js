import React, { Component } from 'react';
import moment from 'moment'
import { Table, Button, Icon, Modal, Form, Input, InputNumber, Popconfirm, Tabs, Select, DatePicker } from "antd";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {retrieveExpenses,createExpense, updateExpense,deleteExpense} from '../actions/ExpenseActions'

import {lang} from '../services/config'

type Props = {};
const Search = Input.Search;
const FormItem = Form.Item;

// TODO: edit için kişi seçilmemiş geliyor
//       select için düzeltilmesi gereken warning'ler var
//       date formatı düzeltilecek. moment.unix(..).format()  kabul etmedi, format is not a function hatası aldımupdate

class ExpensePage extends Component<Props> {
    props: Props
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            type:'edit',
            selected: {},
            name: '',
            expenseStatus:'',
        }
    }
    componentDidMount(){
        this.props.retrieveExpenses(this.state.name,this.state.expenseStatus);
    }
    handleOk = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log(values);
            if (!err) {
                const dataToSend = {
                    name:values.name,
                    description:values.description,
                    price:parseFloat(values.price)
                }
                if(this.state.type === 'create'){
                    this.props.createExpense(dataToSend, this.state.name);
                }
                if(this.state.type === 'edit'){
                    dataToSend.id =this.state.selected.id;
                    this.props.updateExpense(dataToSend, this.state.name);
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
        this.props.retrieveExpenses(value,this.state.expenseStatus);
    }
    handlePerson =(value) =>{
      //
    }
    onSearchChange = (e) =>{
        this.setState({
            name: e.target.value
        })
        this.handleSearch(e.target.value);
    }
    handleDelete = () =>{
        this.props.deleteExpense(this.state.selected.id, this.state.name)
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
    };


    render() {
        const columns = [{
          title: <div><Icon type="bars" theme="outlined" style={{fontSize:'1.3em'}}/> {lang.title}</div>,
            dataIndex: 'name',
            key: 'name',
        }, {
          title: <div><Icon type="form" theme="outlined" style={{fontSize:'1.3em'}}/> {lang.description}</div>,
            dataIndex: 'description',
            key: 'description',
        }, {
          title: <div><Icon type="dollar" theme="outlined" style={{fontSize:'1.3em'}}/> {lang.amount}</div>,
            dataIndex: 'price',
            key: 'price',
            //sorter: (a,b) => a.price-b.price,
        },{
          title: <div><Icon type="idcard" theme="outlined" style={{fontSize:'1.3em'}}/> {lang.registrar}</div>,
            dataIndex: 'userName',
            key: 'userName',
        },
        {
          title: <div><Icon type="calendar" theme="outlined" style={{fontSize:'1.3em'}}/>{lang.registerDate}</div>,
            dataIndex: 'createDate',
            key: 'createDate',
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
            <div className='header-h'>{lang.expenses}</div>
              <div style={{ display: 'flex' }}>
                <Search
                  style={{ height: '32px', marginRight: '10px' }}
                  placeholder={lang.searchExpense}
                  onSearch={this.handleSearch}
                  onChange={this.onSearchChange}
                />
                <Button onClick={()=>this.handleModalOpen('create')} >{lang.newExpenseEntry}<Icon type='plus' /></Button>

              </div>
            </div>
            <div className='page-body'>

              <Table
                dataSource={this.props.expenses}
                columns={columns}
                rowKey={(record) => record.id+1}
                onRow={(record) => ({
                        onClick: () => {
                          this.setState({selected: record});
                        }
                      })}
                pagination={{
                                showSizeChanger: true, 
                                pageSizeOptions: ["6","8","10","15","20"], 
                                hideOnSinglePage: true,
                                defaultPageSize: 8

                }}
              />

            </div>
                

            <Modal
              title={lang.newExpenseEntry}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              footer={[
                <Button onClick={this.handleCancel}>{lang.close}</Button>,
                <Button onClick={this.handleOk}>
                            {lang.save}
                </Button>
              ]}
            >
              <Form className='stock-form'>
                <FormItem
                  label={lang.title}
                  style={{ display: 'flex' }}
                >
                  {getFieldDecorator('name', {
                        initialValue: type === 'edit' ? selected.name : '',
                        rules: [{
                          required: true, message: lang.typeTitle
                        }],
                      })(
                          <Input/>
                      )}
              </FormItem>

                <div>
                    <FormItem
                      label={lang.description}
                      style={{ display: 'flex' }}
                    >
                      {getFieldDecorator('description', {
                        initialValue: type === 'edit' ? selected.description : '',
                        rules: [{
                          required: false
                        }],
                      })(
                        <Input/>
                      )}
                    </FormItem>
                  <FormItem
                    label={lang.amount}
                    style={{ display: 'flex' }}
                  >
                    {getFieldDecorator('price', {
                      initialValue: type === 'edit' ? selected.price : '',
                      rules: [{
                        required: true, message: lang.typeAmount
                      }],
                    })(
                      <InputNumber min={0} formatter={value => `${value + lang.currency}`} />
                    )}

                  </FormItem>

                </div>

              </Form>
            </Modal>
                
          </div>
        );
    }
}
function mapStateToProps({expenseReducer}) {
    const {expenses} = expenseReducer;
	return {
        expenses
    }
}

const ConnectedPage = connect (mapStateToProps,{retrieveExpenses,createExpense,updateExpense,deleteExpense})(ExpensePage);
const WrappedPage = Form.create()(ConnectedPage);
export { WrappedPage as ExpensePage }
