import { Divider, message, Modal } from 'antd';
//Services
import { actualizarProveedor, crearProveedor, eliminarProveedor, obtenerProveedores, obtenerProveedorPorId } from '../services';
//Actions
import { setCargando, setCelular, setClear, setCorreo, setDirecFiscal, setProveedor, setRazonSocial, setRuc, setTipo } from '../../../../appRedux/actions/Configuracion/Proveedor';
//Store
import store, { history } from "../../../../appRedux/store";
//Utils
import { getColumnSearchProps } from "../../../../util/Utils";

const config = (almacen) => {
    return {
        title: `¿Desea Eliminar el Proveedor ${almacen.razonSocial}?`,
        okText: 'Eliminar',
        cancelText: 'Cancelar',
        onOk: () => borrarProveedor(almacen._id),
        onCancel: () => console.log("Cancelado"),
        content: (
            <> Los datos eliminados no podran recuperarse. </>
        ),
    }
};


export const columns = [

    {
        title: 'Razón Social',
        dataIndex: 'razonSocial',
        key: 'razonSocial',
        ...getColumnSearchProps('razonSocial'),
    },
    {
        title: 'Dirección Fiscal',
        dataIndex: 'direcFiscal',
        key: 'direcFiscal',
        ...getColumnSearchProps('direcFiscal'),
    },
    {
        title: 'RUC',
        dataIndex: 'ruc',
        key: 'ruc',
        ...getColumnSearchProps('ruc'),
    },
    {
        title: 'Tipo',
        dataIndex: 'tipo',
        key: 'tipo',
        ...getColumnSearchProps('tipo'),
    },
    {
        title: 'Celular',
        dataIndex: 'celular',
        key: 'celular',
        ...getColumnSearchProps('celular'),
    },
    {
        title: 'Correo',
        dataIndex: 'correo',
        key: 'correo',
        ...getColumnSearchProps('correo'),
    },
    {
        title: 'Acciones',
        dataIndex: 'a',
        render: (text, record) => (
            <span>
                <span className="gx-link">
                    <i
                        className="icon icon-edit"
                        style={{ fontSize: 16, color: 'orange' }}
                        onClick={() => history.push(`/configuracion/proveedor/editar/${record._id}`, { query: record })}
                    />
                </span>
                <Divider type="vertical" />
                <span className="gx-link">
                    <i
                        className="icon icon-trash"
                        style={{ fontSize: 17, color: "red" }}
                        onClick={() => Modal.confirm(config(record))}
                    />
                </span>
            </span >
        ),
    }
];


// FUNCIONES DEL CONSUMO DEL API
export const obtenerUnProveedor = async (id) => {
    try {
        const response = await obtenerProveedorPorId(id);
        if (response.statusCode === 200) {
            const body = response.body;
            store.dispatch(setRazonSocial(body.razonSocial));
            store.dispatch(setDirecFiscal(body.direcFiscal));
            store.dispatch(setRuc(body.ruc));
            store.dispatch(setTipo(body.tipo));
            store.dispatch(setCelular(body.celular));
            store.dispatch(setCorreo(body.correo));
        } else {
            console.log('Error al obtener un proveedor');
        }
    } catch (error) {
        console.error("Error al obtener un proveedor: ", error);
        message.error(error);
    }
}

export const listarProveedores = async (pageOffset) => {
    try {
        const response = await obtenerProveedores(pageOffset);
        if (response.statusCode === 200) {
            const body = response.body;
            body.forEach(element => {
                element.key = element._id;
            });
            store.dispatch(setProveedor(body));
        } else {
            console.log('Error al listar proveedores');
        }

    } catch (error) {
        console.error("Error al obtener lista proveedor: ", error);
        message.error(error);
    }
}

export const guardarProveedor = async () => {
    //Loading ON
    store.dispatch(setCargando(true));
    const state = store.getState().proveedor;
    try {
        const response = await crearProveedor(state.razonSocial, state.direcFiscal, state.ruc, state.tipo, state.celular, state.correo);
        if (response.statusCode === 201) {
            //Mostrar Mensaje:  Creado exitosamente
            message.success('Proveedor creado correctamente');
            //Redireccionar a la lista de almacenes
            history.push('/configuracion/proveedor');
        } else {
            //Mostrar Mensaje:  Ocurrio un error
            message.error('Ocurrió un error al crear al proveedor');
        };
        //Loading OFF
        store.dispatch(setCargando(false));
        store.dispatch(setClear());
    } catch (error) {
        console.error("Error al crear proveedor: ", error);
        message.error(error);
    }
}


export const editarProveedor = async (id) => {
    //Loading ON
    store.dispatch(setCargando(true));
    const state = store.getState().proveedor;
    try {
        const response = await actualizarProveedor(id, state.razonSocial, state.direcFiscal, state.ruc, state.tipo, state.celular, state.correo);
        if (response.statusCode === 200) {
            //Mostrar Mensaje:  Creado exitosamente
            message.success('Proveedor actualizado correctamente');
            //Redireccionar a la lista de almacenes
            history.push('/configuracion/proveedor');
        } else {
            //Mostrar Mensaje:  Ocurrio un error
            message.error('Ocurrió un error al editar al proveedor');
        }
        //Loading OFF
        store.dispatch(setCargando(false));
        store.dispatch(setClear());

    } catch (error) {
        console.error("Error al editar proveedor: ", error);
        message.error(error);
    }
}


export const borrarProveedor = async (id) => {
    try {
        const response = await eliminarProveedor(id);
        if (response.statusCode === 200) {
            //Mostrar Mensaje:  Creado exitosamente
            message.success('Proveedor eliminado correctamente');
            //Volver a Llamar al Api Listar
            listarProveedores();
        } else {
            //Mostrar Mensaje:  Ocurrio un error
            message.error('Ocurrió un error al eliminar el proveedor');
        };
    } catch (error) {
        console.error("Error al eliminar proveedor: ", error);
        message.error(error);
    }
}
