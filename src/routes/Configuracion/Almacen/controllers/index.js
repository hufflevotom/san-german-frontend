import { Divider, message, Modal } from 'antd';
// Services
import { obtenerAlmacenes, crearAlmacen, eliminarAlmacen, obtenerAlmacenPorId, actualizarAlmacen } from "../services/index";
//Store
import store, { history } from '../../../../appRedux/store';
import { setAlmacen, setCargando, setClear, setNombre, setUbicacion } from '../../../../appRedux/actions/Configuracion/Almacen';
//Utils
import { getColumnSearchProps } from '../../../../util/Utils';


const config = (almacen) => {
  return {
    title: `¿Desea Eliminar el Almacén ${almacen.nombre}?`,
    okText: 'Eliminar',
    cancelText: 'Cancelar',
    onOk: () => borrarAlmacen(almacen._id),
    onCancel: () => console.log("Cancelado"),
    content: (
      <> Los datos eliminados no podran recuperarse. </>
    ),
  }
};

export const columns = [
  {
    title: 'Código',
    dataIndex: 'codigo',
    key: 'codigo',
    ...getColumnSearchProps('codigo'),
  },
  {
    title: 'Nombre',
    dataIndex: 'nombre',
    key: 'nombre',
    ...getColumnSearchProps('nombre'),
  },
  {
    title: 'Ubicación',
    dataIndex: 'ubicacion',
    key: 'ubicacion',
    ...getColumnSearchProps('ubicacion'),
  },
  {
    title: 'Acciones',
    dataIndex: 'a',
    width: 80,
    render: (text, record) => (
      <span>
        <span className="gx-link">
          <i
            className="icon icon-edit"
            style={{ fontSize: 16, color: 'orange' }}
            onClick={() => history.push(`/configuracion/almacen/editar/${record._id}`, { query: record })}
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
export const obtenerUnAlmacen = async (id) => {
  try {
    const response = await obtenerAlmacenPorId(id);
    if (response.statusCode === 200) {
      const body = response.body;
      store.dispatch(setNombre(body.nombre));
      store.dispatch(setUbicacion(body.ubicacion));
    } else {
      console.log('Error al obtener un almacen');
    }
  } catch (error) {
    console.error("Error al obtener lista almacen: ", error);
    message.error(error);
  }
}

export const listarAlmacenes = async () => {
  try {
    const response = await obtenerAlmacenes();
    if (response.statusCode === 200) {
      const body = response.body;
      body.forEach(element => {
        element.key = element._id;
      });
      store.dispatch(setAlmacen(body));
    } else {
      console.log('Error al listar almacenes');
    }

  } catch (error) {
    console.error("Error al obtener lista almacen: ", error);
    message.error(error);
  }
}

export const guardarAlmacen = async () => {
  //Loading ON
  store.dispatch(setCargando(true));
  const state = store.getState().almacen;

  try {
    const response = await crearAlmacen(state.nombre, state.ubicacion, state.codigo);
    if (response.statusCode === 201) {
      //Mostrar Mensaje:  Creado exitosamente
      message.success('Almacen creado correctamente');
      //Redireccionar a la lista de almacenes
      history.push('/configuracion/almacen');
    } else {
      //Mostrar Mensaje:  Ocurrio un error
      message.error('Ocurrió un error al crear el almacen');
    };
    //Loading OFF
    store.dispatch(setCargando(false));
    store.dispatch(setClear());
  } catch (error) {
    console.error("Error al crear almacen: ", error);
    message.error(error);
  }
}

export const editarAlmacen = async (id) => {
  //Loading ON
  store.dispatch(setCargando(true));
  const state = store.getState().almacen;

  try {
    const response = await actualizarAlmacen(id, state.nombre, state.ubicacion, state.codigo);
    if (response.statusCode === 200) {
      //Mostrar Mensaje:  Creado exitosamente
      message.success('Almacen actualizado correctamente');
      //Redireccionar a la lista de almacenes
      history.push('/configuracion/almacen');
    } else {
      //Mostrar Mensaje:  Ocurrio un error
      message.error('Ocurrió un error al editar el almacen');
    }
    //Loading OFF
    store.dispatch(setCargando(false));
    store.dispatch(setClear());

  } catch (error) {
    console.error("Error al editar almacen: ", error);
    message.error(error);
  }
}


export const borrarAlmacen = async (id) => {
  try {
    const response = await eliminarAlmacen(id);
    if (response.statusCode === 200) {
      //Mostrar Mensaje:  Creado exitosamente
      message.success('Almacen eliminado correctamente');
      //Volver a Llamar al Api Listar
      listarAlmacenes();
    } else {
      //Mostrar Mensaje:  Ocurrio un error
      message.error('Ocurrió un error al eliminar el almacen');
    };
  } catch (error) {
    console.error("Error al eliminar almacen: ", error);
    message.error(error);
  }
}
