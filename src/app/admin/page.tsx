import Link from "next/link";

export default function AdminHome() {
  return (
    <main className="min-h-screen p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold">Admin • Consultoria</h1>
      <p className="mt-2 text-sm text-gray-600">
        Protótipo interno (sem hospedagem). Para entrar, use: /admin/cases
      </p>

      <div className="mt-6 space-y-2">
        <Link className="underline" href="/admin/cases">
          Ir para casos
        </Link>
      </div>
    </main>
  );
}
