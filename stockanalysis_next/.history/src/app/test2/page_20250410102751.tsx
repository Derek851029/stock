export default function Page() {
  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100">
      <div className="flex w-96  justify-center items-center bg-white rounded shadow-md">
        <div className="flex flex-col">
          <input type="text" className="border border-gray-300 rounded p-2" />
          <p>Item</p>
          <button className="text-white bg-blue-500">Blue Button</button>
        </div>
      </div>
    </div>
  );
}
