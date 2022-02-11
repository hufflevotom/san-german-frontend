import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setClear, setNombre, setUbicacion } from '../../../../appRedux/actions/Configuracion/Almacen';

export const FormularioAgregar = () => {

    const dispatch = useDispatch();

    return (
        <>
            <Button type='primary' onClick={() => dispatch(setClear())}>
                <Link to="/configuracion/almacen">
                    Volver
                </Link>
            </Button>

            <Card title="Agregar Producto">
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
                        label="Nombre"
                        name="nombre"
                        rules={[
                            {
                                required: true,
                                message: 'El nombre es requerido',

                            },
                        ]}
                    >
                        <Input onChange={(e) => dispatch(setNombre(e.target.value))} />
                    </Form.Item>

                    <Form.Item
                        label="Ubicación"
                        name="ubicacion"
                        rules={[
                            {
                                required: true,
                                message: 'La ubicación es requerido',
                            },
                        ]}
                    >
                        <Input onChange={(e) => dispatch(setUbicacion(e.target.value))} />
                    </Form.Item>

                    <Form.Item label=" ">
                        <Button type="primary" htmlType="submit">
                            Guardar
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}
