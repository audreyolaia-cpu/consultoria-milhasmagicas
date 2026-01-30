import { NextResponse } from "next/server";
import { createCase } from "@/lib/store";

// Simple internal demo: creates a new case and redirects to the public form.
export async function GET() {
  const c = createCase({ cliente: { nome: "Cliente Teste" } });
  return NextResponse.redirect(new URL(`/f/${c.token}`, "http://localhost:3000"));
}
