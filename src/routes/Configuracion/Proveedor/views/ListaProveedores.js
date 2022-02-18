//React Components
import React, { useEffect, useState } from 'react';
import { Button, Card, Table } from 'antd';
import { Link } from 'react-router-dom';
//Estilos
import '../styles/ListaProveedores.css';
//Controlador
import { columns, listarProveedores } from '../controllers';
import { useSelector } from 'react-redux';

export const ListaProveedores = () => {
  const [pageOffset, setPageOffset] = useState(0);
  const { proveedor } = useSelector(state => state.proveedor);

  const onChangePage = (e) => {
    const { current, pageSize } = e;
    const offset = current * pageSize - pageSize;
    setPageOffset(offset);
  }

  useEffect(() => {
    listarProveedores(pageOffset);
  }, [pageOffset]);

  return (
    <Card
      title={
        <div className='card-title'>
          <div className='card-title-text'>Proveedores</div>
          <div className='area-button-agregar'>
            <Button className='button-agregar' type="primary">
              <Link to="/configuracion/proveedor/agregar">
                Agregar
              </Link>
            </Button>
          </div>
        </div>
      }
    >
      <Table
        pagination={{ pageSize: 10, total: proveedor }}
        onChange={(e) => onChangePage(e)}
        className="gx-table-responsive"
        columns={columns}
        dataSource={proveedor}
      //loading={proveedor.length > 0 ? false : true}
      />
    </Card>
  )
}
