"use client";

import { useMemo, useRef, useState } from "react";

type Props = {
  token: string;
  onSubmit: (fd: FormData) => void;
};

const accent = "text-[#d6b25e]";

function Progress({ step, total }: { step: number; total: number }) {
  const pct = Math.round(((step + 1) / total) * 100);
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between text-xs text-white/70">
        <span>
          Etapa {step + 1} de {total}
        </span>
        <span>{pct}%</span>
      </div>
      <div className="mt-2 h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#d6b25e] to-[#f3d27a]" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-sm text-white/80 mb-2">{children}</div>;
}

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

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-[#d6b25e]/60 focus:ring-2 focus:ring-[#d6b25e]/15 ${
        props.className || ""
      }`}
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-[#d6b25e]/60 focus:ring-2 focus:ring-[#d6b25e]/15 ${
        props.className || ""
      }`}
    />
  );
}

export default function FormWizard({ token, onSubmit }: Props) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const steps = useMemo(
    () => [
      { key: "intro", title: "Consultoria de Milhas", subtitle: "Vamos montar sua estratégia personalizada." },
      { key: "dados", title: "Seus dados", subtitle: "Só o essencial para eu te atender." },
      { key: "viagem", title: "Voos", subtitle: "Origem, destino, datas e preferências de rota." },
      { key: "milhas", title: "Milhas e pontos", subtitle: "Quero entender seu saldo e onde faz sentido concentrar." },
      { key: "cartoes", title: "Cartões e perfil", subtitle: "Para eu calcular o gap e as estratégias de acúmulo." },
      { key: "preferencias", title: "Preferências", subtitle: "Regras do jogo para a estratégia." },
      { key: "enviar", title: "Enviar", subtitle: "Conferir e finalizar." },
    ],
    []
  );

  const total = steps.length;

  function validateCurrentStep(): boolean {
    if (step === 0 || step >= total) return true;

    const root = formRef.current;
    if (!root) return true;

    const container = root.querySelector<HTMLElement>(`[data-step="${step}"]`);
    if (!container) return true;

    const fields = Array.from(container.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
      "input, textarea, select"
    ));

    for (const el of fields) {
      // ignore hidden inputs
      if (el instanceof HTMLInputElement && el.type === "hidden") continue;

      if (!el.checkValidity()) {
        el.reportValidity();
        return false;
      }
    }

    return true;
  }

  function next() {
    if (!validateCurrentStep()) return;
    setStep((s) => Math.min(s + 1, total - 1));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  return (
    <form
      ref={formRef}
      action={async (fd) => {
        setSubmitting(true);
        try {
          await onSubmit(fd);
          setStep(total); // done
        } finally {
          setSubmitting(false);
        }
      }}
      className="w-full"
    >
      <input type="hidden" name="token" value={token} />

      <div className="mb-6">
        <div className={`text-sm ${accent} tracking-widest`}>MILHAS MÁGICAS</div>
        <h1 className="mt-2 text-2xl md:text-3xl font-semibold text-white">
          {step < total ? steps[step].title : "Recebido"}
        </h1>
        <p className="mt-2 text-white/70 text-sm md:text-base">
          {step < total ? steps[step].subtitle : "Perfeito. Suas respostas foram registradas."}
        </p>
        {step < total && <Progress step={step} total={total} />}
      </div>

      <div data-step="0" className={step === 0 ? "" : "hidden"}>
        <Card>
          <div className="space-y-3 text-white/80 text-sm">
            <p>Responda por escrito. Se quiser complementar alguma explicação, pode mandar áudio depois.</p>
            <p className="text-white/60">Tempo médio: 2–4 min.</p>
          </div>
          <div className="mt-6 flex gap-2 justify-end">
            <button type="button" onClick={next} className="rounded-xl bg-[#d6b25e] px-4 py-2 font-medium text-black">
              Começar
            </button>
          </div>
        </Card>
      </div>

      <div data-step="1" className={step === 1 ? "" : "hidden"}>
        <Card>
          <div className="space-y-4">
            <div>
              <Label>Nome</Label>
              <Input name="cliente_nome" placeholder="Seu nome completo" required />
            </div>
            <div>
              <Label>WhatsApp</Label>
              <Input name="cliente_whatsapp" placeholder="(DDD) número" required />
            </div>
            <div>
              <Label>E-mail (opcional)</Label>
              <Input name="cliente_email" placeholder="seuemail@..." />
            </div>
          </div>
          <div className="mt-6 flex gap-2 justify-between">
            <button type="button" onClick={back} className="rounded-xl border border-white/15 px-4 py-2 text-white/80">
              Voltar
            </button>
            <button type="button" onClick={next} className="rounded-xl bg-[#d6b25e] px-4 py-2 font-medium text-black">
              Próximo
            </button>
          </div>
        </Card>
      </div>

      <div data-step="2" className={step === 2 ? "" : "hidden"}>
        <Card>
          <div className="space-y-4">
            <div>
              <Label>Origem</Label>
              <Input name="origem" placeholder="Cidade/aeroporto (ex: VIX, CNF, GRU...)" required />
            </div>
            <div>
              <Label>Destino desejado</Label>
              <Input name="destino" placeholder="Cidade/país" required />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <Label>Data de ida</Label>
                <Input name="data_ida" type="date" required />
              </div>
              <div>
                <Label>Data de volta</Label>
                <Input name="data_volta" type="date" required />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <Label>Flexibilidade na ida (dias)</Label>
                <Select name="flex_ida_dias" defaultValue="0">
                  <option value="0">0</option>
                  <option value="1">± 1</option>
                  <option value="2">± 2</option>
                  <option value="3">± 3</option>
                  <option value="5">± 5</option>
                  <option value="7">± 7</option>
                </Select>
              </div>
              <div>
                <Label>Flexibilidade na volta (dias)</Label>
                <Select name="flex_volta_dias" defaultValue="0">
                  <option value="0">0</option>
                  <option value="1">± 1</option>
                  <option value="2">± 2</option>
                  <option value="3">± 3</option>
                  <option value="5">± 5</option>
                  <option value="7">± 7</option>
                </Select>
              </div>
            </div>

            <div>
              <Label>Você aceita voos com conexão/escala?</Label>
              <Select name="conexao" defaultValue="depende">
                <option value="direto">Prefiro somente voos diretos</option>
                <option value="uma">Aceito 1 conexão (ok)</option>
                <option value="qualquer">Aceito conexões (sem problema)</option>
                <option value="depende">Depende (explico nas restrições)</option>
              </Select>
              <div className="mt-2 text-xs text-white/55">
                Se tiver preferência de tempo máximo de conexão, detalhe em “Restrições importantes”.
              </div>
            </div>

            <div>
              <Label>Pessoas</Label>
              <Input name="pessoas" placeholder="Ex: 2 adultos, 1 criança (5 anos)" required />
            </div>
            <div>
              <Label>Cabine</Label>
              <Select name="cabine" defaultValue="tanto_faz">
                <option value="economica">Econômica</option>
                <option value="executiva">Executiva</option>
                <option value="tanto_faz">Tanto faz</option>
              </Select>
            </div>
          </div>
          <div className="mt-6 flex gap-2 justify-between">
            <button type="button" onClick={back} className="rounded-xl border border-white/15 px-4 py-2 text-white/80">
              Voltar
            </button>
            <button type="button" onClick={next} className="rounded-xl bg-[#d6b25e] px-4 py-2 font-medium text-black">
              Próximo
            </button>
          </div>
        </Card>
      </div>

      <div data-step="3" className={step === 3 ? "" : "hidden"}>
        <Card>
          <div className="space-y-4">
            <div>
              <Label>Saldos de pontos/milhas (por programa)</Label>
              <div className="grid md:grid-cols-2 gap-3">
                <Input name="saldo_livelo" placeholder="Livelo" inputMode="numeric" />
                <Input name="saldo_esfera" placeholder="Esfera" inputMode="numeric" />
                <Input name="saldo_smiles" placeholder="Smiles" inputMode="numeric" />
                <Input name="saldo_latam_pass" placeholder="Latam Pass" inputMode="numeric" />
                <Input name="saldo_tudoazul" placeholder="TudoAzul" inputMode="numeric" />
                <div className="grid grid-cols-2 gap-3">
                  <Input name="saldo_outros_programa" placeholder="Outros (qual programa?)" />
                  <Input name="saldo_outros" placeholder="Saldo" inputMode="numeric" />
                </div>
              </div>
              <div className="mt-2 text-xs text-white/55">
                Pode digitar só números (ex: 32000). Se souber, inclua validade no campo de observações.
              </div>
            </div>

            <div>
              <Label>Você já tem clube/assinatura?</Label>
              <Input name="clube" placeholder="Ex: Clube Smiles 1.000 / não tenho" />
            </div>
          </div>
          <div className="mt-6 flex gap-2 justify-between">
            <button type="button" onClick={back} className="rounded-xl border border-white/15 px-4 py-2 text-white/80">
              Voltar
            </button>
            <button type="button" onClick={next} className="rounded-xl bg-[#d6b25e] px-4 py-2 font-medium text-black">
              Próximo
            </button>
          </div>
        </Card>
      </div>

      <div data-step="4" className={step === 4 ? "" : "hidden"}>
        <Card>
          <div className="space-y-4">
            <div>
              <Label>Quais cartões você tem?</Label>
              <Textarea name="cartoes" placeholder="Nome do banco/cartão (se souber a variante, melhor)" className="h-24" />
            </div>
            <div>
              <Label>Gasto médio mensal no cartão (R$)</Label>
              <Input name="gasto" placeholder="Ex: 5.000" inputMode="numeric" />
            </div>
            <div>
              <Label>Renda mensal aproximada (R$) (opcional)</Label>
              <Input name="renda" placeholder="Ex: 12.000" inputMode="numeric" />
            </div>
            <div>
              <Label>Você tem cartão adicional/dependente?</Label>
              <Input name="dependente" placeholder="Sim / Não" />
            </div>
          </div>
          <div className="mt-6 flex gap-2 justify-between">
            <button type="button" onClick={back} className="rounded-xl border border-white/15 px-4 py-2 text-white/80">
              Voltar
            </button>
            <button type="button" onClick={next} className="rounded-xl bg-[#d6b25e] px-4 py-2 font-medium text-black">
              Próximo
            </button>
          </div>
        </Card>
      </div>

      <div data-step="5" className={step === 5 ? "" : "hidden"}>
        <Card>
          <div className="space-y-4">
            <div>
              <Label>Preferência: usar milhas ao máximo ou aceita pagar parte em dinheiro?</Label>
              <Select name="preferencia_pagamento" defaultValue="milhas_ao_maximo">
                <option value="milhas_ao_maximo">Milhas ao máximo</option>
                <option value="misto">Misto (milhas + dinheiro)</option>
              </Select>
            </div>
            <div>
              <Label>Restrições importantes</Label>
              <Textarea name="restricoes" placeholder="Horários, companhias, tempo máximo de conexão, aeroportos alternativos etc." className="h-24" />
            </div>
            <div>
              <Label>Observações</Label>
              <Textarea name="obs" placeholder="Qualquer info que você ache relevante" className="h-24" />
            </div>
          </div>
          <div className="mt-6 flex gap-2 justify-between">
            <button type="button" onClick={back} className="rounded-xl border border-white/15 px-4 py-2 text-white/80">
              Voltar
            </button>
            <button type="button" onClick={next} className="rounded-xl bg-[#d6b25e] px-4 py-2 font-medium text-black">
              Próximo
            </button>
          </div>
        </Card>
      </div>

      <div data-step="6" className={step === 6 ? "" : "hidden"}>
        <Card>
          <div className="space-y-3 text-sm text-white/80">
            <p>Antes de enviar, confira se:</p>
            <ul className="list-disc pl-5 space-y-1 text-white/70">
              <li>Destino e origem estão corretos</li>
              <li>Datas de ida/volta estão corretas</li>
              <li>Se marcou flexibilidade, ela faz sentido para você</li>
            </ul>
          </div>
          <div className="mt-6 flex gap-2 justify-between">
            <button type="button" onClick={back} className="rounded-xl border border-white/15 px-4 py-2 text-white/80">
              Voltar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-[#d6b25e] px-4 py-2 font-medium text-black disabled:opacity-60"
            >
              {submitting ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </Card>
      </div>

      {step >= total && (
        <Card>
          <div className="space-y-2 text-white/80">
            <div className={`text-sm ${accent}`}>Suas respostas foram recebidas.</div>
            <div className="text-sm text-white/70">Próximo passo: eu vou analisar e te retorno com o agendamento e o book.</div>
          </div>
        </Card>
      )}

      <div className="mt-6 text-xs text-white/35">Identificador: {token}</div>
    </form>
  );
}
