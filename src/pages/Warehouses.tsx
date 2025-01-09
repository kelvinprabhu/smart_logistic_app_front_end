import React, { useState } from 'react';
import { warehouseService } from '../services/warehouseService';
import { Warehouse } from '../types/warehouse';
import Button from '../components/ui/Button';
import Modal from '../components/ui/modal';
import { Plus } from 'lucide-react';

const Warehouses = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWarehouse, setCurrentWarehouse] = useState<Partial<Warehouse> | null>(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [deleteWarehouseId, setDeleteWarehouseId] = useState<number | null>(null);

  React.useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const data = await warehouseService.getAll();
      setWarehouses(data);
    } catch (err) {
      setError('Failed to fetch warehouses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setCurrentWarehouse(null); // Reset for new warehouse
    setIsModalOpen(true);
  };

  const handleUpdate = (warehouse: Warehouse) => {
    setCurrentWarehouse(warehouse);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setIsDeletePopupOpen(true);
    setDeleteWarehouseId(id);
  };

  const confirmDelete = async () => {
    if (deleteWarehouseId !== null) {
      try {
        await warehouseService.delete(deleteWarehouseId);
        setWarehouses((prev) => prev.filter((w) => w.id !== deleteWarehouseId));
      } catch (err) {
        console.error('Failed to delete warehouse:', err);
      } finally {
        setIsDeletePopupOpen(false);
        setDeleteWarehouseId(null);
      }
    }
  };

  const handleSubmitModal = async () => {
    if (currentWarehouse?.id) {
      // Update warehouse
      try {
        const updatedWarehouse = await warehouseService.update(currentWarehouse.id, currentWarehouse);
        setWarehouses((prev) =>
          prev.map((w) => (w.id === updatedWarehouse.id ? updatedWarehouse : w))
        );
      } catch (err) {
        console.error('Failed to update warehouse:', err);
      }
    } else {
      // Add new warehouse
      try {
        const newWarehouse = await warehouseService.create(currentWarehouse as Omit<Warehouse, 'id'>);
        setWarehouses((prev) => [...prev, newWarehouse]);
      } catch (err) {
        console.error('Failed to add warehouse:', err);
      }
    }

    setIsModalOpen(false);
    setCurrentWarehouse(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Warehouses</h1>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <Plus size={20} />
          Add Warehouse
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {warehouses.map((warehouse) => (
              <tr key={warehouse.id}>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{warehouse.name || 'N/A'}</div>
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{warehouse.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{warehouse.currentInventory} / {warehouse.capacity}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Button onClick={() => handleUpdate(warehouse)} variant="secondary" size="sm" className="mr-2">Edit</Button>
                  <Button onClick={() => handleDelete(warehouse.id)} variant="danger" size="sm">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        title={currentWarehouse?.id ? 'Update Warehouse' : 'Add New Warehouse'}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitModal}
      >
        <div className="flex flex-col space-y-4">
          {/* <input
            type="text"
            placeholder="Name"
            value={currentWarehouse?.name || ''}
            onChange={(e) =>
              setCurrentWarehouse((prev) => ({ ...prev, name: e.target.value }))
            }
            className="border border-gray-300 rounded p-2"
          /> */}
          <input
            type="text"
            placeholder="Location"
            value={currentWarehouse?.location || ''}
            onChange={(e) =>
              setCurrentWarehouse((prev) => ({ ...prev, location: e.target.value }))
            }
            className="border border-gray-300 rounded p-2"
          />
          <input
            type="number"
            placeholder="Capacity"
            value={currentWarehouse?.capacity || ''}
            onChange={(e) =>
              setCurrentWarehouse((prev) => ({ ...prev, capacity: parseInt(e.target.value) }))
            }
            className="border border-gray-300 rounded p-2"
          />
          <input
            type="number"
            placeholder="Current Inventory"
            value={currentWarehouse?.currentInventory || ''}
            onChange={(e) =>
              setCurrentWarehouse((prev) => ({ ...prev, currentInventory: parseInt(e.target.value) }))
            }
            className="border border-gray-300 rounded p-2"
          />
        </div>
      </Modal>

      {/* Delete Confirmation */}
      {isDeletePopupOpen && (
        <Modal
          isOpen={true}
          title="Confirm Delete"
          onClose={() => setIsDeletePopupOpen(false)}
          onSubmit={confirmDelete}
        >
          <p>Are you sure you want to delete this warehouse?</p>
        </Modal>
      )}
    </div>
  );
};

export default Warehouses;
