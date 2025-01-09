import React, { useState } from 'react';
import { shipmentService } from '../services/shipmentService';
import { Shipment } from '../types/shipment';
import Button from '../components/ui/Button';
import { Plus, Search } from 'lucide-react';

const Shipments = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Omit<Shipment, 'trackingId' | 'createdAt'>>({
    orderId: 0,
    shipmentStatus: 'PENDING',
    shippedDate: '',
    expectedDeliveryDate: '',
    actualDeliveryDate: '',
    carrier: '',
  });

  React.useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      const response = await shipmentService.getAll();
      setShipments(response.data);
    } catch (err) {
      setError('Failed to fetch shipments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateShipment = async () => {
    try {
      await shipmentService.create(formData);
      setShowForm(false);
      fetchShipments();
    } catch (err) {
      console.error('Error creating shipment:', err);
    }
  };

  const handleUpdateShipment = async (status: string) => {
    if (selectedShipment) {
      try {
        await shipmentService.updateStatus(selectedShipment.trackingId, status);
        fetchShipments();
        setSelectedShipment(null);
      } catch (err) {
        console.error('Error updating shipment status:', err);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Shipments</h1>
        <div className="flex gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search shipments..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
          <Button className="flex items-center gap-2" onClick={() => setShowForm(true)}>
            <Plus size={20} />
            New Shipment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Active Shipments</h2>
          </div>
          <div className="divide-y">
            {shipments.map((shipment) => (
              <div
                key={shipment.trackingId}
                className="p-6 cursor-pointer hover:bg-gray-50"
                onClick={() => setSelectedShipment(shipment)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Order #{shipment.orderId}</h3>
                    <p className="text-sm text-gray-500">
                      Carrier: {shipment.carrier}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full
                      ${shipment.shipmentStatus === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                        shipment.shipmentStatus === 'IN_TRANSIT' ? 'bg-blue-100 text-blue-800' :
                          shipment.shipmentStatus === 'DELAYED' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'}`}
                  >
                    {shipment.shipmentStatus.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Expected: {new Date(shipment.expectedDeliveryDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          {selectedShipment ? (
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Shipment Details - Order #{selectedShipment.orderId}
              </h2>
              <div className="space-y-4">
                <p>Carrier: {selectedShipment.carrier}</p>
                <p>Expected Delivery: {new Date(selectedShipment.expectedDeliveryDate).toLocaleDateString()}</p>
                <div className="space-x-3">
                  <Button onClick={() => handleUpdateShipment('DELIVERED')}>Mark as Delivered</Button>
                  <Button onClick={() => handleUpdateShipment('DELAYED')} className="bg-red-500 text-white">
                    Mark as Delayed
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              Select a shipment to view details
            </div>
          )}
        </div>
      </div>

      {showForm && (
       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
       <div className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4">
         <h2 className="text-lg font-semibold">New Shipment</h2>
     
         <div className="space-y-2">
           <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">Order ID</label>
           <input
             type="number"
             id="orderId"
             name="orderId"
             placeholder="Enter Order ID"
             className="w-full p-2 border rounded"
             value={formData.orderId}
             onChange={handleFormChange}
           />
         </div>
     
         <div className="space-y-2">
           <label htmlFor="shipmentStatus" className="block text-sm font-medium text-gray-700">Shipment Status</label>
           <select
             id="shipmentStatus"
             name="shipmentStatus"
             className="w-full p-2 border rounded"
             value={formData.shipmentStatus}
             onChange={handleFormChange}
           >
             <option value="">Select Status</option>
             <option value="IN_TRANSIT">In Transit</option>
             <option value="DELIVERED">Delivered</option>
             <option value="DELAYED">Delayed</option>
           </select>
         </div>
     
         <div className="space-y-2">
           <label htmlFor="shippedDate" className="block text-sm font-medium text-gray-700">Shipped Date</label>
           <input
             type="date"
             id="shippedDate"
             name="shippedDate"
             className="w-full p-2 border rounded"
             value={formData.shippedDate}
             onChange={handleFormChange}
             title="Shipped Date"
             placeholder="Select Shipped Date"
           />
         </div>
     
         <div className="space-y-2">
           <label htmlFor="expectedDeliveryDate" className="block text-sm font-medium text-gray-700">Expected Delivery Date</label>
           <input
             type="date"
             id="expectedDeliveryDate"
             name="expectedDeliveryDate"
             className="w-full p-2 border rounded"
             value={formData.expectedDeliveryDate}
             onChange={handleFormChange}
             title="Expected Delivery Date"
           />
         </div>
     
         <div className="space-y-2">
           <label htmlFor="carrier" className="block text-sm font-medium text-gray-700">Carrier</label>
           <input
             type="text"
             id="carrier"
             name="carrier"
             placeholder="Enter Carrier"
             className="w-full p-2 border rounded"
             value={formData.carrier}
             onChange={handleFormChange}
           />
         </div>
     
         <div className="flex justify-end space-x-3">
           <Button onClick={() => setShowForm(false)} className="bg-gray-500 text-white">
             Cancel
           </Button>
           <Button onClick={handleCreateShipment} className="bg-blue-500 text-white">
             Save
           </Button>
         </div>
       </div>
     </div>
     
      )}
        </div>
      );
    };



export default Shipments;
