//React
import React, { createRef, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
//Ant Design
import {
  LeftOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  DeleteOutlined,
  CaretRightOutlined
} from "@ant-design/icons";
import { Form, Input, Button, Card, Col, Row, Collapse, AutoComplete, Select } from "antd";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { onChangeCOD, onSearchCOD, onSelectCOD, onChangeNOM, onSearchNOM, onSelectNOM } from "../controllers";
// import { setClear } from "../../../../appRedux/actions/Maestro/Familia";
//Controllers
// import { guardarFamilia, actualizarFamilia, obtenerFamilia } from "../controllers";




export const Formulario = () => {
  const formRef = createRef();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { nombre } = useSelector(state => state.familia);

  const [valueCOD, setValueCOD] = useState('');
  const [optionsCOD, setOptionsCOD] = useState([]);
  const [valueNOM, setValueNOM] = useState('');
  const [optionsNOM, setOptionsNOM] = useState([]);

  useEffect(() => {
    if (id) {
      // obtenerFamilia(id);
      formRef.current.setFieldsValue({
        id: id,
        nombre: nombre
      });
    }
  }, [id, nombre])

  const genExtra = (remove, name) => (
    <DeleteOutlined
      onClick={() => remove(name)}
      style={{ marginTop: "10px" }}
    />
  )

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
              // onClick={() => dispatch(setClear())}
              >
                <Link to="/logistica/ordenCompra">
                  <LeftOutlined
                    style={{ fontSize: "16px", margin: 0, paddingTop: "5px" }}
                  />
                </Link>
              </Button>
              <h1 style={{ margin: "0 0 0 20px", paddingTop: "3px" }}>
                {id ? "Actualizar" : "Crear"} Orden de Compra
              </h1>
            </div>
            <div>
              <Button
                type="primary"
                style={{ margin: 0 }}
                htmlType="submit"
                onClick={() => {
                  if (id) {
                    // actualizarFamilia(formRef.current);
                  } else {
                    // guardarFamilia(formRef.current);
                  }
                }}
              >
                {id ? "Actualizar" : "Guardar"}
              </Button>
            </div>
          </div>
        }
      >
        <Form
          name="wrap"
          labelCol={{
            flex: "110px",
          }}
          labelAlign="left"
          labelWrap
          wrapperCol={{
            flex: 1,
          }}
          colon={false}
          style={{ padding: "0 50px 0 50px" }}
          ref={formRef}
        >
          <Form.Item
            label="Nombre"
            name="id"
            style={{ display: "none" }}
          >
            <Input
              placeholder="Ingrese el id de la familia"
            />
          </Form.Item>
          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[
              {
                required: true,
                message: "El nombre es requerido",
              },
            ]}
          >
            <Input
              placeholder="Ingrese el nombre de la familia"
            // onChange={(e) => dispatch(setNombre(e.target.value))}
            />
          </Form.Item>
          <Form.Item
            label="DOC. REF."
            name="docRef"
          // rules={[
          //   {
          //     required: true,
          //     message: "El nombre es requerido",
          //   },
          // ]}
          >
            <Input
              placeholder="Ingrese el documento de referencia"
            // onChange={(e) => dispatch(setNombre(e.target.value))}
            />
          </Form.Item>
          <Form.Item
            label="F. DOC. REF."
            name="fDocRef"
          // rules={[
          //   {
          //     required: true,
          //     message: "El nombre es requerido",
          //   },
          // ]}
          >
            <Input
              placeholder="Ingrese la fecha del documento de referencia"
            // onChange={(e) => dispatch(setNombre(e.target.value))}
            />
          </Form.Item>
          <Row style={{ marginBottom: "10px" }}>
            <Col xs={3} style={{ padding: "0" }}>
              Producto
            </Col>
            <Col xs={9} style={{ padding: "0" }}>
              Descripción
            </Col>
            <Col xs={3} style={{ padding: "0 0 0 15px" }}>
              Lote Nº
            </Col>
            <Col xs={3} style={{ padding: "0 0 0 15px" }}>
              Ubicación
            </Col>
            <Col xs={3} style={{ padding: "0 0 0 5px" }}>
              Cant.
            </Col>
            <Col xs={2} style={{ padding: "0" }}>
              U/M
            </Col>
          </Row>
          <Form.List name="atributos" style={{ margin: 0, padding: 0 }}>
            {(fields, { add, remove }) => (
              <>
                <Collapse
                  defaultActiveKey={['0']}
                  style={{ margin: 0, padding: 0, width: "100%" }}
                  collapsible="disabled"
                  ghost
                >
                  {fields.map(({ key, name, ...restField }) => (
                    <Collapse.Panel
                      key={key}
                      header={
                        <Row
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            margin: "0 20px 0 20px",
                            padding: "0",
                            alignItems: "start",
                          }}
                        >
                          <Col xs={3} style={{ padding: "0 5px 0 5px" }}>
                            <Form.Item
                              {...restField}
                              name={[name, "codProducto"]}
                              // rules={[{ required: true, message: 'Missing first name' }]}
                              style={{ margin: 0, width: "auto" }}
                            >
                              {/* <Input placeholder="Código de Producto" style={{ margin: 0 }} /> */}
                              <AutoComplete
                                value={valueCOD}
                                options={optionsCOD}
                                onSearch={onSearchCOD}
                                onSelect={onSelectCOD}
                                onChange={onChangeCOD}
                                style={{ width: '100%' }}
                                placeholder="Código de Producto"
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={10} style={{ padding: "0 5px 0 5px" }}>
                            <Form.Item
                              {...restField}
                              name={[name, "desProducto"]}
                              // rules={[{ required: true, message: 'Missing first name' }]}
                              style={{ margin: 0, width: "auto" }}
                            >
                              {/* <Input placeholder="Descripción del producto" style={{ margin: 0 }} /> */}
                              <AutoComplete
                                value={valueNOM}
                                options={optionsNOM}
                                onSearch={onSearchNOM}
                                onSelect={onSelectNOM}
                                onChange={onChangeNOM}
                                style={{ width: '100%' }}
                                placeholder="Descripción del producto"
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={3} style={{ padding: "0 5px 0 5px" }}>
                            <Form.Item
                              {...restField}
                              name={[name, "loteProducto"]}
                              // rules={[{ required: true, message: 'Missing first name' }]}
                              style={{ margin: 0, width: "auto" }}
                            >
                              <Input placeholder="Número de Lote" style={{ margin: 0 }} />
                            </Form.Item>
                          </Col>
                          <Col xs={3} style={{ padding: "0 5px 0 5px" }}>
                            <Form.Item
                              {...restField}
                              name={[name, "ubiProducto"]}
                              // rules={[{ required: true, message: 'Missing first name' }]}
                              style={{ margin: 0, width: "auto" }}
                            >
                              <Input placeholder="Ubicación" style={{ margin: 0 }} />
                            </Form.Item>
                          </Col>
                          <Col xs={3} style={{ padding: "0 5px 0 5px" }}>
                            <Form.Item
                              {...restField}
                              name={[name, "cantProducto"]}
                              // rules={[{ required: true, message: 'Missing first name' }]}
                              style={{ margin: 0, width: "auto" }}
                            >
                              <Input type="number" placeholder="Cantidad" style={{ margin: 0 }} />
                            </Form.Item>
                          </Col>
                          <Col xs={2} style={{ padding: "0 5px 0 5px" }}>
                            <Form.Item
                              {...restField}
                              name={[name, "unidadProducto"]}
                              // rules={[{ required: true, message: 'Missing first name' }]}
                              style={{ margin: 0, width: "auto" }}
                            >
                              {/* <Input placeholder="U/M" style={{ margin: 0 }} /> */}
                              <Select
                                style={{ width: '100% ', margin: '0' }}
                                showSearch
                                placeholder="U/M"
                                optionFilterProp="children"
                                // onChange={onChangeHabitación}
                                onSearch={() => { }}
                                filterOption={(input, option) =>
                                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                              >
                                <Select.Option value={"a"}>a</Select.Option>
                                <Select.Option value={"a"}>a</Select.Option>
                              </Select>
                            </Form.Item>
                          </Col>
                        </Row>
                      }
                      extra={genExtra(remove, name)}
                      style={{ margin: 0, padding: 0, width: "100%" }}
                      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                    >
                      <Row style={{ margin: '0 0 0 20%' }}>
                        <Col xs={10}>
                          Atributo
                        </Col>
                        <Col xs={10}>
                          Opcion
                        </Col>
                        <Col xs={4}>
                          Imagen
                        </Col>
                      </Row>
                      <div
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        {fields.map(({ key, name, ...restField }) => (
                          <Row style={{ margin: '10px 0 10px 20%', display: 'flex', alignItems: "center" }}>
                            <Col xs={10}>
                              {name}
                            </Col>
                            <Col xs={10}>
                              <Form.Item
                                {...restField}
                                name={[name, "nombre"]}
                                // rules={[{ required: true, message: 'Missing first name' }]}
                                style={{ margin: 0, width: "100%" }}
                              >
                                <Select
                                  style={{ width: '100% ', margin: '0' }}
                                  showSearch
                                  placeholder="Opcion"
                                  optionFilterProp="children"
                                  // onChange={onChangeHabitación}
                                  onSearch={() => { }}
                                  filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                  }
                                >
                                  <Select.Option value={"a"}>a</Select.Option>
                                  <Select.Option value={"a"}>a</Select.Option>
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col xs={4} style={{ display: 'flex', gap: '10px' }}>
                              Icon
                              {/* <MinusCircleOutlined
                                onClick={() => remove(name)}
                              /> */}
                            </Col>
                          </Row>
                        ))}
                        {/* <Form.Item style={{ margin: '10px 0 10px 20%' }}>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                            style={{ margin: 0 }}
                          >
                            Agregar Opciones
                          </Button>
                        </Form.Item> */}
                      </div>
                    </Collapse.Panel>
                  ))}
                </Collapse>
                <Form.Item style={{ marginTop: "20px" }}>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                    style={{ margin: 0 }}
                  >
                    Agregar Producto
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Card>
    </>
  );
};
