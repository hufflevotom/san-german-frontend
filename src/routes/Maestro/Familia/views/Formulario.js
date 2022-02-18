//React
import React, { createRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
//Ant Design
import { LeftOutlined } from "@ant-design/icons";
import { Form, Input, Button, Card } from "antd";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { setClear, setNombre } from "../../../../appRedux/actions/Maestro/Familia";
//Controllers
import { guardarFamilia, actualizarFamilia, obtenerFamilia } from "../controllers";

export const Formulario = () => {
  const formRef = createRef();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { nombre } = useSelector(state => state.familia);

  const llenarFormulario = async () => {
    const response = await obtenerFamilia(id);
    if (response) {
      console.log(response);
      // formRef.setFieldsValue({
      //   nombre: response.nombre
      // });
    }
  }

  useEffect(() => {
    if (id) {
      obtenerFamilia(id);
      formRef.current.setFieldsValue({
        id: id,
        nombre: nombre
      });
    }
  }, [id, nombre])


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
                <Link to="/maestro/familia">
                  <LeftOutlined
                    style={{ fontSize: "16px", margin: 0, paddingTop: "5px" }}
                  />
                </Link>
              </Button>
              <h1 style={{ margin: "0 0 0 20px", paddingTop: "3px" }}>
                {id ? "Actualizar" : "Crear"} Familia
              </h1>
            </div>
            <div>
              <Button
                type="primary"
                style={{ margin: 0 }}
                htmlType="submit"
                onClick={() => {
                  if (id) {
                    actualizarFamilia(formRef.current);
                  } else {
                    guardarFamilia(formRef.current);
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
        </Form>
      </Card>
    </>
  );
};
