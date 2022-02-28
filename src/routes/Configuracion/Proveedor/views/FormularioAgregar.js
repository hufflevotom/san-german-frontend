import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCelular, setClear, setCorreo, setDirecFiscal, setRazonSocial, setRuc, setTipo } from '../../../../appRedux/actions/Configuracion/Proveedor';
import { guardarProveedor } from '../controllers';



export const FormularioAgregarProveedor = () => {

  const proveedor = useSelector(store => store.proveedor);
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
                <Link to="/configuracion/proveedor">
                  <LeftOutlined
                    style={{ fontSize: "16px", margin: 0, paddingTop: "5px" }}
                  />
                </Link>
              </Button>
              <h1 style={{ margin: "0 0 0 20px", paddingTop: "3px" }}>
                Agregar Proveedor
              </h1>
            </div>
            <div>
              <Button
                style={{ margin: 0 }}
                loading={proveedor.cargando}
                disabled={
                  proveedor.razonSocial === '' ||
                    proveedor.direcFiscal === '' ||
                    proveedor.ruc === '' ||
                    proveedor.tipo === '' ||
                    proveedor.celular === '' ||
                    proveedor.correo === ''
                    ? true
                    : false
                }
                type="primary"
                htmlType="submit"
                onClick={() => guardarProveedor()}>
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
            label="Razón Social"
            name="razonSocial"
            rules={[
              {
                required: true,
                message: 'La razón social es requerido',

              },
            ]}
          >
            <Input onChange={(e) => dispatch(setRazonSocial(e.target.value))} />
          </Form.Item>

          <Form.Item
            label="Dirección Fiscal"
            name="direcFiscal"
            rules={[
              {
                required: true,
                message: 'La dirección es requerido',
              },
            ]}
          >
            <Input onChange={(e) => dispatch(setDirecFiscal(e.target.value))} />
          </Form.Item>

          <Form.Item
            label="RUC"
            name="ruc"
            rules={[
              {
                required: true,
                message: 'El RUC es requerido',
              },
              {
                min: 11,
                max: 11,
                message: 'El RUC debe tener 11 dígitos',
              },
            ]}
            style={{ marginBottom: '10px' }}
          >
            <Input
              type="number"
              onChange={(e) => {
                var valor = e.target.value.substring(0, 2);
                if (valor === "20") {
                  dispatch(setTipo("Persona Jurídica"))
                } else if (valor === "10") {
                  dispatch(setTipo("Persona Natural"))
                }
                dispatch(setRuc(e.target.value))
              }}
            />
          </Form.Item>

          <Form.Item
            label="Tipo"
            name="tipo"
            style={{ marginBottom: '10px' }}
          >
            {
              proveedor ?
                proveedor.tipo :
                null
            }
          </Form.Item>

          <Form.Item
            label="Celular"
            name="celular"
            rules={[
              {
                required: true,
                message: 'El Celular es requerido',
              },
            ]}
          >
            <Input onChange={(e) => dispatch(setCelular(e.target.value))} />
          </Form.Item>


          <Form.Item
            label="Correo"
            name="correo"
            rules={[
              {
                required: true,
                message: 'El Correo es requerido',
              },
            ]}
          >
            <Input onChange={(e) => dispatch(setCorreo(e.target.value))} />
          </Form.Item>



        </Form>
      </Card>
    </>
  )
}
