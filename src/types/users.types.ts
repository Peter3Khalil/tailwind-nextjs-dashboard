export type LoginResponse = {
  data: User;
  token: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  location: string;
  gender: string;
  phone: string;
  interests: unknown[];
  slug: string;
  isOAuthUser: boolean;
  emailVerified: boolean;
  role: 'user' | 'admin';
  active: boolean;
  wishlist: string[];
  calendar: string[];
  __v: number;
  profileImg: string;
};
