
import React, { useState } from 'react';
import { Form, Input, Button, message, Row, Col, Select } from 'antd';
import axios from 'axios';
import TercerosSiniestroNormal from './TercerosSiniestroNormal';

const { Option } = Select;

const AcuerdoConInvolucrado = ({ Id_SiniestroApasar }) => {
    const [loading, setLoading] = useState(false);
    const [otroAcuerdo, setOtroAcuerdo] = useState(null);
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
                values.OtroAcuerdo = 'No aplica';
                values.NumeroDeOrdenDeAcuerdoAdicional = 'No aplica';
            }else{
                
                console.log("Error al realizar settear los datos");
        }
        
        const jsonData = JSON.stringify(values); // Serializar los datos como JSON
        console.log("Datos a enviar" + jsonData);
        const response = await axios.post('http://localhost:8000/AcuerdosConInvolucrado/RegistrarAcuerdosConInvolucrado', jsonData, {
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

    return (
        <div style={{ backgroundColor: '#34C0D9', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            {currentStep === 1 && (
                <>
                    <h1 className="title">Acuerdo con el involucrado</h1>
                    <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', marginTop: '2rem', marginBottom: '2rem' }}>
                        <img src="https://cdn-icons-png.flaticon.com/512/3280/3280897.png" style={{ maxHeight: '150px' }} alt="Gastos.jpg"></img>
                    </div>
                    <div className="circle-background" style={{ position: 'absolute', marginTop: '-90px', marginLeft: '-25px' }}></div>
                    <div style={{ backgroundColor: '#34C0D9', borderRadius: '20px', padding: '1rem', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <Form layout="vertical" onFinish={onFinish}>
                        <Row gutter={16}>
 
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="Acuerdo"
                                    label="Acuerdo al que se llego"
                                    rules={[{ required: true, message: 'Por favor ingrese el acuerdo al que se llego' }]}
                                >
                                    <Input/>
                                </Form.Item>
                            </Col>
                            </Row>
                            <Row gutter={16}>
 
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="NumeroDeDocumento"
                                        label="Ingrese el numero del documento del acuerdo que se acordo"
                                        rules={[{ required: true, message: 'Por favor ingrese el acuerdo al que se llego' },
                                            {len: 15, message: "La longitud es incorrecta"},
                                            {pattern: /^[0-9]+$/, message: "El folio solo debe contener numeros"}
                                        ]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                </Row>
                            <Row gutter={16}>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="IndicadorAcuerdoAdicional"
                                        label="¿Se llego a otro acuerdo con el involucrado?"
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
                                                name="OtroAcuerdo"
                                                label="Ingrese el acuerdo adicional al que se llego"
                                                rules={[{ required: true, message: 'Por favor ingrese el gasto adicional que se requirió' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>

                                    </Row>

                                    <Row gutter={16}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="NumeroDeOrdenDeAcuerdoAdicional"
                                                label="Numero de acuerdo adicional"
                                                rules={[{ required: true, message: 'Por favor ingrese una breve descripción del gasto adicional' },
                                                    {pattern: /^[0-9]+$/, message: "El folio solo debe contener numeros"},
                                                    {len: 15, message:"la longitud es incorrecta"}
                                                ]}
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
                                            Registrar acuerdo
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
                    <TercerosSiniestroNormal Id_SiniestroApasar={Id_SiniestroApasar} />
                </div>
            )}
        </div>
    );
};

export default AcuerdoConInvolucrado;
