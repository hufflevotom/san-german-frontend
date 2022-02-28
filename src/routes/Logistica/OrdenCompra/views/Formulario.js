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
// import { onChangeCOD, onSelectCOD, onChangeNOM, onSearchNOM } from "../controllers";
// import { setClear } from "../../../../appRedux/actions/Maestro/Familia";
//Controllers
// import { guardarFamilia, actualizarFamilia, obtenerFamilia } from "../controllers";
//Components
import { Productos } from "./Productos";




export const Formulario = () => {
  const formRef = createRef();
  // const dispatch = useDispatch();
  const { id } = useParams();
  const { opciones } = useSelector(state => state.ordenCompra);


  // useEffect(() => {
  //   if (id) {
  //     // obtenerFamilia(id);
  //     formRef.current.setFieldsValue({
  //       id: id,
  //       nombre: nombre
  //     });
  //   }
  // }, [id, nombre])

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
          <Productos
            opciones={opciones}
          />
        </Form>
      </Card>
    </>
  );
};
