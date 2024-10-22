/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        "detail-color": "var(--detail-color)",
        "text-color": "var(--text-color)",
        "success-color": "var(--success-color)",
        "attention-color": "var(--attention-color)",
        "logo-gray-color": "var(--logo-gray-color)",
        "neutral-color": "var(--neutral-color)",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};
