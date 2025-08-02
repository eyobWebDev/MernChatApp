/** @type {import ('tailwindcss').Config} */
import daisyui from 'daisyui';
export const content = [
    "./index.html",
    "./src/**/*.{js,jsx}",
];

export const theme = {
    extend: {},
};

export const plugins = [daisyui()];

export const daisyui = {
    themes: ["light", "dark"]
}

