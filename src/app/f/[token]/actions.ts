"use server";

import { revalidatePath } from "next/cache";
import { saveFormByToken } from "@/lib/store";

function asTrimmedString(v: FormDataEntryValue | null): string {
  return String(v ?? "").trim();
}

function asOptionalIntString(v: FormDataEntryValue | null): string {
  const raw = asTrimmedString(v);
  if (!raw) return "";
  // keep only digits (user may type 32.000)
  const digits = raw.replace(/\D+/g, "");
  return digits;
}

export async function submitFormAction(token: string, formData: FormData) {
  const cliente_nome = asTrimmedString(formData.get("cliente_nome"));
  const cliente_whatsapp = asTrimmedString(formData.get("cliente_whatsapp"));
  const cliente_email = asTrimmedString(formData.get("cliente_email"));

  const origem = asTrimmedString(formData.get("origem"));
  const destino = asTrimmedString(formData.get("destino"));

  const data_ida = asTrimmedString(formData.get("data_ida"));
  const data_volta = asTrimmedString(formData.get("data_volta"));
  const flex_ida_dias = asTrimmedString(formData.get("flex_ida_dias"));
  const flex_volta_dias = asTrimmedString(formData.get("flex_volta_dias"));

  const conexao = asTrimmedString(formData.get("conexao"));

  const pessoas = asTrimmedString(formData.get("pessoas"));
  const cabine = asTrimmedString(formData.get("cabine"));

  const saldo_livelo = asOptionalIntString(formData.get("saldo_livelo"));
  const saldo_esfera = asOptionalIntString(formData.get("saldo_esfera"));
  const saldo_smiles = asOptionalIntString(formData.get("saldo_smiles"));
  const saldo_latam_pass = asOptionalIntString(formData.get("saldo_latam_pass"));
  const saldo_tudoazul = asOptionalIntString(formData.get("saldo_tudoazul"));
  const saldo_outros_programa = asTrimmedString(formData.get("saldo_outros_programa"));
  const saldo_outros = asOptionalIntString(formData.get("saldo_outros"));

  const clube = asTrimmedString(formData.get("clube"));

  const cartoes = asTrimmedString(formData.get("cartoes"));
  const gasto = asTrimmedString(formData.get("gasto"));
  const renda = asTrimmedString(formData.get("renda"));
  const dependente = asTrimmedString(formData.get("dependente"));

  const preferencia_pagamento = asTrimmedString(formData.get("preferencia_pagamento"));
  const restricoes = asTrimmedString(formData.get("restricoes"));

  const obs = asTrimmedString(formData.get("obs"));

  const payload = {
    cliente: { nome: cliente_nome, whatsapp: cliente_whatsapp, email: cliente_email },
    viagem: {
      origem,
      destino,
      datas: undefined, // legacy field (kept intentionally empty)
      data_ida,
      data_volta,
      flex_ida_dias,
      flex_volta_dias,
      conexao,
      pessoas,
      cabine,
      preferencia_pagamento,
      restricoes,
    },
    milhas: {
      saldos: {
        livelo: saldo_livelo,
        esfera: saldo_esfera,
        smiles: saldo_smiles,
        latam_pass: saldo_latam_pass,
        tudoazul: saldo_tudoazul,
        outros: {
          programa: saldo_outros_programa,
          saldo: saldo_outros,
        },
      },
      clube,
    },
    cartoes: { cartoes, gasto_mensal_medio: gasto, renda_mensal_aprox: renda, dependente },
    observacoes: obs,
  };

  saveFormByToken(token, payload);
  revalidatePath(`/f/${token}`);
  revalidatePath("/admin/cases");
}
