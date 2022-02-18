import { Divider, message } from 'antd';
import { getColumnSearchProps } from '../../../../util/Utils';
// Services
import { obtenerProductos, crearProducto, subirImagenOpcion, eliminarProducto } from "../services/index";
//Store
import store, { history } from '../../../../appRedux/store';
import { setProducto, setClear, setCargando } from '../../../../appRedux/actions/Maestro/Producto';

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
    width: 80,
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
            onClick={async () => {
              try {
                const response = await eliminarProducto(record._id);
                if (response.statusCode === 200) {
                  //Mostrar Mensaje:  Creado exitosamente
                  message.success(response.message);
                  listarProductos();
                  //Redireccionar
                  history.push('/maestro/producto');
                } else {
                  //Mostrar Mensaje:  Ocurrio un error
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
  //Loading ON
  store.dispatch(setCargando(true));
  try {
    const formulario = body.getFieldsValue();
    console.log(formulario);
    crearProducto(formulario).then((response) => {
      formulario.atributos.forEach(a => {
        a.opciones.forEach(async o => {
          if (o.img) {
            var data = new FormData();
            data.append("imagen", o.img);
            await subirImagenOpcion(response.body._id, a.nombre, o.nombre, data);
          }
        });
      })
      if (response.statusCode === 201) {
        //Mostrar Mensaje:  Creado exitosamente
        message.success(response.message);
        listarProductos();
        //Redireccionar
        history.push('/maestro/producto');
      } else {
        //Mostrar Mensaje:  Ocurrio un error
        message.error(response.message);
      };
      //Loading OFF
      store.dispatch(setCargando(false));
      store.dispatch(setClear());
    }
    );
  } catch (error) {
    console.error("Error al crear producto: ", error);
    message.error(error);
  }
}
