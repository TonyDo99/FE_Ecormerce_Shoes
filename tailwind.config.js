module.exports = {
  mode: "jit",
  purge: [
    "../React-shoes-web/public/**/*.html",
    "../React-shoes-web/src/**/*.{js,jsx,ts,tsx,vue}",
  ],
  content: ["./src/**/*.{html,js}"],
  darkMode: false,
  theme: {
    fontFamily: {
      Inter: [
        "Inter",
        "Inter",
        "-apple-system,BlinkMacSystemFont",
        "Segoe UI",
        "Helvetica",
        "Arial",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
      ],
      Public: ["Public Sans, sans-serif"],
      roboto: ["Roboto, sans-serif"],
    },
    zIndex: {
      0: 0,
      1: 1,
      2: 2,
    },
    variants: {
      extend: {
        gridTemplateRows: {
          "[auto,auto,1fr]": "auto auto 1fr",
        },
      },
    },
    extend: {
      colors: {
        gray_7a82a6: "#7a82a6",
        pink_f5548e: "#f5548e",
        orange_fa8b0c: "#fa8b0c",
        purpel_903af9: "#903af9",
        green_32CC0B: "#32CC0B",
        blue_1170cf: "#1170cf",
        bg_272b41: "#272b41",
      },
      height: {
        objectFit: "fit-content",
      },
      ringColor: {
        blue_1170cf: "#1170cf",
        gray_7a82a6: "#7a82a6",
        pink_f5548e: "#f5548e",
        orange_fa8b0c: "#fa8b0c",
        purpel_903af9: "#903af9",
        green_32CC0B: "#32CC0B",
        bg_272b41: "#272b41",
      },
      gridAutoColumns: {
        "grid-admin": "280px auto",
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(-5%)" },
          "50%": { transform: "none" },
        },
      },
      animation: {
        "bounce-slow": "bounce 2s infinite",
      },
    },
    boxShadow: {
      "all-rounded":
        " 0 4px 6px 5px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.05)",
    },
  },
  variants: {
    extend: {
      borderOpacity: ["hover", "active", "focus"],
      borderColor: ["hover", "active", "focus"],
      ringOpacity: ["hover", "active"],
      ringWidth: ["hover", "active"],
      ringColor: ["hover", "active"],
      transform: ["hover", "focus"],
      transitionProperty: ["hover", "focus"],
      transitionDuration: ["hover", "focus"],
      transitionTimingFunction: ["hover", "focus"],
      transitionDelay: ["hover", "focus"],
      translate: ["active", "group-hover", "hover"],
      animation: ["responsive", "motion-safe", "motion-reduce"],
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
  corePlugins: {
    borderStyle: true,
  },
};
