import React, { useEffect, useState } from "react";
import { Order } from "../types/order";
import { orderService } from "../services/orderService";
import Modal from "../components/ui/modal";
import Button from "../components/ui/Button";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Partial<Order> | null>(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, statusFilter]);

  const fetchOrders = async () => {
    try {
      const data = await orderService.getAll();
      setOrders(data);
    } catch {
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    if (statusFilter === "ALL") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((order) => order.status === statusFilter));
    }
  };

  const handleUpdate = (order: Order) => {
    setCurrentOrder(order);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setIsDeletePopupOpen(true);
    setDeleteOrderId(id);
  };

  const confirmDelete = async () => {
    if (deleteOrderId !== null) {
      try {
        await orderService.delete(deleteOrderId);
        setOrders((prev) => prev.filter((o) => o.id !== deleteOrderId));
      } catch (err) {
        console.error("Failed to delete order:", err);
      } finally {
        setIsDeletePopupOpen(false);
        setDeleteOrderId(null);
      }
    }
  };

  const handleSubmitModal = async () => {
    if (currentOrder?.id) {
      try {
        const updatedOrder = await orderService.update(currentOrder.id, currentOrder);
        setOrders((prev) =>
          prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
        );
      } catch (err) {
        console.error("Failed to update order:", err);
      }
    }
    setIsModalOpen(false);
    setCurrentOrder(null);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {/* Status Filter */}
      <div className="mb-4">
        <label htmlFor="statusFilter" className="mr-2 font-medium">
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={handleStatusChange}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="ALL">All</option>
          <option value="PENDING">Pending</option>
          <option value="SHIPPED">Shipped</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Warehouse</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4">{order.customer.name}</td>
                <td className="px-6 py-4">{order.warehouse.location}</td>
                <td className="px-6 py-4">{order.status}</td>
                <td className="px-6 py-4">{order.quantity}</td>
                <td className="px-6 py-4">
                  <Button onClick={() => handleUpdate(order)}>Edit</Button>
                  <Button onClick={() => handleDelete(order.id)} variant="danger">
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Update */}
      <Modal
        isOpen={isModalOpen}
        title="Update Order"
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitModal}
      >
        {/* Add form fields for order details */}
        <p>Edit Order Details</p>
      </Modal>

      {/* Delete Confirmation */}
      {isDeletePopupOpen && (
        <Modal
          isOpen={true}
          title="Confirm Delete"
          onClose={() => setIsDeletePopupOpen(false)}
          onSubmit={confirmDelete}
        >
          <p>Are you sure you want to delete this order?</p>
        </Modal>
      )}
    </div>
  );
};

export default Orders;
