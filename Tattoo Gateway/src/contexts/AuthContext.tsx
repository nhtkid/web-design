import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { User, Role } from '@/types';
import {
  getUsers, setUsers, getAuthUser, setAuthUser,
  isSeeded, markSeeded, setBlogs,
  setCourses, generateId,
} from '@/lib/storage';
import { seedUsers } from '@/data/seed-users';
import { seedBlogs } from '@/data/seed-blogs';
import { seedCourses } from '@/data/seed-courses';

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => string | null; // returns error or null
  register: (name: string, email: string, password: string) => string | null;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isOwner: boolean;
  isOwnerOrAdmin: boolean;
  isPaid: boolean;
  allUsers: User[];
  updateUserRole: (userId: string, role: Role) => void;
  deleteUser: (userId: string) => void;
  createUser: (name: string, email: string, password: string, role: Role) => string | null;
  refreshUsers: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsersState] = useState<User[]>([]);

  // Seed data on first load
  useEffect(() => {
    if (!isSeeded()) {
      setUsers(seedUsers);
      setBlogs(seedBlogs);
      setCourses(seedCourses);
      markSeeded();
    }
    // Restore session
    const saved = getAuthUser();
    if (saved) {
      // Verify user still exists in DB
      const users = getUsers();
      const current = users.find(u => u.id === saved.id);
      if (current) {
        setUser(current);
      } else {
        setAuthUser(null);
      }
    }
    setAllUsersState(getUsers());
  }, []);

  const refreshUsers = useCallback(() => {
    setAllUsersState(getUsers());
  }, []);

  const login = useCallback((email: string, password: string): string | null => {
    const users = getUsers();
    const found = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) return 'Invalid email or password';
    setUser(found);
    setAuthUser(found);
    return null;
  }, []);

  const register = useCallback((name: string, email: string, password: string): string | null => {
    const users = getUsers();
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return 'An account with this email already exists';
    }
    const newUser: User = {
      id: generateId(),
      name,
      email,
      password,
      role: 'user-free',
      createdAt: new Date().toISOString(),
    };
    const updated = [...users, newUser];
    setUsers(updated);
    setUser(newUser);
    setAuthUser(newUser);
    setAllUsersState(updated);
    return null;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setAuthUser(null);
  }, []);

  const updateUserRole = useCallback((userId: string, role: Role) => {
    const users = getUsers();
    const updated = users.map(u => u.id === userId ? { ...u, role } : u);
    setUsers(updated);
    setAllUsersState(updated);
    // If updating self, refresh session
    if (user?.id === userId) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      setAuthUser(updatedUser);
    }
  }, [user]);

  const deleteUser = useCallback((userId: string) => {
    const users = getUsers();
    const updated = users.filter(u => u.id !== userId);
    setUsers(updated);
    setAllUsersState(updated);
  }, []);

  const createUser = useCallback((name: string, email: string, password: string, role: Role): string | null => {
    const users = getUsers();
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return 'An account with this email already exists';
    }
    const newUser: User = {
      id: generateId(),
      name,
      email,
      password,
      role,
      createdAt: new Date().toISOString(),
    };
    const updated = [...users, newUser];
    setUsers(updated);
    setAllUsersState(updated);
    return null;
  }, []);

  const value: AuthContextValue = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isOwner: user?.role === 'owner',
    isOwnerOrAdmin: user?.role === 'admin' || user?.role === 'owner',
    isPaid: user?.role === 'user-paid' || user?.role === 'owner' || user?.role === 'admin',
    allUsers,
    updateUserRole,
    deleteUser,
    createUser,
    refreshUsers,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
