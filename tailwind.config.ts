// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './app/**/*.{ts,tsx}', // Make sure app directory is scanned
        './components/**/*.{ts,tsx}', // If you have components later
    ],
    theme: {
        extend: {
            fontFamily: {
                heading: ['DidotBoldItalic', 'sans-serif'],
                body: ['BirkaSemiBold', 'sans-serif'],
            },
            colors: {
                text: '#454525',
                background: {
                    DEFAULT: '#b6b992',
                    alt1: '#9a9d6c',
                    alt2: '#c5ca91',
                    alt3: '#a8ab7a',
                    alt4: '#ded2bc'
                },
            },
        },
    },
    plugins: [],
};

export default config;