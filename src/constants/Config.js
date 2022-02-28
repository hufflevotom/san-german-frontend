//Ip del servidor local
export const URL_BASE_LOCAL = 'http://192.168.123.10:4000';

//Módulo de Configuración - Almacen
export const GET_ALMACENES = URL_BASE_LOCAL + '/config/almacen';
export const CREATE_ALMACEN = URL_BASE_LOCAL + '/config/almacen';
export const GET_ID_ALMACEN = URL_BASE_LOCAL + '/config/almacen/';
export const UPDATE_ALMACEN = URL_BASE_LOCAL + '/config/almacen/';
export const DELETE_ALMACEN = URL_BASE_LOCAL + '/config/almacen/';

//Módulo de Configuración - Proveedor
export const GET_PROVEEDORES = URL_BASE_LOCAL + '/config/proveedor';
export const CREATE_PROVEEDOR = URL_BASE_LOCAL + '/config/proveedor';
export const GET_ID_PROVEEDOR = URL_BASE_LOCAL + '/config/proveedor/';
export const UPDATE_PROVEEDOR = URL_BASE_LOCAL + '/config/proveedor/';
export const DELETE_PROVEEDOR = URL_BASE_LOCAL + '/config/proveedor/';

//Módulo de Maestro - Productos
export const GET_PRODUCTOS = URL_BASE_LOCAL + '/maestro/producto';
export const CREATE_PRODUCTO = URL_BASE_LOCAL + '/maestro/producto';
export const SUBIR_IMAGEN_OPCION = URL_BASE_LOCAL + '/maestro/producto/opcion/imagen/';
export const GET_ID_PRODUCTO = URL_BASE_LOCAL + '/maestro/producto/';
export const UPDATE_PRODUCTO = URL_BASE_LOCAL + '/maestro/producto/';
export const DELETE_PRODUCTO = URL_BASE_LOCAL + '/maestro/producto/';
export const GET_PRODUCTO_FILTRADO = URL_BASE_LOCAL + '/maestro/producto/filtro/busqueda?limit=20&offset=0&filtro=';

//Módulo de Maestro - Familias
export const GET_FAMILIAS = URL_BASE_LOCAL + '/maestro/familia';
export const GET_FAMILIA = URL_BASE_LOCAL + '/maestro/familia/';
export const CREATE_FAMILIA = URL_BASE_LOCAL + '/maestro/familia';
export const UPDATE_FAMILIA = URL_BASE_LOCAL + '/maestro/familia/';
export const DELETE_FAMILIA = URL_BASE_LOCAL + '/maestro/familia/';

//Módulo de Logística - Órdenes de Compra
export const GET_ORDENES_COMPRA = URL_BASE_LOCAL + '/logistica/ordenCompra';
export const GET_ORDEN_COMPRA = URL_BASE_LOCAL + '/logistica/ordenCompra/';
export const CREATE_ORDEN_COMPRA = URL_BASE_LOCAL + '/logistica/ordenCompra';
export const UPDATE_ORDEN_COMPRA = URL_BASE_LOCAL + '/logistica/ordenCompra/';
export const DELETE_ORDEN_COMPRA = URL_BASE_LOCAL + '/logistica/ordenCompra/';


