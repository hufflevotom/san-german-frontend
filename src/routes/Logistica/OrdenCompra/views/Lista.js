//React Components
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
//Redux
import { useSelector } from 'react-redux';
//Ant Design
import { Button, Card, Table } from 'antd';
//Estilos
import '../styles/Lista.css';
//Controlador
import { columns, listarOrdenesCompra } from '../controllers';

export const Lista = () => {

  const { ordenCompra, cargando } = useSelector(state => state.ordenCompra);

  useEffect(() => {
    listarOrdenesCompra();
  }, []);

  return (
    <Card
      title={
        <div className='card-title'>
          <div className='card-title-text'>Órdenes de Compra</div>
          <div className='area-button-agregar'>
            <Button className='button-agregar' type="primary">
              <Link to="/logistica/ordenCompra/agregar">
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
        dataSource={ordenCompra}
        loading={cargando}
      />
    </Card>
  )
}
