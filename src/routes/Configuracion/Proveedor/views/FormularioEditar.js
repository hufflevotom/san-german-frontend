import React, { useEffect, useRef } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { editarProveedor, obtenerUnProveedor } from '../controllers';
import { useSelector } from 'react-redux';
import { setCelular, setClear, setCorreo, setDirecFiscal, setRazonSocial, setRuc, setTipo } from '../../../../appRedux/actions/Configuracion/Proveedor';
import { LeftOutlined } from '@ant-design/icons';

export const FormularioEditarProveedor = (props) => {

  const { match: { params } } = props;

  const proveedor = useSelector(state => state.proveedor);
  const dispatch = useDispatch();
  const formRef = useRef();

  useEffect(() => {
    obtenerUnProveedor(params.id);
  }, [params.id]);

  useEffect(() => {
    formRef.current.setFieldsValue({
      razonSocial: proveedor.razonSocial,
      direcFiscal: proveedor.direcFiscal,
      ruc: proveedor.ruc,
      tipo: proveedor.tipo,
      celular: proveedor.celular,
      correo: proveedor.correo,
    });
  }, [proveedor])



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
                Editar Proveedor
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
                onClick={() => editarProveedor(params.id)}>
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
            label="Raz??n Social"
            name="razonSocial"
            rules={[
              {
                required: true,
                message: 'La raz??n social es requerido',

              },
            ]}
          >
            <Input onChange={(e) => dispatch(setRazonSocial(e.target.value))} />
          </Form.Item>

          <Form.Item
            label="Direcci??n Fiscal"
            name="direcFiscal"
            rules={[
              {
                required: true,
                message: 'La direcci??n es requerido',
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
                message: 'El RUC debe tener 11 d??gitos',
              },
            ]}
            style={{ marginBottom: '10px' }}
          >
            <Input
              type="number"
              onChange={(e) => {
                var valor = e.target.value.substring(0, 2);
                if (valor === "20") {
                  dispatch(setTipo("Persona Jur??dica"))
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
