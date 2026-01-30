import { getCaseById } from "@/lib/store";
import { generateBookAction, markStatusAction } from "../actions";

export default function CaseDetail({ params }: { params: { id: string } }) {
  const c = getCaseById(params.id);

  if (!c) {
    return (
      <main className="min-h-screen p-6 max-w-4xl mx-auto">
        <p>Caso não encontrado.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold">Caso {c.id}</h1>
      <p className="mt-1 text-sm text-gray-600">Status: {c.status}</p>

      <section className="mt-6 grid gap-3">
        <div className="border rounded-lg p-4">
          <div className="font-medium">Cliente</div>
          <div className="text-sm">Nome: {c.cliente?.nome || "(não informado)"}</div>
          <div className="text-sm">WhatsApp: {c.cliente?.whatsapp || "(não informado)"}</div>
          <div className="text-sm">Email: {c.cliente?.email || "(não informado)"}</div>
          <div className="text-sm mt-2">
            Link do formulário: <span className="font-mono">/f/{c.token}</span>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <div className="font-medium">Ações</div>

          <form action={markStatusAction} className="mt-3 flex flex-wrap gap-2 items-center">
            <input name="password" type="password" placeholder="Senha admin" className="border rounded px-3 py-2" required />
            <input type="hidden" name="id" value={c.id} />
            <select name="status" className="border rounded px-3 py-2" defaultValue={c.status}>
              <option value="PAGO_AGUARDANDO_FORM">PAGO_AGUARDANDO_FORM</option>
              <option value="FORM_RECEBIDO">FORM_RECEBIDO</option>
              <option value="EM_ANALISE">EM_ANALISE</option>
              <option value="BOOK_GERADO">BOOK_GERADO</option>
              <option value="ENVIADO">ENVIADO</option>
              <option value="ENTREGUE">ENTREGUE</option>
            </select>
            <button className="bg-black text-white rounded px-3 py-2">Salvar status</button>
          </form>

          <form action={generateBookAction} className="mt-3 flex gap-2 items-center">
            <input name="password" type="password" placeholder="Senha admin" className="border rounded px-3 py-2" required />
            <input type="hidden" name="id" value={c.id} />
            <button className="bg-indigo-600 text-white rounded px-3 py-2">Gerar book (IA)</button>
          </form>

          <p className="mt-2 text-xs text-gray-600">
            Se OPENAI_API_KEY não estiver configurada, vai gerar um placeholder.
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <div className="font-medium">Dados do formulário</div>
          <pre className="mt-2 text-xs bg-gray-50 p-3 rounded overflow-auto">
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

        <div className="border rounded-lg p-4">
          <div className="font-medium">Book (para colar no Canva)</div>
          {c.book?.pagesText ? (
            <>
              <textarea
                readOnly
                className="mt-2 w-full h-[420px] border rounded p-3 font-mono text-xs"
                value={c.book.pagesText}
              />
              <p className="mt-2 text-xs text-gray-600">
                Dica: selecione tudo, copie e cole página por página no template do Canva.
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm text-gray-600">Ainda não foi gerado.</p>
          )}
        </div>
      </section>
    </main>
  );
}
