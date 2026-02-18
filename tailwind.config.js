/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'ai-purple': '#8b5cf6',
                'threat-red': '#ef4444',
                'safe-green': '#10b981',
            },
        },
    },
    plugins: [],
}
