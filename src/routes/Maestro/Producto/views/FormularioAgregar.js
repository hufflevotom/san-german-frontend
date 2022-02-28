import React, { createRef, useEffect, useState } from 'react';
import { Form, Input, Button, Card, Select, Image } from 'antd';
import {
	LeftOutlined,
	MinusCircleOutlined,
	PlusOutlined,
	DeleteOutlined,
	SearchOutlined,
} from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	setAlmacenId,
	setClear,
	setCodigo,
	setDescripcion,
} from '../../../../appRedux/actions/Maestro/Producto';
import { listarAlmacenes } from '../../../Configuracion/Almacen/controllers';
import { listarFamilias } from '../../Familia/controllers';
import { guardarProducto, obtenerProducto } from '../controllers';
import { URL_BASE_LOCAL } from '../../../../constants/Config';
import { ModalImagen } from './ModalImagen';

export const FormularioAgregar = () => {
	const formRef = createRef();
	const dispatch = useDispatch();
	const [modalImagen, setModalImagen] = useState(false);
	const { id } = useParams();
	const { almacen } = useSelector(state => state.almacen);
	const { familia } = useSelector(state => state.familia);

	const { codigo, descripcion, almacenId, atributosId } = useSelector(state => state.producto);

	useEffect(() => {
		listarAlmacenes();
		listarFamilias();
	}, []);

	useEffect(() => {
		if (id) {
			obtenerProducto(id);
		}
	}, [id]);

	useEffect(() => {
		console.log('atributosId', atributosId);
		formRef.current.setFieldsValue({
			id: id,
			codigo: codigo,
			descripcion: descripcion,
			almacenId: almacenId,
			atributosId: atributosId,
		});
	}, [id, codigo, descripcion, almacenId, atributosId]);

	const getFile = e => {
		console.log('Upload event:', e.target.files[0]);

		return e.target.files[0];
	};

	const abrirImagen = () => {
		return (
			<Image
				width={200}
				src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
			/>
		);
	};

	return (
		<>
			<Card
				title={
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<div style={{ display: 'flex', flexDirection: 'row' }}>
							<Button
								type="link"
								style={{ margin: 0, padding: 0 }}
								onClick={() => dispatch(setClear())}
							>
								<Link to="/maestro/producto">
									<LeftOutlined style={{ fontSize: '16px', margin: 0, paddingTop: '5px' }} />
								</Link>
							</Button>
							<h1 style={{ margin: '0 0 0 20px', paddingTop: '3px' }}>
								{id ? 'Actualizar' : 'Crear'} Producto
							</h1>
						</div>
						<div>
							<Button
								type="primary"
								style={{ margin: 0 }}
								htmlType="submit"
								onClick={() => {
									if (id) {
									} else {
										guardarProducto(formRef.current);
									}
								}}
							>
								{id ? 'Actualizar' : 'Guardar'}
							</Button>
						</div>
					</div>
				}
			>
				<Form
					name="wrap"
					labelCol={{
						flex: '110px',
					}}
					labelAlign="left"
					labelWrap
					wrapperCol={{
						flex: 1,
					}}
					colon={false}
					style={{ padding: '0 50px 0 50px' }}
					ref={formRef}
				>
					<Form.Item label="Id" name="id" style={{ display: 'none' }}>
						<Input placeholder="Ingrese el id del producto" />
					</Form.Item>
					<Form.Item
						label="Código"
						name="codigo"
						rules={[
							{
								required: true,
								message: 'El codigo es requerido',
							},
						]}
					>
						<Input placeholder="Ingrese el código del producto" />
					</Form.Item>
					<Form.Item
						label="Descripción"
						name="descripcion"
						rules={[
							{
								required: true,
								message: 'La descripcion es requerida',
							},
						]}
					>
						<Input placeholder="Ingrese la descripción del producto" />
					</Form.Item>
					<Form.Item
						label="Almacén"
						name="almacenId"
						rules={[
							{
								required: true,
								message: 'El almacén es requerido',
							},
						]}
					>
						<Select placeholder="Seleccione el almacén">
							{almacen
								? almacen.map(element => {
										return (
											<Select.Option key={element._id} value={element._id}>
												{element.nombre}
											</Select.Option>
										);
								  })
								: null}
						</Select>
					</Form.Item>
					<Form.Item
						label="Familia"
						name="familiaId"
						rules={[
							{
								required: true,
								message: 'La familia es requerida',
							},
						]}
					>
						<Select
							placeholder="Seleccione la familia"
							//onChange={(e) => dispatch(setAlmacenId(e))}
						>
							{familia
								? familia.map(element => {
										return (
											<Select.Option key={element._id} value={element._id}>
												{element.nombre}
											</Select.Option>
										);
								  })
								: null}
						</Select>
					</Form.Item>

					<Form.List name="atributosId">
						{(fieldsPadre, { add, remove }) => {
							return (
								<>
									{fieldsPadre.map(({ key: keyPadre, name: namePadre, ...restField }) => (
										<div
											style={{
												display: 'flex',
												flexDirection: 'row',
												margin: '0 20px 20px 0',
												gap: '20px',
												alignItems: 'start',
											}}
										>
											<Form.Item
												{...restField}
												name={[namePadre, 'nombre']}
												style={{ margin: 0, width: 'auto' }}
											>
												<Input placeholder="Atributo" style={{ margin: 0 }} />
											</Form.Item>

											<Form.List
												name={[namePadre, 'opciones']}
												style={{ margin: 0, width: '100%' }}
											>
												{(fieldsHijo, { add, remove }) => (
													<div style={{ display: 'flex', flexDirection: 'column' }}>
														{fieldsHijo.map(({ key: keyHijo, name: nameHijo, ...restField }) => {
															console.log(
																'imagenUrl',
																atributosId[keyPadre].opciones[keyHijo].imagenUrl
															);

															return (
																<div
																	style={{
																		display: 'flex',
																		flexDirection: 'row',
																		margin: '0 20px 10px 0',
																		gap: '20px',
																		alignItems: 'center',
																	}}
																>
																	<Form.Item
																		{...restField}
																		name={[nameHijo, 'nombre']}
																		style={{ margin: 0, width: '100%' }}
																	>
																		<Input placeholder="Opciones" style={{ margin: 0 }} />
																	</Form.Item>

																	{/*  <Form.Item
                                    {...restField}
                                    name={[name, "nombre"]}>                                
                                    <Image width={200} src={URL_BASE_LOCAL + '/'} />  
                                  </Form.Item> */}

																	<Form.Item
																		{...restField}
																		name={[nameHijo, 'imagenUrl']}
																		style={{ margin: 0, width: 'auto' }}
																	>
																		{/* <SearchOutlined onClick={ } /> */}
																	</Form.Item>

																	<Form.Item
																		getValueFromEvent={getFile}
																		valuePropName="file"
																		{...restField}
																		name={[nameHijo, 'imagenUrl']}
																		rules={[
																			{
																				required: true,
																				message: 'Missing first name',
																			},
																		]}
																		style={{ margin: 0, width: '100%' }}
																	>
																		<Input type="file" accept=".jpg,.jpeg,.png" />
																	</Form.Item>
																	<MinusCircleOutlined onClick={() => remove(nameHijo)} />
																</div>
															);
														})}

														<Form.Item style={{ margin: 0 }}>
															<Button
																type="dashed"
																onClick={() => add()}
																block
																icon={<PlusOutlined />}
																style={{ margin: 0 }}
															>
																Agregar Opciones
															</Button>
														</Form.Item>
													</div>
												)}
											</Form.List>
											<DeleteOutlined
												onClick={() => remove(namePadre)}
												style={{ marginTop: '10px' }}
											/>
										</div>
									))}

									<Form.Item style={{ marginTop: '20px' }}>
										<Button
											type="dashed"
											onClick={() => add()}
											block
											icon={<PlusOutlined />}
											style={{ margin: 0 }}
										>
											Agregar Atributo
										</Button>
									</Form.Item>
								</>
							);
						}}
					</Form.List>
				</Form>
			</Card>
			{modalImagen && <ModalImagen />}
		</>
	);
};
