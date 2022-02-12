import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setClear, setNombre, setUbicacion } from '../../../../appRedux/actions/Configuracion/Almacen';
import { guardarAlmacen } from '../controllers';

export const FormularioAgregarAlmacen = () => {

    const almacen = useSelector(store => store.almacen);
    const dispatch = useDispatch();

    return (
        <>
            <Button type='primary' onClick={() => dispatch(setClear())}>
                <Link to="/configuracion/almacen">
                    Volver
                </Link>
            </Button>

            <Card title="Agregar Almacen">
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
                        <Button
                            loading={almacen.cargando}
                            disabled={
                                almacen.nombre === '' || almacen.ubicacion === ''
                                    ? true
                                    : false
                            }
                            type="primary"
                            htmlType="submit"
                            onClick={() => guardarAlmacen()}>
                            Guardar
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}
