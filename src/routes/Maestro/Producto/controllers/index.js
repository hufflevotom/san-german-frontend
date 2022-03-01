import { Divider, message, Modal } from 'antd';
import { getColumnSearchProps } from '../../../../util/Utils';
// Services
import { obtenerProductos, crearProducto, subirImagenOpcion, eliminarProducto, obtenerProductoPorId, actualizarProducto } from "../services/index";
//Store
import store, { history } from '../../../../appRedux/store';
import { setProducto, setClear, setCargando, setCodigo, setDescripcion, setAlmacenId, setAtributosId, setFamilia } from '../../../../appRedux/actions/Maestro/Producto';

const config = (producto) => {

  console.log(producto);
  return {
    title: `¿Desea Eliminar el Producto ${producto.descripcion}?`,
    okText: 'Eliminar',
    cancelText: 'Cancelar',
    onOk: () => borrarProducto(producto._id),
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
              history.push('/maestro/producto/editar/' + record._id);
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

export const listarProductos = async (pageOffset) => {
  try {
    const response = await obtenerProductos(pageOffset);
    if (response.statusCode === 200) {
      const body = response.body;
      body[0].forEach(element => {
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

export const obtenerProducto = async (id) => {
  try {
    //Loading ON
    store.dispatch(setCargando(true));
    const response = await obtenerProductoPorId(id);
    if (response.statusCode === 200) {
      const body = response.body;
      console.log("Editar: ", body);
      store.dispatch(setCodigo(body.codigo));
      store.dispatch(setDescripcion(body.descripcion));
      store.dispatch(setAlmacenId(body.almacen._id));
      store.dispatch(setFamilia(body.familia._id));
      store.dispatch(setAtributosId(body.atributos));

      // store.dispatch(setNombre(body.nombre));
      // store.dispatch(setId(body._id));
      // return body;
    }
    //Loading OFF
    store.dispatch(setCargando(false));
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
    crearProducto(formulario).then((response) => {
      formulario.atributos.forEach(a => {
        a.opciones.forEach(async o => {
          if (o.imagenUrl) {
            var data = new FormData();
            data.append("imagen", o.imagenUrl);
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


export const editarProducto = async (body) => {
  store.dispatch(setCargando(true));
  try {
    const formulario = body.getFieldsValue();
    const id = formulario.id;
    delete formulario.id;

    actualizarProducto(id, formulario).then((response) => {

      formulario.atributos.forEach(atributo => {
        atributo.opciones.forEach(async opcion => {

          if (opcion.imagenUrl) {
            var data = new FormData();
            data.append("imagen", opcion.imagenUrl);
            await subirImagenOpcion(id, atributo.nombre, opcion.nombre, data);
          }
        });
      });

      if (response.statusCode === 200) {
        //Mostrar Mensaje:  Actualizado exitosamente
        message.success(response.message);
        listarProductos();
        //Redireccionar
        history.push('/maestro/producto');
      } else {
        message.error(response.message);
      }

    });

    store.dispatch(setCargando(false));


  } catch (error) {
    console.error("Error al actualizar producto: ", error);
    message.error(error);
  }
}

export const borrarProducto = async (id) => {
  try {
    const response = await eliminarProducto(id);
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
}





