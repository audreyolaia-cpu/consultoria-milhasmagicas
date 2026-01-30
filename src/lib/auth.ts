import "server-only";

// Internal prototype convenience:
// - If ADMIN_PASSWORD is not set, allow all admin actions (local-only).
// - If set, require exact match.
export function assertAdmin(password?: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return;
  if (!password || password !== expected) throw new Error("unauthorized");
}
