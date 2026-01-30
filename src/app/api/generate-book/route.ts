import { NextResponse } from "next/server";
import OpenAI from "openai";
import { assertAdmin } from "@/lib/auth";
import { getCaseById } from "@/lib/store";

function buildPrompt(caseData: any) {
  const json = JSON.stringify(
    {
      cliente: caseData.cliente ?? {},
      viagem: caseData.viagem ?? {},
      milhas: caseData.milhas ?? {},
      cartoes: caseData.cartoes ?? {},
      observacoes: caseData.observacoes ?? "",
    },
    null,
    2
  );

  return `Você é uma consultora especialista em milhas e emissões. Gere um “book” de consultoria personalizado, em português do Brasil, para ser colado em um template do Canva. O book deve ter 12 páginas. Linguagem clara e objetiva. Use bullets curtos.

Metodologia obrigatória:
1) Comece pela emissão: companhias plausíveis para origem→destino e programas possíveis (próprios e parceiros).
2) Monte 3 opções de emissão (A recomendada, B e C alternativas).
3) Para cada opção, estime:
   - milhas por pessoa e total
   - taxas em R$ por pessoa e total
   - quando cabível, custo aproximado em R$ para completar saldo (com ressalva que varia por promoções)
4) Compare com saldos atuais e calcule o gap.
5) Gere plano para completar saldo com: transferência bonificada, clube/assinatura, compra promocional, e cartão co-branded quando fizer sentido.
6) Analise cartões e sugira 2–3 opções custo-benefício coerentes com renda e gasto.

Formato de saída obrigatório:
- Página 1: (Capa) …
...
- Página 12: (Área de prints) … (apenas instruções do que inserir)

Regras:
- Não prometa disponibilidade de assentos nem valores exatos; use “estimativa” e “depende do dia”.
- Sempre inclua “ATENÇÃO” nas páginas das opções (riscos/regras).
- Quando faltar dado: escreva “(não informado)” e faça 1 pergunta objetiva pra preencher.

Dados do caso (JSON):
${json}`;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const password = String(body.password || "");
  assertAdmin(password);

  const id = String(body.id || "");
  const c = getCaseById(id);
  if (!c) return new NextResponse("Case not found", { status: 404 });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    // Placeholder for internal demo
    const pagesText = `Página 1: (Capa) Consultoria de Milhas • ${c.cliente?.nome || "(nome)"}\n\nPágina 2: Visão geral\n- (placeholder)\n\nPágina 3: Emissão primeiro\n- (placeholder)\n\nPágina 4: Opção A\n- (placeholder)\n\nPágina 5: Opção B\n- (placeholder)\n\nPágina 6: Opção C\n- (placeholder)\n\nPágina 7: Saldos e gap\n- (placeholder)\n\nPágina 8: Plano para completar saldo\n- (placeholder)\n\nPágina 9: Cartões\n- (placeholder)\n\nPágina 10: Checklist pode/não pode\n- (placeholder)\n\nPágina 11: Cronograma\n- (placeholder)\n\nPágina 12: Área de prints\n- Inserir prints de emissões, simulações, comprovantes.`;
    return NextResponse.json({ pagesText });
  }

  const prompt = buildPrompt(c);

  const client = new OpenAI({ apiKey });
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Você escreve de forma objetiva e estruturada." },
      { role: "user", content: prompt },
    ],
    temperature: 0.4,
  });

  const pagesText = completion.choices[0]?.message?.content?.trim() || "";
  return NextResponse.json({ pagesText });
}
