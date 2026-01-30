"use server";

import { revalidatePath } from "next/cache";
import { assertAdmin } from "@/lib/auth";
import { createCase, saveBook, updateCase } from "@/lib/store";

export async function createCaseAction(formData: FormData) {
  const password = String(formData.get("password") || "");
  assertAdmin(password);

  const nome = String(formData.get("nome") || "").trim();
  const whatsapp = String(formData.get("whatsapp") || "").trim();
  const email = String(formData.get("email") || "").trim();

  createCase({ cliente: { nome, whatsapp, email } });
  revalidatePath("/admin/cases");
}

export async function markStatusAction(formData: FormData) {
  const password = String(formData.get("password") || "");
  assertAdmin(password);

  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");
  updateCase(id, { status: status as any });
  revalidatePath("/admin/cases");
  revalidatePath(`/admin/cases/${id}`);
}

export async function generateBookAction(formData: FormData) {
  const password = String(formData.get("password") || "");
  assertAdmin(password);

  const id = String(formData.get("id") || "");

  // Server route will generate (OpenAI) if key exists, otherwise placeholder.
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/generate-book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, password }),
    cache: "no-store",
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || "Falha ao gerar book");
  }

  const { pagesText } = (await res.json()) as { pagesText: string };
  saveBook(id, pagesText);
  revalidatePath("/admin/cases");
  revalidatePath(`/admin/cases/${id}`);
}
