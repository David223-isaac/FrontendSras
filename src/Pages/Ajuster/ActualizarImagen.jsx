
// // import React, { useState } from 'react';
// // import axios from 'axios';

// // function ActualizarImagen() {
// //     const [userId, setUserId] = useState('');
// //     const [nuevaImagen, setNuevaImagen] = useState(null); // Cambio: usa null para representar la imagen

// //     const handleImageChange = (e) => {
// //         const file = e.target.files[0];
// //         setNuevaImagen(file);
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();

// //         try {
// //             const formData = new FormData();
// //             formData.append('userId', userId);
// //             formData.append('nuevaImagen', nuevaImagen);

// //             // Envía la solicitud al backend (ruta '/actualizar-imagen')
// //             await axios.post('http://localhost:8000/Ajustadores/actualizarImagen', formData, {
// //                 headers: {
// //                     'Content-Type': 'multipart/form-data',
// //                 },
// //             });

// //             console.log('Imagen subida y actualizada correctamente');
// //             console.log("Id del usuario: " + formData.get('userId'));
// //             console.log("Imagen: " + formData.get('nuevaImagen'));

// //             alert('Imagen actualizada correctamente');
// //         } catch (error) {
// //             console.error('Error al subir o actualizar la imagen:', error);
// //         }
// //     };

// //     return (
// //         <form onSubmit={handleSubmit}>
// //             <input
// //                 type="text"
// //                 placeholder="ID del usuario"
// //                 value={userId}
// //                 onChange={(e) => setUserId(e.target.value)}
// //             />
// //             <input
// //                 type="file" // Cambio: usa un campo de archivo para cargar la imagen
// //                 accept="image/*"
// //                 onChange={handleImageChange}
// //             />
// //             <button type="submit">Subir imagen</button>
// //         </form>
// //     );
// // }

// // export default ActualizarImagen;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { Form, Input, Upload, Button, message } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';

// function ActualizarImagen() {
//     const [userId, setUserId] = useState('');
//     const [nuevaImagen, setNuevaImagen] = useState(null);

//     const handleImageChange = (file) => {
//         setNuevaImagen(file);
//         return false; // Evita que Ant Design suba automáticamente el archivo
//     };

//     const handleSubmit = async () => {
//         try {
//             const formData = new FormData();
//             formData.append('userId', userId);
//             formData.append('nuevaImagen', nuevaImagen);

//             await axios.post('http://localhost:8000/Ajustadores/actualizarImagen', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             console.log('Imagen subida y actualizada correctamente');
//             console.log("Id del usuario: " + formData.get('userId'));
//             console.log("Imagen: " + formData.get('nuevaImagen'));

//             message.success('Imagen actualizada correctamente');
//         } catch (error) {
//             console.error('Error al subir o actualizar la imagen:', error);
//             message.error('Error al subir o actualizar la imagen');
//         }
//     };

//     return (
//         <Form onFinish={handleSubmit}>
//             <Form.Item>
//                 <Input
//                     placeholder="ID del usuario"
//                     value={userId}
//                     onChange={(e) => setUserId(e.target.value)}
//                 />
//             </Form.Item>
//             <Form.Item>
//                 <Upload
//                     beforeUpload={handleImageChange}
//                     accept="image/*"
//                     showUploadList={false}
//                 >
//                     <Button icon={<UploadOutlined />}>Seleccionar imagen</Button>
//                 </Upload>
//             </Form.Item>
//             <Form.Item>
//                 <Button type="primary" htmlType="submit">
//                     Subir imagen
//                 </Button>
//             </Form.Item>
//         </Form>
//     );
// }

// export default ActualizarImagen;


import React, { useState } from 'react';
import axios from 'axios';
import { Form, Upload, Button, message, Row, Col, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const ActualizarImagen = () => {
    const [nuevaImagen, setNuevaImagen] = useState(null);
    const Id = localStorage.getItem('Id_Usuario');
    const token = localStorage.getItem('token');



    const handleImageChange = (file) => {
        setNuevaImagen(file);
        return false; // Evita que Ant Design suba automáticamente el archivo
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('userId', Id);
            formData.append('nuevaImagen', nuevaImagen);

            await axios.post('http://localhost:8000/Ajustadores/actualizarImagen', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': token,
                },
            });

            message.success('Imagen actualizada correctamente');
        } catch (error) {
            console.error('Error al subir o actualizar la imagen:', error);
            message.error('Error al subir o actualizar la imagen');
        }
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh', padding: '20px', backgroundColor: '#ffce6f', borderRadius: '20px' }}>
            <Col xs={24} sm={18} md={12} lg={20}>
                <Card
                    title=" "
                    bordered={false}
                    style={{ width: '100%' }}
                >
                    <div style={{alignContent: "center", textAlign: "center"}}>
                    <img src="https://static.vecteezy.com/system/resources/previews/009/170/427/non_2x/colored-design-icon-of-profile-update-vector.jpg" alt="Change Icon"
                    style={{maxHeight: "14rem", maxWidth: "100%", alignSelf: 'center'}}></img>
                    </div>
                    <Form onFinish={handleSubmit} layout="vertical">
                        <Form.Item
                            label="Imagen"
                            name="nuevaImagen"
                            rules={[{ required: true, message: 'Por favor seleccione una imagen!' }]}
                        >
                            <Upload
                                beforeUpload={handleImageChange}
                                accept="image/*"
                                showUploadList={false}
                            >
                                <Button icon={<UploadOutlined />} type="default" block>
                                    Seleccionar Imagen
                                </Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Subir Imagen
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
}

export default ActualizarImagen;
