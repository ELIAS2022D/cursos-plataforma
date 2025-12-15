export default function LoginPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md border rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Ingresar
        </h1>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="w-full border rounded-lg px-4 py-2"
          />

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-black text-white hover:bg-gray-800"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
