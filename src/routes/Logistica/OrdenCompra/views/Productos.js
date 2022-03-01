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
import { onChangeCOD, onChangeNOM, onSearchNOM } from "../controllers";
// import { setClear } from "../../../../appRedux/actions/Maestro/Familia";
//Controllers
// import { guardarFamilia, actualizarFamilia, obtenerFamilia } from "../controllers";

export const Productos = ({ opciones, onSelectNOM, onSelectCOD, value }) => {

  const dispatch = useDispatch();

  // const [valueCOD, setValueCOD] = useState('');
  // const [valueNOM, setValueNOM] = useState('');
  // const [optionsNOM, setOptionsNOM] = useState([]);

  // const onSelectNOM = (data, name) => {
  //   const atributos = formRef.current.getFieldValue('atributos');
  //   console.log(atributos);
  //   opciones.forEach(element => {
  //     if (element.key === data) {
  //       atributos[name[0]].desProducto = element.descripcion;
  //       // atributos[name[0]].desProducto = `${element.descripcion + ' ' + 'element.ape_pat_cli' + ' ' + 'element.ape_mat_cli'}`;
  //       formRef.current.setFieldsValue({ atributos: atributos })
  //       setValueNOM({ atributos: atributos });
  //     }
  //   });
  // };

  return (
    <Form.List name="atributos" style={{ margin: 0, padding: 0 }}>
      {(fields, { add, remove }) => (
        <>
          {
            fields.map(({ key, name, ...restField }) => (
              <Row
                style={{
                  display: "flex",
                  flexDirection: "row",
                  margin: "0 0 10px 0",
                  padding: "0",
                  alignItems: "start",
                  width: "100%"
                }}
              >
                <Col xs={3} style={{ padding: "0 5px 0 5px" }}>
                  <Form.Item
                    {...restField}
                    name={[name, "codProducto"]}
                    // rules={[{ required: true, message: 'Missing first name' }]}
                    style={{ margin: 0, width: "100%" }}
                  >
                    <AutoComplete
                      // value={valueCOD}
                      options={opciones}
                      onSearch={onSearchNOM}
                      // onSelect={(e) => onSelectCOD(e, [name, "desProducto"])}
                      onChange={onChangeCOD}
                      dropdownMatchSelectWidth={700}
                      style={{ width: '100%' }}
                      placeholder="Código"
                      disabled
                    />
                  </Form.Item>
                </Col>
                <Col xs={9} style={{ padding: "0 5px 0 5px" }}>
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
                      dropdownMatchSelectWidth={700}
                      style={{ width: '100%' }}
                      placeholder="Buscar producto"
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
                <DeleteOutlined
                  onClick={() => {
                    remove(name)
                  }}
                  style={{ padding: '10px 10px 0 10px' }}
                />
                <div style={{ padding: '20px', width: '100%' }}>
                  {
                    value ?
                      value[name] ?
                        value[name].atributos.map(element => {
                          return (
                            <Row style={{ margin: '10px 20px 10px 20px', width: '100% ' }}>
                              <Col xs={4} style={{ display: 'flex', alignItems: 'center' }}>
                                {element.nombre + ':'}
                              </Col>
                              <Col xs={10}>
                                <Select
                                  style={{ width: '100% ', margin: '0' }}
                                  showSearch
                                  placeholder="Seleccione la opción"
                                  optionFilterProp="children"
                                  // onChange={onChangeHabitación}
                                  // onSearch={() => { }}
                                  filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                  }
                                >
                                  {
                                    element ?
                                      element.opciones.map(option => {
                                        return (
                                          <Select.Option value={option.nombre}>{option.nombre}</Select.Option>
                                        );
                                      }) :
                                      null
                                  }
                                </Select>
                              </Col>
                              <Col xs={4} style={{ display: 'flex', alignItems: 'center' }}>
                                {element.nombre + ':'}
                              </Col>
                            </Row>
                          );
                        }) :
                        null :
                      null
                  }
                </div>
              </Row>
            ))}
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
      )
      }
    </Form.List >

  );
};
