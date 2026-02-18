import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const Auth: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { user, login, signup, logout } = useAuthStore();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLogin) {
            login(username, password);
        } else {
            signup(username, password);
        }
        setUsername('');
        setPassword('');
    };

    if (user) {
        return (
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-4 bg-gray-800/50 backdrop-blur rounded-lg px-4 py-2 border border-gray-700"
            >
                <span className="text-sm">Welcome, <span className="font-bold text-ai-purple">{user.username}</span></span>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={logout}
                    className="p-2 hover:bg-gray-700 rounded-lg"
                    title="Logout"
                >
                    <LogOut className="w-4 h-4" />
                </motion.button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-800/50 backdrop-blur rounded-lg p-4 border border-gray-700"
        >
            <div className="flex mb-4">
                <button
                    className={`flex-1 py-2 text-center ${isLogin ? 'text-ai-purple border-b-2 border-ai-purple' : 'text-gray-400'}`}
                    onClick={() => setIsLogin(true)}
                >
                    Login
                </button>
                <button
                    className={`flex-1 py-2 text-center ${!isLogin ? 'text-ai-purple border-b-2 border-ai-purple' : 'text-gray-400'}`}
                    onClick={() => setIsLogin(false)}
                >
                    Sign Up
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-ai-purple"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-ai-purple"
                    required
                />
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 bg-ai-purple rounded-lg hover:bg-ai-purple/80 flex items-center justify-center space-x-2"
                >
                    {isLogin ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                    <span>{isLogin ? 'Login' : 'Sign Up'}</span>
                </motion.button>
            </form>
        </motion.div>
    );
};