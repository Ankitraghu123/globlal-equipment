import { PrivateRoute } from '../../auth/PrivateRoute';

const Dashboard = () => {
  return (
    <PrivateRoute adminOnly>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Total Products</h2>
            <p className="text-3xl mt-2">42</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Average Rating</h2>
            <p className="text-3xl mt-2">4.2 ★</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold">New Reviews</h2>
            <p className="text-3xl mt-2">12</p>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Dashboard;