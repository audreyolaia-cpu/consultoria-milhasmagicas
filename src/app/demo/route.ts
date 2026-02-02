import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { createCase } from "@/lib/store";

// Simple internal demo: creates a new case and redirects to the public form.
// In production behind a reverse proxy, req.url may be an internal URL (e.g. localhost).
// Use forwarded headers to build the public URL.
export async function GET() {
  const c = createCase({ cliente: { nome: "Cliente Teste" } });

  const h = await headers();
  const proto = h.get("x-forwarded-proto") || "https";
  const host = h.get("x-forwarded-host") || h.get("host") || "localhost";

  return NextResponse.redirect(new URL(`/f/${c.token}`, `${proto}://${host}`));
}
