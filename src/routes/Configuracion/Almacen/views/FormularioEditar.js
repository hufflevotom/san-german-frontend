import React, { useEffect, useRef } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setClear, setNombre, setUbicacion, setCodigo } from '../../../../appRedux/actions/Configuracion/Almacen';
import { editarAlmacen, obtenerUnAlmacen } from '../controllers';
import { useSelector } from 'react-redux';
import { LeftOutlined } from '@ant-design/icons';

export const FormularioEditarAlmacen = (props) => {

  const { match: { params } } = props;

  const almacen = useSelector(state => state.almacen);
  const dispatch = useDispatch();
  const formRef = useRef();

  useEffect(() => {
    obtenerUnAlmacen(params.id);
  }, [params.id]);

  useEffect(() => {
    formRef.current.setFieldsValue({ nombre: almacen.nombre, ubicacion: almacen.ubicacion, codigo: almacen.codigo });
  }, [almacen])



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
                Editar Almacen
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
                onClick={() => editarAlmacen(params.id)}>
                Actualizar
              </Button>
            </div>
          </div>
        }
      >
        <Form
          ref={formRef}
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
            label="Código"
            name="codigo"
            rules={[
              {
                required: true,
                message: 'El código es requerido',

              },
            ]}
          >
            <Input onChange={(e) => dispatch(setCodigo(e.target.value))} />
          </Form.Item>

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
