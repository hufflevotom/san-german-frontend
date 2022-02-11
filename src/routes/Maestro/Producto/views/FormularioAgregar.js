import React, { useEffect } from 'react';
import { Form, Input, Button, Card, Select } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAlmacenId, setClear, setCodigo, setDescripcion } from '../../../../appRedux/actions/Configuracion/Producto';
import { listarAlmacenes } from '../../../Configuracion/Almacen/controllers';

export const FormularioAgregar = () => {

  const dispatch = useDispatch();
  const { almacen } = useSelector(state => state.almacen);

  useEffect(() => {
    listarAlmacenes();
  }, [])

  return (
    <>
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Button
                type='link'
                style={{ margin: 0, padding: 0 }}
                onClick={() => dispatch(setClear())}
              >
                <Link to="/maestro/producto">
                  <LeftOutlined style={{ fontSize: '16px', margin: 0, paddingTop: '5px' }} />
                </Link>
              </Button>
              <h1
                style={{ margin: '0 0 0 20px', paddingTop: '3px' }}
              >
                Agregar Producto
              </h1>
            </div>
            <div>
              <Button
                type="primary"
                style={{ margin: 0 }}
                htmlType="submit"
              >
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
          style={{ padding: '0 50px 0 50px' }}
        >
          <Form.Item
            label="Código"
            name="codigo"
            rules={[
              {
                required: true,
                message: 'El codigo es requerido',
              },
            ]}
          >
            <Input
              placeholder="Ingrese el código del producto"
              onChange={(e) => dispatch(setCodigo(e.target.value))}
            />
          </Form.Item>
          <Form.Item
            label="Descripción"
            name="descripcion"
            rules={[
              {
                required: true,
                message: 'La descripcion es requerida',
              },
            ]}
          >
            <Input
              placeholder="Ingrese la descripción del producto"
              onChange={(e) => dispatch(setDescripcion(e.target.value))}
            />
          </Form.Item>
          <Form.Item
            label="Almacén"
            name="almacenId"
            rules={[
              {
                required: true,
                message: 'El almacén es requerido',
              },
            ]}
          >
            <Select
              placeholder="Seleccione el almacén"
              onChange={(e) => dispatch(setAlmacenId(e))}
            >
              {
                almacen ?
                  almacen.map(element => {
                    return (
                      <Select.Option
                        key={element._id}
                        value={element._id}
                      >
                        {element.nombre}
                      </Select.Option>
                    );
                  }) : null
              }
            </Select>
          </Form.Item>
          <Form.Item
            label="Atributos"
            name="atributosId"
            rules={[
              {
                required: true,
                message: 'El almacén es requerido',
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Seleccione los atributos"
            >

            </Select>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}
