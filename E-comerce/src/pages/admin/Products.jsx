import { useState } from 'react';
import { PrivateRoute } from '../../auth/PrivateRoute';

const AdminProducts = () => {
  const [products] = useState([
    { id: 1, name: 'Hydraulic Pallet Truck', avgRating: 4.5 },
    { id: 2, name: 'Manual Stacker', avgRating: 3.8 },
    { id: 3, name: 'Slotted Angle Rack', avgRating: 4.2 }
  ]);

  return (
    <PrivateRoute adminOnly>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Manage Products</h1>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Average Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <span className="mr-1">{product.avgRating}</span>
                      <span className="text-yellow-400">★</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default AdminProducts;