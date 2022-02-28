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
import { onChangeCOD, onSelectCOD, onChangeNOM, onSearchNOM } from "../controllers";
// import { setClear } from "../../../../appRedux/actions/Maestro/Familia";
//Controllers
// import { guardarFamilia, actualizarFamilia, obtenerFamilia } from "../controllers";

export const Productos = ({opciones}) => {

  const formRef = createRef();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [valueCOD, setValueCOD] = useState('');
  const [opcionSeleccionada, setOpcionSeleccionada] = useState([]);
  const [valueNOM, setValueNOM] = useState('');
  const [optionsNOM, setOptionsNOM] = useState([]);

  const genExtra = (remove, name) => (
    <DeleteOutlined
      onClick={() => remove(name)}
      style={{ marginTop: "10px" }}
    />
  )


  const onSelectNOM = (data, name) => {
    const atributos = formRef.current.getFieldValue('atributos');
    console.log(atributos);
    opciones.forEach(element => {
      if (element.key === data) {
        atributos[name[0]].desProducto = element.descripcion;
        // atributos[name[0]].desProducto = `${element.descripcion + ' ' + 'element.ape_pat_cli' + ' ' + 'element.ape_mat_cli'}`;
        formRef.current.setFieldsValue({ atributos: atributos })
        setOpcionSeleccionada(...opcionSeleccionada,);
        // setValueNOM(data);
      }
    });
  };

  return (
    <Form.List name="atributos" style={{ margin: 0, padding: 0 }}>
      {(fields, { add, remove }) => (
        <>
          <Collapse
            defaultActiveKey={['0']}
            style={{ margin: 0, padding: 0, width: "100%" }}
            // collapsible="disabled"
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
                      width: "100%"
                    }}
                  >
                    {/* <Col xs={3} style={{ padding: "0 5px 0 5px" }}>
                            <Form.Item
                              {...restField}
                              name={[name, "codProducto"]}
                              // rules={[{ required: true, message: 'Missing first name' }]}
                              style={{ margin: 0, width: "100%" }}
                            >
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
                          </Col> */}
                    <Col xs={13} style={{ padding: "0 5px 0 5px" }}>
                      <Form.Item
                        {...restField}
                        name={[name, "desProducto"]}
                        // rules={[{ required: true, message: 'Missing first name' }]}
                        style={{ margin: 0, width: "100%" }}
                      >
                        {/* <Input placeholder="Descripción del producto" style={{ margin: 0 }} /> */}
                        <AutoComplete
                          // value={valueNOM}
                          options={opciones}
                          onSearch={onSearchNOM}
                          onSelect={(e) => onSelectNOM(e, [name, "desProducto"])}
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
                  {
                    opcionSeleccionada.map(({ key, name, ...restField }) => (
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
                    ))
                  }
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

  );
};
