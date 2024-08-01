// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button, Row, Col, Avatar, Modal, Form, Input, notification } from 'antd';
// import {
//   UserOutlined,
//   PhoneOutlined,
//   MailOutlined,
//   CarOutlined,
//   MobileOutlined,
//   EditOutlined,
// } from '@ant-design/icons';
// import axios from 'axios';
// import '../../Styles/AdministraciondeCuenta.css';

// const AdministracionDeCuentasAjustador = () => {
//   const navigate = useNavigate();
//   const [nombres, setNombres] = useState('');
//   const [apellidos, setApellidos] = useState('');
//   const [edad, setEdad] = useState('');
//   const [sexo, setSexo] = useState('');
//   const [telefono, setTelefono] = useState('');
//   const [correo, setCorreo] = useState('');
//   const [kilometrajeInicial, setKilometrajeInicial] = useState('');
//   const [NumeroLLave, setNumeroLLave] = useState('');
//   const [ModeloVehiculo, setModeloVehiculo] = useState('');
//   const [placas, setPlacas] = useState('');
//   const [tarjetaGasolina, setTarjetaGasolina] = useState('');
//   const [ModeloCelular, setModeloCelular] = useState('');
//   const [imei, setIMEI] = useState('');
//   const [Numero, setNumero] = useState('');
//   const [Contrasena, setContrasena] = useState('');

//   const Foto_perfil = localStorage.getItem('Foto_Perfil');
//   const [userAvatar, setUserAvatar] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [form] = Form.useForm();

//   const nombreCompleto = `${nombres} ${apellidos}`;

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/Login');
//   };

//   const showModal = () => {
//     form.setFieldsValue({
//       Nombres: nombres,
//       Apellidos: apellidos,
//       Edad: edad,
//       Sexo: sexo,
//       Telefono: telefono,
//       Correo_Electronico: correo,
//       Kilometraje_Inicial: kilometrajeInicial || 0, // Asegúrate de que no sea una cadena vacía
//       Numero_De_Llave: NumeroLLave,
//       Modelo_Vehiculo: ModeloVehiculo,
//       Placa_Vehiculo: placas,
//       Tarjeta_Gasolina: tarjetaGasolina,
//       Modelo_Celular: ModeloCelular,
//       IMEI: imei,
//       Telefono_Celular_Asignado: Numero,
//       Contrasena: Contrasena,
//     });
//     setIsModalVisible(true);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   const handleUpdate = async (values) => {
//     const token = localStorage.getItem('token');
//     const Id = localStorage.getItem('Id_Usuario');

//     try {
//       // Asegúrate de que los valores numéricos no sean cadenas vacías
//       const sanitizedValues = {
//         ...values,
//         Kilometraje_Inicial: values.Kilometraje_Inicial || 0,
//       };

//       const response = await axios.put(
//         `http://localhost:8000/Ajustadores/ActualizarInfoAjustador/${encodeURIComponent(Id)}`,
//         sanitizedValues,
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );

//       if (response.data.success) {
//         setNombres(sanitizedValues.Nombres);
//         setApellidos(sanitizedValues.Apellidos);
//         setEdad(sanitizedValues.Edad);
//         setSexo(sanitizedValues.Sexo);
//         setTelefono(sanitizedValues.Telefono);
//         setCorreo(sanitizedValues.Correo_Electronico);
//         setKilometrajeInicial(sanitizedValues.Kilometraje_Inicial);
//         setNumeroLLave(sanitizedValues.Numero_De_Llave);
//         setModeloVehiculo(sanitizedValues.Modelo_Vehiculo);
//         setPlacas(sanitizedValues.Placa_Vehiculo);
//         setTarjetaGasolina(sanitizedValues.Tarjeta_Gasolina);
//         setModeloCelular(sanitizedValues.Modelo_Celular);
//         setIMEI(sanitizedValues.IMEI);
//         setNumero(sanitizedValues.Telefono_Celular_Asignado);
//         setContrasena(sanitizedValues.Contrasena);

//         setIsModalVisible(false);
//       } else {
//         console.log('');
//         notification.success({
//           message: 'Datos actualizados',
//           description: 'Los datos han sido modificados',
//         });
//         setIsModalVisible(false);
//       }
//     } catch (error) {
//       console.error('Error al actualizar los datos:', error);
//     }
//   };

//   useEffect(() => {
//     const Id = localStorage.getItem('Id_Usuario');
//     const token = localStorage.getItem('token');

//     const obtenerImagenDeUsuario = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8000/Ajustadores/ConsultarAjustadoresPorId/${encodeURIComponent(Id)}`,
//           {
//             headers: {
//               Authorization: token,
//             },
//           }
//         );

//         if (
//           response.data &&
//           response.data.registro &&
//           response.data.registro.length > 0
//         ) {
//           const primerRegistro = response.data.registro[0];
//           setNombres(primerRegistro.Nombres);
//           setApellidos(primerRegistro.Apellidos);
//           setEdad(primerRegistro.Edad);
//           setSexo(primerRegistro.Sexo);
//           setTelefono(primerRegistro.Telefono);
//           setCorreo(primerRegistro.Correo_Electronico);
//           setKilometrajeInicial(primerRegistro.Kilometraje_Inicial);
//           setNumeroLLave(primerRegistro.Numero_De_Llave);
//           setModeloVehiculo(primerRegistro.Modelo_Vehiculo);
//           setPlacas(primerRegistro.Placa_Vehiculo);
//           setTarjetaGasolina(primerRegistro.Tarjeta_Gasolina);
//           setModeloCelular(primerRegistro.Modelo_Celular);
//           setIMEI(primerRegistro.IMEI);
//           setNumero(primerRegistro.Telefono_Celular_Asignado);
//           setContrasena(primerRegistro.Contrasena);

//           const nombreImagen = Foto_perfil;
//           setUserAvatar(`http://localhost:8000/images/${nombreImagen}`);
//         } else {
//           console.error('No se encontraron datos válidos en la respuesta');
//         }
//       } catch (error) {
//         console.error('Error al obtener la información del ajustador:', error);
//       }
//     };

//     obtenerImagenDeUsuario();
//   });

//   const defaultAvatarUrl =
//     'https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg';

//   const renderAvatar = (imagen) => (
//     <Avatar
//       size={180} // Aumenta el tamaño del avatar
//       src={imagen || defaultAvatarUrl}
//       style={{ cursor: 'pointer' }}
//     />
//   );

//   return (
//     <div
//       style={{
//         position: 'relative',
//         minHeight: '100vh',
//         backgroundColor: '#8C57FA',
//         borderRadius: '20px',
//         overflow: 'hidden', // Asegura que el contenido no se desborde del contenedor
//       }}
//     >
//       <div className="circle-background" style={{marginRight: '4rem', marginTop: '-200px'}}></div>
//       <div style={{ padding: '20px', textAlign: 'center' }}>
//         <h1 style={{ marginBottom: '30px', color: 'white', fontSize: '40px'}}>
//           Administración de Cuenta
//         </h1>
//         <hr className="gradient-hr" />
//         <Row justify="center" gutter={[16, 16]} style={{marginTop:'2rem'}}>
//           <Col xs={24} sm={24} md={8} lg={6} xl={5} style={{ marginBottom: '1rem' }}>
//             <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
//               {renderAvatar(userAvatar)}
//             </div>
//           </Col>
//           <Col xs={24} sm={24} md={16} lg={18} xl={14}>
//             <div className="white-box" style={{ backgroundColor: '#E8F6EE', borderRadius: '20px', padding: '20px', textAlign: 'left' }}>
//               <h2>Datos del usuario</h2>
//               <p className="user-info"><UserOutlined /> Nombre: {nombreCompleto}</p>
//               <p className="user-info"><UserOutlined /> Edad: {edad} años</p>
//               <p className="user-info"><UserOutlined /> Sexo: {sexo}</p>
//               <p className="user-info"><PhoneOutlined /> Teléfono: {telefono}</p>
//               <p className="user-info"><MailOutlined /> Correo electrónico: {correo}</p>
//             </div>
//             <div className="circle-background" style={{marginLeft: '120%', height: '700', marginTop: '200px'}}></div>
//             <div className="white-box" style={{ backgroundColor: '#E8F6EE', borderRadius: '20px', padding: '20px', marginTop: '20px', textAlign: 'left'}}>
//               <h2>Datos del vehículo</h2>
//               <p className="user-info"><CarOutlined /> Kilometraje inicial: {kilometrajeInicial}</p>
//               <p className="user-info"><CarOutlined /> Modelo del vehículo: {ModeloVehiculo}</p>
//               <p className="user-info"><CarOutlined /> Placas: {placas}</p>
//               <p className="user-info"><CarOutlined /> Número de TAG: {NumeroLLave}</p>
//               <p className="user-info"><CarOutlined /> Tarjeta de gasolina asignada: {tarjetaGasolina}</p>
//             </div>
//             <div className="white-box" style={{ backgroundColor: '#E8F6EE', borderRadius: '20px', padding: '20px', marginTop: '20px', textAlign: 'left' }}>
//               <h2>Datos del celular</h2>
//               <p className="user-info"><MobileOutlined /> Modelo del celular: {ModeloCelular}</p>
//               <p className="user-info"><MobileOutlined /> IMEI: {imei}</p>
//               <p className="user-info"><MobileOutlined /> Número de celular asignado: {Numero}</p>
//             </div>
//             <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
//               <Button type="primary" danger onClick={handleLogout}>
//                 Cerrar Sesión
//               </Button>
//               <Button type="primary" icon={<EditOutlined />} onClick={showModal}>
//                 Modificar Datos
//               </Button>
//             </div>
//           </Col>
//         </Row>
//       </div>
//       <Modal
//         title="Editar Información del Usuario"
//         visible={isModalVisible}
//         onCancel={handleCancel}
//         footer={null}
//       >
//         <Form
//           form={form}
//           onFinish={handleUpdate}
//           layout="vertical"
//         >
//           <Form.Item
//             label="Nombres"
//             name="Nombres"
//             rules={[{ required: true, message: 'Por favor ingrese sus nombres' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Apellidos"
//             name="Apellidos"
//             rules={[{ required: true, message: 'Por favor ingrese sus apellidos' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Edad"
//             name="Edad"
//             rules={[{ required: true, message: 'Por favor ingrese su edad' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Sexo"
//             name="Sexo"
//             rules={[{ required: true, message: 'Por favor ingrese su sexo' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Teléfono"
//             name="Telefono"
//             rules={[{ required: true, message: 'Por favor ingrese su teléfono' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Correo Electrónico"
//             name="Correo_Electronico"
//             rules={[{ required: true, message: 'Por favor ingrese su correo electrónico' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Kilometraje Inicial"
//             name="Kilometraje_Inicial"
//             rules={[{ required: true, message: 'Por favor ingrese el kilometraje inicial' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Número de Llave"
//             name="Numero_De_Llave"
//             rules={[{ required: true, message: 'Por favor ingrese el número de llave' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Modelo del Vehículo"
//             name="Modelo_Vehiculo"
//             rules={[{ required: true, message: 'Por favor ingrese el modelo del vehículo' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Placas del Vehículo"
//             name="Placa_Vehiculo"
//             rules={[{ required: true, message: 'Por favor ingrese las placas del vehículo' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Tarjeta de Gasolina"
//             name="Tarjeta_Gasolina"
//             rules={[{ required: true, message: 'Por favor ingrese la tarjeta de gasolina' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Modelo del Celular"
//             name="Modelo_Celular"
//             rules={[{ required: true, message: 'Por favor ingrese el modelo del celular' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="IMEI"
//             name="IMEI"
//             rules={[{ required: true, message: 'Por favor ingrese el IMEI' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Teléfono Celular Asignado"
//             name="Telefono_Celular_Asignado"
//             rules={[{ required: true, message: 'Por favor ingrese el teléfono celular asignado' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Contraseña"
//             name="Contrasena"
//             rules={[{ required: true, message: 'Por favor ingrese su contraseña' }]}
//           >
//             <Input.Password />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Guardar
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>

//     </div>
//   );
// };

// export default AdministracionDeCuentasAjustador;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Row, Col, Avatar, Modal, Form, Input, notification } from 'antd';
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  CarOutlined,
  MobileOutlined,
  EditOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import '../../Styles/AdministraciondeCuenta.css';

const AdministracionDeCuentasAjustador = () => {
  const navigate = useNavigate();
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [edad, setEdad] = useState('');
  const [sexo, setSexo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [kilometrajeInicial, setKilometrajeInicial] = useState('');
  const [NumeroLLave, setNumeroLLave] = useState('');
  const [ModeloVehiculo, setModeloVehiculo] = useState('');
  const [placas, setPlacas] = useState('');
  const [tarjetaGasolina, setTarjetaGasolina] = useState('');
  const [ModeloCelular, setModeloCelular] = useState('');
  const [imei, setIMEI] = useState('');
  const [Numero, setNumero] = useState('');
  const [Contrasena, setContrasena] = useState('');

  const Foto_perfil = localStorage.getItem('Foto_Perfil');
  const [userAvatar, setUserAvatar] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const nombreCompleto = `${nombres} ${apellidos}`;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/Login');
  };

  const showModal = () => {
    form.setFieldsValue({
      Nombres: nombres,
      Apellidos: apellidos,
      Edad: edad,
      // Sexo: sexo,
      Telefono: telefono,
      Correo_Electronico: correo,
      // Kilometraje_Inicial: kilometrajeInicial || 0, // Asegúrate de que no sea una cadena vacía
      Numero_De_Llave: NumeroLLave,
      Modelo_Vehiculo: ModeloVehiculo,
      Placa_Vehiculo: placas,
      // Tarjeta_Gasolina: tarjetaGasolina,
      Modelo_Celular: ModeloCelular,
      // IMEI: imei,
      Telefono_Celular_Asignado: Numero,
      Contrasena: Contrasena,
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUpdate = async (values) => {
    const token = localStorage.getItem('token');
    const Id = localStorage.getItem('Id_Usuario');

    try {
      // Asegúrate de que los valores numéricos no sean cadenas vacías
      const sanitizedValues = {
        ...values,
        Kilometraje_Inicial: values.Kilometraje_Inicial || 0,
      };

      const response = await axios.put(
        `http://localhost:8000/Ajustadores/ActualizarInfoAjustador/${encodeURIComponent(Id)}`,
        sanitizedValues,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.success) {
        setNombres(sanitizedValues.Nombres);
        setApellidos(sanitizedValues.Apellidos);
        setEdad(sanitizedValues.Edad);
        // setSexo(sanitizedValues.Sexo);
        setTelefono(sanitizedValues.Telefono);
        setCorreo(sanitizedValues.Correo_Electronico);
        // setKilometrajeInicial(sanitizedValues.Kilometraje_Inicial);
        setNumeroLLave(sanitizedValues.Numero_De_Llave);
        setModeloVehiculo(sanitizedValues.Modelo_Vehiculo);
        setPlacas(sanitizedValues.Placa_Vehiculo);
        // setTarjetaGasolina(sanitizedValues.Tarjeta_Gasolina);
        setModeloCelular(sanitizedValues.Modelo_Celular);
        // setIMEI(sanitizedValues.IMEI);
        setNumero(sanitizedValues.Telefono_Celular_Asignado);
        setContrasena(sanitizedValues.Contrasena);

        setIsModalVisible(false);
      } else {
        console.log('');
        notification.success({
          message: 'Datos actualizados',
          description: 'Los datos han sido modificados',
        });
        setIsModalVisible(false);
      }
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
    }
  };

  useEffect(() => {
    const Id = localStorage.getItem('Id_Usuario');
    const token = localStorage.getItem('token');

    const obtenerImagenDeUsuario = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/Ajustadores/ConsultarAjustadoresPorId/${encodeURIComponent(Id)}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (
          response.data &&
          response.data.registro &&
          response.data.registro.length > 0
        ) {
          const primerRegistro = response.data.registro[0];
          setNombres(primerRegistro.Nombres);
          setApellidos(primerRegistro.Apellidos);
          setEdad(primerRegistro.Edad);
          setSexo(primerRegistro.Sexo);
          setTelefono(primerRegistro.Telefono);
          setCorreo(primerRegistro.Correo_Electronico);
          setKilometrajeInicial(primerRegistro.Kilometraje_Inicial);
          setNumeroLLave(primerRegistro.Numero_De_Llave);
          setModeloVehiculo(primerRegistro.Modelo_Vehiculo);
          setPlacas(primerRegistro.Placa_Vehiculo);
          setTarjetaGasolina(primerRegistro.Tarjeta_Gasolina);
          setModeloCelular(primerRegistro.Modelo_Celular);
          setIMEI(primerRegistro.IMEI);
          setNumero(primerRegistro.Telefono_Celular_Asignado);
          setContrasena(primerRegistro.Contrasena);

          const nombreImagen = Foto_perfil;
          setUserAvatar(`http://localhost:8000/images/${nombreImagen}`);
        } else {
          console.error('No se encontraron datos válidos en la respuesta');
        }
      } catch (error) {
        console.error('Error al obtener la información del ajustador:', error);
      }
    };

    obtenerImagenDeUsuario();
  });

  const defaultAvatarUrl =
    'https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg';

  const renderAvatar = (imagen) => (
    <Avatar
      size={180} // Aumenta el tamaño del avatar
      src={imagen || defaultAvatarUrl}
      style={{ cursor: 'pointer' }}
    />
  );

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#8C57FA',
        borderRadius: '20px',
        overflow: 'hidden', // Asegura que el contenido no se desborde del contenedor
      }}
    >
      <div className="circle-background" style={{marginRight: '4rem', marginTop: '-200px'}}></div>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '30px', color: 'white', fontSize: '40px'}}>
          Administración de Cuenta
        </h1>
        <hr className="gradient-hr" />
        <Row justify="center" gutter={[16, 16]} style={{marginTop:'2rem'}}>
          <Col xs={24} sm={24} md={8} lg={6} xl={5} style={{ marginBottom: '1rem' }}>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              {renderAvatar(userAvatar)}
            </div>
          </Col>
          <Col xs={24} sm={24} md={16} lg={18} xl={14}>
            <div className="white-box" style={{ backgroundColor: '#E8F6EE', borderRadius: '20px', padding: '20px', textAlign: 'left' }}>
              <h2>Datos del usuario</h2>
              <p className="user-info"><UserOutlined /> Nombre: {nombreCompleto}</p>
              <p className="user-info"><UserOutlined /> Edad: {edad} años</p>
              <p className="user-info"><UserOutlined /> Sexo: {sexo}</p>
              <p className="user-info"><PhoneOutlined /> Teléfono: {telefono}</p>
              <p className="user-info"><MailOutlined /> Correo electrónico: {correo}</p>
            </div>
            <div className="circle-background" style={{marginLeft: '120%', height: '700', marginTop: '200px'}}></div>
            <div className="white-box" style={{ backgroundColor: '#E8F6EE', borderRadius: '20px', padding: '20px', marginTop: '20px', textAlign: 'left'}}>
              <h2>Datos del vehículo</h2>
              <p className="user-info"><CarOutlined /> Kilometraje inicial: {kilometrajeInicial}</p>
              <p className="user-info"><CarOutlined /> Modelo del vehículo: {ModeloVehiculo}</p>
              <p className="user-info"><CarOutlined /> Placas: {placas}</p>
              <p className="user-info"><CarOutlined /> Número de TAG: {NumeroLLave}</p>
              <p className="user-info"><CarOutlined /> Tarjeta de gasolina asignada: {tarjetaGasolina}</p>
            </div>
            <div className="white-box" style={{ backgroundColor: '#E8F6EE', borderRadius: '20px', padding: '20px', marginTop: '20px', textAlign: 'left' }}>
              <h2>Datos del celular</h2>
              <p className="user-info"><MobileOutlined /> Modelo del celular: {ModeloCelular}</p>
              <p className="user-info"><MobileOutlined /> IMEI: {imei}</p>
              <p className="user-info"><MobileOutlined /> Número de celular asignado: {Numero}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <Button type="primary" danger onClick={handleLogout}>
                Cerrar Sesión
              </Button>
              <Button type="primary" icon={<EditOutlined />} onClick={showModal}>
                Modificar Datos
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <Modal
        title="Editar Información del Usuario"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleUpdate}
          layout="vertical"
        >
          <Form.Item
            label="Nombres"
            name="Nombres"
            rules={[{ required: true, message: 'Por favor ingrese sus nombres' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Apellidos"
            name="Apellidos"
            rules={[{ required: true, message: 'Por favor ingrese sus apellidos' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Edad"
            name="Edad"
            rules={[{ required: true, message: 'Por favor ingrese su edad' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Teléfono"
            name="Telefono"
            rules={[{ required: true, message: 'Por favor ingrese su teléfono' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Correo Electrónico"
            name="Correo_Electronico"
            rules={[{ required: true, message: 'Por favor ingrese su correo electrónico' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Número de Llave"
            name="Numero_De_Llave"
            rules={[{ required: true, message: 'Por favor ingrese el número de llave' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Modelo del Vehículo"
            name="Modelo_Vehiculo"
            rules={[{ required: true, message: 'Por favor ingrese el modelo del vehículo' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Placas del Vehículo"
            name="Placa_Vehiculo"
            rules={[{ required: true, message: 'Por favor ingrese las placas del vehículo' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Modelo del Celular"
            name="Modelo_Celular"
            rules={[{ required: true, message: 'Por favor ingrese el modelo del celular' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Teléfono Celular Asignado"
            name="Telefono_Celular_Asignado"
            rules={[{ required: true, message: 'Por favor ingrese el teléfono celular asignado' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Contraseña"
            name="Contrasena"
            rules={[{ required: true, message: 'Por favor ingrese su contraseña' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Guardar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

    </div>
  );
};

export default AdministracionDeCuentasAjustador;
