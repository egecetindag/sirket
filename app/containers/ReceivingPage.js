import React, { Component } from 'react';
type Props = {};
import { Table, Button, Icon, Modal, Form, Input, InputNumber,Popconfirm } from 'antd'
const Search = Input.Search;
const FormItem = Form.Item;
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {retrieveReceivings,createReceiving, updateReceiving,deleteReceiving} from '../actions/ReceivingActions'
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
    }

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
        const { getFieldDecorator } = this.props.form;   
        const {selected,type} = this.state ;
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
                        <Button onClick={()=>this.handleModalOpen('create')} >Yeni Kayıt<Icon type='plus' /></Button>

                    </div>
                </div>
                <div className='page-body'>
                    <Table 
                        dataSource={this.props.receivings}
                        columns={columns}
                        rowKey={(record) => {
                          return record.id+1;
                        }}
                        onRow={(record) => {
                            return {
                                onClick: () => this.setState({selected: record})
                            }
                        }}
                        pagination={{ pageSize: 6 }}
                    
                    />
                </div>
                

                <Modal
                    title= {this.state.type === 'edit' ? 'Tahsilat Kaydı Düzenle': 'Yeni Kayıt'}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button onClick={this.handleCancel}>İptal</Button>,
                        <Button type="primary" onClick={this.handleOk}>
                            Kaydet
                        </Button>,
                    ]}
                >
                    <Form className='stock-form'>
                        <FormItem
                            label="Müşteri"
                            style={{ display: 'flex' }}
                        >
                            {getFieldDecorator('personName', {
                                initialValue: type === 'edit' ? selected.personName : this.state.personName,
                                rules: [{
                                    required: false, message: 'Müşteri Seçin!'
                                }],
                            })(
                                <Input onChange={this.handlePerson} />
                            )}
                        </FormItem>
                        <div>
                            {/*<FormItem*/}
                                {/*label="Telefon"*/}
                                {/*style={{ display: 'flex' }}*/}
                            {/*>*/}
                                {/*{getFieldDecorator('name', {*/}
                                    {/*initialValue: type === 'edit' ? selected.name : '',*/}
                                    {/*rules: [{*/}
                                        {/*required: true, message: 'Isim girin!'*/}
                                    {/*}],*/}
                                {/*})(*/}
                                    {/*<Input />*/}
                                {/*)}*/}

                            {/*</FormItem>*/}
                            {/*<FormItem*/}
                                {/*label="Aciklama"*/}
                                {/*style={{ display: 'flex' }}*/}
                            {/*>*/}
                                {/*{getFieldDecorator('description', {*/}
                                    {/*initialValue: type === 'edit' ? selected.description : '',                                    */}
                                    {/*rules: [{*/}
                                        {/*required: false*/}
                                    {/*}],*/}
                                {/*})(*/}
                                    {/*<Input />*/}
                                {/*)}*/}
                            {/*</FormItem>*/}
                            {/*<FormItem*/}
                                {/*label="Kategori"*/}
                                {/*style={{ display: 'flex' }}*/}
                            {/*>*/}
                                {/*{getFieldDecorator('category', {*/}
                                    {/*initialValue: type === 'edit' ? selected.category : '',                                    */}
                                    {/*rules: [{*/}
                                        {/*required: false*/}
                                    {/*}],*/}
                                {/*})(*/}
                                    {/*<Input />*/}
                                {/*)}*/}
                            {/*</FormItem>*/}
                            {/*<FormItem*/}
                                {/*label="Alis Fiyati"*/}
                                {/*style={{ display: 'flex' }}*/}
                            {/*>*/}
                                {/*{getFieldDecorator('purchasePrice', {*/}
                                    {/*initialValue: type === 'edit' ? selected.purchasePrice : '',                                    */}
                                    {/*rules: [{*/}
                                        {/*required: true, message: 'Alis fiyatini girin!'*/}
                                    {/*}],*/}
                                {/*})(*/}
                                    {/*<InputNumber min={0} formatter={value => `${value}₺`} />*/}
                                {/*)}*/}
                            {/*</FormItem>*/}
                            {/*<FormItem*/}
                                {/*label="Satis Fiyati"*/}
                                {/*style={{ display: 'flex' }}*/}
                            {/*>*/}
                                {/*{getFieldDecorator('salePrice', {*/}
                                    {/*initialValue: type === 'edit' ? selected.salePrice : '',                                    */}
                                    {/*rules: [{*/}
                                        {/*required: true, message: 'Satis fiyatini girin!'*/}
                                    {/*}],*/}
                                {/*})(*/}
                                    {/*<InputNumber min={0} formatter={value => `${value}₺`} />*/}
                                {/*)}*/}
                            {/*</FormItem>*/}
                        </div>
                        
                    </Form>
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

const ConnectedPage = connect (mapStateToProps,{retrieveReceivings,createReceiving,updateReceiving,deleteReceiving})(ReceivingPage);
const WrappedPage = Form.create()(ConnectedPage);
export { WrappedPage as ReceivingPage }
