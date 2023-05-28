const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './vendor/laravel/jetstream/**/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/Components/**/*.tsx',
        // './resources/js/Pages/Admin/PublicationOpportunity/Index.tsx',
        './resources/js/Layouts/**/*.tsx',
        './resources/js/Pages/**/*.tsx',
        "./resources/js/Pages/Admin/HomeContent/Index.tsx"
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
                roboto: ['Roboto']
            },
        }
    },

    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
