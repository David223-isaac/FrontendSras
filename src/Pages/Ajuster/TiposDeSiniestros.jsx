import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Layout} from 'antd';
import '../../../src/Styles/Tipos.css'; // Importar el archivo CSS

const TiposDeSiniestro = () => {

  const { Header } = Layout;

  return(
  <div className="container_Tipos">
    <Header style={{ backgroundColor: 'black', textAlign: 'center', borderRadius: '10px', marginBottom: '1rem', width: '100%'}}>
      <h1 className="title">Registro de siniestros</h1>
    </Header>

    <div className="navigation-container">
  <div>
    <img
      preview = 'false'
      width={200}
      src="https://cdn-icons-png.flaticon.com/512/7407/7407701.png"
      alt="Placeholder"
      className="navigation-image"
    />
      <div className="circle-background" style={{ position: 'absolute', marginTop: '-90px', marginLeft: '-25px' }}></div>
    <Row gutter={[16, 16]} justify="center">
      <Col xs={24} sm={12} md={8} lg={4}>
        <Link to="/RegistrarSiniestro">
          <Button type="primary" shape="round" size="large" className="navigation-button">
            Siniestro normal
          </Button>
        </Link>
      </Col>
      <Col xs={24} sm={12} md={8} lg={4}>
        <Link to="/RegistrarPoliza">
          <Button type="primary" shape="round" size="large" className="navigation-button">
            Poliza especial
          </Button>
        </Link>
      </Col>
      <Col xs={24} sm={12} md={8} lg={5}>
        <Link to="/tab3">
          <Button type="primary" shape="round" size="large" className="navigation-button">
            Siniestro cancelado
          </Button>
        </Link>
      </Col>
      <Col xs={24} sm={12} md={8} lg={5.5}>
        <Link to="/tab4">
          <Button type="primary" shape="round" size="large" className="navigation-button">
            Siniestro no localizado
          </Button>
        </Link>
      </Col>
      <Col xs={24} sm={12} md={8} lg={4}>
        <Link to="/tab5">
          <Button type="primary" shape="round" size="large" className="navigation-button">
            Registrar fraude
          </Button>
        </Link>
      </Col>
    </Row>
  </div>
  </div>
  </div>
  );
};

export default TiposDeSiniestro;
