export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

    theme: {
      extend: {
        fontSize: {
          "headline-1": ["3.25rem", { lineHeight: "60px", fontWeight: "600" }],
          "headline-2": ["2.5rem", { lineHeight: "48px", fontWeight: "600" }],
        },
        colors: {
          "base-brown-600": "#26231E",
        },
      },
    },
    
    plugins: [],
  };