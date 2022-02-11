import { Button, Divider, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

// Services
import { obtenerProductos } from "../services/index";

//Store
import store from '../../../../appRedux/store';
import { setProducto } from '../../../../appRedux/actions/Configuracion/Producto';


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
            onClick={() => {
              //TODO: EDITAR
            }}
          />
        </span>
        <Divider type="vertical" />
        <span className="gx-link">
          <i
            className="icon icon-trash"
            style={{ fontSize: 17, color: "red" }}
            onClick={() => {
              //TODO: ELIMINAR
            }}
          />
        </span>
      </span >
    ),
  }
];

export const listarProductos = async () => {
  try {
    const response = await obtenerProductos(5, 1);
    if (response.statusCode === 200) {
      const body = response.body;
      store.dispatch(setProducto(body));
    } else {
      console.log('Error al listar productos');
    }

  } catch (error) {
    console.error("Error al obtener lista de productos: ", error);
    alert(error);
  }
}
