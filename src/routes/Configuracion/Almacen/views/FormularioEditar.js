import React, { useEffect, useRef } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setClear, setNombre, setUbicacion } from '../../../../appRedux/actions/Configuracion/Almacen';
import { editarAlmacen, obtenerUnAlmacen } from '../controllers';
import { useSelector } from 'react-redux';

export const FormularioEditarAlmacen = (props) => {

    const { match: { params } } = props;

    const almacen = useSelector(state => state.almacen);
    const dispatch = useDispatch();
    const formRef = useRef();

    useEffect(() => {
        obtenerUnAlmacen(params.id);
    }, [params.id]);

    useEffect(() => {
        formRef.current.setFieldsValue({ nombre: almacen.nombre, ubicacion: almacen.ubicacion });
    }, [almacen])



    return (
        <>
            <Button type='primary' onClick={() => dispatch(setClear())}>
                <Link to="/configuracion/almacen">
                    Volver
                </Link>
            </Button>

            <Card title="Editar Almacen">
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
                            onClick={() => editarAlmacen(params.id)}>
                            Actualizar
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}
