import React, { createRef, useEffect } from 'react';
import { Form, Input, Button, Card, Select, Space } from 'antd';
import { LeftOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAlmacenId, setClear, setCodigo, setDescripcion } from '../../../../appRedux/actions/Maestro/Producto';
import { listarAlmacenes } from '../../../Configuracion/Almacen/controllers';

export const FormularioAgregar = () => {

  const formRef = createRef();
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
                onClick={() => console.log(formRef.current.getFieldsValue())}
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
          ref={formRef}
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
          <Form.List name="atributos">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div style={{ display: 'flex', flexDirection: 'row', margin: '0 20px 20px 0', gap: '20px', alignItems: 'start' }}>
                    <Form.Item
                      {...restField}
                      name={[name, 'nombre']}
                      rules={[{ required: true, message: 'Missing first name' }]}
                      style={{ margin: 0, width: 'auto' }}
                    >
                      <Input placeholder="Atributo" style={{ margin: 0 }} />
                    </Form.Item>
                    {/* Opciones */}
                    <Form.List name={'opciones' + key} style={{ margin: 0, width: '100%' }}>
                      {(fields, { add, remove }) => (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          {fields.map(({ key, name, ...restField }) => (
                            <div style={{ display: 'flex', flexDirection: 'row', margin: '0 20px 10px 0', gap: '20px', alignItems: 'center' }}>
                              <Form.Item
                                {...restField}
                                name={[name, 'nombre']}
                                rules={[{ required: true, message: 'Missing first name' }]}
                                style={{ margin: 0, width: '100%' }}
                              >
                                <Input placeholder="Opciones" style={{ margin: 0 }} />
                              </Form.Item>
                              <Form.Item
                                {...restField}
                                name={[name, 'img']}
                                rules={[{ required: true, message: 'Missing first name' }]}
                                style={{ margin: 0, width: '100%' }}
                              >
                                <Input placeholder="Imagen" style={{ margin: 0 }} />
                              </Form.Item>
                              {/* Opciones */}
                              {/* TODO: Cambiar icono a trash */}
                              <MinusCircleOutlined onClick={() => remove(name)} />
                            </div>
                          ))}
                          <Form.Item style={{ margin: 0 }}>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{ margin: 0 }}>
                              Agregar Opciones
                            </Button>
                          </Form.Item>
                        </div>
                      )}
                    </Form.List>
                    {/* TODO: Cambiar icono a trash */}
                    <MinusCircleOutlined onClick={() => remove(name)} style={{ marginTop: '10px' }} />
                  </div>
                ))}
                <Form.Item style={{ marginTop: '20px' }}>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{ margin: 0 }}>
                    Agregar Atributo
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Card >
    </>
  )
}
