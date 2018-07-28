import React, { Component } from 'react';
type Props = {};
import { Table, Button, Icon, Modal, Form, Input, InputNumber } from 'antd'
const Search = Input.Search;

import { Link } from 'react-router-dom';

class ProductPage extends Component<Props> {
    props: Props


    render() {
        return (
            <div>
                <div className='page-header' >
                    <div className='header-h'>Urunler</div>
                    <div style={{ display: 'flex' }}>
                        <Search
                            style={{ height: '32px', marginRight: '10px' }}
                            placeholder="Urun Ara"
                            onSearch={this.handleSearch}
                        />
                        <Button onClick={this.handleModalOpen} >Yeni Urun Girisi<Icon type='plus' /></Button>

                    </div>
                </div>
            </div>
        );
    }
}

export { ProductPage }