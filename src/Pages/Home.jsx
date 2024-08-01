import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Row, Col, Layout, Modal } from 'antd';
import { Icon } from '@iconify/react';
import threeDots from '@iconify/icons-bi/three-dots';
import '../Styles/FormHome.css';
import 'antd/dist/reset.css';


const { Header } = Layout;

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ backgroundColor: '#21CA6C', minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Icon icon={threeDots} className='ThreePointsHome' onClick={showModal} style={{ cursor: 'pointer' }} />
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div className="circle-background"></div>
        <img src="https://static.vecteezy.com/system/resources/thumbnails/025/034/143/small/muscle-car-custom-designed-and-colored-ai-generated-png.png" alt="HomeImage" className='HomeImage' style={{ maxWidth: '100%', height: 'auto' }} />
        <p className='Welcome'>Welcome Back!</p>
      </div>
      <Row justify="center" align="middle" style={{ flexGrow: 1, padding: '24px' }}>
        <Col xs={24} sm={16} md={12} lg={8}>
          <Form layout="vertical" style={{ padding: '1rem', borderRadius: '30px', border: '0.5px solid white' }}>
            <Form.Item style={{ marginTop: '10px' }}>
              <Link to="/Login">
                <Button className='Buttons' block>
                  <p>Login</p>
                </Button>
              </Link>
            </Form.Item>
            <Form.Item style={{ marginTop: '7px', textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', margin: '1px 0' }}>
                <div style={{ flexGrow: 1, height: '2px', background: 'linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0))' }}></div>
                <div style={{ margin: '0 6px', color: 'rgba(255, 255, 255, 0.5)', fontSize: 'Large' }}>OR</div>
                <div style={{ flexGrow: 1, height: '2px', background: 'linear-gradient(to left, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0))' }}></div>
              </div>
            </Form.Item>
            <Form.Item style={{ marginTop: '10px' }}>
              <Link to="/RegistrarAjustador">
                <Button className='Buttons' block>
                  <p>Register</p>
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Layout>
        <Header style={{ backgroundColor: '#247c4c', textAlign: 'center' }}>
          <p className="TextFooter">Cesvi Mexico ©</p>
        </Header>
      </Layout>

      <Modal title="Instrucciones" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Por donde iniciar...</p>
        <ul>
          <li>Paso 1: Inicia sesiòn para registrar tus siniestros y ver tus estadisticas</li>
          <li>Paso 2: Si no tienes una cuenta registrate mediante el boton "Register", necesitaremos algunos datos tuyos</li>
        </ul>
      </Modal>
    </div>
  );
};

export default Home;
