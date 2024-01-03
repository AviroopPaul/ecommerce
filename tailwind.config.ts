import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#00bfe7",

          secondary: "#00de00",

          accent: "#0067c0",

          neutral: "#030800",

          "base-100": "#fff9ff",

          info: "#00c2ec",

          success: "#009400",

          warning: "#ffa500",

          error: "#ff1853",
        },
      },
    ],
  },
};
export default config;
