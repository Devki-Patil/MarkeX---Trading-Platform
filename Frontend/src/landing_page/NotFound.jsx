import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        
        <h1 className="text-7xl font-extrabold text-gray-300 tracking-tight">
          404
        </h1>

        <p className="mt-3 text-xl font-medium text-gray-400">
          Page not found
        </p>

        <p className="mt-2 text-gray-500">
           It looks like the link you visited does not exist.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition"
          >
            Go to Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-[#111] border border-gray-700 rounded-lg hover:bg-[#1a1a1a] transition"
          >
            Go Back
          </button>
        </div>

      </div>
    </div>
  );
}
