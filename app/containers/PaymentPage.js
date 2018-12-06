import React, { Component } from 'react';
import moment from 'moment'
import { Table, Button, Icon, Modal, Form, Input, InputNumber, Popconfirm, Tabs, Select, DatePicker } from "antd";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {retrievePayments,createPayment, updatePayment,deletePayment,setPaymentStatus} from '../actions/PaymentActions'
import {retrieveDealers} from '../actions/DealerActions';
import { Icons } from "../assets/Icons";
import {lang} from '../services/config';

type Props = {};
const Search = Input.Search;
const FormItem = Form.Item;

// TODO: edit için kişi seçilmemiş geliyor
//       select için düzeltilmesi gereken warning'ler var
//       date formatı düzeltilecek. moment.unix(..).format()  kabul etmedi, format is not a function hatası aldımupdate

class PaymentPage extends Component<Props> {
    props: Props
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            type:'edit',
            selected: {},
            name: '',
            paymentStatus:'',
        }
    }
    componentDidMount(){
        this.props.retrievePayments(this.state.name,this.state.paymentStatus);
        this.props.retrieveDealers('');
    }
    handleOk = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log(values);
            if (!err) {
                const dataToSend = {
                    personId: parseInt(values.personId),
                    amount: parseFloat(values.amount),
                    expectedDate: parseInt(moment(values.expectedDate).format('X')),
                    status: values.status,
                    summary: values.summary
                }
                if(this.state.type === 'create'){
                    this.props.createPayment(dataToSend, this.state.name);
                }
                if(this.state.type === 'edit'){
                    dataToSend.id =this.state.selected.id;
                    this.props.updatePayment(dataToSend, this.state.name);
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
    handlePaymentOk = () => {
        const idToUpdate = this.state.selected.id
        const status = 'Bitti'

        this.props.setPaymentStatus(idToUpdate,status)

        setTimeout(() => {
          this.setState({
            visible: false
          })
        }, 1000);

    }
    handleSearch =(value) =>{
        this.props.retrievePayments(value,this.state.paymentStatus);
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
        this.props.deletePayment(this.state.selected.id, this.state.name)
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

    handleTabClick = (key)=>{

      if (key === '1'){
          this.setState({
              paymentStatus:'',
          });
          this.props.retrievePayments('','')
      }else if ( key === '2'){
          this.setState({
            paymentStatus: 'Bekliyor',
          });
          this.props.retrievePayments('','Bekliyor')
      }else if ( key === '3'){
          this.setState({
            paymentStatus: 'Gecikmiş',
          });
          this.props.retrievePayments('','Gecikmiş')
      }else if ( key === '4'){
          this.setState({
            paymentStatus: 'Bitti',
          });
          this.props.retrievePayments('','Bitti')
      }

    };


    render() {
        const columns = [{
          title: <div><Icon type="user" theme="outlined" style={{fontSize:'1.3em'}}/> {lang.customer}</div>,
            dataIndex: 'personName',
            key: 'personName',
        }, {
          title: <div><Icon type="phone" theme="outlined" style={{fontSize:'1.3em'}}/> {lang.phone}</div>,
            dataIndex: 'personPhone',
            key: 'personPhone',
        }, {
            title: <div><Icon type="dollar" theme="outlined" style={{fontSize:'1.3em'}}/>  {lang.amount}</div>,
            dataIndex: 'amount',
            key: 'amount',
        },
        {
          title: <div><Icon type="file-text" theme="outlined" style={{fontSize:'1.3em'}}/> {lang.summary}</div>,
            dataIndex: 'summary',
            key: 'summary',
        },
        {
          title: <div><Icon type="calendar" theme="outlined" style={{fontSize:'1.3em'}}/> {lang.lastUpdate}</div>,
            dataIndex: 'updateDate',
            key: 'updateDate',
            render: (text) => <div>{moment.unix(text).format('DD/MM/YYYY')}</div>
        },
        {
          title: <div><Icon type="calendar" theme="outlined" style={{fontSize:'1.3em'}}/> {lang.paymentDate}</div>,
            dataIndex: 'expectedDate',
            key: 'expectedDate',
            render: (text) => <div>{moment.unix(text).format('DD/MM/YYYY')}</div>
        },
        {
          title: <div><Icon type="pie-chart" theme="outlined" style={{fontSize:'1.3em'}}/> {lang.status}</div>,
            dataIndex: 'status',
            key: 'status',

            render: (text) => {

                if (text === 'Bekliyor'){
                  return <div><Icon type='clock-circle-o' style={{color:'#6e6e6e'}} /> {lang.pending}</div>
                }else if (text === 'Bitti'){
                  return <div><Icon type='check' style={{color:'#59a856'}}/> {lang.finished}</div>
                }else if (text === 'Gecikmiş'){
                  return <div><Icon type='exclamation-circle-o' style={{color:'#f76255'}} /> {lang.overdue}</div>
                }
            }

        },{
            title: <div><Icon type="idcard" theme="outlined" style={{fontSize:'1.3em'}}/> {lang.registrar}</div>,
            dataIndex: 'userName',
            key: 'userName',
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

    // const columnsForModal = [{
    //     title: 'Ürün',
    //     dataIndex: 'name',
    //     key: 'name',
    //   }, {
    //     title: 'Satış Fiyatı',
    //     dataIndex: 'salePrice',
    //     key: 'salePrice',
    //   },
    // ]
        const { getFieldDecorator } = this.props.form;   
        const {selected,type} = this.state ;
        const TabPane = Tabs.TabPane;
        return (
          <div>
            <div className='page-header' >
              <div className='header-h'>{lang.payments}</div>
              <div style={{ display: 'flex' }}>
                <Search
                  style={{ height: '32px', marginRight: '10px' }}
                  placeholder={lang.searchPayment}
                  onSearch={this.handleSearch}
                  onChange={this.onSearchChange}
                />
                <Button onClick={()=>this.handleModalOpen('create')} >{lang.newPaymentEntry}<Icon type='plus' /></Button>

              </div>
            </div>
            <div className='page-body'>

              <Tabs defaultActiveKey="1" onChange={this.handleTabClick}>
                <TabPane tab={<span><Icon type="info-circle" style={{color:'#108ee9'}} />{lang.all}</span>} key="1" />
                <TabPane tab={<span><Icon type="clock-circle" style={{color:'#6e6e6e'}} />{lang.pending}</span>} key="2" />
                <TabPane tab={<span><Icon type="exclamation-circle" style={{color:'#f76255'}} />{lang.overdue}</span>} key="3" />
                <TabPane tab={<span><Icon type="check-circle" style={{color:'#59a856'}} />{lang.finished}</span>} key="4" />
              </Tabs>

              <Table
                dataSource={this.props.payments}
                columns={columns}
                rowKey={(record) => record.id+1}
                onRow={(record) => ({
                        onClick: () => {
                          this.setState({selected: record});
                          console.log(record)
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
              title={lang.newPaymentEntry}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              footer={[
                <Button onClick={this.handleCancel}>{lang.close}</Button>,
                <Button onClick={this.handleOk}>
                            {lang.save}
                </Button>,
                <Button type="primary" onClick={this.handlePaymentOk} icon="check">
                            {lang.paymentIsDone}
                </Button>
                    ]}
            >
              <Form className='stock-form'>
                <FormItem
                  label={lang.name}
                  style={{ display: 'flex' }}
                >
                  {getFieldDecorator('personId', {
                        initialValue: type === 'edit' ? selected.personName : '',
                        rules: [{
                          required: false, message: lang.choosePerson
                        }],
                      })(
                    <Select placeholder={lang.choosePerson} style={{ width: '200px' }}
                            showSearch
                            filterOption={(input, option) => (option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >{this.props.dealers.map(p => <Option key={p.id}>{p.name}</Option>)}</Select>
                      )}
              </FormItem>

                <div>
                  <FormItem
                    label={lang.amount}
                    style={{ display: 'flex' }}
                  >
                    {getFieldDecorator('amount', {
                      initialValue: type === 'edit' ? selected.amount : '',
                      rules: [{
                        required: true, message: lang.typeAmount
                      }],
                    })(
                      <InputNumber min={0} formatter={value => `${value + lang.currency}`} />
                    )}

                  </FormItem>
                  <FormItem
                    label={lang.summary}
                    style={{ display: 'flex' }}
                  >
                    {getFieldDecorator('summary', {
                      initialValue: type === 'edit' ? selected.summary : '',
                      rules: [{
                        required: false
                      }],
                    })(
                      <Input />
                    )}

                  </FormItem>
                  <FormItem
                    label={lang.paymentDate}
                    style={{ display: 'flex' }}
                  >
                    {getFieldDecorator('expectedDate', {
                      initialValue: type === 'edit' ? moment.unix(selected.expectedDate) : '',
                      rules: [{
                        required: false
                      }],
                    })(
                      <DatePicker placeholder={lang.pickDate} />
                    )}

                  </FormItem>
                  <FormItem
                    label={lang.status}
                    style={{ display: 'flex' }}
                  >
                    {getFieldDecorator('status', {
                      initialValue: type === 'edit' ? selected.status : 'Bekliyor',
                      rules: [{
                        required: false
                      }],
                    })(
                      <Select style={{ width: 120 }}>
                        <Option value="Bekliyor">{lang.pending}</Option>
                        <Option value="Bitti">{lang.finished}</Option>
                        <Option value="Gecikmiş">{lang.overdue}</Option>
                      </Select>
                    )}

                  </FormItem>

                </div>

              </Form>
            </Modal>
                
          </div>
        );
    }
}
function mapStateToProps({paymentReducer,dealerReducer}) {
    const {payments} = paymentReducer;
    const {dealers} = dealerReducer;
	return {
        payments,
        dealers
    }
}

const ConnectedPage = connect (mapStateToProps,{retrievePayments,createPayment,updatePayment,deletePayment,setPaymentStatus,retrieveDealers})(PaymentPage);
const WrappedPage = Form.create()(ConnectedPage);
export { WrappedPage as PaymentPage }
