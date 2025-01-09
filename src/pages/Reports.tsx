// pages/OrderReportPage.tsx

import React, { useEffect, useState } from "react";
import { fetchOrderReports } from "../services/orderReportService";
import { OrderReport } from "../types/OrderReport";

const OrderReportPage: React.FC = () => {
  const [reports, setReports] = useState<OrderReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const data = await fetchOrderReports();
        setReports(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadReports();
  }, []);

  const exportToCSV = () => {
    const headers = [
      "Order ID",
      "Customer Name",
      "Customer Email",
      "Customer Phone",
      "Customer Address",
      "Order Status",
      "Order Date",
      "Delivery Date",
      "Order Quantity",
      "Warehouse Location",
      "Warehouse Capacity",
      "Warehouse Current Inventory",
      "Delivery Agent Name",
      "Delivery Agent Phone",
      "Delivery Agent Route",
    ];

    const rows = reports.map((report) =>
      [
        report.orderId,
        report.customerName,
        report.customerEmail,
        report.customerPhone,
        report.customerAddress,
        report.orderStatus,
        report.orderDate,
        report.deliveryDate,
        report.orderQuantity,
        report.warehouseLocation,
        report.warehouseCapacity,
        report.warehouseCurrentInventory,
        report.deliveryAgentName,
        report.deliveryAgentPhone,
        report.deliveryAgentRoute,
      ].join(",")
    );

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "OrderReports.csv";
    link.click();
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Order Reports</h2>
      <button
        onClick={exportToCSV}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Export to CSV
      </button>
      <div className="overflow-x-auto max-h-[900px] overflow-y-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2 border border-gray-300">Order ID</th>
              <th className="px-4 py-2 border border-gray-300">Customer Name</th>
              <th className="px-4 py-2 border border-gray-300">Email</th>
              <th className="px-4 py-2 border border-gray-300">Phone</th>
              <th className="px-4 py-2 border border-gray-300">Address</th>
              <th className="px-4 py-2 border border-gray-300">Status</th>
              <th className="px-4 py-2 border border-gray-300">Order Date</th>
              <th className="px-4 py-2 border border-gray-300">Delivery Date</th>
              <th className="px-4 py-2 border border-gray-300">Quantity</th>
              <th className="px-4 py-2 border border-gray-300">Warehouse Location</th>
              <th className="px-4 py-2 border border-gray-300">Capacity</th>
              <th className="px-4 py-2 border border-gray-300">Current Inventory</th>
              <th className="px-4 py-2 border border-gray-300">Agent Name</th>
              <th className="px-4 py-2 border border-gray-300">Agent Phone</th>
              <th className="px-4 py-2 border border-gray-300">Agent Route</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr
                key={report.orderId}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-2 border border-gray-300">{report.orderId}</td>
                <td className="px-4 py-2 border border-gray-300">{report.customerName}</td>
                <td className="px-4 py-2 border border-gray-300">{report.customerEmail}</td>
                <td className="px-4 py-2 border border-gray-300">{report.customerPhone}</td>
                <td className="px-4 py-2 border border-gray-300">{report.customerAddress}</td>
                <td className="px-4 py-2 border border-gray-300">{report.orderStatus}</td>
                <td className="px-4 py-2 border border-gray-300">{report.orderDate}</td>
                <td className="px-4 py-2 border border-gray-300">{report.deliveryDate}</td>
                <td className="px-4 py-2 border border-gray-300">{report.orderQuantity}</td>
                <td className="px-4 py-2 border border-gray-300">{report.warehouseLocation}</td>
                <td className="px-4 py-2 border border-gray-300">{report.warehouseCapacity}</td>
                <td className="px-4 py-2 border border-gray-300">{report.warehouseCurrentInventory}</td>
                <td className="px-4 py-2 border border-gray-300">{report.deliveryAgentName}</td>
                <td className="px-4 py-2 border border-gray-300">{report.deliveryAgentPhone}</td>
                <td className="px-4 py-2 border border-gray-300">{report.deliveryAgentRoute}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderReportPage;
