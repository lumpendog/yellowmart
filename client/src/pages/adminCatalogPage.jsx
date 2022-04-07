import React from 'react';
import { useParams } from 'react-router-dom';
import AddItemForm from '../components/ui/addItemForm';
import AdminCatalog from '../components/ui/adminCatalog';
import EditItemForm from '../components/ui/editItemForm';

const AdminCatalogPage = () => {
  const { itemId } = useParams();
  return (
    <>
      {itemId ? <EditItemForm itemId={itemId} /> : <AddItemForm />}
      <AdminCatalog />
    </>
  );
};

export default AdminCatalogPage;
