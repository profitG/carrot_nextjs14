import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: "var(--roboto-text)",
        rubik: "var(--rubik-text)",
        metal: "var(--metallica-text)",
      },
      margin: {
        tomato: "120px",
      },
      borderRadius: {
        "sexy-name": "4.22px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
