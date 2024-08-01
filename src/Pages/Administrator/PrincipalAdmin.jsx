import React from 'react';
import { Tabs } from 'antd';
import { HomeOutlined, DashboardOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import '../../Styles/PrincipalAdmin.css';
import ContenidoPrincipalAdministrador from './ContenidoPrincipalAdministrador';
import DataQuery from './VerAjustadores';
import AdministracionDeCuentasAdministrador from './AdministracionDeCuentaAdministrador';
import ConsultarkilometragesGeneral from './ConsultarkilometragesGeneral';

const { TabPane } = Tabs;

const PrincipalAdmin = () => {

  return (
    <div className="app-container">
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
            <ContenidoPrincipalAdministrador/>
          </TabPane>

          <TabPane
            tab={
              <span>
                <TeamOutlined />
                </span>
            }
            key="2"
          >
            <DataQuery/>
          </TabPane>

          <TabPane
            tab={
              <span>
                <DashboardOutlined />
              </span>
            }
            key="3"
          >
            <ConsultarkilometragesGeneral/>
          </TabPane>
          <TabPane
            tab={
              <span>
                <UserOutlined />
              </span>
            }
            key="5"
          >
            <AdministracionDeCuentasAdministrador/>

          </TabPane>
        </Tabs>
      </div>

    </div>
  );
};

export default PrincipalAdmin;
