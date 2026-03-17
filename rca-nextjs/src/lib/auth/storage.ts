import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { AuthUserRecord } from "@/types/auth";

interface AuthStore {
  users: AuthUserRecord[];
}

const dataFilePath = process.env.AUTH_DATA_FILE
  ? path.resolve(process.env.AUTH_DATA_FILE)
  : path.join(process.cwd(), "data", "auth-users.json");

async function ensureStoreExists() {
  const dirPath = path.dirname(dataFilePath);
  await mkdir(dirPath, { recursive: true });
  try {
    await readFile(dataFilePath, "utf8");
  } catch {
    const initial: AuthStore = { users: [] };
    await writeFile(dataFilePath, JSON.stringify(initial, null, 2), "utf8");
  }
}

export async function readAuthStore(): Promise<AuthStore> {
  await ensureStoreExists();
  const raw = await readFile(dataFilePath, "utf8");
  const parsed = JSON.parse(raw) as AuthStore;
  if (!parsed.users) {
    return { users: [] };
  }
  return parsed;
}

export async function writeAuthStore(store: AuthStore) {
  await ensureStoreExists();
  await writeFile(dataFilePath, JSON.stringify(store, null, 2), "utf8");
}

export function getAuthDataPath() {
  return dataFilePath;
}