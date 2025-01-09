// pages/DeliverySchedule.tsx
import React, { useState, useEffect } from 'react';
import { DeliverySchedule } from '../types/deliverySchedule';
import { deliveryScheduleService } from '../services/deliveryScheduleService';
import Modal from '../components/ui/modal';
import Button from '../components/ui/Button';

const DeliverySchedules: React.FC = () => {
  const [deliverySchedules, setDeliverySchedules] = useState<DeliverySchedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentSchedule, setCurrentSchedule] = useState<Partial<DeliverySchedule> | null>(null);
  const [formData, setFormData] = useState<Partial<Omit<DeliverySchedule, 'scheduleId' | 'order' | 'agent'>>>({
    expectedDeliveryDate: '',
    status: 'SCHEDULED',
  });
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState<boolean>(false);
  const [deleteScheduleId, setDeleteScheduleId] = useState<number | null>(null);

  useEffect(() => {
    fetchDeliverySchedules();
  }, []);

  const fetchDeliverySchedules = async () => {
    try {
      const data = await deliveryScheduleService.getAll();
      setDeliverySchedules(data);
    } catch {
      setError('Failed to fetch delivery schedules');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setFormData({
      expectedDeliveryDate: '',
      status: 'SCHEDULED',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (schedule: DeliverySchedule) => {
    setFormData({
      expectedDeliveryDate: schedule.expectedDeliveryDate,
      status: schedule.status,
    });
    setCurrentSchedule(schedule);
    setIsModalOpen(true);
  };

  const handleDelete = (scheduleId: number) => {
    setIsDeletePopupOpen(true);
    setDeleteScheduleId(scheduleId);
  };

  const confirmDelete = async () => {
    if (deleteScheduleId !== null) {
      try {
        await deliveryScheduleService.delete(deleteScheduleId);
        setDeliverySchedules((prev) => prev.filter((schedule) => schedule.scheduleId !== deleteScheduleId));
      } catch (err) {
        console.error('Failed to delete delivery schedule:', err);
      } finally {
        setIsDeletePopupOpen(false);
        setDeleteScheduleId(null);
      }
    }
  };

  const handleSubmitForm = async () => {
    if (!formData) return;

    try {
      if (currentSchedule?.scheduleId) {
        await deliveryScheduleService.update(currentSchedule.scheduleId, formData);
        setDeliverySchedules((prev) =>
          prev.map((schedule) =>
            schedule.scheduleId === currentSchedule.scheduleId ? { ...schedule, ...formData } : schedule
          )
        );
      } else {
        // const newSchedule = await deliveryScheduleService.create(formData);
        // setDeliverySchedules((prev) => [...prev, newSchedule]);
      }
    } catch (err) {
      console.error('Failed to save delivery schedule:', err);
    } finally {
      setIsModalOpen(false);
      setFormData({
        expectedDeliveryDate: '',
        status: 'SCHEDULED',
      });
      setCurrentSchedule(null);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Delivery Schedule</h1>
      <Button onClick={handleAdd}>Add New Schedule</Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {deliverySchedules.map((schedule) => (
          <div key={schedule.scheduleId} className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold">{schedule.order.customer.name}</h3>
            <p>Order ID: {schedule.order.id}</p>
            <p>Agent: {schedule.agent.name}</p>
            <p>Expected Delivery: {schedule.expectedDeliveryDate}</p>
            <p>Status: {schedule.status}</p>
            <Button onClick={() => handleEdit(schedule)}>Edit</Button>
            <Button onClick={() => handleDelete(schedule.scheduleId)} variant="danger">
              Delete
            </Button>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        title={currentSchedule ? 'Edit Delivery Schedule' : 'Add New Delivery Schedule'}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitForm}
      >
        <form>
          <div>
            <label>Expected Delivery Date</label>
            <input
              type="date"
              value={formData?.expectedDeliveryDate || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, expectedDeliveryDate: e.target.value }))}
              className="input"
              placeholder="Enter expected delivery date"
            />
          </div>
          <div>
            <label>Status</label>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={formData?.status || 'SCHEDULED'}
              onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
              className="input"
            >
              <option value="SCHEDULED">Scheduled</option>
              <option value="IN_TRANSIT">In Transit</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
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
          <p>Are you sure you want to delete this delivery schedule?</p>
        </Modal>
      )}
    </div>
  );
};

export default DeliverySchedules;
