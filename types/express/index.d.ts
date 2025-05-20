declare namespace Express {
  interface Request {
    user?: {
      _id: string;
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
