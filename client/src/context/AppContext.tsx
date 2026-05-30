import type { AxiosInstance } from "axios";
import { createContext, type ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  plan: string;
  analysisCount?: number;
}

interface AppContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  api: AxiosInstance;
  login: () => Promise<{ success: boolean; message?: string }>;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message?: string }>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {}
