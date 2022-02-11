//React Components
import React, { useEffect } from 'react';
import { Button, Card, Table } from 'antd';
import { Link } from 'react-router-dom';

//Estilos
import '../styles/ListaProductos.css';

//Controlador
import { columns, listarProductos } from '../controllers';
import { useSelector } from 'react-redux';

export const ListaProductos = () => {

  const { producto } = useSelector(state => state.producto);

  useEffect(() => {
    listarProductos();
  }, []);

  return (
    <Card
      title={
        <div className='card-title'>
          <div className='card-title-text'>Productos</div>
          <div className='area-button-agregar'>
            <Button className='button-agregar' type="primary">
              <Link to="/configuracion/almacen/agregar">
                Agregar
              </Link>
            </Button>
          </div>
        </div>
      }
    >
      <Table
        className="gx-table-responsive"
        columns={columns}
        dataSource={producto}
        loading={producto.length > 0 ? false : true}
      />
    </Card>
  )
}
