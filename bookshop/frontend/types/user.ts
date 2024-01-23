export type User = {
    user_id: string;
    username: string;
    email: string;
    password?: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    lastLoginAt: string;
    currentLoginDuration: number;
  } | null