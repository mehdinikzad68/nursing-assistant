import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Vazirmatn", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      colors: {
        app: {
          bg: "var(--app-bg)",
          surface: "var(--app-surface)",
          card: "var(--app-card)",
          elevated: "var(--app-elevated)",
          border: "var(--app-border)",
          "border-light": "var(--app-border-light)",
          "on-primary": "var(--app-on-primary)",
          "primary-soft": "var(--app-primary-soft)",
          info: "var(--app-info)",
          "info-soft": "var(--app-info-soft)",
          warning: "var(--app-warning)",
          "warning-soft": "var(--app-warning-soft)",
          success: "var(--app-success)",
          "success-soft": "var(--app-success-soft)",
          danger: "var(--app-danger)",
          "danger-soft": "var(--app-danger-soft)",
          error: "var(--app-error)",
          "error-soft": "var(--app-error-soft)",
        },
        ink: {
          DEFAULT: "var(--app-text)",
          muted: "var(--app-text-muted)",
          subtle: "var(--app-text-subtle)",
        },
        brand: {
          DEFAULT: "var(--app-accent)",
          strong: "var(--app-accent-strong)",
        },
        chip: {
          "teal-bg": "var(--chip-teal-bg)",
          "teal-fg": "var(--chip-teal-fg)",
          "teal-border": "var(--chip-teal-border)",
          "rose-bg": "var(--chip-rose-bg)",
          "rose-fg": "var(--chip-rose-fg)",
          "rose-border": "var(--chip-rose-border)",
          "amber-bg": "var(--chip-amber-bg)",
          "amber-fg": "var(--chip-amber-fg)",
          "amber-border": "var(--chip-amber-border)",
          "slate-bg": "var(--chip-slate-bg)",
          "slate-fg": "var(--chip-slate-fg)",
          "slate-border": "var(--chip-slate-border)",
        },
        /* V2 dashboard tokens — rgb triplets so /alpha modifiers work.
           See DESIGN-SYSTEM.md §9 and app/globals.css. */
        hami: {
          canvas: "rgb(var(--hami-canvas) / <alpha-value>)",
          card: "rgb(var(--hami-card) / <alpha-value>)",
          sub: "rgb(var(--hami-sub) / <alpha-value>)",
          border: "rgb(var(--hami-border) / <alpha-value>)",
          text: "rgb(var(--hami-text) / <alpha-value>)",
          muted: "rgb(var(--hami-muted) / <alpha-value>)",
          accent: "rgb(var(--hami-accent) / <alpha-value>)",
          "accent-strong": "rgb(var(--hami-accent-strong) / <alpha-value>)",
          "on-accent": "rgb(var(--hami-on-accent) / <alpha-value>)",
          teal: "rgb(var(--hami-teal) / <alpha-value>)",
          amber: "rgb(var(--hami-amber) / <alpha-value>)",
          blue: "rgb(var(--hami-blue) / <alpha-value>)",
          purple: "rgb(var(--hami-purple) / <alpha-value>)",
          rose: "rgb(var(--hami-rose) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
