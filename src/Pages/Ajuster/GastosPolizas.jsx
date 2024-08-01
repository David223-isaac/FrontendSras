import React, { useState } from 'react';
import { Form, Input, Button, message, Row, Col, Select } from 'antd';
import axios from 'axios';
import EstadoDeLaPoliza from './EstadoDeLaPoliza';

const { Option } = Select;

const GastosPoliza = ({ Id_SiniestroApasar }) => {


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
            if (otroGasto === 'no') {
                values.Gasto_Adicional = 'No aplica';
                values.MontoGastoAdicional = 0;
                values.ComentarioGastoAdicional = 'No aplica';
            }
            const jsonData = JSON.stringify(values); // Serializar los datos como JSON
            console.log("Datos a enviar" + jsonData);
            const response = await axios.post('http://localhost:8000/GastosPolizas/RegistrarGastos', jsonData, {
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
        } catch (error) {
            message.error('Error al registrar el siniestro');
        }
        setLoading(false);
    };

    const handleOtroGastoChange = (value) => {
        setOtroGasto(value);
    };

    return (
        <div style={{ backgroundColor: '#2e1437', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            {currentStep === 1 && (
                <>
                    <h1 className="title">Gastos de la poliza</h1>
                    <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', marginTop: '2rem', marginBottom: '2rem' }}>
                        <img src="https://cdn-icons-png.flaticon.com/512/6078/6078603.png" style={{ maxHeight: '120px' }} alt="Gastos.jpg"></img>
                    </div>
                    <div className="circle-background" style={{ position: 'absolute', marginTop: '-90px', marginLeft: '-25px' }}></div>
                    <div style={{ backgroundColor: '#2e1437', borderRadius: '20px', padding: '1rem', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <Form layout="vertical" onFinish={onFinish}>
                            <Row gutter={16}>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="ConceptoDeGasto"
                                        label="Concepto del gasto"
                                        rules={[{ required: true, message: 'Por favor ingresa el concepto del gasto realizado' }]}
                                    >
                                        <Select onChange={handleOtroGastoChange}>
                                            <Option value="Caseta">Caseta</Option>
                                            <Option value="Estacionamiento">Estacionamiento</Option>
                                            <Option value="Otro">Otro</Option>
                                        </Select>                                    
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="Monto"
                                        label="Monto"
                                        rules={[{ required: true, message: 'Por favor ingresa el monto del gasto' },
                                            {pattern: /^[0-9]+$/, message: "El monto solo puede contener numeros"}
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="Comentarios"
                                        label="Comentarios / Descripción del gasto"
                                        rules={[{ required: true, message: 'Por favor ingrese una breve descripción' }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="seRequirioOtroGasto"
                                        label="¿Se requirió otro gasto?"
                                        rules={[{ required: true, message: 'Por favor seleccione una opción' }]}
                                    >
                                        <Select onChange={handleOtroGastoChange}>
                                            <Option value="si">Sí</Option>
                                            <Option value="no">No</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            {otroGasto === 'si' && (
                                <>
                                    <Row gutter={16}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="Gasto_Adicional"
                                                label="Gasto adicional"
                                                rules={[{ required: true, message: 'Por favor ingrese el gasto adicional que se requirió' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="MontoGastoAdicional"
                                                label="Monto del gasto adicional"
                                                rules={[{ required: true, message: 'Por favor ingresa el monto del gasto adicional' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="ComentarioGastoAdicional"
                                                label="Comentarios / descripción del gasto adicional"
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
                    <EstadoDeLaPoliza Id_SiniestroApasar={Id_SiniestroApasar} />
                </div>
            )}
        </div>
    );
};

export default GastosPoliza;
