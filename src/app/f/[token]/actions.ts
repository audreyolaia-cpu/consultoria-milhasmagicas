"use server";

import { revalidatePath } from "next/cache";
import { saveFormByToken } from "@/lib/store";

export async function submitFormAction(token: string, formData: FormData) {
  const cliente_nome = String(formData.get("cliente_nome") || "").trim();
  const cliente_whatsapp = String(formData.get("cliente_whatsapp") || "").trim();
  const cliente_email = String(formData.get("cliente_email") || "").trim();

  const origem = String(formData.get("origem") || "").trim();
  const destino = String(formData.get("destino") || "").trim();
  const datas = String(formData.get("datas") || "").trim();
  const pessoas = String(formData.get("pessoas") || "").trim();
  const cabine = String(formData.get("cabine") || "").trim();

  const saldos = String(formData.get("saldos") || "").trim();
  const clube = String(formData.get("clube") || "").trim();

  const cartoes = String(formData.get("cartoes") || "").trim();
  const gasto = String(formData.get("gasto") || "").trim();
  const renda = String(formData.get("renda") || "").trim();
  const dependente = String(formData.get("dependente") || "").trim();

  const escala = String(formData.get("escala") || "").trim();
  const preferencia_pagamento = String(formData.get("preferencia_pagamento") || "").trim();
  const restricoes = String(formData.get("restricoes") || "").trim();

  const obs = String(formData.get("obs") || "").trim();

  const payload = {
    cliente: { nome: cliente_nome, whatsapp: cliente_whatsapp, email: cliente_email },
    viagem: { origem, destino, datas, pessoas, cabine, escala, preferencia_pagamento, restricoes },
    milhas: { saldos, clube },
    cartoes: { cartoes, gasto_mensal_medio: gasto, renda_mensal_aprox: renda, dependente },
    observacoes: obs,
  };

  saveFormByToken(token, payload);
  revalidatePath(`/f/${token}`);
}
