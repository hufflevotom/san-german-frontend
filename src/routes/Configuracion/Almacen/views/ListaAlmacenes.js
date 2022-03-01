//React Components
import React, { useEffect, useState } from 'react';
import { Button, Card, Table } from 'antd';
import { Link } from 'react-router-dom';

//Estilos
import '../styles/ListaAlmacenes.css';

//Controlador
import { columns, listarAlmacenes } from '../controllers';
import { useSelector } from 'react-redux';

export const ListaAlmacenes = () => {

  const { almacen } = useSelector(state => state.almacen);



  useEffect(() => {
    listarAlmacenes();
  }, []);

  return (
    <Card
      title={
        <div className='card-title'>
          <div className='card-title-text'>Almacenes</div>
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
        key={almacen._id}
        className="gx-table-responsive"
        columns={columns}
        dataSource={almacen}
        loading={almacen.length > 0 ? false : true}
      />
    </Card>
  )
}
