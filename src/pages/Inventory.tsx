import React, { useState, useEffect } from 'react';
import { InventoryItem } from '../types/inventory';
import { inventoryService } from '../services/inventoryService';
import Modal from '../components/ui/modal';
import Button from '../components/ui/Button';

const Inventory: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<Partial<InventoryItem> | null>(null);
  const [formData, setFormData] = useState<Omit<InventoryItem, 'id' | 'createdAt'> | null>(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const data = await inventoryService.getAll();
      setInventory(data);
    } catch (err) {
      setError('Failed to fetch inventory');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setFormData({ warehouseId: 1, productName: '', quantity: 0, minThreshold: 0 });
    setIsModalOpen(true);
  };

  const handleEdit = (item: InventoryItem) => {
    setFormData({
      warehouseId: item.warehouse.id,
      productName: item.productName,
      quantity: item.quantity,
      minThreshold: item.minThreshold,
    });
    setIsModalOpen(true);
    setCurrentItem(item);
  };

  const handleDelete = (id: number) => {
    setIsDeletePopupOpen(true);
    setDeleteItemId(id);
  };

  const confirmDelete = async () => {
    if (deleteItemId !== null) {
      try {
        await inventoryService.delete(deleteItemId);
        setInventory((prev) => prev.filter((item) => item.id !== deleteItemId));
      } catch (err) {
        console.error('Failed to delete inventory item:', err);
      } finally {
        setIsDeletePopupOpen(false);
        setDeleteItemId(null);
      }
    }
  };

  const handleSubmitForm = async () => {
    if (!formData) return;

    try {
      if (currentItem?.id) {
        await inventoryService.update(currentItem.id, formData);
        setInventory((prev) => 
          prev.map((item) => (item.id === currentItem.id ? { ...item, ...formData } : item))
        );
      } else {
        const newItem = await inventoryService.create(formData);
        setInventory((prev) => [...prev, newItem]);
      }
    } catch (err) {
      console.error('Failed to save inventory item:', err);
    } finally {
      setIsModalOpen(false);
      setFormData(null);
      setCurrentItem(null);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>
      <Button onClick={handleAdd}>Add New Item</Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {inventory.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold">{item.productName}</h3>
            <p>Warehouse: {item.warehouse.location}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Min Threshold: {item.minThreshold}</p>
            <Button onClick={() => handleEdit(item)}>Edit</Button>
            <Button onClick={() => handleDelete(item.id)} variant="danger">Delete</Button>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        title={currentItem ? 'Edit Inventory Item' : 'Add New Inventory Item'}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitForm}
      >
        <form>
          <div>
            <label>Product Name</label>
            <input
              type="text"
              value={formData?.productName || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, productName: e.target.value }))}
              className="input"
            />
          </div>
          <div>
            <label>Quantity</label>
            <input
              type="number"
              value={formData?.quantity || 0}
              onChange={(e) => setFormData((prev) => ({ ...prev, quantity: Number(e.target.value) }))}
              className="input"
            />
          </div>
          <div>
            <label>Min Threshold</label>
            <input
              type="number"
              value={formData?.minThreshold || 0}
              onChange={(e) => setFormData((prev) => ({ ...prev, minThreshold: Number(e.target.value) }))}
              className="input"
            />
          </div>
        </form>
      </Modal>

      {isDeletePopupOpen && (
        <Modal
          isOpen={isDeletePopupOpen}
          title="Confirm Delete"
          onClose={() => setIsDeletePopupOpen(false)}
          onSubmit={confirmDelete}
        >
          <p>Are you sure you want to delete this inventory item?</p>
        </Modal>
      )}
    </div>
  );
};

export default Inventory;
