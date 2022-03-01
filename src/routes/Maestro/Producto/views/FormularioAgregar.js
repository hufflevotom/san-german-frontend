import React, { createRef, useEffect } from 'react';
import { Form, Input, Button, Card, Select, Image } from 'antd';
import {
  LeftOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setClear } from '../../../../appRedux/actions/Maestro/Producto';
import { listarAlmacenes } from '../../../Configuracion/Almacen/controllers';
import { listarFamilias } from '../../Familia/controllers';
import { editarProducto, guardarProducto, obtenerProducto } from '../controllers';
import { URL_BASE_LOCAL } from '../../../../constants/Config';
import noImage from '../../../../assets/img/no-image.png';
import { ImageDemo } from '../../../../util/Utils';

export const FormularioAgregar = () => {
  const formRef = createRef();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { almacen } = useSelector(state => state.almacen);
  const { familia } = useSelector(state => state.familia);

  const { codigo, descripcion, almacenId, atributosId, familiaId } = useSelector(state => state.producto);

  useEffect(() => {
    listarAlmacenes();
    listarFamilias();
  }, []);

  useEffect(() => {
    if (id) {
      obtenerProducto(id);
    }
  }, [id]);

  useEffect(() => {
    formRef.current.setFieldsValue({
      id: id,
      codigo: codigo,
      descripcion: descripcion,
      almacenId: almacenId,
      atributos: atributosId,
      familiaId: familiaId,
    });
  }, [id, codigo, descripcion, almacenId, atributosId, familiaId]);

  const getFile = e => {
    console.log('Upload event:', e.target.files[0]);
    return e.target.files[0];
  };

  // function ImageDemo(url) {

  //   if (url) {
  //     return (
  //       <Button type="link"
  //         style={{ margin: 0, padding: 0 }}>
  //         <Image
  //           width={40}
  //           height={30}
  //           src={URL_BASE_LOCAL + '/' + url}

  //         />
  //       </Button>
  //     );
  //   } else {
  //     return (
  //       <Button type="link"
  //         style={{ margin: 0, padding: 0 }}>
  //         <Image
  //           width={40}
  //           height={30}
  //           src="error"
  //           fallback={noImage}
  //         />
  //       </Button>
  //     );
  //   }

  // }

  return (
    <>
      <Card
        title={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Button
                type="link"
                style={{ margin: 0, padding: 0 }}
                onClick={() => dispatch(setClear())}
              >
                <Link to="/maestro/producto">
                  <LeftOutlined style={{ fontSize: '16px', margin: 0, paddingTop: '5px' }} />
                </Link>
              </Button>
              <h1 style={{ margin: '0 0 0 20px', paddingTop: '3px' }}>
                {id ? 'Actualizar' : 'Crear'} Producto
              </h1>
            </div>
            <div>
              <Button
                type="primary"
                style={{ margin: 0 }}
                htmlType="submit"
                onClick={() => {
                  if (id) {
                    editarProducto(formRef.current);
                  } else {
                    guardarProducto(formRef.current);
                  }
                }}
              >
                {id ? 'Actualizar' : 'Guardar'}
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
          <Form.Item label="Id" name="id" style={{ display: 'none' }}>
            <Input placeholder="Ingrese el id del producto" />
          </Form.Item>
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
            <Input placeholder="Ingrese el código del producto" />
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
            <Input placeholder="Ingrese la descripción del producto" />
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
            <Select placeholder="Seleccione el almacén">
              {almacen
                ? almacen.map(element => {
                  return (
                    <Select.Option key={element._id} value={element._id}>
                      {element.nombre}
                    </Select.Option>
                  );
                })
                : null}
            </Select>
          </Form.Item>
          <Form.Item
            label="Familia"
            name="familiaId"
            rules={[
              {
                required: true,
                message: 'La familia es requerida',
              },
            ]}
          >
            <Select
              placeholder="Seleccione la familia"
            //onChange={(e) => dispatch(setAlmacenId(e))}
            >
              {familia
                ? familia.map(element => {
                  return (
                    <Select.Option key={element._id} value={element._id}>
                      {element.nombre}
                    </Select.Option>
                  );
                })
                : null}
            </Select>
          </Form.Item>

          <Form.List name="atributos">
            {(fieldsPadre, { add, remove }) => {
              return (
                <>
                  {fieldsPadre.map(({ key: keyPadre, name: namePadre, ...restField }) => (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        margin: '0 20px 20px 0',
                        gap: '20px',
                        alignItems: 'start',
                      }}
                    >
                      <Form.Item
                        {...restField}
                        name={[namePadre, 'nombre']}
                        style={{ margin: 0, width: 'auto' }}
                      >
                        <Input placeholder="Atributo" style={{ margin: 0 }} />
                      </Form.Item>

                      <Form.List
                        name={[namePadre, 'opciones']}
                        style={{ margin: 0, width: '100%' }}
                      >
                        {(fieldsHijo, { add, remove }) => (
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {fieldsHijo.map(({ key: keyHijo, name: nameHijo, ...restField }) => {

                              var img;
                              if (atributosId[keyPadre]) {
                                const atributos = atributosId[keyPadre].opciones[keyHijo];

                                if (atributos?.imagenUrl) {
                                  img = atributosId[keyPadre].opciones[keyHijo].imagenUrl;
                                }
                              }

                              return (
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    margin: '0 20px 10px 0',
                                    gap: '20px',
                                    alignItems: 'center',
                                  }}
                                >
                                  <Form.Item
                                    {...restField}
                                    name={[nameHijo, 'nombre']}
                                    style={{ margin: 0, width: '100%' }}
                                  >
                                    <Input placeholder="Opciones" style={{ margin: 0 }} />
                                  </Form.Item>
                                  {
                                    id &&
                                    <div>
                                      {ImageDemo(img)}
                                    </div>
                                  }

                                  <Form.Item
                                    {...restField}
                                    name={[nameHijo, 'imagenUrl']}
                                    style={{ margin: 0, width: 'auto' }}
                                  >
                                  </Form.Item>

                                  <Form.Item
                                    getValueFromEvent={getFile}
                                    valuePropName="file"
                                    {...restField}
                                    name={[nameHijo, 'imagenUrl']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Missing first name',
                                      },
                                    ]}
                                    style={{ margin: 0, width: '100%' }}
                                  >
                                    <Input type="file" accept=".jpg,.jpeg,.png" />
                                  </Form.Item>
                                  <MinusCircleOutlined onClick={() => remove(nameHijo)} />
                                </div>
                              );
                            })}

                            <Form.Item style={{ margin: 0 }}>
                              <Button
                                type="dashed"
                                onClick={() => add()}
                                block
                                icon={<PlusOutlined />}
                                style={{ margin: 0 }}
                              >
                                Agregar Opciones
                              </Button>
                            </Form.Item>
                          </div>
                        )}
                      </Form.List>
                      <DeleteOutlined
                        onClick={() => remove(namePadre)}
                        style={{ marginTop: '10px' }}
                      />
                    </div>
                  ))}

                  <Form.Item style={{ marginTop: '20px' }}>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                      style={{ margin: 0 }}
                    >
                      Agregar Atributo
                    </Button>
                  </Form.Item>
                </>
              );
            }}
          </Form.List>
        </Form>
      </Card>

    </>
  );
};
