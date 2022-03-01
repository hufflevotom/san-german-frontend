//React Components
import React, { useEffect, useState } from 'react';
import { Button, Card, Table } from 'antd';
import { Link } from 'react-router-dom';

//Estilos
import '../styles/ListaProductos.css';

//Controlador
import { columns, listarProductos } from '../controllers';
import { useSelector } from 'react-redux';

export const ListaProductos = () => {

  const [pageOffset, setPageOffset] = useState(0);
  const { producto } = useSelector(state => state.producto);

  const onChangePage = (e) => {
    const { current, pageSize } = e;
    const offset = current * pageSize - pageSize;
    setPageOffset(offset);
  }

  useEffect(() => {
    listarProductos(pageOffset);
  }, [pageOffset]);



  return (
    <Card
      title={
        <div className='card-title'>
          <div className='card-title-text'>Productos</div>
          <div className='area-button-agregar'>
            <Button className='button-agregar' type="primary">
              <Link to="/maestro/producto/agregar">
                Agregar
              </Link>
            </Button>
          </div>
        </div>
      }
    >
      <Table
        pagination={{ pageSize: 10, total: producto[1] }}
        onChange={(e) => onChangePage(e)}
        className="gx-table-responsive"
        columns={columns}
        dataSource={producto[0]}
        loading={producto[0]?.length > 0 ? false : true}
      />
    </Card>
  )
}
