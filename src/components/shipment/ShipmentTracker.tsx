// import React from 'react';
// import { TrackingEvent } from '../../types/shipment';
// import { CheckCircle2, Clock, Truck } from 'lucide-react';

// interface ShipmentTrackerProps {
//   events: TrackingEvent[];
//   status: 'pending' | 'in_transit' | 'delivered' | 'delayed';
//   shippedDate: string;
// }

// const ShipmentTracker: React.FC<ShipmentTrackerProps> = ({ events, status }) => {
//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'delivered':
//         return <CheckCircle2 className="text-green-500" />;
//       case 'in_transit':
//         return <Truck className="text-blue-500" />;
//       case 'delayed':
//         return <Clock className="text-red-500" />;
//       default:
//         return <Clock className="text-gray-500" />;
//     }
//   };

//   return (
//     <div className="space-y-4">
//       {events.map((event, index) => (
//         <div key={index} className="flex items-start space-x-3">
//           <div className="flex-shrink-0 mt-1">
//             {getStatusIcon(event.status)}
//           </div>
//           <div>
//             <p className="font-medium text-gray-900">{event.status}</p>
//             <p className="text-sm text-gray-500">{event.description}</p>
//             <p className="text-xs text-gray-400">
//               {new Date(event.timestamp).toLocaleString()}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ShipmentTracker;