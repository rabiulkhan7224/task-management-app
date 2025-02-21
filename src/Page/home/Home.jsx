import { useNavigate } from "react-router";


const Home = () => {

    const navigate=useNavigate()
    return (
        <div className="container mx-auto p-4">
        {/* Intro Section */}
        <div className="text-center mt-20 mb-6">
          <h1 className="text-3xl font-bold">Welcome to TaskPad</h1>
          <p className="text-lg text-gray-600 mt-2">
            Organize your tasks efficiently and stay productive!
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Go to Dashboard
          </button>
        </div>
        </div>
    );
};

export default Home;