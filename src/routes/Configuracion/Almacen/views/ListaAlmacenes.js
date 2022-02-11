import React, { useEffect } from 'react';
import { Button, Card, Table, Divider, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import '../styles/ListaAlmacenes.css';
//* Controller
import { getColumnSearchProps, listarAlmacenes } from '../controllers';

export const ListaAlmacenes = ({ data }) => {
  useEffect(() => {
    listarAlmacenes();
  }, [])


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
