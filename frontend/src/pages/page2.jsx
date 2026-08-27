import Navbar from "../components/navbar";

function Page2() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <p className="text-sm font-semibold text-indigo-600">PAGE 2</p>

          <h1 className="text-3xl font-bold text-gray-800 mt-1">Halaman 2</h1>

          <p className="text-gray-500 mt-2">Ini adalah halaman kedua.</p>
        </div>
      </main>
    </div>
  );
}

export default Page2;
