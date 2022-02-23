//Ant Design
import { Divider, message } from 'antd';
//Utils
import { getColumnSearchProps } from '../../../../util/Utils';
//Services
import { getFamilias, getFamilia, createFamilia, deleteFamilia, updateFamilia } from "../services/index";
//Redux
import store, { history } from '../../../../appRedux/store';
import { setFamilia, setClear, setCargando, setNombre, setId } from '../../../../appRedux/actions/Maestro/Familia';

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
                const response = await deleteFamilia(record._id);
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

export const obtenerOrdenCompra = async (id) => {
  try {
    //Loading ON
    store.dispatch(setCargando(true));
    const response = await getFamilia(id);
    if (response.statusCode === 200) {
      const body = response.body;
      store.dispatch(setNombre(body.nombre));
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

export const guardarOrdenCompra = async (body) => {
  //Loading ON
  store.dispatch(setCargando(true));
  try {
    const formulario = body.getFieldsValue();
    console.log(formulario);
    const response = await createFamilia(formulario);
    if (response.statusCode === 200) {
      //Mostrar Mensaje:  Creado exitosamente
      message.success(response.message);
      listarOrdenesCompra();
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

export const actualizarOrdenCompra = async (body) => {
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
      listarOrdenesCompra();
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
  // var nombre = formRef.current.getFieldValue('nombre');
  // if (nombre ? nombre.length >= 4 : false) {
  //   setPeticion(true);
  //   setOptionsNOM();
  //   const respuesta = await httpClient.post(
  //     'camas/getPacientes',
  //     {
  //       codPaciente: '',
  //       nombre: nombre,
  //     },
  //     { cancelToken: cancelSource.token }
  //   );
  //   var array2 = respuesta.data.data;
  //   console.log(respuesta.data.data);
  //   for (let i = 0; i < array2.length; i++) {
  //     if (array2[i].asignado === "1") {
  //       delete array2[i];
  //     } else {
  //       array2[i].key = array2[i].cod_paciente;
  //       array2[i].value = array2[i].cod_paciente;
  //       array2[i].label = (
  //         <div>
  //           {array2[i].nom_cli}
  //           <div style={{ color: '#a3a3a3' }}>{' ' + array2[i].ape_pat_cli + ' ' + array2[i].ape_mat_cli}</div>
  //         </div>
  //       );
  //     }
  //   }
  //   setOptionsCOD();
  //   setOptionsNOM(array2);
  // } else {
  //   if (peticion) {
  //     cancelSource.cancel('NOM ancelado');
  //     setCancelSource(axios.CancelToken.source());
  //   }
  // }
};

export const onSelectNOM = data => {
  // optionsNOM.forEach(element => {
  //   if (element.key === data) {
  //     formRef.current.setFieldsValue({
  //       codPaciente: element.cod_paciente,
  //       nombre: `${element.nom_cli + ' ' + element.ape_pat_cli + ' ' + element.ape_mat_cli}`,
  //     });
  //     setPaciente(element);
  //     setValueNOM(data);
  //   }
  // });
};

export const onChangeNOM = data => {
  // if (data.length <= 3) {
  //   setOptionsNOM([]);
  // }
};
