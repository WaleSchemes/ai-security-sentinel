import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, DetectionEvent } from '../types';

interface AuthState {
    user: User | null;
    users: User[]; // mock database
    login: (username: string, password: string) => boolean;
    signup: (username: string, password: string) => boolean;
    logout: () => void;
    saveDetectionEvent: (event: DetectionEvent) => void;
    loadUserHistory: () => DetectionEvent[];
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            users: [], // will be populated from localStorage on init

            login: (username, _password) => {
                const { users } = get();
                // In real app, you'd verify password. Here we just check username exists
                const existingUser = users.find(u => u.username === username);
                if (existingUser) {
                    set({ user: existingUser });
                    return true;
                }
                return false;
            },

            signup: (username, _password) => {
                const { users } = get();
                if (users.find(u => u.username === username)) return false;

                const newUser: User = {
                    id: `user-${Date.now()}`,
                    username,
                    detectionHistory: []
                };
                set({ users: [...users, newUser], user: newUser });
                return true;
            },

            logout: () => set({ user: null }),

            saveDetectionEvent: (event) => {
                const { user, users } = get();
                if (!user) return;

                const updatedUser = {
                    ...user,
                    detectionHistory: [event, ...user.detectionHistory.slice(0, 49)]
                };
                const updatedUsers = users.map(u =>
                    u.id === user.id ? updatedUser : u
                );
                set({ user: updatedUser, users: updatedUsers });
            },

            loadUserHistory: () => {
                const { user } = get();
                return user?.detectionHistory || [];
            }
        }),
        {
            name: 'auth-storage', // localStorage key
        }
    )
);