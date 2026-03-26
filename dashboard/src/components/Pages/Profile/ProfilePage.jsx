import { useEffect, useState } from "react";
import api from "../../../Services/AxiosInstance";

export default function ProfilePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await api.get("/user/profile");
      setData(res.data);
    };
    fetchProfile();
  }, []);

  if (!data) return <div className="p-6 text-white">Loading...</div>;

  return (
    <div className="p-6 text-white">
      <div className="bg-[#111] p-6 rounded-2xl border border-zinc-800 w-[400px]">

        <h2 className="text-xl mb-4"> Profile</h2>

        <div className="mb-3">
          <span className="text-gray-400 text-sm">Name</span>
          <div className="text-lg">{data.name}</div>
        </div>

        <div className="mb-3">
          <span className="text-gray-400 text-sm">Email</span>
          <div className="text-lg">{data.email}</div>
        </div>

        <div className="mb-3">
          <span className="text-gray-400 text-sm">Balance</span>
          <div className="text-lg">₹ {data.balance.toLocaleString()}</div>
        </div>

      </div>
    </div>
  );
}