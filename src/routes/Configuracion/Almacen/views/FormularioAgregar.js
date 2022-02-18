import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setClear, setNombre, setUbicacion } from '../../../../appRedux/actions/Configuracion/Almacen';
import { guardarAlmacen } from '../controllers';
import { LeftOutlined } from '@ant-design/icons';

export const FormularioAgregarAlmacen = () => {

  const almacen = useSelector(store => store.almacen);
  const dispatch = useDispatch();

  return (
    <>
      <Card
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Button
                type="link"
                style={{ margin: 0, padding: 0 }}
                onClick={() => dispatch(setClear())}
              >
                <Link to="/configuracion/almacen">
                  <LeftOutlined
                    style={{ fontSize: "16px", margin: 0, paddingTop: "5px" }}
                  />
                </Link>
              </Button>
              <h1 style={{ margin: "0 0 0 20px", paddingTop: "3px" }}>
                Agregar Almacen
              </h1>
            </div>
            <div>
              <Button
                style={{ margin: 0 }}
                loading={almacen.cargando}
                disabled={
                  almacen.nombre === '' || almacen.ubicacion === ''
                    ? true
                    : false
                }
                type="primary"
                htmlType="submit"
                onClick={() => guardarAlmacen()}>
                Guardar
              </Button>
            </div>
          </div>
        }
      >
        <Form
          name="wrap"
          labelCol={{
            flex: '110px',
          }}
          labelAlign="left"
          labelWrap
          wrapperCol={{
            flex: 1,
          }}
          colon={false}
          style={{ padding: "0 50px 0 50px" }}
        >
          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[
              {
                required: true,
                message: 'El nombre es requerido',

              },
            ]}
          >
            <Input onChange={(e) => dispatch(setNombre(e.target.value))} />
          </Form.Item>

          <Form.Item
            label="Ubicación"
            name="ubicacion"
            rules={[
              {
                required: true,
                message: 'La ubicación es requerido',
              },
            ]}
          >
            <Input onChange={(e) => dispatch(setUbicacion(e.target.value))} />
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}
