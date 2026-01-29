# Cipherra Website

A modern React + TypeScript website for Cipherra, showcasing homomorphic encryption technology.

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **GSAP** for advanced animations

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Deployment to GitHub Pages

The project is configured to deploy to GitHub Pages using `gh-pages`.

### First Deployment

Run the following command to deploy:

```bash
npm run deploy
```

This will:
1. Build the project (`npm run build`)
2. Deploy the `dist` folder to the `gh-pages` branch
3. Make your site available at `https://Rahasya-Security.github.io`

### Custom Domain

The project includes a `CNAME` file for the custom domain `cipherra.ai`. This will be automatically copied to the deployment.

### Subsequent Deployments

After making changes, simply run:

```bash
npm run deploy
```

## Project Structure

```
├── public/              # Static assets (logo, CNAME)
├── src/
│   ├── components/     # React components
│   │   └── HEAnimation.tsx  # Homomorphic Encryption animation
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── vite.config.ts      # Vite configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

## Notes

- The homepage in `package.json` is set to `https://Rahasya-Security.github.io`
- The build output goes to the `dist` folder
- The `gh-pages` package automatically handles deployment to the `gh-pages` branch

