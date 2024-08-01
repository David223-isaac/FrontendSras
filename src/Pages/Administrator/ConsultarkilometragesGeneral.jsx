// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Form, Select, Button, Layout } from 'antd';
// import 'antd/dist/reset.css'; // Importa los estilos de Ant Design

// const { Header, Content, Footer } = Layout;
// const { Option } = Select;

// const ConsultarkilometragesGeneral = () => {
//   const token = localStorage.getItem('token');
  
//   const [ajustadores, setAjustadores] = useState([]);
//   const [form] = Form.useForm();

//   // Obtiene la lista de ajustadores al cargar el componente
//   useEffect(() => {
//     axios.get('http://localhost:8000/Ajustadores/ConsultarAjustadores', {
//         headers: {
//             'Authorization': token,
//             'Content-Type': 'multipart/form-data',
//           },
//     })
//       .then(response => {
//         setAjustadores(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching ajustadores:', error);
//       });
//   }, [token]);

//   const onSearch = () => {
//     form.validateFields().then(values => {
//       const { nombreAjustador } = values;

//       if (!nombreAjustador) {
//         console.error('El nombre del ajustador es requerido');
//         return;
//       }

//       axios.get(`http://localhost:8000/Kilometrajes/ConsultarKilometrajesPorAjustador/${nombreAjustador}`, {
//         headers: {
//             'Authorization': token,
//           },
//       })
//         .then(response => {
//           console.log('Resultados:', response.data);
//         })
//         .catch(error => {
//           console.error('Error fetching registros:', error);
//         });
//     }).catch(error => {
//       console.error('Error en la validación del formulario:', error);
//     });
//   };

//   return (
//     <Layout style={{ minHeight: '100vh', backgroundColor: '#19E092' }}>
//       <Header style={{ backgroundColor: '#1890ff', padding: 0, borderRadius: '20px' }}>
//         <div style={{ color: 'white', fontSize: '18px', textAlign: 'center' }}>Formulario de Búsqueda</div>
//       </Header>
//       <Content style={{ padding: '20px' }}>
//         <Form
//           form={form}
//           layout="vertical"
//           style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}
//         >
//           <Form.Item
//             name="nombreAjustador"
//             label="Nombre del Ajustador"
//             rules={[{ required: true, message: 'Por favor, selecciona un ajustador' }]}
//           >
//             <Select placeholder="Selecciona un ajustador" allowClear>
//               {ajustadores.map(ajustador => (
//                 <Option key={ajustador.id} value = {`${ajustador.Nombres} ${ajustador.Apellidos}`}>
//                   {`${ajustador.Nombres} ${ajustador.Apellidos}`}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" onClick={onSearch}>Buscar</Button>
//           </Form.Item>
//         </Form>
//       </Content>
//       <Footer style={{ textAlign: 'center' }}>David Isaac ©2024</Footer>
//     </Layout>
//   );
// };

// export default ConsultarkilometragesGeneral;









// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Form, Select, Button, Layout, Table } from 'antd';
// import 'antd/dist/reset.css'; // Importa los estilos de Ant Design

// const { Header, Content, Footer } = Layout;
// const { Option } = Select;

// const ConsultarkilometragesGeneral = () => {
//   const token = localStorage.getItem('token');
  
//   const [ajustadores, setAjustadores] = useState([]);
//   const [kilometrajes, setKilometrajes] = useState([]); // Estado para almacenar los datos de kilometrajes
//   const [form] = Form.useForm();

//   // Obtiene la lista de ajustadores al cargar el componente
//   useEffect(() => {
//     axios.get('http://localhost:8000/Ajustadores/ConsultarAjustadores', {
//         headers: {
//             'Authorization': token,
//             'Content-Type': 'multipart/form-data',
//           },
//     })
//       .then(response => {
//         setAjustadores(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching ajustadores:', error);
//       });
//   }, [token]);

//   const onSearch = () => {
//     form.validateFields().then(values => {
//       const { nombreAjustador } = values;

//       if (!nombreAjustador) {
//         console.error('El nombre del ajustador es requerido');
//         return;
//       }

//       axios.get(`http://localhost:8000/Kilometrajes/ConsultarKilometrajesPorAjustador/${nombreAjustador}`, {
//         headers: {
//             'Authorization': token,
//           },
//       })
//         .then(response => {
//           setKilometrajes(response.data); // Actualiza el estado con los datos obtenidos
//         })
//         .catch(error => {
//           console.error('Error fetching registros:', error);
//         });
//     }).catch(error => {
//       console.error('Error en la validación del formulario:', error);
//     });
//   };

//   // Definir columnas para la tabla
//   const columns = [
//     {
//       title: 'ID',
//       dataIndex: 'id',
//       key: 'id',
//     },
//     {
//       title: 'Fecha',
//       dataIndex: 'fecha',
//       key: 'fecha',
//     },
//     {
//       title: 'Kilometraje',
//       dataIndex: 'kilometraje',
//       key: 'kilometraje',
//     },
//     // Agrega aquí más columnas según la estructura de tus datos
//   ];

//   return (
//     <Layout style={{ minHeight: '100vh', backgroundColor: '#19E092' }}>
//       <Header style={{ backgroundColor: 'black', padding: 0, borderRadius: '20px' }}>
//         <div style={{ color: 'white', fontSize: '18px', textAlign: 'center' }}>Consulta de kilometrajes</div>
//       </Header>
//       <div className="circle-background" style={{ position: 'absolute', marginTop: '-50px', marginLeft: '10px' }}></div>
//     <div style={{textAlign: 'center', marginTop: '2rem', marginBottom: '2rem'}}>
//     <img src="https://cdn.icon-icons.com/icons2/1483/PNG/512/internetspeed_102161.png" alt="Icon"
//     style={{maxWidth: '130px'}}></img>
//     </div>
//       <Content style={{ padding: '20px' }}>
        
//         <Form
//           form={form}
//           layout="vertical"
//           style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}
//         >
//           <Form.Item
//             name="nombreAjustador"
//             label="Nombre del Ajustador"
//             rules={[{ required: true, message: 'Por favor, selecciona un ajustador' }]}
//           >
//             <Select placeholder="Selecciona un ajustador" allowClear>
//               {ajustadores.map(ajustador => (
//                 <Option key={ajustador.id} value={`${ajustador.Nombres} ${ajustador.Apellidos}`}>
//                   {`${ajustador.Nombres} ${ajustador.Apellidos}`}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" onClick={onSearch}>Buscar</Button>
//           </Form.Item>
//         </Form>

//         {/* Mostrar la tabla solo si hay datos */}
//         {kilometrajes.length >= 0 && (
//           <Table
//             dataSource={kilometrajes}
//             columns={columns}
//             rowKey="id"
//             style={{ marginTop: '20px' }}
//           />
//         )}
//       </Content>
//       <Footer style={{ textAlign: 'center' }}>David Isaac ©2024</Footer>
//     </Layout>
//   );
// };

// export default ConsultarkilometragesGeneral;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Select, Button, Layout, Table } from 'antd';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import 'antd/dist/reset.css'; // Importa los estilos de Ant Design

const { Header, Content, Footer } = Layout;
const { Option } = Select;

const ConsultarkilometragesGeneral = () => {
  const token = localStorage.getItem('token');
  
  const [ajustadores, setAjustadores] = useState([]);
  const [kilometrajes, setKilometrajes] = useState([]); // Estado para almacenar los datos de kilometrajes
  const [form] = Form.useForm();

  // Obtiene la lista de ajustadores al cargar el componente
  useEffect(() => {
    axios.get('http://localhost:8000/Ajustadores/ConsultarAjustadores', {
        headers: {
            'Authorization': token,
            'Content-Type': 'multipart/form-data',
          },
    })
      .then(response => {
        setAjustadores(response.data);
      })
      .catch(error => {
        console.error('Error fetching ajustadores:', error);
      });
  }, [token]);

  const onSearch = () => {
    form.validateFields().then(values => {
      const { nombreAjustador } = values;

      if (!nombreAjustador) {
        console.error('El nombre del ajustador es requerido');
        return;
      }

      axios.get(`http://localhost:8000/Kilometrajes/ConsultarKilometrajesPorAjustador/${nombreAjustador}`, {
        headers: {
            'Authorization': token,
          },
      })
        .then(response => {
          // Verifica que response.data.data sea un array
          if (Array.isArray(response.data.data)) {
            setKilometrajes(response.data.data);
          } else {
            console.error('Los datos recibidos no son un array:', response.data.data);
          }
        })
        .catch(error => {
          console.error('Error fetching registros:', error);
        });
    }).catch(error => {
      console.error('Error en la validación del formulario:', error);
    });
  };

  // Definir columnas para la tabla
  const columns = [
    {
      title: 'Kilometraje registrado',
      dataIndex: 'KilometrajeRegistrado',
      key: 'KilometrajeRegistrado',
    },
    {
      title: 'Fecha de registro',
      dataIndex: 'FechaDeRegistro',
      key: 'FechaDeRegistro',
    },
    {
      title: 'Ajustador',
      dataIndex: 'AjustadorQueRegistra',
      key: 'AjustadorQueRegistra',
    },
    // Agrega aquí más columnas según la estructura de tus datos
  ];

  const exportToExcel = () => {
    if (kilometrajes.length === 0) {
      console.error('No hay datos para exportar');
      return;
    }

    const ws = XLSX.utils.json_to_sheet(kilometrajes);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Kilometrajes');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'kilometrajes.xlsx');
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#19E092' }}>
      <Header style={{ backgroundColor: 'black', padding: 0, borderRadius: '20px' }}>
        <div style={{ color: 'white', fontSize: '18px', textAlign: 'center' }}>Consulta de kilometrajes</div>
      </Header>
      <div className="circle-background" style={{ position: 'absolute', marginTop: '-50px', marginLeft: '10px' }}></div>
      <div style={{textAlign: 'center', marginTop: '2rem', marginBottom: '2rem'}}>
        <img src="https://cdn.icon-icons.com/icons2/1483/PNG/512/internetspeed_102161.png" alt="Icon"
        style={{maxWidth: '130px'}}></img>
      </div>
      <Content style={{ padding: '20px' }}>
        <Form
          form={form}
          layout="vertical"
          style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}
        >
          <Form.Item
            name="nombreAjustador"
            label="Nombre del Ajustador"
            rules={[{ required: true, message: 'Por favor, selecciona un ajustador' }]}
          >
            <Select placeholder="Selecciona un ajustador" allowClear>
              {ajustadores.map(ajustador => (
                <Option key={ajustador.id} value={`${ajustador.Nombres} ${ajustador.Apellidos}`}>
                  {`${ajustador.Nombres} ${ajustador.Apellidos}`}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={onSearch}>Buscar</Button>
          </Form.Item>
        </Form>

        <Button 
          type="default" 
          onClick={exportToExcel}
          disabled={kilometrajes.length === 0} // Deshabilitar el botón si no hay datos
          style={{ marginTop: '20px' }}
        >
          Exportar a Excel
        </Button>

        <Table
          dataSource={kilometrajes}
          columns={columns}
          rowKey="id"
          style={{ marginTop: '20px' }}
        />
      </Content>
      <Footer style={{ textAlign: 'center' }}>David Isaac ©2024</Footer>
    </Layout>
  );
};

export default ConsultarkilometragesGeneral;
