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
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
                roboto: ['Roboto']
            },
        },
        fontSize: {
            '2xl': ['1.5rem', {
              lineHeight: '2rem',
              letterSpacing: '-0.01em',
              fontWeight: '500',
            }],
            '3xl': ['1.875rem', {
              lineHeight: '2.25rem',
              letterSpacing: '-0.02em',
              fontWeight: '700',
            }],
          }
    },

    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
