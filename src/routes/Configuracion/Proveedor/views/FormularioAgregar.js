import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCelular, setClear, setCorreo, setDirecFiscal, setRazonSocial, setRuc, setTipo } from '../../../../appRedux/actions/Configuracion/Proveedor';
import { guardarProveedor } from '../controllers';



export const FormularioAgregarProveedor = () => {

    const proveedor = useSelector(store => store.proveedor);
    const dispatch = useDispatch();

    return (
        <>
            <Button type='primary' onClick={() => dispatch(setClear())}>
                <Link to="/configuracion/proveedor">
                    Volver
                </Link>
            </Button>

            <Card title="Agregar Proveedor">
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
                >
                    <Form.Item
                        label="Razon Social"
                        name="razonSocial"
                        rules={[
                            {
                                required: true,
                                message: 'La razon social es requerido',

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
                        ]}
                    >
                        <Input onChange={(e) => dispatch(setRuc(e.target.value))} />
                    </Form.Item>

                    <Form.Item
                        label="Tipo"
                        name="tipo"
                        rules={[
                            {
                                required: true,
                                message: 'El Tipo es requerido',
                            },
                        ]}
                    >
                        <Input onChange={(e) => dispatch(setTipo(e.target.value))} />
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


                    <Form.Item label=" ">
                        <Button
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
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}
