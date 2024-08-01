import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, DatePicker, Layout } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios'; // Asegúrate de importar axios
import '../../Styles/RegistrarKilometraje.css';


const RegistrarKilometraje = () => {

  const { Header } = Layout;

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [formData, setFormData] = useState({});

  const onFinish = async (values) => {
    try {
      const nombres = localStorage.getItem('nombre');
      const token = localStorage.getItem('token');

      if (!nombres) {
        message.error('El nombre del ajustador no está disponible');
        return;
      }

      if (!token) {
        message.error('El token de autenticación no está disponible');
        return;
      }

      const completeFormData = { ...formData, ...values, AjustadorQueRegistra: nombres };

      const submitData = new FormData();
      submitData.append('KilometrajeRegistrado', completeFormData.KilometrajeRegistrado);
      submitData.append('FechaDeRegistro', completeFormData.FechaDeRegistro.format('YYYY-MM-DD'));
      submitData.append('Foto_Evidencia', completeFormData.Foto_Evidencia[0].originFileObj);
      submitData.append('AjustadorQueRegistra', nombres);

      const response = await axios.post('http://localhost:8000/Kilometrajes/RegistrarKilometraje', submitData, {
        headers: {
          'Authorization': token,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        message.success('Kilometraje registrado exitosamente');
        form.resetFields();
        setFileList([]);
        setFormData({});
      } else {
        throw new Error('Error en el servidor');
      }
    } catch (error) {
      console.error('Error:', error.message);
      message.error('Hubo un error al procesar la solicitud');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error('Failed:', errorInfo);
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
    <div>
        <Header classname="header" style={{ backgroundColor: 'black', textAlign: 'center', paddingBottom: '2rem', borderRadius: '10px', marginBottom: '1rem'}}>
          <h1 className="title">Registro de kilometrajes</h1>
        </Header>

<div className="container">
  <div className="circle-background" style={{ position: 'absolute', marginTop: '-90px', marginLeft: '-25px' }}></div>
  <div className="circle-background" style={{ position: 'absolute', marginTop: '200px', marginLeft: '1200px' }}></div>
        <div className="form-container">
          <Form
            form={form}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            style={{ padding: '8px', borderRadius: '20px' }}
          >
            <img className="ImgRegisterUser" src="https://i.pinimg.com/originals/9e/36/55/9e365506aaaa49f84fa6e1c20733a47a.png" alt="Icono Register"></img>
            <Form.Item
              name="KilometrajeRegistrado"
              label="Kilometraje Registrado"
              rules={[{ required: true, message: 'Por favor ingrese el kilometraje' }]}
            >
              <Input type="number" placeholder="Ingrese el kilometraje" />
            </Form.Item>

            <Form.Item
              name="FechaDeRegistro"
              label="Fecha de Registro"
              rules={[{ required: true, message: 'Por favor seleccione la fecha' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              label="Foto de evidencia"
              name="Foto_Evidencia"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: 'Por favor sube una foto de evidencia!' }]}
            >
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>Seleccionar Archivo</Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ backgroundColor: '#35DC21' }}>
                Registrar
              </Button>
            </Form.Item>
          </Form>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
    </div>
    </div>
  );
};

export default RegistrarKilometraje;
