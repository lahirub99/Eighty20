import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // Eisenhower Matrix Colors - using standard Tailwind approach
        'quadrant-q1': '#EF4444', // Red - Urgent & Important
        'quadrant-q1-light': '#FEE2E2', // Light red background
        'quadrant-q1-dark': '#DC2626', // Dark red for borders
        'quadrant-q1-text': '#991B1B', // Dark red text
        
        'quadrant-q2': '#F59E0B', // Yellow - Important, Not Urgent
        'quadrant-q2-light': '#FEF3C7', // Light yellow background
        'quadrant-q2-dark': '#D97706', // Dark yellow for borders
        'quadrant-q2-text': '#92400E', // Dark yellow text
        
        'quadrant-q3': '#3B82F6', // Blue - Urgent, Not Important
        'quadrant-q3-light': '#DBEAFE', // Light blue background
        'quadrant-q3-dark': '#2563EB', // Dark blue for borders
        'quadrant-q3-text': '#1E40AF', // Dark blue text
        
        'quadrant-q4': '#10B981', // Green - Neither
        'quadrant-q4-light': '#D1FAE5', // Light green background
        'quadrant-q4-dark': '#059669', // Dark green for borders
        'quadrant-q4-text': '#047857', // Dark green text
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;