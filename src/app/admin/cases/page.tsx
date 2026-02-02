import Link from "next/link";
import AdminShell from "../AdminShell";
import { listCases } from "@/lib/store";
import { createCaseAction } from "./actions";

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/40 outline-none transition focus:border-[color:rgba(213,166,63,0.60)] focus:ring-2 focus:ring-[color:rgba(213,166,63,0.15)] ${
        props.className || ""
      }`}
    />
  );
}

export default function CasesPage() {
  const cases = listCases();

  return (
    <AdminShell
      title="Casos"
      subtitle="Lista de consultorias e acesso rápido ao formulário de cada cliente."
    >
      <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-medium text-white">Criar novo caso</h2>
          <Link className="text-white/80 hover:text-white underline" href="/demo">
            Criar e abrir formulário (demo)
          </Link>
        </div>

        <form action={createCaseAction} className="mt-4 grid gap-3">
          <Input name="password" placeholder="Senha admin (se houver)" type="password" />

          <div className="grid md:grid-cols-3 gap-3">
            <Input name="nome" placeholder="Nome da cliente" />
            <Input name="whatsapp" placeholder="WhatsApp" />
            <Input name="email" placeholder="E-mail" />
          </div>

          <button className="rounded-xl bg-[color:var(--mm-gold)] px-4 py-2 font-semibold text-[color:var(--mm-ink)] w-fit shadow-[0_10px_30px_rgba(213,166,63,0.20)] hover:brightness-105 active:brightness-95">
            Criar
          </button>
        </form>
      </section>

      <section className="mt-6">
        <div className="grid gap-3">
          {cases.length === 0 ? (
            <p className="text-white/70">Nenhum caso ainda.</p>
          ) : (
            cases.map((c) => (
              <div
                key={c.id}
                className="rounded-2xl border border-white/10 bg-black/20 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-white font-medium">
                      {c.cliente?.nome || "(sem nome)"}
                    </div>
                    <div className="mt-1 text-sm text-white/65">Status: {c.status}</div>
                    <div className="mt-2 text-xs text-white/50">ID: {c.id}</div>
                    <div className="text-xs text-white/50">Token: {c.token}</div>
                    <div className="mt-2 text-sm text-white/80">
                      Formulário: <span className="font-mono">/f/{c.token}</span>
                    </div>
                  </div>
                  <Link className="text-white underline" href={`/admin/cases/${c.id}`}>
                    Abrir
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </AdminShell>
  );
}
