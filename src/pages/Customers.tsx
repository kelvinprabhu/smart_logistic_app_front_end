import { useEffect, useState } from "react";
import { Customer } from "../types/customer";
import { customerService } from "../services/customerService";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Partial<Customer> | null>(null);
  const [modalType, setModalType] = useState<"view" | "edit" | "add">("view");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await customerService.getAll();
      setCustomers(data);
    } catch {
      setError("Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomer = () => {
    setModalType("add");
    setCurrentCustomer(null);
    setIsModalOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setModalType("edit");
    setCurrentCustomer(customer);
    setIsModalOpen(true);
  };

  const handleViewCustomer = (customer: Customer) => {
    setModalType("view");
    setCurrentCustomer(customer);
    setIsModalOpen(true);
  };

  const handleDeleteCustomer = async (id: number) => {
    try {
      await customerService.delete(id);
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Failed to delete customer:", err);
    }
  };

  const handleSubmitModal = async (data?: Partial<Customer>) => {
    if (!data) return; // Safeguard against undefined
    try {
      if (modalType === "add") {
        const newCustomer = await customerService.create(data as Omit<Customer, "id" | "createdAt">);
        setCustomers((prev) => [...prev, newCustomer]);
      } else if (modalType === "edit" && currentCustomer?.id) {
        const updatedCustomer = await customerService.update(currentCustomer.id, data);
        setCustomers((prev) =>
          prev.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c))
        );
      }
    } catch (err) {
      console.error("Failed to save customer:", err);
    } finally {
      setIsModalOpen(false);
      setCurrentCustomer(null);
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <Button onClick={handleAddCustomer} variant="primary">
        Add Customer
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="border rounded-lg shadow-lg p-4 cursor-pointer"
            onClick={() => handleViewCustomer(customer)}
          >
            <h2 className="text-lg font-semibold">{customer.name}</h2>
            <p>{customer.email}</p>
            <p>{customer.phone}</p>
            <div className="flex justify-between mt-2">
              <Button onClick={() => handleEditCustomer(customer)} variant="secondary">
                Edit
              </Button>
              <Button onClick={() => handleDeleteCustomer(customer.id)} variant="danger">
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && currentCustomer !== null && (
        <Modal
          isOpen={isModalOpen}
          title={
            modalType === "add"
              ? "Add Customer"
              : modalType === "edit"
              ? "Edit Customer"
              : "View Customer"
          }
          onClose={() => setIsModalOpen(false)}
          onSubmit={modalType === "view" ? undefined : handleSubmitModal}
        >
          {modalType === "view" ? (
            <div>
              <p><strong>Name:</strong> {currentCustomer.name}</p>
              <p><strong>Email:</strong> {currentCustomer.email}</p>
              <p><strong>Phone:</strong> {currentCustomer.phone}</p>
              <p><strong>Address:</strong> {currentCustomer.address}</p>
              <p><strong>Created At:</strong> {currentCustomer.createdAt}</p>
            </div>
          ) : (
            <form>
              <input
                type="text"
                placeholder="Name"
                defaultValue={currentCustomer?.name}
                onChange={(e) =>
                  setCurrentCustomer((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <input
                type="email"
                placeholder="Email"
                defaultValue={currentCustomer?.email}
                onChange={(e) =>
                  setCurrentCustomer((prev) => ({ ...prev, email: e.target.value }))
                }
              />
              <input
                type="text"
                placeholder="Phone"
                defaultValue={currentCustomer?.phone}
                onChange={(e) =>
                  setCurrentCustomer((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
              <textarea
                placeholder="Address"
                defaultValue={currentCustomer?.address}
                onChange={(e) =>
                  setCurrentCustomer((prev) => ({ ...prev, address: e.target.value }))
                }
              ></textarea>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
};

export default Customers;
