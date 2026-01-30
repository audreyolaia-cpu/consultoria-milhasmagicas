import "server-only";

export function assertAdmin(password?: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) throw new Error("ADMIN_PASSWORD não configurado");
  if (!password || password !== expected) throw new Error("unauthorized");
}
