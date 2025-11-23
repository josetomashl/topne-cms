import { createContext, useEffect, useState, type PropsWithChildren } from 'react';
import { useNavigate } from 'react-router';

import type { AuthResponse, LoginRequest, RegisterRequest } from '@/dtos/Auth';
import type { UserItem } from '@/dtos/User';
import { useCookie } from '@/hooks/useCookie';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import axiosInstance from '@/plugins/axios';
import { CookieKeys } from '@/plugins/data/cookies';
import { StorageKeys } from '@/plugins/data/storage';

interface AuthContextType {
  isLoading: boolean;
  me: UserItem | null;
  token: string | null;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  getMe: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [me, setMe] = useLocalStorage<UserItem | null>(StorageKeys.USER, null);
  const [token, setToken] = useCookie<string | null>(CookieKeys.USER_TOKEN, null);

  const login = async (data: LoginRequest) => {
    setIsLoading(true);
    const res = await axiosInstance.post<LoginRequest, AuthResponse>('/auth/sign-in', data);
    setIsLoading(false);
    if (res.token) {
      setMe(res.user);
      setToken(res.token, { expires: 1 });
      navigate('/', { replace: true });
    }
  };

  const register = async (data: RegisterRequest) => {
    setIsLoading(true);
    const res = await axiosInstance.post<RegisterRequest, AuthResponse>('/auth/sign-up', data);
    setIsLoading(false);
    if (res.token) {
      setMe(res.user);
      setToken(res.token, { expires: 1 });
      navigate('/', { replace: true });
    }
  };

  const logout = () => {
    setIsLoading(true);
    setMe(null);
    setToken(null);
    setIsLoading(false);
  };

  const getMe = async () => {
    const res = await axiosInstance.get<null, UserItem>('/auth/me');
    if (res) {
      setMe(res);
    } else {
      logout();
    }
  };

  useEffect(() => {
    if (!token) {
      logout();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ isLoading, me, token, login, register, logout, getMe }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
