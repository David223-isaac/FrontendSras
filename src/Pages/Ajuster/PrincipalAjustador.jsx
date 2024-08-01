import React, {useState} from 'react';
import { Tabs, Button, Modal} from 'antd';
import { HomeOutlined, DashboardOutlined, FormOutlined, UserOutlined } from '@ant-design/icons';
import TiposDeSiniestro from './TiposDeSiniestros';
import { useNavigate } from 'react-router-dom';
import AjustadorDashboard from './ContenidoPrincipalAjustador';
import InactivityMonitor from '../Resources/InactivityMonitor';
import AdministracionDeCuentasAjustador from './AdministracionDeCuenta';
import RegistrarKilometraje from './RegistrarKilometraje';

const { TabPane } = Tabs;

const PrincipalAjustador = () => {

    const navigate = useNavigate();

    const [showInactivityAlert, setShowInactivityAlert] = useState(false);
    let inactivityTimer;
    const handleInactive = () => {
        setShowInactivityAlert(true);
    };

    const handleYes = () => {
        setShowInactivityAlert(false);
        clearTimeout(inactivityTimer);
    };

    const handleNo = () => {
        setShowInactivityAlert(false);
          localStorage.removeItem('token');
          navigate('/Login');
    };

  return (
    <div className="app-container">
       <InactivityMonitor onInactive={handleInactive} >
      <div className="content">
        <Tabs
          defaultActiveKey="1"
          tabPosition="bottom"
          size="large"
          animated
          className="custom-tabs"
        >
          <TabPane
            tab={
              <span>
                <HomeOutlined />
              </span>
            }
            key="1"
          >
            <AjustadorDashboard/>

          </TabPane>
          <TabPane
            tab={
              <span>
                <FormOutlined />
              </span>
            }
            key="2"
          >
            <TiposDeSiniestro/>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

          </TabPane>
          <TabPane
            tab={
              <span>
                <DashboardOutlined />
              </span>
            }
            key="3"
          >
            <RegistrarKilometraje/>
          </TabPane>
          <TabPane
            tab={
              <span>
                <UserOutlined />
              </span>
            }
            key="5"
          >
            <AdministracionDeCuentasAjustador/>
          </TabPane>
        </Tabs>
      </div>
      </InactivityMonitor>
      <Modal
        visible={showInactivityAlert}
        title="¿Sigues aquí?"
        footer={[
          <Button key="yes" onClick={handleYes}>Sí</Button>,
            <Button key="no" onClick={handleNo}>No</Button>,
          ]}
              onCancel={handleNo}
            >
              Su sesión expirará en 20 minutos debido a la inactividad. ¿Desea continuar?
      </Modal>
    </div>
  );
};

export default PrincipalAjustador;
