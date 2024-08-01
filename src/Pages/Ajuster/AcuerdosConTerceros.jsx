import React, { useState } from 'react';
import { Form, Input, Button, message, Row, Col, Select } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const AcuerdosConTerceros = ({ Id_SiniestroApasar }) => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [Resultado, setResultado] = useState(null);

    const nombres = localStorage.getItem('nombre');
    const token = localStorage.getItem('token');

    const resultadoOptions = [
        'Acuerdo_externo_Tercero', 
        'Entrega_Orden_Taller', 
        'Pase_Medico_Tercero_Sin_Seguro', 
        'Orden_Tradicional_Cia', 
        'Ninguno', 
        'Huida_Del_Responsable', 
        'Turnado_Civico', 
        'Turnado_Al_Mp'
    ];

    const resultadoOptionsExtends = [
        'Orden_Tradicional_Tercero_Sin_Seguro', 
        'Entrega_Sipac', 
        'Recibe_Sipac', 
        'Orden_Tradicional_Cia', 
        'Recibe_Orden_Tadicional', 
        'Orden_Tradicional_Con_Ahorro_Sipac', 
        'Pase_Medico_Cia', 
        'Recibi_Pase_Medico_Cia',
        'Recuperacion'
    ];

    const onFinish = async (values) => {
        // console.log("token que se tiene: " + token);
        setLoading(true);
        try {
            values.Id_Siniestro = Id_SiniestroApasar;
            values.AjustadorQueRegistra = nombres;


           // Verificar y asignar valores de "No aplica" según el resultado seleccionado
           if (resultadoOptions.includes(Resultado)) {
            values.AseguradoraDeTercero = 'No aplica';
            values.IndicadorDeArribo = 'No aplica';
            values.TiempoDeEspera = 'No aplica';
        }
            const jsonData = JSON.stringify(values);
            // console.log("Datos a enviar: " + jsonData);

            let endpoint = '';
            if (resultadoOptions.includes(Resultado)) {
                endpoint = 'http://localhost:8000/ResultadosTercerosInvolucrados/RegistrarResultadosConTercerosInvolucrados';
            } else if (resultadoOptionsExtends.includes(Resultado)) {
                endpoint = 'http://localhost:8000/ResultadosTercerosInvolucradosExtendidos/RegistrarResultadosConTercerosInvolucrados';
            }

            const response = await axios.post(endpoint, jsonData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            });

            if (response.status === 200) {
                message.success('Acuerdo registrado exitosamente');
                navigate("/PrincipalAjustador");
            } else {
                message.error('Error al registrar el siniestro');
            }
        } catch (error) {
            message.error('Error al registrar el siniestro');
        }
        setLoading(false);
    };

    const handleOtroAcuerdoChange = (value) => {
        setResultado(value);
    };

    return (
        <div style={{borderRadius: '8px', textAlign: 'center', width: '102%'}}>
            <h1 className="title">Acuerdos con Terceros involucrados</h1>
            <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', marginTop: '2rem', marginBottom: '2rem' }}>
                <img src="https://cdn-icons-png.flaticon.com/512/1604/1604716.png" style={{ maxHeight: '150px' }} alt="Gastos.jpg" />
            </div>
            <div className="circle-background" style={{ position: 'absolute', marginTop: '-90px', marginLeft: '-25px' }}></div>
            <Form layout="vertical" onFinish={onFinish}>
                <Row gutter={16}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="Resultado"
                            label="Seleccione el resultado al que se llego con el tercero"
                            rules={[{ required: true, message: 'Por favor seleccione una opción' }]}
                        >
                            <Select onChange={handleOtroAcuerdoChange}>
                                <Option value="Acuerdo_externo_Tercero">Acuerdo externo con el tercero</Option>
                                <Option value="Entrega_Orden_Taller">Entregué orden al taller</Option>
                                <Option value="Pase_Medico_Tercero_Sin_Seguro">Entregue pase médico al tercero sin seguro</Option>
                                <Option value="Orden_Tradicional_Tercero_Sin_Seguro">Entregue orden tradicional al tercero sin seguro</Option>
                                <Option value="Orden_Tradicional_Cia">Entregue orden tradicional CIA</Option>
                                <Option value="Entrega_Sipac">Entregue SIPAC</Option>
                                <Option value="Recibe_Sipac">Recibí SIPAC</Option>
                                <Option value="Recibe_Orden_Tadicional">Recibí orden tradicional</Option>
                                <Option value="Orden_Tradicional_Con_Ahorro_Sipac">Entregue orden tradicional con ahorro SIPAC</Option>
                                <Option value="Pase_Medico_Cia">Entregue pase médico CIA</Option>
                                <Option value="Ninguno">Ninguno</Option>
                                <Option value="Turnado_Civico">Turnado al cívico</Option>
                                <Option value="Huida_Del_Responsable">El responsable huyó</Option>
                                <Option value="Recibi_Pase_Medico_Cia">Recibí pase médico CIA</Option>
                                <Option value="Recuperacion">Recuperación</Option>
                                <Option value="Turnado_Al_Mp">Turnado al MP</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                {resultadoOptions.includes(Resultado) && (
                    <>
                        <Row gutter={16}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="NumeroDeOrdenDelDocumento"
                                    label="Folio del documento entregado"
                                    rules={[{ required: true, message: 'Por favor seleccione una opción' },
                                        {pattern: /^[0-9]+$/, message: "el folio solo debe contener numeros"},
                                        {len: 15, message: "La longitud es incorrecta"}
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="Comentarios"
                                    label="Comentarios sobre el resultado obtenido"
                                    rules={[{ required: true, message: 'Por favor seleccione una opción' }]}
                                >
                                    <Input/>
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="ResultadoAdicional"
                                    label="Resultado adicional que se hubiese obtenido"
                                    rules={[{ required: true, message: 'Por favor seleccione una opción' },
                                        {max: 80, message: "El resultado no puede ser tan largo"}
                                    ]}
                                >
                                    <Input/>
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="ComentariosResultadoAdicional"
                                    label="Comentarios sobre el resultado adicional obtenido"
                                    rules={[{ required: true, message: 'Por favor seleccione una opción' },
                                        {max: 120, message: "El comentario no puede ser tan largo"}

                                    ]}
                                >
                                    <Input/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                )}
                {resultadoOptionsExtends.includes(Resultado) && (
                              <>
                              <Row gutter={16}>
                                  <Col xs={24} md={12}>
                                      <Form.Item
                                          name="MontoDelAcuerdo"
                                          label="Monto del acuerdo al que se llego"
                                          rules={[{ required: true, message: 'Por favor seleccione una opción' },
                                            {pattern: /^[0-9]+$/, message: "El monto solo puede tener numeros"},
                                            {max: 4, message: "El monto no puede ser tan alto"}
                                          ]}
                                      >
                                          <Input />
                                      </Form.Item>
                                  </Col>
                                  <Col xs={24} md={12}>
                                      <Form.Item
                                          name="NombreDelTercero"
                                          label="Nombre o razón social del tercero involucrado"
                                          rules={[{ required: true, message: 'Por favor ingrese el dato solicitado' },
                                            {max: 50, message: "Nombre demasiado largo"}
                                          ]}
                                      >
                                        <Input />
                                      </Form.Item>
                                  </Col>

                                  <Col xs={24} md={12}>
                                      <Form.Item
                                          name="TipoDeVehiculo"
                                          label="Tipo del vehiculo involucrado"
                                          rules={[{ required: true, message: 'Por favor seleccione una opción' }]}
                                      >
                                          <Select>
                                              <Option value="SUV">SUV</Option>
                                              <Option value="Compacto">Compacto</Option>
                                              <Option value="Subcompacto">Subcompacto</Option>
                                              <Option value="PickUp">PickUp</Option>
                                              <Option value="Equipo_pesado">Equipo pesado</Option>
                                              <Option value="Deportivo">Deportivo</Option>
                                              <Option value="De_Lujo">De Lujo</Option>
                                              <Option value="Minivan">Minivan</Option>
                                          </Select>
                                      </Form.Item>
                                  </Col>

                                  <Col xs={24} md={12}>
                                      <Form.Item
                                          name="MarcaDelVehiculo"
                                          label="Marca del vehiculo involucrado"
                                          rules={[{ required: true, message: 'Por favor seleccione una opción' },
                                            {max: 20, message: "Marca demasiado larga"}
                                          ]}
                                      >
                                        <Input />
                                      </Form.Item>
                                  </Col>
                                  <Col xs={24} md={12}>
                                      <Form.Item
                                          name="ModeloDelVehiculo"
                                          label="Modelo del vehiculo involucrado"
                                          rules={[{ required: true, message: 'Por favor seleccione una opción' },
                                            {max: 50, message: "El modelo no debe ser demasiado largo"}
                                          ]}
                                      >
                                        <Input />
                                      </Form.Item>
                                  </Col>
                                  <Col xs={24} md={12}>
                                      <Form.Item
                                          name="ColorDelVehiculo"
                                          label="Color del vehiculo involucrado"
                                          rules={[{ required: true, message: 'Por favor seleccione una opción' },
                                            {max: 20, message: "El color es demasiado largo"}
                                          ]}
                                      >
                                        <Input />
                                      </Form.Item>
                                  </Col>
                                  <Col xs={24} md={12}>
                                      <Form.Item
                                          name="AnioLanzamientoDelVehiculo"
                                          label="Año de lanzamiento del vehiculo"
                                          rules={[{ required: true, message: 'Por favor seleccione una opción' },
                                            {max: 4, message: "El año es demasiado largo"}
                                          ]}
                                      >
                                        <Input />
                                      </Form.Item>
                                  </Col>                                  
                                  {/* <Col xs={24} md={12}>
                                      <Form.Item
                                          name="ColorDelVehiculo"
                                          label="Color del vehiculo involucrado"
                                          rules={[{ required: true, message: 'Por favor seleccione una opción' }]}
                                      >
                                        <Input />
                                      </Form.Item>
                                  </Col>                                   */}
                                  <Col xs={24} md={12}>
                                      <Form.Item
                                          name="PlacasDelVehiculo"
                                          label="Placas del vehiculo involucrado"
                                          rules={[{ required: true, message: 'Por favor seleccione una opción' },
                                            {max: 7, message: "La placa es demasiado larga"},
                                            {min: 6, message: "la placa es demasiado corta"}
                                          ]}
                                      >
                                        <Input />
                                      </Form.Item>
                                  </Col>                                  
                                  <Col xs={24} md={12}>
                                    <Form.Item
                                        name="UsoDelVehiculo"
                                        label="Uso del veiculo involucrado"
                                        rules={[{ required: true, message: 'Por favor seleccione una opción' }]}
                                    >
                                        <Select>
                                            <Option value="particular">particular</Option>
                                            <Option value="carga">carga</Option>
                                            <Option value="transporte_publico">transporte publico</Option>

                                        </Select>                                      
                                    </Form.Item>
                                  </Col>
                                  <Col xs={24} md={12}>
                                      <Form.Item
                                          name="ResultadoExtra"
                                          label="Resultado adicional con el tercero"
                                          rules={[{ required: true, message: 'Por favor seleccione una opción' }]}
                                      >
                                        <Input />
                                      </Form.Item>
                                  </Col> 
                              </Row>
                          </>
                )}
                <Button type="primary" htmlType="submit" loading={loading} style={{ marginTop: '16px' }}>
                    Enviar
                </Button>
            </Form>
        </div>
    );
};

export default AcuerdosConTerceros;
