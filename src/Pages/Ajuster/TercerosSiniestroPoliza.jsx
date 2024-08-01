import React, { useState } from 'react';
import { Form, Input, Button, message, Row, Col, Select } from 'antd';
import axios from 'axios';
import AcuerdosConTercerosPolizas from './AcuerdosConTercerosPolizas';

const { Option } = Select;

const TercerosSiniestroPoliza = ({ Id_SiniestroApasar }) => {
    const [loading, setLoading] = useState(false);
    const [otroAcuerdo, setOtroAcuerdo] = useState(null);
    const [ArriboPrimero, setArriboPrimero] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);

    const nombres = localStorage.getItem('nombre');
    const token = localStorage.getItem('token');

    const onFinish = async (values) => {
        console.log("token que se tiene: " + token);
        setLoading(true);
        try {
            values.Id_Siniestro = Id_SiniestroApasar;
            values.AjustadorQueRegistra = nombres;

            if (otroAcuerdo === 'No') {
                values.AseguradoraDeTercero = 'No aplica';
                values.IndicadorDeArribo = 'No aplica';
                values.TiempoDeEspera = 'No aplica'; // Asegurar valor cuando el otro acuerdo es No
            } else if (ArriboPrimero === 'No') {
                values.TiempoDeEspera = 'No aplica'; // Asegurar valor cuando no se arriba primero
            }

            const jsonData = JSON.stringify(values);
            console.log("Datos a enviar" + jsonData);
            const response = await axios.post('http://localhost:8000/TercerosInvolucradosPoliza/RegistrarTercerosInvolucrados', jsonData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            });

            if (response.status === 200) {
                message.success('Acuerdo registrado exitosamente');
                setCurrentStep(2);  // Avanzar al siguiente paso
            } else {
                message.error('Error al registrar el siniestro');
            }
        } catch (error) {
            message.error('Error al registrar el siniestro');
        }
        setLoading(false);
    };

    const handleOtroAcuerdoChange = (value) => {
        setOtroAcuerdo(value);
    };

    const handleArrioPrimeroChange = (value) => {
        setArriboPrimero(value);
    };

    return (
        <div style={{ borderRadius: '8px', textAlign: 'center', width: '100%'}}>
            {currentStep === 1 && (
                <>
                    <h1 className="title">Terceros involucrados en la poliza</h1>
                    <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', marginTop: '2rem', marginBottom: '2rem' }}>
                        <img src="https://cdn-icons-png.flaticon.com/512/10204/10204296.png" style={{ maxHeight: '150px' }} alt="Gastos.jpg"></img>
                    </div>
                    <div className="circle-background" style={{ position: 'absolute', marginTop: '-90px', marginLeft: '-25px' }}></div>
                    <Form layout="vertical" onFinish={onFinish}>
                        <Row gutter={16}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="TipoTercero"
                                    label="Tercero que se vio involucrado"
                                    rules={[{ required: true, message: 'Por favor ingrese el tipo de tercero que se vio involucrado' }]}
                                >
                                    <Select>
                                        <Option value="Vehiculo">Vehiculo automotor</Option>
                                        <Option value="Peaton">Peaton</Option>
                                        <Option value="Semoviente">Semoviente</Option>
                                        <Option value="Inmoviliario">Inmoviliario</Option>
                                    </Select>                                   
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="TipoDeAccidente"
                                    label="Tipo de accidente presentado con el tercero"
                                    rules={[{ required: true, message: 'Por favor ingrese el acuerdo al que se llego' }]}
                                >
                                    <Input/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="PosecionDeSeguro"
                                    label="¿Posee el tercero seguro?"
                                    rules={[{ required: true, message: 'Por favor seleccione una opción' }]}
                                >
                                    <Select onChange={handleOtroAcuerdoChange}>
                                        <Option value="Si">Si</Option>
                                        <Option value="No">No</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        {otroAcuerdo === 'Si' && (
                            <>
                                <Row gutter={16}>
                                    <Col xs={24} md={12}>
                                        <Form.Item
                                            name="AseguradoraDeTercero"
                                            label="Cuál es su compañia aseguradora?"
                                            rules={[{ required: true, message: 'Por favor seleccione una opción' }]}
                                        >
                                            <Select>
                                                <Option value="AXA Seguros">AXA Seguros</Option>
                                                <Option value="GNP ">GNP </Option>
                                                <Option value="Quálitas">Quálitas</Option>
                                                <Option value="MAPFRE">MAPFRE</Option>
                                                <Option value="Banorte">Banorte</Option>
                                                <Option value="Zurich">Zurich</Option>
                                                <Option value="Atlas">Atlas</Option>
                                                <Option value="HDI">HDI</Option>
                                                <Option value="Seguros Monterrey">Seguros Monterrey</Option>
                                                <Option value="Inbursa">Inbursa</Option>
                                                <Option value="BBVA">BBVA</Option>
                                                <Option value="Chubb">Chubb</Option>
                                                <Option value="Afirme">Afirme</Option>
                                                <Option value="SURA">SURA</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Form.Item
                                            name="IndicadorDeArribo"
                                            label="LLegue primero?"
                                            rules={[{ required: true, message: 'Por favor seleccione una opción' }]}
                                        >
                                            <Select onChange={handleArrioPrimeroChange}>
                                                <Option value="Si">Si</Option>
                                                <Option value="No">No</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                {ArriboPrimero === 'Si' && (
                                    <Row gutter={16}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="TiempoDeEspera"
                                                label="¿Cuanto tiempo se espero a la aseguradora del tercero?"
                                                rules={[{ required: true, message: 'Por favor ingrese el tiempo que se espero a la aseguradora del tercero' }]}
                                            >
                                                <Input/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                )}
                            </>
                        )}
                        <Row gutter={16}>
                            <Col xs={24}>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                        Registrar acuerdo
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </>
            )}
            {currentStep === 2 && (
                <div>
                    <AcuerdosConTercerosPolizas Id_SiniestroApasar={Id_SiniestroApasar} />
                </div>
            )}
        </div>
    );
};

export default TercerosSiniestroPoliza;
