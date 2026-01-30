import Link from "next/link";
import { listCases } from "@/lib/store";
import { createCaseAction } from "./actions";

export default function CasesPage() {
  const cases = listCases();

  return (
    <main className="min-h-screen p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold">Casos</h1>
      <p className="mt-1 text-sm text-gray-600">
        Protótipo interno. Você precisa informar a senha de admin em cada ação.
      </p>

      <section className="mt-6 p-4 border rounded-lg">
        <h2 className="font-medium">Criar novo caso</h2>
        <form action={createCaseAction} className="mt-3 grid gap-2">
          <input
            name="password"
            placeholder="Senha admin"
            type="password"
            className="border rounded px-3 py-2"
            required
          />
          <div className="grid md:grid-cols-3 gap-2">
            <input name="nome" placeholder="Nome da cliente" className="border rounded px-3 py-2" />
            <input name="whatsapp" placeholder="WhatsApp" className="border rounded px-3 py-2" />
            <input name="email" placeholder="E-mail" className="border rounded px-3 py-2" />
          </div>
          <button className="bg-black text-white rounded px-3 py-2 w-fit">Criar</button>
        </form>
      </section>

      <section className="mt-6">
        <div className="grid gap-3">
          {cases.length === 0 ? (
            <p className="text-sm text-gray-600">Nenhum caso ainda.</p>
          ) : (
            cases.map((c) => (
              <div key={c.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-medium">
                      {c.cliente?.nome || "(sem nome)"} • {c.status}
                    </div>
                    <div className="text-sm text-gray-600">ID: {c.id}</div>
                    <div className="text-sm text-gray-600">Token: {c.token}</div>
                    <div className="text-sm">
                      Link do formulário: <span className="font-mono">/f/{c.token}</span>
                    </div>
                  </div>
                  <Link className="underline" href={`/admin/cases/${c.id}`}>
                    Abrir
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
