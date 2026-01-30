import fs from "node:fs";
import path from "node:path";

export type CaseStatus =
  | "PAGO_AGUARDANDO_FORM"
  | "FORM_RECEBIDO"
  | "EM_ANALISE"
  | "BOOK_GERADO"
  | "ENVIADO"
  | "ENTREGUE";

export type ConsultCase = {
  id: string;
  token: string;
  createdAt: string;
  status: CaseStatus;
  cliente: {
    nome?: string;
    whatsapp?: string;
    email?: string;
  };
  viagem?: any;
  milhas?: any;
  cartoes?: any;
  observacoes?: string;
  book?: {
    pagesText: string; // "Página 1: ..."
    generatedAt: string;
  };
};

type DB = {
  cases: ConsultCase[];
};

const dataDir = path.join(process.cwd(), ".data");
const dataFile = path.join(dataDir, "db.json");

function ensure() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(dataFile)) {
    const initial: DB = { cases: [] };
    fs.writeFileSync(dataFile, JSON.stringify(initial, null, 2), "utf-8");
  }
}

function readDB(): DB {
  ensure();
  const raw = fs.readFileSync(dataFile, "utf-8");
  return JSON.parse(raw) as DB;
}

function writeDB(db: DB) {
  ensure();
  fs.writeFileSync(dataFile, JSON.stringify(db, null, 2), "utf-8");
}

export function listCases(): ConsultCase[] {
  return readDB().cases.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function getCaseById(id: string): ConsultCase | undefined {
  return readDB().cases.find((c) => c.id === id);
}

export function getCaseByToken(token: string): ConsultCase | undefined {
  return readDB().cases.find((c) => c.token === token);
}

export function createCase(input: {
  cliente?: { nome?: string; whatsapp?: string; email?: string };
}): ConsultCase {
  const db = readDB();
  const now = new Date().toISOString();
  const { nanoid } = require("nanoid");
  const id = nanoid(10);
  const token = nanoid(18);
  const c: ConsultCase = {
    id,
    token,
    createdAt: now,
    status: "PAGO_AGUARDANDO_FORM",
    cliente: input.cliente ?? {},
  };
  db.cases.push(c);
  writeDB(db);
  return c;
}

export function updateCase(id: string, patch: Partial<ConsultCase>): ConsultCase {
  const db = readDB();
  const idx = db.cases.findIndex((c) => c.id === id);
  if (idx === -1) throw new Error("Case not found");
  db.cases[idx] = { ...db.cases[idx], ...patch };
  writeDB(db);
  return db.cases[idx];
}

export function saveFormByToken(token: string, formData: any): ConsultCase {
  const db = readDB();
  const idx = db.cases.findIndex((c) => c.token === token);
  if (idx === -1) throw new Error("Token inválido");

  const current = db.cases[idx];
  const next: ConsultCase = {
    ...current,
    cliente: { ...current.cliente, ...(formData?.cliente ?? {}) },
    viagem: formData?.viagem,
    milhas: formData?.milhas,
    cartoes: formData?.cartoes,
    observacoes: formData?.observacoes,
    status: "FORM_RECEBIDO",
  };

  db.cases[idx] = next;
  writeDB(db);
  return next;
}

export function saveBook(id: string, pagesText: string): ConsultCase {
  return updateCase(id, {
    status: "BOOK_GERADO",
    book: {
      pagesText,
      generatedAt: new Date().toISOString(),
    },
  });
}
