//Ant Design
import { Divider, message } from 'antd';
//Utils
import { getColumnSearchProps } from '../../../../util/Utils';
//Services
import { obtenerFamilias, crearFamilia, eliminarFamilia } from "../services/index";
//Redux
import store, { history } from '../../../../appRedux/store';
import { setFamilia, setClear, setCargando } from '../../../../appRedux/actions/Maestro/Familia';

export const columns = [
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
            onClick={async () => {
              try {
                const response = await eliminarFamilia(record._id);
                if (response.statusCode === 200) {
                  //Mostrar Mensaje: Eliminado exitosamente
                  message.success(response.message);
                  listarFamilias();
                  //Redireccionar
                  history.push('/maestro/familia');
                } else {
                  //Mostrar Mensaje: Ocurrio un error
                  message.error(response.message);
                };
              } catch (error) {
                console.error("Error al eliminar el producto: ", error);
                alert(error);
              }
            }}
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
    const response = await obtenerFamilias();
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

export const guardarFamilia = async (body) => {
  //Loading ON
  store.dispatch(setCargando(true));
  try {
    const formulario = body.getFieldsValue();
    console.log(formulario);
    const response = await crearFamilia(formulario);
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
