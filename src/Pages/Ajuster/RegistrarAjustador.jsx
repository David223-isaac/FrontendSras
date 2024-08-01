import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, Col, Row, Layout, Modal, Select} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../../Styles/FormRegisterAjustador.css';


const { Header } = Layout;

const RegistrarAjustador = () => {

    const { Option } = Select;

    const [isModalVisibleRepetidos, setIsModalVisibleRepetidos] = useState(false);

    
    // const token = localStorage.getItem('token');
    
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({});

    const showModal = () => {
        setIsModalVisibleRepetidos(true);
    };
    
    const handleOk = () => {
        setIsModalVisibleRepetidos(false);
    };
    

    const onFinish = async () => {
        try {
            const values = await form.validateFields();
            const completeFormData = { ...formData, ...values, Rol: 'ajustador'  };

            // console.log('Valores del formulario:', completeFormData);
            if (!completeFormData.Foto_Perfil || completeFormData.Foto_Perfil.length === 0) {
                message.error('Por favor, sube una foto de perfil.');
                return;
            }

            const submitData = new FormData();
            Object.keys(completeFormData).forEach(key => {
                if (key === 'Foto_Perfil') {
                    submitData.append(key, completeFormData[key][0].originFileObj);
                } else {
                    submitData.append(key, completeFormData[key]);
                }
            });

            
            //para validar el registro repetido
            const { CURP: curp } = completeFormData;

            const responserepetido = await fetch(`http://localhost:8000/ValidarRegistro/ValidarRegistroDeUsuario/${curp}`, {
                method: 'GET',
            });
            const dataRepetido = await responserepetido.json();
            if (dataRepetido.bol === true) {
                showModal();
                return;  // Detiene el registro si se detecta un dato duplicado
            }else{
                
           

            const response = await fetch('http://localhost:8000/AjustadoresPublico/RegistrarAjustadores', {
                method: 'POST',
                body: submitData
            });

            if (!response.ok) {
                throw new Error('Error en el servidor');
            }

            message.success('Usuario registrado correctamente');
            navigate("/");
            form.resetFields();
            setFileList([]);
            setCurrentStep(0);  // Reset to the first step
            setFormData({});

            } //aqui termina el else de validar datos repetidos
        } catch (error) {
            console.error('Error:', error.message);
            message.error('Hubo un error al procesar la solicitud');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.error('Failed:', errorInfo);
    };

    const handleNext = async () => {
        try {
            const values = await form.validateFields();
            setFormData(prevData => ({ ...prevData, ...values }));
            setCurrentStep(currentStep + 1);
        } catch (errorInfo) {
            console.error('Failed:', errorInfo);
        }
    };

    const handlePrev = () => {
        setCurrentStep(currentStep - 1);
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const uploadProps = {
        onRemove: (file) => {
            setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
        },
        beforeUpload: (file) => {
            setFileList((prevList) => [...prevList, file]);
            return false;
        },
        fileList,
    };

    return (
        <div style={{backgroundColor: '#21C0DC'}}>
            <div className="circle-background" style={{position: 'absolute', marginTop:'180px', marginLeft:'30px'}}></div>
            <Row justify="center" style={{ flexGrow: 1, padding: '35px', textAlign: 'center' }}>
                <Col xs={24} sm={22} md={20} lg={18} xl={16}>
                    <Form
                        form={form}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        layout="vertical"
                        style={{ padding: '8px', borderRadius: '20px'}}
                    >
                        {currentStep === 0 && (
                            <>
                            <img className="ImgRegisterUser" src="https://www.driving-conduciendo.com/wp-content/uploads/2019/06/cursos-motos.png" alt="Icono Register"></img>
                                <Form.Item
                                    label="Nombres"
                                    name="Nombres"
                                    rules={[{ required: true, message: 'Por favor ingresa tu nombre!' },
                                        {max: 30, message: "Nombre demasiado largo, coloque solo el de pila"},
                                        {min: 5, message: "El nombre no puede ser demasiado corto"}
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Apellidos"
                                    name="Apellidos"
                                    rules={[{ required: true, message: 'Por favor ingresa tu apellido!' },
                                        {max: 50, message: "información ingresada demasiado larga"},
                                        {min: 6, message: "El apellido es demasiado corto o esta incompleto"}
                                    ]}
                                >
                                    <Input className="custom-input" />
                                </Form.Item>
                                <Form.Item
                                    label="Edad"
                                    name="Edad"
                                    rules={[{ required: true, message: 'Por favor ingresa tu edad!' },
                                        {patter: /^[0-9]+$/, message: "Solo se deben ingresar numeros"},
                                        {len: 2, message:  "La edad es demasiado alta"}
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="CURP"
                                    name="CURP"
                                    rules={[{ required: true, message: 'Por favor ingresa su curp!' },
                                        {
                                            validator: (_, value) => {
                                              const trimmedValue = value ? value.replace(/\s+/g, '') : '';
                                              if (trimmedValue.length !== 18) {
                                                return Promise.reject(new Error('El campo no permite espacios'));
                                              }
                                              return Promise.resolve();
                                            }
                                          }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Sexo"
                                    name="Sexo"
                                    rules={[{ required: true, message: 'Por favor ingresa tu sexo!' }]}
                                >
                                        <Select>
                                            <Option value="Masculino">Masculino</Option>
                                            <Option value="Femenino">Femenino</Option>
                                            <Option value="Otro">Prefiero no mencionarlo</Option>
                                        </Select>                                
                                </Form.Item>
                                <Form.Item
                                    label="Telefono"
                                    name="Telefono"
                                    rules={[{ required: true, message: 'Por favor ingresa tu teléfono!' },
                                        {len: 10, message: "La longitud es incorrecta"},
                                        {pattern: /^[0-9]+$/, message: "Solo se admiten numeros"}
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Correo Electronico"
                                    name="Correo_Electronico"
                                    rules={[{ required: true, message: 'Por favor ingresa tu correo electrónico!' },
                                        {type: 'email', message: "Ingrese un correo valido"},
                                        {max: 60, message: "Longitud incorrecta"}
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Contraseña (15 caracteres)"
                                    name="Contrasena"
                                    rules={[{ required: true, message: 'Por favor ingresa tu correo electrónico!' },
                                        {max: 15, message: "Longitud incorrecta"}
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Button type="primary" onClick={handleNext}>Siguiente</Button>
                            </>
                        )}
                        {currentStep === 1 && (
                            <>
                            <img className="ImgRegisterUserAuto" src="https://www.creativefabrica.com/wp-content/uploads/2023/02/22/Sports-Car-On-Road-Scenery-Circle-62082973-1.png" alt="Icono Register"></img>
                                <Form.Item
                                    label="Kilometraje_Inicial"
                                    name="Kilometraje_Inicial"
                                    rules={[{ required: true, message: 'Por favor ingresa el kilometraje inicial!' },
                                        {min: 3, message: "kilometraje demasiado bajo"},
                                        {max: 6, message: "Kilometraje demasiado alto"}
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Numero de TAG"
                                    name="Numero_De_Llave"
                                    rules={[{ required: true, message: 'Por favor ingresa el número de llave!' },
                                        {len: 13, message: "Lonitud incorrecta"}
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Modelo del Vehiculo"
                                    name="Modelo_Vehiculo"
                                    rules={[{ required: true, message: 'Por favor ingresa el modelo del vehículo!' },
                                        {max: 30, message: "longitud incorrecta"}
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Placa del Vehiculo"
                                    name="Placa_Vehiculo"
                                    rules={[{ required: true, message: 'Por favor ingresa la placa del vehículo!' },
                                        {min: 6, message: "longitud incorrecta"},
                                        {max: 7, message: "longitud incorrecta"},
                                        {
                                            validator: (_, value) => {
                                              const trimmedValue = value ? value.replace(/\s+/g, '') : '';
                                              if (trimmedValue.length < 6) {
                                                return Promise.reject(new Error('longitud incorrecta'));
                                              }
                                              return Promise.resolve();
                                            }
                                          }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Button type="primary" onClick={handlePrev} style={{backgroundColor: '#E36730'}}>Anterior</Button>
                                <Button type="primary" onClick={handleNext} style={{marginLeft: '1rem'}}>Siguiente</Button>
                            </>
                        )}
                        {currentStep === 2 && (
                            <>
                            <img className="ImgRegisterUserCelular" src="https://cdn-icons-png.flaticon.com/512/1000/1000338.png" alt="Icono Register"></img>
                                <Form.Item
                                    label="Modelo_Celular"
                                    name="Modelo_Celular"
                                    rules={[{ required: true, message: 'Por favor ingresa el modelo del celular!' },
                                        {max: 40, message: "longitud incorrecta"},
                                        {min: 6, message: "Longitud incorrecta" }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="IMEI"
                                    name="IMEI"
                                    rules={[{ required: true, message: 'Por favor ingresa el IMEI!' },
                                        {len: 15, message: "Longitud incorrecta"},
                                        {pattern: /^[0-9]+$/, message: "Solo se admiten numeros"}
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Tarjeta de Gasolina"
                                    name="Tarjeta_Gasolina"
                                    rules={[{ required: true, message: 'Por favor ingresa el número de la tarjeta de gasolina!'},
                                        {len: 16, message: "Longitud incorrecta"},
                                        {pattern: /^[0-9]+$/, message: "Solo se admiten numero"}
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Foto_Perfil"
                                    name="Foto_Perfil"
                                    valuePropName="fileList"
                                    getValueFromEvent={normFile}
                                    rules={[{ required: true, message: 'Por favor sube una foto de perfil!' }]}
                                >
                                    <Upload {...uploadProps}>
                                        <Button icon={<UploadOutlined />}>Seleccionar Archivo</Button>
                                    </Upload>
                                </Form.Item>
                                <Form.Item
                                    label="Numero de celular asignado"
                                    name="Telefono_Celular_Asignado"
                                    rules={[{ required: true, message: 'Por favor ingresa el numero telefonico del celular asignado' },
                                        {len: 10, message: "Longitud incorrecta"},
                                        {pattern: /^[0-9]+$/, message: "Solo se admiten numero"}
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" style={{backgroundColor: '#35DC21'}}>
                                        Registrar
                                    </Button>
                                    <Button type="primary" onClick={handlePrev} style={{marginLeft: '1rem', backgroundColor: '#E36730'}}>Anterior</Button>

                                </Form.Item>
                            </>
                        )}
                    </Form>
                </Col>
            </Row>
            <Modal
                title="Datos duplicados"
                visible={isModalVisibleRepetidos}
                onOk={handleOk}
            >
                <p>Los datos del usuario ya se encuentran registrados. Verifique su información.</p>
            </Modal>
            <Layout>
        <Header style={{ backgroundColor: '#26799B', textAlign: 'center' }}>
          <p className="TextFooter">Cesvi Mexico ©</p>
        </Header>
      </Layout>

        </div>
    );
};

export default RegistrarAjustador;




