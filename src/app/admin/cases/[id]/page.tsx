import { getCaseById } from "@/lib/store";
import AdminShell from "../../AdminShell";
import { generateBookAction, markStatusAction } from "../actions";

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-[#d6b25e]/60 focus:ring-2 focus:ring-[#d6b25e]/15 ${
        props.className || ""
      }`}
    />
  );
}

export default async function CaseDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = getCaseById(id);

  if (!c) {
    return (
      <AdminShell title="Caso não encontrado">
        <p className="text-white/70">Esse caso não existe.</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell title={`Caso ${c.id}`} subtitle={`Status: ${c.status}`}> 
      <section className="grid gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5">
          <div className="font-medium text-white">Cliente</div>
          <div className="mt-2 text-sm text-white/80">Nome: {c.cliente?.nome || "(não informado)"}</div>
          <div className="text-sm text-white/80">WhatsApp: {c.cliente?.whatsapp || "(não informado)"}</div>
          <div className="text-sm text-white/80">Email: {c.cliente?.email || "(não informado)"}</div>
          <div className="mt-3 text-sm text-white/80">
            Formulário: <span className="font-mono">/f/{c.token}</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5">
          <div className="font-medium text-white">Ações</div>

          <form action={markStatusAction} className="mt-4 grid md:grid-cols-[1fr_auto_auto] gap-2 items-center">
            <Input name="password" type="password" placeholder="Senha admin (se houver)" />
            <input type="hidden" name="id" value={c.id} />
            <select
              name="status"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
              defaultValue={c.status}
            >
              <option value="PAGO_AGUARDANDO_FORM">PAGO_AGUARDANDO_FORM</option>
              <option value="FORM_RECEBIDO">FORM_RECEBIDO</option>
              <option value="EM_ANALISE">EM_ANALISE</option>
              <option value="BOOK_GERADO">BOOK_GERADO</option>
              <option value="ENVIADO">ENVIADO</option>
              <option value="ENTREGUE">ENTREGUE</option>
            </select>
            <button className="rounded-xl bg-[#d6b25e] px-4 py-2 font-medium text-black w-fit">Salvar status</button>
          </form>

          <form action={generateBookAction} className="mt-3 grid md:grid-cols-[1fr_auto] gap-2 items-center">
            <Input name="password" type="password" placeholder="Senha admin (se houver)" />
            <input type="hidden" name="id" value={c.id} />
            <button className="rounded-xl bg-[#2f6fff] px-4 py-2 font-medium text-white w-fit">Gerar book (IA)</button>
          </form>

          <p className="mt-3 text-xs text-white/55">
            Se OPENAI_API_KEY não estiver configurada, vai gerar um placeholder.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
          <div className="font-medium text-white">Dados do formulário</div>
          <pre className="mt-3 text-xs text-white/70 bg-black/30 p-4 rounded-xl overflow-auto">
{JSON.stringify(
  {
    viagem: c.viagem ?? null,
    milhas: c.milhas ?? null,
    cartoes: c.cartoes ?? null,
    observacoes: c.observacoes ?? null,
  },
  null,
  2
)}
          </pre>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
          <div className="font-medium text-white">Book (para colar no Canva)</div>
          {c.book?.pagesText ? (
            <>
              <textarea
                readOnly
                className="mt-3 w-full h-[440px] rounded-xl border border-white/10 bg-black/30 p-4 font-mono text-xs text-white/85"
                value={c.book.pagesText}
              />
              <p className="mt-2 text-xs text-white/55">
                Copie e cole página por página no template do Canva. Adicione prints nas páginas reservadas.
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm text-white/70">Ainda não foi gerado.</p>
          )}
        </div>
      </section>
    </AdminShell>
  );
}
