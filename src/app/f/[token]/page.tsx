import { getCaseByToken } from "@/lib/store";
import { submitFormAction } from "./actions";

export default function PublicForm({ params }: { params: { token: string } }) {
  const c = getCaseByToken(params.token);

  if (!c) {
    return (
      <main className="min-h-screen p-6 max-w-xl mx-auto">
        <h1 className="text-xl font-semibold">Formulário</h1>
        <p className="mt-2 text-sm text-gray-600">Link inválido.</p>
      </main>
    );
  }

  async function action(formData: FormData) {
    "use server";
    return submitFormAction(params.token, formData);
  }

  return (
    <main className="min-h-screen p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold">Consultoria de Milhas</h1>
      <p className="mt-2 text-sm text-gray-600">
        Preencha por escrito. Se quiser, complemente por áudio depois.
      </p>

      <form action={action} className="mt-6 grid gap-3">
        <div className="font-medium">Seus dados</div>
        <input name="cliente_nome" placeholder="Seu nome" className="border rounded px-3 py-2" required />
        <input name="cliente_whatsapp" placeholder="Seu WhatsApp" className="border rounded px-3 py-2" required />
        <input name="cliente_email" placeholder="Seu e-mail (opcional)" className="border rounded px-3 py-2" />

        <div className="font-medium mt-2">Viagem</div>
        <input name="origem" placeholder="Origem (cidade/aeroporto)" className="border rounded px-3 py-2" required />
        <input name="destino" placeholder="Destino (cidade/país)" className="border rounded px-3 py-2" required />
        <input name="datas" placeholder="Datas ou janela + duração" className="border rounded px-3 py-2" required />
        <input name="pessoas" placeholder="Pessoas (ex: 2 adultos, 1 criança 5 anos)" className="border rounded px-3 py-2" required />
        <select name="cabine" className="border rounded px-3 py-2" defaultValue="tanto_faz">
          <option value="economica">Econômica</option>
          <option value="executiva">Executiva</option>
          <option value="tanto_faz">Tanto faz</option>
        </select>

        <div className="font-medium mt-2">Milhas / pontos</div>
        <textarea
          name="saldos"
          placeholder="Saldos por programa (ex: Smiles 32k | Livelo 40k | Latam 0)"
          className="border rounded px-3 py-2 h-24"
          required
        />

        <div className="font-medium mt-2">Cartões</div>
        <textarea name="cartoes" placeholder="Quais cartões você tem" className="border rounded px-3 py-2 h-20" />
        <input name="gasto" placeholder="Gasto médio mensal (R$)" className="border rounded px-3 py-2" />
        <input name="renda" placeholder="Renda mensal aprox. (R$)" className="border rounded px-3 py-2" />

        <div className="font-medium mt-2">Observações</div>
        <textarea name="obs" placeholder="Qualquer info importante" className="border rounded px-3 py-2 h-24" />

        <button className="bg-black text-white rounded px-3 py-2">Enviar</button>

        <p className="text-xs text-gray-600">
          Caso: {c.id} • Status atual: {c.status}
        </p>
      </form>
    </main>
  );
}
