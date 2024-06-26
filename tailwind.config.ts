import { Config } from 'tailwindcss';

enum CustomColors {
  Primary = '#4A90E2',
  Secondary = '#FFD700',
  // Add more colors as needed
}

enum CustomFonts {
  Sans = 'Roboto, sans-serif',
  // Add more fonts as needed
}

enum CustomSpacing {
  Spacing72 = '18rem',
  // Add more spacing as needed
}

const config: Config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: CustomColors.Primary,
        secondary: CustomColors.Secondary,
        // Add more colors as needed
      },
      fontFamily: {
        sans: [CustomFonts.Sans],
        // Add more fonts as needed
      },
      spacing: {
        '72': CustomSpacing.Spacing72,
        // Add more spacing as needed
      },
    },
  },
  plugins: [],
};

export default config;
