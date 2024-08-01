// import React, { useState, useEffect } from 'react';
// import { Table, message, Modal, Button } from 'antd';
// import axios from 'axios';

// const DataQuery = () => {
//   const token = localStorage.getItem('token');
//   const [tableData, setTableData] = useState([]);

//   const fetchUsersData = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/Ajustadores/ConsultarAjustadores', {
//         headers: {
//           'Authorization': token,
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.status !== 200) {
//         throw new Error('Error en la solicitud.');
//       }

//       const tableData = response.data;

//       if (!Array.isArray(tableData)) {
//         throw new Error('Los datos recibidos no son un array válido.');
//       }

//       setTableData(tableData);
//     } catch (error) {
//       console.error('Error:', error.message);
//       message.error('Error al consultar los datos.');
//       setTableData([]);
//     }
//   };

//   useEffect(() => {
//     fetchUsersData();
//   }, [token]);

//   const handleDelete = (id) => {
//     console.log('ID to delete:', id); // Debugging line to check ID

//     Modal.confirm({
//       title: 'Confirmación de Eliminación',
//       content: '¿Estás seguro de que deseas eliminar a este usuario?',
//       okText: 'Sí',
//       okType: 'danger',
//       cancelText: 'No',
//       onOk: async () => {
//         try {
//           const response = await axios.delete(`http://localhost:8000/Ajustadores/EliminarAjustadores/${id}`, {
//             headers: {
//               'Authorization': token,
//               'Content-Type': 'multipart/form-data',
//             },
//           });

//           if (response.status !== 200) {
//             throw new Error('Error en la solicitud.');
//           }

//           message.success('Registro eliminado correctamente.');
//           fetchUsersData(); // Refresh the data after deletion
//         } catch (error) {
//           console.error('Error:', error.message);
//           message.error('Error al eliminar el registro.');
//         }
//       },
//     });
//   };

//   const columns = [
//     {
//       title: 'Numero de empleado / registro',
//       dataIndex: 'Id_Usuario',
//       key: 'Id_Usuario',
//       // Ensure this column is responsive
//       ellipsis: true,
//     },
//     {
//       title: 'Nombre',
//       dataIndex: 'Nombres',
//       key: 'Nombres',
//       // Ensure this column is responsive
//       ellipsis: true,
//     },
//     {
//       title: 'Apellidos',
//       dataIndex: 'Apellidos',
//       key: 'Apellidos',
//       // Ensure this column is responsive
//       ellipsis: true,
//     },
//     {
//       title: 'Rol',
//       dataIndex: 'Rol',
//       key: 'Rol',
//       // Ensure this column is responsive
//       ellipsis: true,
//     },
//     {
//       title: 'Foto_Perfil',
//       dataIndex: 'Foto_Perfil',
//       key: 'Foto_Perfil',
//       render: (imagen) => (
//         <img
//           src={`http://localhost:8000/images/${imagen}`}
//           alt="Imagen de perfil"
//           style={{ width: '100%', maxWidth: 100, borderRadius: '30px' }}
//         />
//       ),
//     },
//     {
//       title: 'Acciones',
//       key: 'actions',
//       render: (text, record) => {
//         console.log('Record in Actions:', record); // Debugging line to check record structure

//         return (
//           <Button
//             type="danger"
//             onClick={() => handleDelete(record.Id_Usuario)} // Use the correct ID field
//             style={{ backgroundColor: 'red' }}
//           >
//             Eliminar
//           </Button>
//         );
//       },
//     },
//   ];

//   return (
//   <div style={{backgroundColor: 'red'}}>
//     <div style={{ padding: '20px', overflowX: 'auto', width: '100%', 
//     textAlign: 'center', backgroundColor: 'black' }}>
//       <Table
//         columns={columns}
//         dataSource={tableData}
//         scroll={{ x: 'max-content' }} // Add horizontal scroll if needed
//         bordered
//         size="middle" // Adjust size for better readability
//       />
//     </div>
//     </div>
//   );
// };

// export default DataQuery;


import React, { useState, useEffect } from 'react';
import { Table, message, Modal, Button } from 'antd';
import axios from 'axios';
import '../../Styles/VerAjustadores.css'

const DataQuery = () => {
  const token = localStorage.getItem('token');
  const [tableData, setTableData] = useState([]);

  const fetchUsersData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/Ajustadores/ConsultarAjustadores', {
        headers: {
          'Authorization': token,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status !== 200) {
        throw new Error('Error en la solicitud.');
      }

      const tableData = response.data;

      if (!Array.isArray(tableData)) {
        throw new Error('Los datos recibidos no son un array válido.');
      }

      setTableData(tableData);
    } catch (error) {
      console.error('Error:', error.message);
      message.error('Error al consultar los datos.');
      setTableData([]);
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, [token]);

  const handleDelete = (id) => {
    console.log('ID to delete:', id); // Debugging line to check ID

    Modal.confirm({
      title: 'Confirmación de Eliminación',
      content: '¿Estás seguro de que deseas eliminar a este usuario?',
      okText: 'Sí',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          const response = await axios.delete(`http://localhost:8000/Ajustadores/EliminarAjustadores/${id}`, {
            headers: {
              'Authorization': token,
              'Content-Type': 'multipart/form-data',
            },
          });

          if (response.status !== 200) {
            throw new Error('Error en la solicitud.');
          }

          message.success('Registro eliminado correctamente.');
          fetchUsersData(); // Refresh the data after deletion
        } catch (error) {
          console.error('Error:', error.message);
          message.error('Error al eliminar el registro.');
        }
      },
    });
  };

  const columns = [
    {
      title: 'Numero de empleado / registro',
      dataIndex: 'Id_Usuario',
      key: 'Id_Usuario',
      ellipsis: true,
    },
    {
      title: 'Nombre',
      dataIndex: 'Nombres',
      key: 'Nombres',
      ellipsis: true,
    },
    {
      title: 'Apellidos',
      dataIndex: 'Apellidos',
      key: 'Apellidos',
      ellipsis: true,
    },
    {
      title: 'Rol',
      dataIndex: 'Rol',
      key: 'Rol',
      ellipsis: true,
    },
    {
      title: 'Foto_Perfil',
      dataIndex: 'Foto_Perfil',
      key: 'Foto_Perfil',
      render: (imagen) => (
        <img
          src={`http://localhost:8000/images/${imagen}`}
          alt="Imagen de perfil"
          style={{ width: '100%', maxWidth: 100, borderRadius: '30px' }}
        />
      ),
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => {
        console.log('Record in Actions:', record); // Debugging line to check record structure

        return (
          <Button
            type="danger"
            onClick={() => handleDelete(record.Id_Usuario)}
            style={{ backgroundColor: 'red', color: 'white'}}
          >
            Eliminar
          </Button>
        );
      },
    },
  ];

  return (
    <div className="container" style={{backgroundColor: '#BB55E0'}}>
      <h1 style={{color: 'white'}}>Visualización de usuarios</h1>
      <img src="https://cdn-icons-png.flaticon.com/512/5441/5441859.png"
      alt="Icon"
      style={{maxHeight: '10rem', marginTop: "2rem", marginBottom: '2rem'}}/>
      <div className="half-circle"></div> {/* Contenedor del medio círculo */}
      <div className="circle-background" style={{ position: 'absolute', marginTop: '250px', marginLeft: '10px' }}></div>
      <div className="table-container">
        <Table
          columns={columns}
          dataSource={tableData}
          style={{height: '100%'}}
          scroll={{ x: 'max-content' }} // Add horizontal scroll if needed
          bordered
          size="middle" // Adjust size for better readability
        />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default DataQuery;
