
import React, { useState } from 'react';
import { Form, Input, Button, message, Row, Col, Select } from 'antd';
import axios from 'axios';
import AcuerdoConInvolucrado from './AcuerdoConInvolucrado';
import { useNavigate } from 'react-router-dom';


const { Option } = Select;


const GastosDelSiniestro = ({ Id_SiniestroApasar }) => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [otroGasto, setOtroGasto] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);

    const nombres = localStorage.getItem('nombre');
    const token = localStorage.getItem('token');

    const onFinish = async (values) => {
        console.log("token que se tiene: " + token);
        setLoading(true);
        try {
            values.Id_Siniestro = Id_SiniestroApasar;
            values.AjustadorQueRegistra = nombres;
            if (otroGasto === 'improcedente') {
                values.NombreDelInvolucradoDirecto = 'No aplica';
                values.TelefonoDeInvolucradoDirecto = 0;
                values.CorreoDelInvolucradoDirecto = 'No aplica';
                values.EdadDelInvolucradoTercero = 0;
                values.SexoDelInvolucradoDirecto = 'No aplica';
                values.UsoDelVeiculo = 'No aplica';
                values.Rol = 'No aplica';

                const jsonData = JSON.stringify(values); // Serializar los datos como JSON
            console.log("Datos a enviar" + jsonData);
            const response = await axios.post('http://localhost:8000/EstadosInprocedentesSiniestros/RegistrarEstadosInprocedentes', jsonData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            });

            if (response.status === 200) {
                message.success('Gasto del siniestro registrado correctamente');
                navigate("/PrincipalAjustador");
            } else {
                message.error('Error al registrar el siniestro');
            }

            }else{
            values.RazonDeInprocedencia = 'No aplica';
            values.MontoInvolucrado = 0;

            const jsonData = JSON.stringify(values); // Serializar los datos como JSON
            console.log("Datos a enviar" + jsonData);
            const response = await axios.post('http://localhost:8000/EstadosProcedentesSiniestros/RegistrarEstadosProcedentes', jsonData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            });

            if (response.status === 200) {
                message.success('Gasto del siniestro registrado correctamente');
                setCurrentStep(2);  // Avanzar al siguiente paso
            } else {
                message.error('Error al registrar el siniestro');
            }
        }
        } catch (error) {
            message.error('Error al registrar el siniestro');
        }
        setLoading(false);
        
    };

    const handleOtroGastoChange = (value) => {
        setOtroGasto(value);
    };

    return (
        <div style={{ backgroundColor: '#34C0D9', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            {currentStep === 1 && (
                <>
                    <h1 className="title">Estado del siniestro</h1>
                    <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', marginTop: '2rem', marginBottom: '2rem' }}>
                        <img src="https://cdn-icons-png.flaticon.com/512/2535/2535541.png" style={{ maxHeight: '120px' }} alt="Gastos.jpg"></img>
                    </div>
                    <div className="circle-background" style={{ position: 'absolute', marginTop: '-90px', marginLeft: '-25px' }}></div>
                    <div style={{ backgroundColor: '#34C0D9', borderRadius: '20px', padding: '1rem', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <Form layout="vertical" onFinish={onFinish}>
                        <Row gutter={16}>
                                    <Col xs={24} md={12}>
                                            <Form.Item
                                                name="LugarDeOcurrido"
                                                label="Ingrese el lugar donde ocurrio el siniestro"
                                                rules={[{ required: true, message: 'Por favor ingrese una breve descripción del gasto adicional' }]}
                                            >
                                                <Select onChange={handleOtroGastoChange}>
                                                    <Option value="Carretera">Carretera</Option>
                                                    <Option value="Crucero">Crucero</Option>
                                                    <Option value="Autopista">Autopista</Option>
                                                    <Option value="Ministerio">Ministerio publico</Option>
                                                    <Option value="Juzgado">Juzgado</Option>
                                                </Select> 
                                            </Form.Item>
                                        </Col>
                                    </Row>
                            
                            <Row gutter={16}>
 
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="seRequirioOtroGasto"
                                        label="Estado del siniestro"
                                        rules={[{ required: true, message: 'Por favor seleccione una opción' }]}
                                    >
                                        <Select onChange={handleOtroGastoChange}>
                                            <Option value="procedente">Procedente</Option>
                                            <Option value="improcedente">Improcedente</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            {otroGasto === 'procedente' && (
                                <>
                                    <Row gutter={16}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="NombreDelInvolucradoDirecto"
                                                label="Nombre del involucrado directo"
                                                rules={[{ required: true, message: 'Por favor ingrese el gasto adicional que se requirió' },
                                                    {max: 30, message: "La longitud es muy larga"},
                                                    {min: 12, message: "La lonitud es demasiado corta"}
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="TelefonoDeInvolucradoDirecto"
                                                label="Telefono del involucrado directo"
                                                rules={[{ required: true, message: 'Por favor ingresa el monto del gasto adicional' },
                                                    {len: 10, message: "La longitud es incorrecta"},
                                                    {pattern: /^[0-9]+$/, message: "El telefono solo debe tener numeros"}
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="CorreoDelInvolucradoDirecto"
                                                label="Correo del involucrado directo"
                                                rules={[{ required: true, message: 'Por favor ingrese una breve descripción del gasto adicional' },
                                                    {type: "email", message: "Ingrese un correo valido"}
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="EdadDelInvolucradoTercero"
                                                label="Edad del involucrado directo"
                                                rules={[{ required: true, message: 'Por favor ingrese una breve descripción del gasto adicional' },
                                                    {pattern: /^[0-9]+$/, message: "La edad solo dee contener numeros"}
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="SexoDelInvolucradoDirecto"
                                                label="Sexo del involucrado directo"
                                                rules={[{ required: true, message: 'Por favor ingrese una breve descripción del gasto adicional' }]}
                                            >
                                                <Select>
                                                    <Option value="Masculino">Masculino</Option>
                                                    <Option value="Femenino">Femenino</Option>
                                                    <Option value="Otro">Otro</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="UsoDelVeiculo"
                                                label="Uso del vehiculo involucrado"
                                                rules={[{ required: true, message: 'Por favor ingrese una breve descripción del gasto adicional' }]}
                                            >
                                                <Select>
                                                    <Option value="Carga">Carga</Option>
                                                    <Option value="Particular">Particular</Option>
                                                    <Option value="Transporte publico">Transporte publico</Option>
                                                </Select>                                            
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="Rol"
                                                label="Rol del involucrado directo"
                                                rules={[{ required: true, message: 'Por favor ingrese una breve descripción del gasto adicional' }]}
                                            >
                                                <Select>
                                                    <Option value="Responsable">Responsable</Option>
                                                    <Option value="Afectado">Afectado</Option>
                                                    <Option value="Corresponsable">Corresponsable</Option>
                                                </Select>                                             
                                            </Form.Item>
                                        </Col>
                                    </Row>
 
                                </>
                            )}
                        {otroGasto === 'improcedente' && (
                                <>
                                 <Row gutter={16}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="RazonDeInprocedencia"
                                                label="Razón de improcedencia"
                                                rules={[{ required: true, message: 'Por favor ingrese una breve descripción del gasto adicional' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="MontoInvolucrado"
                                                label="Monto involucrado en siniestro (cualquier tipo de gasto que se presntara)"
                                                rules={[{ required: true, message: 'Por favor ingrese una breve descripción del gasto adicional' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                      </>
                            )}
                            <Row gutter={16}>
                                <Col xs={24}>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                            Registrar Siniestro
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </>
            )}
            {currentStep === 2 && (
                <div>
                    <AcuerdoConInvolucrado Id_SiniestroApasar={Id_SiniestroApasar} />
                </div>
            )}
        </div>
    );
};

export default GastosDelSiniestro;
