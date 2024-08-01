import React, { useState, useEffect } from 'react';
import { Layout, Avatar, Table, Button, Row, Col, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import '../../Styles/EstilosAjustador.css';
import ActualizarImagen from '../Ajuster/ActualizarImagen';

const { Content } = Layout;

const ContenidoPrincipalAdministrador = () => {
  const [siniestros, setSiniestros] = useState([]);
  const [polizas, setPolizas] = useState([]);

  

  const nombres = localStorage.getItem('nombre');
  const token = localStorage.getItem('token');
  const Id = localStorage.getItem('Id_Usuario');
  const Foto_perfil = localStorage.getItem('Foto_Perfil');

  const [userAvatar, setUserAvatar] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isModalActualizarVisible, setIsModalActualizarVisible] = useState(false);

  const showModalActualizar = () => {
    setIsModalActualizarVisible(true);
  };

  const handleCancelActualizar = () => {
    setIsModalActualizarVisible(false);
  };

  useEffect(() => {
    try {
    // Función para obtener la imagen del usuario usando Axios
    const obtenerImagenDeUsuario = async () => {
      
        const response = await axios.get(`http://localhost:8000/Ajustadores/ConsultarAjustadoresPorId/${encodeURIComponent(Id)}`, {
          headers: {
            'Authorization': token
          }
        });
        console.log(response);
        // Suponiendo que la respuesta tiene una estructura { Foto_Perfil: 'nombre_imagen.jpg' }
        const nombreImagen = Foto_perfil;
        setUserAvatar(`http://localhost:8000/images/${nombreImagen}`); // Construir la URL completa de la imagen

    };

    const ObtenerDatos = async () =>{
              //consulta de siniestros
              const responseData = await axios.get(`http://localhost:8000/Siniestros/ConsultarSiniestros`, {
                headers: {
                  'Authorization': token
                }
              });
              setSiniestros(responseData.data.data);
    }

    const ObtenerDatosPolizas = async () =>{
      //consulta de siniestros
      const responseDataPolizas = await axios.get(`http://localhost:8000/PolizasEspeciales/ConsultarPolizas`, {
        headers: {
          'Authorization': token
        }
      });
      setPolizas(responseDataPolizas.data.data);
}
    obtenerImagenDeUsuario(); // Llamar a la función al montar el componente
    ObtenerDatos();
    ObtenerDatosPolizas()

          } catch (error) {
        console.error('Error al obtener la imagen del usuario:', error);
      }

  }, [Id, Foto_perfil, nombres, token]);

  const handleAvatarClick = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const defaultAvatarUrl = 'https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg';

  // Función para renderizar el avatar
  const renderAvatar = (imagen) => (
    <Avatar size={150} src={imagen || defaultAvatarUrl} onClick={handleAvatarClick} style={{ cursor: 'pointer' }} />
  );


//   const columns = [
//     {
//       title: 'Numero de siniestro',
//       dataIndex: 'Numero_Siniestro',
//       key: 'Numero_Siniestro',
//     },
//     {
//       title: 'Folio EDUA',
//       dataIndex: 'Folio_Edua',
//       key: 'Folio_Edua',
//     },
//     {
//       title: 'Fecha de Atencion',
//       dataIndex: 'Fecha_Atencion',
//       key: 'Fecha_Atencion',
//     },
//     {
//         title: 'Ajustador que registro el siniestro',
//         dataIndex: 'AjustadorQueRegistra',
//         key: 'AjustadorQueRegistra',
//       },
//     // Agrega más columnas según la estructura de tus datos
//   ];
const getColumnFilters = (data, columnKey) => {
    const uniqueValues = [...new Set(data.map(item => item[columnKey]))];
    return uniqueValues.map(value => ({ text: value, value }));
  };

  const columns = [
    {
      title: 'Numero de siniestro',
      dataIndex: 'Numero_Siniestro',
      key: 'Numero_Siniestro',
      filters: getColumnFilters(siniestros, 'Numero_Siniestro'),
      onFilter: (value, record) => record.Numero_Siniestro.includes(value),
    },
    {
      title: 'Folio EDUA',
      dataIndex: 'Folio_Edua',
      key: 'Folio_Edua',
      filters: getColumnFilters(siniestros, 'Folio_Edua'),
      onFilter: (value, record) => record.Folio_Edua.includes(value),
    },
    {
      title: 'Fecha de Atencion',
      dataIndex: 'Fecha_Atencion',
      key: 'Fecha_Atencion',
      filters: getColumnFilters(siniestros, 'Fecha_Atencion'),
      onFilter: (value, record) => record.Fecha_Atencion.includes(value),
    },
    {
      title: 'Ajustador que registro el siniestro',
      dataIndex: 'AjustadorQueRegistra',
      key: 'AjustadorQueRegistra',
      filters: getColumnFilters(siniestros, 'AjustadorQueRegistra'),
      onFilter: (value, record) => record.AjustadorQueRegistra.includes(value),
    },
    // Agrega más columnas según la estructura de tus datos
  ];

  return (
    <Layout className="layout" style={{ minHeight: '100vh', backgroundColor: '#DC5555', position: 'relative', borderRadius: '20px'}}>
      <div className="half-circle"></div> {/* Contenedor del medio círculo */}
      <Content style={{ padding: '0 50px' }}>
        <div className="welcome-section">
          <Row align="middle" className="welcome-row">
            <Col xs={24} md={18} className="welcome-col">
              <h1 style={{ fontSize: '30px', marginTop: "2rem"}}>Bienvenido admin, {nombres}</h1>
            </Col>
            <Col xs={24} md={6} className="avatar-col" style={{ textAlign: 'right' }}>
              <div style={{ position: 'relative' }}>
                {renderAvatar(userAvatar)} {/* Renderizar el avatar con la imagen de perfil */}
                <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                {/* <Link to="/ActualizarImagen" style={{ position: 'absolute', bottom: '10px', right: '10px' }}> */}
                  <Button type="primary" shape="circle" icon={<EditOutlined />} size="large" style={{backgroundColor: '#08B8FF'}} onClick={showModalActualizar}/>
                {/* </Link> */}
                </div>
              </div>
            </Col>
          </Row>
          <hr style={{ border: 'none', height: '1px' }} />
        </div>

        <Row gutter={16} style={{ marginBottom: 16 }}>
        </Row>
        <h2 style={{color: "white"}}>Siniestros registrados</h2>
        <div style={{overflow: 'auto'}}>
                <Table columns={columns} dataSource={siniestros} style={{ marginTop: 16, borderRadius: "20px" }} /> {/* Añadir tus columnas y datos para la tabla */}
        </div>
        <h2 style={{color: "white"}}>Polizas registradas</h2>
        <div style={{overflow: 'auto'}}>
                <Table columns={columns} dataSource={polizas} style={{ marginTop: 16, borderRadius: "20px" }} /> {/* Añadir tus columnas y datos para la tabla */}
        </div>
        <h2 style={{color: "white"}}>Fraudes registrados</h2>
        <div style={{overflow: 'auto'}}>
                <Table columns={columns} dataSource={siniestros} style={{ marginTop: 16, borderRadius: "20px" }} /> {/* Añadir tus columnas y datos para la tabla */}
        </div>
      </Content>

      {/* Modal para mostrar la imagen de perfil */}
      <Modal visible={isModalVisible} footer={null} onCancel={handleCancel}>
        <img src={userAvatar || defaultAvatarUrl} alt="Imagen del perfil" style={{ width: '100%' }} />
      </Modal>

      {/* Espacios en blanco para ajustar la posición de los elementos */}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Modal
          title="Actualizar Imagen"
          visible={isModalActualizarVisible}
          onCancel={handleCancelActualizar}
          footer={null} // Si no quieres un footer con botones predeterminados
        >
          <ActualizarImagen /> {/* Renderiza tu página actual */}
        </Modal>

    </Layout>
    
  );
};

export default ContenidoPrincipalAdministrador;