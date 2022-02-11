import { Button, Divider, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

// Services
import { obtenerAlmacenes, crearAlmacen, eliminarAlmacen, obtenerAlmacenPorId, actualizarAlmacen } from "../services/index";

//Store
import store, { history } from '../../../../appRedux/store';
import { setAlmacen, setNombre, setUbicacion } from '../../../../appRedux/actions/Configuracion/Almacen';


export const getColumnSearchProps = dataIndex => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div style={{ padding: 8 }}>
      <Input
        placeholder={`Buscar ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        style={{ marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Buscar
        </Button>
        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reiniciar
        </Button>
      </Space>
    </div>
  ),
  filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
  onFilter: (value, record) =>
    record[dataIndex]
      ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
      : '',
});

const handleSearch = (selectedKeys, confirm, dataIndex) => confirm();
const handleReset = clearFilters => clearFilters();

export const columns = [
  {
    title: 'Código',
    dataIndex: '__v',
    key: '__v',
    ...getColumnSearchProps('__v'),
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
    // width: 80,
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
            onClick={() => borrarAlmacen(record._id)}
          />
        </span>
      </span >
    ),
  }
];

export const obtenerUnAlmacen = async (id) => {
  try {
    const response = await obtenerAlmacenPorId(id);
    if (response.statusCode === 200) {
      const body = response.body;
      console.log(body);
      store.dispatch(setNombre(body.nombre));
      store.dispatch(setUbicacion(body.ubicacion));
    } else {
      console.log('Error al obtener un almacen');

    }
  } catch (error) {
    console.error("Error al obtener lista almacen: ", error);
    alert(error);
  }
}

export const listarAlmacenes = async () => {
  try {
    const response = await obtenerAlmacenes();
    if (response.statusCode === 200) {
      const body = response.body;
      store.dispatch(setAlmacen(body));
    } else {
      console.log('Error al listar almacenes');
    }

  } catch (error) {
    console.error("Error al obtener lista almacen: ", error);
    alert(error);
  }
}

export const guardarAlmacen = async () => {
  const state = store.getState().almacen;
  try {
    const response = await crearAlmacen(state.nombre, state.ubicacion);
    console.log(response);
    if (response.statusCode === 201) {
      //Redireccionar
      window.location.href = '/configuracion/almacen';

      //Mostrar Mensaje:  Creado exitosamente

    } else {
      //Mostrar Mensaje:  Ocurrio un error
    };
  } catch (error) {
    console.error("Error al crear almacen: ", error);
    alert(error);
  }
}

export const editarAlmacen = async (id) => {
  const state = store.getState().almacen;
  try {
    const response = await actualizarAlmacen(id, state.nombre, state.ubicacion);
    console.log(response);

    if (response.statusCode === 200) {
      //Redireccionar
      window.location.href = '/configuracion/almacen';

      //Mostrar Mensaje:  Editado exitosamente
    } else {
      //Mostrar Mensaje:  Ocurrio un error
    }

  } catch (error) {
    console.error("Error al editar almacen: ", error);
    alert(error);
  }
}


export const borrarAlmacen = async (id) => {
  try {
    const response = await eliminarAlmacen(id);
    console.log(response);
    if (response.statusCode === 200) {
      //Mostrar Mensaje:  Eliminado exitosamente

      //Volver a Llamar al Api Listar
      listarAlmacenes();

    } else {
      //Mostrar Mensaje:  Ocurrio un error
    };
  } catch (error) {
    console.error("Error al eliminar almacen: ", error);
    alert(error);
  }
}
