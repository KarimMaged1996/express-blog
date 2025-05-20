declare namespace Express {
  interface Request {
    user?: {
      email: string;
      username: string;
      password: string;
      createdAt: Date;
      photo?: string;
      isActive: boolean;
      refreshToken?: string;
    };
  }
}
