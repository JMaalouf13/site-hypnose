/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**/*.{html,js}"],
    theme: {
        extend: {
            colors: {
                primary: '#C5A028', // Deeper Gold
                'primary-light': '#E5C558',
                secondary: '#FDF6E3', // Original Cream
                'secondary-light': '#FFFDF5', // Lighter Cream
                dark: '#1c1c1c',
            },
            fontFamily: {
                sans: ['Lato', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            boxShadow: {
                'gold': '0 10px 30px -10px rgba(197, 160, 40, 0.4)',
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.05)',
            },
            animation: {
                'fade-in': 'fadeIn 1s ease-out',
                'slide-up': 'slideUp 0.8s ease-out forwards',
                'shimmer': 'shimmer 2.5s infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                shimmer: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                }
            }
        }
    },
    plugins: [],
}
