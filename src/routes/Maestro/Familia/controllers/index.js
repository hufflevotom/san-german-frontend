//Ant Design
import { Divider, message, Modal } from 'antd';
//Utils
import { getColumnSearchProps } from '../../../../util/Utils';
//Services
import { getFamilias, getFamilia, createFamilia, deleteFamilia, updateFamilia } from "../services/index";
//Redux
import store, { history } from '../../../../appRedux/store';
import { setFamilia, setClear, setCargando, setNombre, setId, setCodigo } from '../../../../appRedux/actions/Maestro/Familia';


const config = (familia) => {

  console.log("FAMILIA: ", familia);
  return {
    title: `¿Desea Eliminar la Familia ${familia.nombre}?`,
    okText: 'Eliminar',
    cancelText: 'Cancelar',
    onOk: () => borrarFamilia(familia._id),
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
    title: 'Acciones',
    dataIndex: 'a',
    width: 80,
    render: (text, record) => (
      <span>
        <span className="gx-link">
          <i
            className="icon icon-edit"
            style={{ fontSize: 16, color: 'orange' }}
            onClick={() => {
              history.push('/maestro/familia/editar/' + record._id);
            }}
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

export const listarFamilias = async () => {
  try {
    //Loading ON
    store.dispatch(setCargando(true));
    const response = await getFamilias();
    if (response.statusCode === 200) {
      const body = response.body;
      response.body.forEach(element => {
        element.key = element._id;
      });
      store.dispatch(setFamilia(body));
    } else {
      console.log('Error al listar productos');
    }
    //Loading OFF
    store.dispatch(setCargando(false));
  } catch (error) {
    console.error("Error al obtener lista de productos: ", error);
    alert(error);
  }
}

export const obtenerFamilia = async (id) => {
  try {
    //Loading ON
    store.dispatch(setCargando(true));
    const response = await getFamilia(id);
    if (response.statusCode === 200) {
      const body = response.body;
      store.dispatch(setNombre(body.nombre));
      store.dispatch(setCodigo(body.codigo));
      store.dispatch(setId(body._id));
      // return body;
    }
    //Loading OFF
    store.dispatch(setCargando(false));
  } catch (error) {
    console.error("Error al obtener lista de productos: ", error);
    alert(error);
  }
}

export const guardarFamilia = async (body) => {
  //Loading ON
  store.dispatch(setCargando(true));
  try {
    const formulario = body.getFieldsValue();
    console.log(formulario);
    const response = await createFamilia(formulario);
    if (response.statusCode === 200) {
      //Mostrar Mensaje:  Creado exitosamente
      message.success(response.message);
      listarFamilias();
      //Redireccionar
      history.push('/maestro/familia');
    } else {
      //Mostrar Mensaje:  Ocurrio un error
      message.error(response.message);
    };
    //Loading OFF
    store.dispatch(setCargando(false));
    store.dispatch(setClear());
  } catch (error) {
    console.error("Error al crear familia: ", error);
    message.error(error);
  }
}

export const actualizarFamilia = async (body) => {
  //Loading ON
  store.dispatch(setCargando(true));
  try {
    const formulario = body.getFieldsValue();
    const id = formulario.id;
    delete formulario.id;
    const response = await updateFamilia(id, formulario);
    if (response.statusCode === 200) {
      //Mostrar Mensaje:  Creado exitosamente
      message.success(response.message);
      listarFamilias();
      //Redireccionar
      history.push('/maestro/familia');
    } else {
      //Mostrar Mensaje:  Ocurrio un error
      message.error(response.message);
    };
    //Loading OFF
    store.dispatch(setCargando(false));
    store.dispatch(setClear());
  } catch (error) {
    console.error("Error al crear familia: ", error);
    message.error(error);
  }
}


export const borrarFamilia = async (id) => {
  try {
    const response = await deleteFamilia(id);
    if (response.statusCode === 200) {
      //Mostrar Mensaje:  Creado exitosamente
      message.success(response.message);
      listarFamilias();
      //Redireccionar
      history.push('/maestro/familia');
    } else {
      //Mostrar Mensaje: Ocurrio un error
      message.error(response.message);
    };
  } catch (error) {
    console.error("Error al eliminar la familia: ", error);
    message.error(error);
  }
}

