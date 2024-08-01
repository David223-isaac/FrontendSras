import React from 'react';
import { Outlet } from 'react-router-dom';
import PrincipalAjustador from '../Ajuster/PrincipalAjustador';

const AdminLayout = () => {
  return (
    <div>
      <PrincipalAjustador />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
