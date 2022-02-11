import React from 'react';
import { Button, Card, Table, Divider, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import '../styles/ListaAlmacenes.css';

export const ListaAlmacenes = ({ data }) => {

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Buscar ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Buscar
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reiniciar
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => confirm();
    const handleReset = clearFilters => clearFilters();
    const columns = [
        {
            title: 'Código',
            dataIndex: 'cod_med',
            key: 'cod_med',
            ...getColumnSearchProps('cod_med'),
        },
        {
            title: 'Nombre',
            dataIndex: 'fecha_firma',
            key: 'fecha_firma',
            ...getColumnSearchProps('fecha_firma'),
        },
        {
            title: '',
            dataIndex: 'a',
            // width: 80,
            render: (text, record) => (
                <span>
                    <span className="gx-link">
                        <i
                            className="icon icon-edit"
                            style={{ fontSize: 16, color: 'orange' }}
                            onClick={() => {
                                //TODO: EDITAR
                            }}
                        />
                    </span>
                    <Divider type="vertical" />
                    <span className="gx-link">
                        <i
                            className="icon icon-trash"
                            style={{ fontSize: 17, color: "red" }}
                            onClick={() => {
                                //TODO: ELIMINAR
                            }}
                        />
                    </span>
                </span >
            ),
        }
    ];

    return (
        <Card
            title={
                <div className='card-title'>
                    <div className='card-title-text'>
                        Almacenes
                    </div>
                    <div className='area-button-agregar'>
                        <Button className='button-agregar'
                            onClick={() => {
                                //TODO: Agregar
                            }}
                            type="primary">
                            Agregar
                        </Button>
                    </div>
                </div>
            }
        >
            <Table
                className="gx-table-responsive"
                columns={columns}
                dataSource={data}
                loading={data === undefined}
            />
        </Card>
    )
}
