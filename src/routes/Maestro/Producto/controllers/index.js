import { Divider } from 'antd';
import { getColumnSearchProps } from '../../../../util/Utils';
// Services
import { obtenerProductos } from "../services/index";
//Store
import store from '../../../../appRedux/store';
import { setProducto } from '../../../../appRedux/actions/Maestro/Producto';

export const columns = [
  {
    title: 'Código',
    dataIndex: 'codigo',
    key: 'codigo',
    ...getColumnSearchProps('codigo'),
  },
  {
    title: 'Descripción',
    dataIndex: 'descripcion',
    key: 'descripcion',
    ...getColumnSearchProps('descripcion'),
  },
  {
    title: 'Almacén',
    dataIndex: ['almacen', 'nombre'],
    key: ['almacen', 'nombre']
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
      response.body.forEach(element => {
        element.key = element._id;
      });
      store.dispatch(setProducto(body));
    } else {
      console.log('Error al listar productos');
    }
  } catch (error) {
    console.error("Error al obtener lista de productos: ", error);
    alert(error);
  }
}

export const guardarProducto = async (body) => {
  console.log(body.getFieldsValue());
  // const data = new FormData(body);
  // console.log(data);
  // try {
  //   const response = await obtenerProductos(5, 1);
  //   if (response.statusCode === 200) {
  //     const body = response.body;
  //     response.body.forEach(element => {
  //       element.key = element._id;
  //     });
  //     store.dispatch(setProducto(body));
  //   } else {
  //     console.log('Error al listar productos');
  //   }
  // } catch (error) {
  //   console.error("Error al obtener lista de productos: ", error);
  //   alert(error);
  // }
}
