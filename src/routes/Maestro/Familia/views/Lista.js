//React Components
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//Redux
import { useSelector } from 'react-redux';
//Ant Design
import { Button, Card, Table } from 'antd';
//Estilos
import '../styles/ListaFamilias.css';
//Controlador
import { columns, listarFamilias } from '../controllers';

export const Lista = () => {

  const { familia, cargando } = useSelector(state => state.familia);

  useEffect(() => {
    listarFamilias();
  }, []);

  return (
    <Card
      title={
        <div className='card-title'>
          <div className='card-title-text'>Familias</div>
          <div className='area-button-agregar'>
            <Button className='button-agregar' type="primary">
              <Link to="/maestro/familia/agregar">
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
        dataSource={familia}
        loading={cargando}
      />
    </Card>
  )
}
