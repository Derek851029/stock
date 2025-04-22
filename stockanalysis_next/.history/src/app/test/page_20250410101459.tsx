"use client";
import { useState } from "react";

interface dataItem {
  id: number;
  text: string;
}

export default function Page() {
  const [data, setData] = useState(
    Array.from({ length: 1 }, (_, i) => ({
      id: i,
      text: "",
    }))
  );
  return (
    <div className="flex w-full h-full flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">TodoList</h1>
      <div className="flex flex-col gap-3 mt-5">
        {data.map((item: dataItem, idx: number) => (
          <div key={item.id} className="flex gap-2 items-center">
            <input
              type="text"
              className="border border-gray-300 rounded p-2"
              placeholder="Enter text"
              value={item.text}
              onChange={(e) => {
                const newData = [...data];
                newData[idx].text = e.target.value;
                setData(newData);
              }}
            />
            <button
              onClick={() => {
                const newData = data.filter((_, index) => index !== idx);
                setData(newData);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
        <button
          onClick={() => {
            const newData = [...data, { id: data.length, text: "" }];
            setData(newData);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
}
