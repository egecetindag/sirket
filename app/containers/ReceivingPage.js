import React, { Component } from 'react';
type Props = {};
import { Table, Button, Icon, Modal, Form, Input, InputNumber,Popconfirm,Tabs } from 'antd'
const Search = Input.Search;
const FormItem = Form.Item;
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {retrieveReceivings,createReceiving, updateReceiving,deleteReceiving,setReceivingStatus} from '../actions/ReceivingActions'
import moment from 'moment'
class ReceivingPage extends Component<Props> {
    props: Props
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            type:'edit',
            selected: {},
            name: '',
            receivingStatus:''
        }
    }
    componentDidMount(){
        this.props.retrieveReceivings(this.state.name,this.state.receivingStatus);
    }
    handleOk = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const dataToSend = {
                    personId: values.personId,
                    amount: values.amount,
                    expectedDate: values.expectedDate,
                    status: values.status
                }
                if(this.state.type === 'create'){
                    this.props.createReceiving(dataToSend, this.state.name);
                }
                if(this.state.type === 'edit'){
                    dataToSend.id =this.state.selected.id;
                    this.props.updateReceiving(dataToSend, this.state.name);
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

        this.props.setReceivingStatus(idToUpdate,status)

        setTimeout(() => {
          this.setState({
            visible: false
          })
        }, 1000);

    }
    handleSearch =(value) =>{
        this.props.retrieveReceivings(value,this.state.receivingStatus);
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
        this.props.deleteReceiving(this.state.selected.id, this.state.name)
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
              receivingStatus:'',
          });
          this.props.retrieveReceivings('','')
      }else if ( key === '2'){
          this.setState({
            receivingStatus: 'Bekliyor',
          });
          this.props.retrieveReceivings('','Bekliyor')
      }else if ( key === '3'){
          this.setState({
            receivingStatus: 'Gecikmiş',
          });
          this.props.retrieveReceivings('','Gecikmiş')
      }else if ( key === '4'){
          this.setState({
            receivingStatus: 'Bitti',
          });
          this.props.retrieveReceivings('','Bitti')
      }

    };


    render() {
        const columns = [{
            title: 'Müşteri',
            dataIndex: 'personName',
            key: 'personName',
        }, {
            title: 'Telefon',
            dataIndex: 'personPhone',
            key: 'personPhone',
        }, {
            title: 'Miktar',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Son Güncellenme',
            dataIndex: 'updateDate',
            key: 'updateDate',
            render: (text) => <div>{moment.unix(text).format('DD/MM/YYYY')}</div>
        },
        {
            title: 'Ödeme Tarihi',
            dataIndex: 'expectedDate',
            key: 'expectedDate',
            render: (text) => <div>{moment.unix(text).format('DD/MM/YYYY')}</div>
        },
        {
            title: 'Durum',
            dataIndex: 'status',
            key: 'status',

            render: (text) => {

                if (text === 'Bekliyor'){
                  return <div><Icon type='clock-circle-o' /> {text} </div>
                }else if (text === 'Bitti'){
                  return <div><Icon type='check' /> {text} </div>
                }else if (text === 'Gecikmiş'){
                  return <div><Icon type='exclamation-circle-o' /> {text} </div>
                }
            }

        },
        {
            title: 'Duzenle',
            render:() => <Button onClick={()=>this.handleModalOpen('edit')} style={{border:'0', background:'transparent'}}><Icon type="edit" /></Button>
        },
        {
            title: 'Sil',
            render:() =><Popconfirm placement="topLeft" title={'Silmek istediginizden emin misiniz?'} onConfirm={this.handleDelete} okText="Yes" cancelText="No"><Button style={{border:'0', background:'transparent'}}><Icon type="delete" /></Button></Popconfirm>
        },
    
    ]

    const columnsForModal = [{
        title: 'Ürün',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: 'Satış Fiyatı',
        dataIndex: 'salePrice',
        key: 'salePrice',
      },
    ]
        const { getFieldDecorator } = this.props.form;   
        const {selected,type} = this.state ;
        const TabPane = Tabs.TabPane;
        console.log(selected);
        return (
            <div>
                <div className='page-header' >
                    <div className='header-h'>Tahsilatlar</div>
                    <div style={{ display: 'flex' }}>
                        <Search
                            style={{ height: '32px', marginRight: '10px' }}
                            placeholder="Tahsilat Ara"
                            onSearch={this.handleSearch}
                            onChange = {this.onSearchChange}
                        />

                    </div>
                </div>
                <div className='page-body'>

                  <Tabs defaultActiveKey="1" onChange={this.handleTabClick}>
                    <TabPane tab={<span><Icon type="info-circle" />Hepsi</span>} key="1">

                    </TabPane>
                    <TabPane tab={<span><Icon type="clock-circle" />Bekliyor</span>} key="2">

                    </TabPane>
                    <TabPane tab={<span><Icon type="exclamation-circle" />Gecikmiş</span>} key="3">

                    </TabPane>
                    <TabPane tab={<span><Icon type="check-circle" />Alındı</span>} key="4">

                    </TabPane>
                  </Tabs>

                  <Table
                    dataSource={this.props.receivings}
                    columns={columns}
                    rowKey={(record) => {
                      return record.id+1;
                    }}
                    onRow={(record) => {
                      return {
                        onClick: () => {
                          this.setState({selected: record});
                          //this.setState({visible:true});
                        }
                      }
                    }}
                    pagination={{ pageSize: 6 }}

                  />

                </div>
                

                <Modal
                    title= 'Tahsilat Kaydı'
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button onClick={this.handleCancel}>Kapat</Button>,
                        <Button type="primary" onClick={this.handlePaymentOk} icon="check">
                            Ödeme Yapıldı
                        </Button>,
                    ]}
                >
                    <Table
                      dataSource={selected.productList}
                      columns={columnsForModal}
                      rowKey={(record) => {
                        return record.id+1000;
                      }}
                      onRow={(record) => {
                        return {
                          onClick: () => {
                            console.log(record);
                          }
                        }
                      }}
                      pagination={false}
                    />
                </Modal>
                
            </div>
        );
    }
}
function mapStateToProps({receivingReducer}) {
    const {receivings} = receivingReducer;
	return {
        receivings
    }
}

const ConnectedPage = connect (mapStateToProps,{retrieveReceivings,createReceiving,updateReceiving,deleteReceiving,setReceivingStatus})(ReceivingPage);
const WrappedPage = Form.create()(ConnectedPage);
export { WrappedPage as ReceivingPage }
