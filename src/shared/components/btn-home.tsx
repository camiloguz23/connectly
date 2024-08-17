"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BtnHome() {
  const route = useRouter();
  const [valueId, setValueId] = useState<string>("");
  const onCreateJoin = () => {
    const id = crypto.randomUUID();
    route.push(`/room/${id}`);
  };

  const joinRoom = () => {
    if (!valueId) return;
    route.push(`/room/${valueId}`);
  };
  return (
    <div
      style={{ gap: 20 }}
      className=" p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 min-w-[50%] gap-[20px] flex"
    >
      <button
        onClick={onCreateJoin}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Crear reunion
      </button>
      <button
      onClick={joinRoom}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        ingresar a una reunion
      </button>
      <input
        style={{
          padding: 10,
          border: `1px solid ${valueId ? "black" : "red"}`,
          outline: "none",
          borderRadius: 10,
        }}
        type="text"
        placeholder="id Room"
        value={valueId}
        onChange={(e) => setValueId(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
}
