//Ant Design
import { Divider, message, Row, Col } from 'antd';
//Utils
import { getColumnSearchProps } from '../../../../util/Utils';
//Services
import { getOrdenesCompra, getOrdenCompra, createOrdenCompra, deleteOrdenCompra, updateOrdenCompra, getProductoFiltrado } from "../services/index";
import { dataBusqueda } from '../services/data';
//Redux
import store, { history } from '../../../../appRedux/store';
import { setClear, setCargando, setOpciones, setOrdenCompra } from '../../../../appRedux/actions/Logistica/OrdenCompra';

export const columns = [
  {
    title: 'Columna',
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
                const response = await deleteOrdenCompra(record._id);
                if (response.statusCode === 200) {
                  //Mostrar Mensaje: Eliminado exitosamente
                  message.success(response.message);
                  listarOrdenesCompra();
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

export const listarOrdenesCompra = async () => {
  try {
    //Loading ON
    store.dispatch(setCargando(true));
    const response = await getOrdenesCompra();
    if (response.statusCode === 200) {
      const body = response.body;
      response.body.forEach(element => {
        element.key = element._id;
      });
      store.dispatch(setOrdenCompra(body));
    } else {
      console.log('Error al listar las Ordenes de Compra');
    }
    //Loading OFF
    store.dispatch(setCargando(false));
  } catch (error) {
    console.error("Error al obtener lista de Ordenes de Compra: ", error);
    alert(error);
  }
}

// export const obtenerOrdenCompra = async (id) => {
//   try {
//     //Loading ON
//     store.dispatch(setCargando(true));
//     const response = await getFamilia(id);
//     if (response.statusCode === 200) {
//       const body = response.body;
//       store.dispatch(setNombre(body.nombre));
//       store.dispatch(setId(body._id));
//       // return body;
//     }
//     //Loading OFF
//     store.dispatch(setCargando(false));
//   } catch (error) {
//     console.error("Error al obtener lista de productos: ", error);
//     alert(error);
//   }
// }

export const guardarOrdenCompra = async (body) => {
  //Loading ON
  // store.dispatch(setCargando(true));
  // try {
  //   const formulario = body.getFieldsValue();
  //   console.log(formulario);
  //   const response = await createFamilia(formulario);
  //   if (response.statusCode === 200) {
  //     //Mostrar Mensaje:  Creado exitosamente
  //     message.success(response.message);
  //     listarOrdenesCompra();
  //     //Redireccionar
  //     history.push('/maestro/familia');
  //   } else {
  //     //Mostrar Mensaje:  Ocurrio un error
  //     message.error(response.message);
  //   };
  //   //Loading OFF
  //   store.dispatch(setCargando(false));
  //   store.dispatch(setClear());
  // } catch (error) {
  //   console.error("Error al crear familia: ", error);
  //   message.error(error);
  // }
}

export const actualizarOrdenCompra = async (body) => {
  //Loading ON
  // store.dispatch(setCargando(true));
  // try {
  //   const formulario = body.getFieldsValue();
  //   const id = formulario.id;
  //   delete formulario.id;
  //   const response = await updateFamilia(id, formulario);
  //   if (response.statusCode === 200) {
  //     //Mostrar Mensaje:  Creado exitosamente
  //     message.success(response.message);
  //     listarOrdenesCompra();
  //     //Redireccionar
  //     history.push('/maestro/familia');
  //   } else {
  //     //Mostrar Mensaje:  Ocurrio un error
  //     message.error(response.message);
  //   };
  //   //Loading OFF
  //   store.dispatch(setCargando(false));
  //   store.dispatch(setClear());
  // } catch (error) {
  //   console.error("Error al crear familia: ", error);
  //   message.error(error);
  // }
}


export const onSearchCOD = async searchText => {
  // var cod = formRef.current.getFieldValue('codPaciente');
  // if (cod ? cod.length >= 4 : false) {
  // setPeticion(true);
  // setOptionsCOD();
  // const respuesta = await httpClient.post(
  //   'camas/getPacientes',
  //   {
  //     codPaciente: cod,
  //     nombre: '',
  //   },
  //   { cancelToken: cancelSource.token }
  // );
  // var array1 = respuesta.data.data;
  // for (let i = 0; i < array1.length; i++) {
  //   if (array1[i].asignado === "1") {
  //     delete array1[i];
  //   } else {
  //     array1[i].key = array1[i].cod_paciente;
  //     array1[i].value = array1[i].cod_paciente;
  //     array1[i].label = array1[i].cod_paciente;
  //   }
  // }
  // setOptionsNOM();
  // setOptionsCOD(array1);
  // } else {
  // if (peticion) {
  //   cancelSource.cancel('COD Cancelado');
  //   setCancelSource(axios.CancelToken.source());
  // }
  // }
};

export const onSelectCOD = data => {
  // optionsCOD.forEach(element => {
  //   if (element.key === data) {
  //     formRef.current.setFieldsValue({
  //       codPaciente: element.cod_paciente,
  //       nombre: `${element.nom_cli + ' ' + element.ape_pat_cli + ' ' + element.ape_mat_cli}`,
  //     });
  //     setPaciente(element);
  //     setValueCOD(data);
  //   }
  // });
};

export const onChangeCOD = data => {
  if (data.length <= 3) {
    // setOptionsCOD([]);
  }
};



export const onSearchNOM = async searchText => {
  var array = [{
    label: null,
    options: []
  }];
  if (searchText ? searchText.length >= 2 : false) {
    store.dispatch(setOpciones());
    const response = await getProductoFiltrado(searchText);
    if (response.statusCode === 200) {
      var array1 = response.body;
      array[0].label =
        <Row style={{ textTransform: 'uppercase', fontWeight: 'bold', width: '100%' }}>
          <Col xs={9}>&nbsp;&nbsp;&nbsp;Producto</Col>
          <Col xs={8}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Almacen</Col>
          <Col xs={7}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Familia</Col>
        </Row>
        ;
      for (let i = 0; i < array1.length; i++) {
        array[0].options.push({
          ...array1[i],
          key: array1[i]._id,
          value: array1[i]._id,
          label: (
            <Row style={{  fontSize: '12px', display: 'flex', alignItems: 'initial' }}>
              <Col xs={3}>{array1[i].codigo}</Col>
              <Col xs={6} style={{ wordBreak: "break-all" }}>{array1[i].descripcion}</Col>
              <Col xs={3}>{array1[i].almacen.codigo}</Col>
              <Col xs={5} style={{ wordBreak: "break-all" }}>{array1[i].almacen.nombre}</Col>
              <Col xs={3}>{array1[i].familia.codigo}</Col>
              <Col xs={4} style={{ wordBreak: "break-all" }}>{array1[i].familia.nombre}</Col>
            </Row>
          ),
        });
      }
      store.dispatch(setOpciones(array));
    };
  }
};

export const onChangeNOM = data => {
  if (data.length <= 3) {
    store.dispatch(setOpciones([]));
  }
};
