export type User = {
    id: number;
    username: string;
    email: string;
    password?: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    lastLoginAt: string;
    currentLoginDuration: number;
  } | null