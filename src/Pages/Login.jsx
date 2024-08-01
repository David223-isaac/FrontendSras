import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Row, Input, Layout, Button, message } from 'antd';
import '../../src/Styles/Login.css';

const { Header } = Layout;

const LoginForm = () => {
    
    const navigate = useNavigate();

  const onFinish = async (values) => {

    try {
      const response = await axios.post('http://localhost:8000/login/loginPage', values);
      // console.log(response.data); // Manejar la respuesta del backend
      const { token, nombre, apellidos, rol, Foto_Perfil, Id_Usuario } = response.data;
      message.success('Inicio de sesión exitoso');
      localStorage.setItem('token', token);
      localStorage.setItem('nombre', nombre);
      localStorage.setItem('apellidos', apellidos);
      localStorage.setItem('rol', rol);
      localStorage.setItem('Foto_Perfil', Foto_Perfil);
      localStorage.setItem('Id_Usuario', Id_Usuario);


      if(rol === "administrador"){
        navigate("/PrincipalAdmin");
      }else{
        navigate("/PrincipalAjustador");

      };
    } catch (error) {
      message.error(error.response?.data?.error || 'Error en el inicio de sesión');
    }
  };


  return (
    <div style={{ backgroundColor: '#E8C10F' }}>
            <div className="circle-background" style={{ position: 'absolute', marginTop: '180px', marginLeft: '30px' }}></div>
            <Row justify="center" style={{ flexGrow: 1, padding: '35px', textAlign: 'center' }}>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    layout="vertical"
                    style={{ padding: '8px', borderRadius: '20px' }}
                    onFinish={onFinish}
                >
                    <img className="ImgLogin" src="https://cdn-icons-png.flaticon.com/512/272/272456.png" alt="Icono Register" />
                    <div style={{ borderRadius: '10px', padding: '30px' }}>
                        <Form.Item
                            label={<span style={{ fontSize: '20px', fontWeight: 'bold' }}>Correo Electrónico</span>}
                            name="Correo_Electronico"
                            rules={[{ required: true, message: 'Ingrese el correo electrónico!' }]}
                        >
                            <Input className="InputLoin" />
                        </Form.Item>
                        <Form.Item
                            label={<span style={{ fontSize: '20px', fontWeight: 'bold' }}>Contraseña</span>}
                            name="Contrasena"
                            rules={[{ required: true, message: 'Por favor ingresa tu contraseña!' }]}
                        >
                            <Input.Password className="InputLoin" />
                        </Form.Item>
                        <Form.Item>
                            <Button className="BtnLogin" type="primary" htmlType="submit" style={{ backgroundColor: '#35DC21' }}>
                                Ingresar
                            </Button>
                        </Form.Item>
                        <Form.Item>
                          <Link to="/">
                            <Button className="BtnLogin" type="primary" style={{ backgroundColor: 'red' }}>
                                Regresar
                            </Button>
                          </Link>
                        </Form.Item>
                    </div>
                </Form>
            </Row>
            <Layout>
                <Header style={{ backgroundColor: '#26799B', textAlign: 'center' }}>
                    <p className="TextFooter">Cesvi Mexico ©</p>
                </Header>
            </Layout>
        </div>
  );
};

export default LoginForm;

