import React, { useState } from 'react';
import { Form, Input, DatePicker, Button, message, Row, Col, Layout, Upload, Select} from 'antd';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import GastosDelSiniestro from './GastosDelSiniestro';
import citiesByState from '../Resources/citiesByState.json';


const { Header } = Layout;

const RegistroSiniestroForm = () => {

    const { Option } = Select;

    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
    const nombres = localStorage.getItem('nombre');
    const token = localStorage.getItem('token');
    const [pdfFile, setPdfFile] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [idSiniestro, setIdSiniestro] = useState(null);


    const pdfUploadProps = {
        beforeUpload: (file) => {
            setPdfFile(file); // Set the PDF file to state
            return false;  // Prevent upload to server
        },
        fileList: pdfFile ? [pdfFile] : [],
    };

    const onFinish = async (values) => {
        setLoading(true);
        try {
            // Create a FormData instance
            const formData = new FormData();

            // Add form values to FormData
            Object.keys(values).forEach(key => {
                if (values[key] !== undefined && values[key] !== null) {
                    // Format date values
                    if (key === 'Fecha_Ocurrido' || key === 'Fecha_Atencion') {
                        formData.append(key, values[key].format('YYYY-MM-DD'));
                    } else {
                        formData.append(key, values[key]);
                    }
                }
            });

            // Add other fields
            formData.append('AjustadorQueRegistra', nombres);

            // Add PDF file to FormData
            if (pdfFile) {
                formData.append('PDF', pdfFile);
            }

            // Send POST request to server
            const response = await axios.post('http://localhost:8000/Siniestros/RegistrarSiniestro', formData, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.status === 200) {
                message.success('Siniestro registrado correctamente');
                const siniestroId = response.data.data.id;
                setIdSiniestro(siniestroId);
                setCurrentStep(2);  // Avanzar al siguiente paso
            } else {
                message.error('Error al registrar el siniestro');
            }
        } catch (error) {
            console.error('Error al registrar el siniestro:', error);
            message.error('Error al registrar el siniestro');
        }
        setLoading(false);
    };
    const [form] = Form.useForm();

    const handleStateChange = (value) => {
        const selectedCities = citiesByState[value] || [];
        setCities(selectedCities);
        form.setFieldsValue({ Ciudad: undefined });
      };

    return (
        <div style={{ backgroundColor: '#4174E0', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            {currentStep === 1 && (
                <div>
                    <Header style={{ backgroundColor: 'black', textAlign: 'center', paddingBottom: '2rem', borderRadius: '10px', marginBottom: '1rem', width: '100%' }}>
                        <h1 className="title">Datos generales del siniestro</h1>
                    </Header>
                    <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', marginTop: '2rem', marginBottom: '2rem' }}>
                        <img src="https://cdn-icons-png.flaticon.com/256/12125/12125514.png" style={{ maxHeight: '200px' }} alt="Imagen de registro de siniestro" />
                    </div>
                    <div className="circle-background" style={{ position: 'absolute', marginTop: '-90px', marginLeft: '-25px' }}></div>
                    <div style={{ backgroundColor: '#5995E1', borderRadius: '20px', padding: '1rem', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <Form layout="vertical" onFinish={onFinish}>
                            <Row gutter={16}>
                                <Col xs={24} md={12}>
                                    <Form.Item name="Numero_Siniestro" 
                                    label="Número de Siniestro" 
                                    rules={[{ required: true, message: 'Por favor ingresa el número de siniestro' },
                                        {pattern: /^[0-9]+$/, message: "El folio solo debe tener numeros"},
                                        {len: 15, message: "la longitud es incorrecta"}
                                    ]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item name="Folio_Edua" 
                                    label="Folio EDUA" 
                                    rules={[{ required: true, message: 'Por favor ingresa el folio EDUA' },
                                        {len: 17, message: "La longitud es incorrecta"},
                                        {pattern: /^[0-9]+$/, message: "El folio solo debe tener nnumeros"}
                                    ]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={24} md={12}>
                                    <Form.Item name="Fecha_Ocurrido" 
                                    label="Fecha de Ocurrido" 
                                    rules={[{ required: true, message: 'Por favor selecciona la fecha de ocurrencia' }]}>
                                        <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item name="Fecha_Atencion" 
                                    label="Fecha de Atención" 
                                    rules={[{ required: true, message: 'Por favor selecciona la fecha de atención' }]}>
                                        <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={24} md={12}>
                                    <Form.Item name="Numero_Poliza" 
                                    label="Número de Póliza" 
                                    rules={[{ required: true, message: 'Por favor ingresa el número de póliza' },
                                        {len: 15, message: "La longitud es incorrecta"},
                                        {pattern: /^[0-9]+$/, message: "El folio solo debe tener numeros"}
                                    ]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item name="Serie_Vin" 
                                    label="Serie VIN" 
                                    rules={[{ required: true, message: 'Por favor ingresa la serie VIN' },
                                        {len: 17, message: "La longitud es incorrecta"},
                                        {
                                            validator: (_, value) => {
                                              const trimmedValue = value ? value.replace(/\s+/g, '') : '';
                                              if (trimmedValue.length !== 17) {
                                                return Promise.reject(new Error('El campo no permite espacios'));
                                              }
                                              return Promise.resolve();
                                            }
                                          }
                                    ]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={24} md={12}>
                                    <Form.Item name="Placa_Vehiculo" 
                                    label="Placa del Vehículo" 
                                    rules={[{ required: true, message: 'Por favor ingresa la placa del vehículo' },
                                        {min: 6, message: "la longitud es incorrecta"},
                                        {max: 7, message: "la longitud es incorrecta"},
                                        {
                                            validator: (_, value) => {
                                              const trimmedValue = value ? value.replace(/\s+/g, '') : '';
                                              if (trimmedValue.length !== 7) {
                                                return Promise.reject(new Error('El campo no permite espacios'));
                                              }
                                              return Promise.resolve();
                                            }
                                          }
                                    ]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="Estado"
                                        label="Estado"
                                        rules={[{ required: true, message: 'Por favor ingresa el estado' }]}
                                    >
                                        <Select onChange={handleStateChange} placeholder="Selecciona un estado">
                                        {Object.keys(citiesByState).map((state) => (
                                            <Option key={state} value={state}>
                                            {state}
                                            </Option>
                                        ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={24}>
                                    <Form.Item
                                        name="Ciudad"
                                        label="Ciudad"
                                        rules={[{ required: true, message: 'Por favor selecciona una ciudad' }]}
                                    >
                                        <Select placeholder="Selecciona una ciudad" disabled={cities.length === 0}>
                                        {cities.map((city) => (
                                            <Option key={city} value={city}>
                                            {city}
                                            </Option>
                                        ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={24}>
                                    <Form.Item label="PDF" name="PDF">
                                        <Upload {...pdfUploadProps}>
                                            <Button icon={<UploadOutlined />}>Seleccionar PDF</Button>
                                        </Upload>
                                    </Form.Item>
                                </Col>
                            </Row>
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
                </div>
            )}
            {currentStep === 2 && (
                <div>
                    <GastosDelSiniestro Id_SiniestroApasar ={idSiniestro}/>
                </div>
            )}
            <br />
            <br />
            <br />
        </div>
    );
};

export default RegistroSiniestroForm;
