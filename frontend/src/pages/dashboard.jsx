import { FaCar, FaParking, FaChartBar } from "react-icons/fa";

const Dashboard = () => {
    // --- Static Data For Now ---
    const stats = {
        totalVehicles: 120,
        occupiedSpaces: 75,
        availableSpaces: 45,
    };

    const vehicles = [
        { id: 1, licensePlate: "GJ-05-HK-2211", entryTime: "10:15 AM" },
        { id: 2, licensePlate: "MH-12-AB-5555", entryTime: "10:40 AM" },
        { id: 3, licensePlate: "DL-02-KL-9090", entryTime: "11:00 AM" },
    ];

    return (
        <div className="p-6 min-h-screen bg-gray-100">

        {/* Header */}
        <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600 mt-1">
            Quick overview of parking activity 🚗
            </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

            {/* Total Vehicles */}
            <div className="bg-white shadow-lg rounded-xl p-6 flex justify-between items-center hover:scale-[1.02] transition">
            <div>
                <h3 className="text-lg font-semibold text-gray-700">Total Vehicles</h3>
                <p className="text-3xl font-bold text-blue-700">{stats.totalVehicles}</p>
            </div>
            <FaCar className="text-5xl text-blue-500" />
            </div>

            {/* Available */}
            <div className="bg-white shadow-lg rounded-xl p-6 flex justify-between items-center hover:scale-[1.02] transition">
            <div>
                <h3 className="text-lg font-semibold text-gray-700">Available Spaces</h3>
                <p className="text-3xl font-bold text-green-600">{stats.availableSpaces}</p>
            </div>
            <FaParking className="text-5xl text-green-500" />
            </div>

            {/* Occupied */}
            <div className="bg-white shadow-lg rounded-xl p-6 flex justify-between items-center hover:scale-[1.02] transition">
            <div>
                <h3 className="text-lg font-semibold text-gray-700">Occupied Spaces</h3>
                <p className="text-3xl font-bold text-red-600">{stats.occupiedSpaces}</p>
            </div>
            <FaChartBar className="text-5xl text-red-500" />
            </div>
        </div>

        {/* Current Vehicles Table */}
        <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Current Parked Vehicles
            </h2>

            <table className="w-full border-collapse">
            <thead>
                <tr className="bg-gray-100">
                <th className="text-left px-4 py-2 text-gray-600">License Plate</th>
                <th className="text-left px-4 py-2 text-gray-600">Entry Time</th>
                </tr>
            </thead>

            <tbody>
                {vehicles.map(vehicle => (
                <tr key={vehicle.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-800">{vehicle.licensePlate}</td>
                    <td className="px-4 py-3 text-gray-700">{vehicle.entryTime}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        </div>
    );
};

export default Dashboard;
