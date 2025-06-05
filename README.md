# Markdown To Go 📝

<p align="center">
  <img src="/Markdown2Go.svg" alt="Markdown To Go Logo" width="200"/>
</p>

<p align="center">
  <strong>A modern, feature-rich online Markdown editor with real-time preview and customization options.</strong>
</p>

![Responsive Screenshot](https://github.com/UzayYildirim/Markdown-To-Go/blob/main/screenshots/MD2GO_Responsive.png?raw=true)

## ✨ Features

- **Real-time Preview**: See your formatted content instantly as you type
- **Custom Font Selection**: Choose from a variety of professional fonts
- **Color Customization**: Personalize your text color to match your brand
- **Adjustable Margins**: Fine-tune the layout for perfect presentation
- **PDF Export**: Generate professional PDFs with a single click
- **No Account Required**: Start using immediately, no sign-up needed
- **Local Storage**: Auto-saves your work in the browser
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Syntax Highlighting**: Beautiful code formatting for technical documentation
- **Privacy-Focused**: Your content stays in your browser - we don't store anything

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)

### Installation

1. Clone the repository
- bash
- git clone https://github.com/uzayyildirim/markdown-to-go.git

2. Install dependencies
- bash
- cd markdown-to-go
- pnpm install

3. Start the development server
- bash
- pnpm dev

4. Build for production
- bash
- pnpm build

## 🛠️ Built With

- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/)
- [Marked](https://marked.js.org/)
- [DOMPurify](https://github.com/cure53/DOMPurify)

## 📦 Project Structure

- **markdown-to-go/**
  - **public/**: Static assets
  - **src/**
    - **assets/**: Global styles and assets
    - **components/**: Vue components
    - **router/**: Vue Router configuration
    - **stores/**: Pinia stores
    - **types/**: TypeScript type definitions
    - **utils/**: Utility functions
    - **views/**: Page components
  - **scripts/**: Build and maintenance scripts
  - **package.json**: Project dependencies and scripts

## 🚢 Deployment

1. Build the project

2. The built files will be in the `dist` directory. Deploy these files to your web server.

3. For optimal performance, configure your web server with the following:
   - Enable gzip compression
   - Set appropriate cache headers
   - Configure SSL certificate
   - Set up proper CORS headers if needed

## 🌟 Support

If you find this project helpful, please consider:
- Giving it a star ⭐
- [Buying me a coffee](https://buymeacoffee.com/uzayyildirim)

![Mobile Screenshot](https://github.com/UzayYildirim/Markdown-To-Go/blob/main/screenshots/MD2GO_Mobile.png?raw=true)
![Print Dialog Screenshot](https://github.com/UzayYildirim/Markdown-To-Go/blob/main/screenshots/MD2GO_PrintDialog.png?raw=true)

## 🚀 Development

### Prerequisites

- Node.js 18 or higher
- pnpm (recommended package manager)

### Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd markdown-to-go

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Build

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🚀 Deployment

### Cloudflare Pages

This project is optimized for deployment to Cloudflare Pages. Follow these steps:

#### Option 1: Git Integration (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
3. Click "Create a project" and connect your Git repository
4. Configure the build settings:
   - **Framework preset**: None
   - **Build command**: `pnpm build-cf`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (leave empty)
5. Click "Save and Deploy"

#### Option 2: Direct Upload

1. Build the project locally:
   ```bash
   pnpm build-cf
   ```

2. Upload the `dist` folder to Cloudflare Pages:
   - Go to [Cloudflare Pages](https://pages.cloudflare.com/)
   - Click "Upload assets"
   - Drag and drop the `dist` folder

#### Build Configuration

The project includes Cloudflare Pages optimizations:

- **Static routing**: Configured with `_redirects` file for SPA routing
- **Security headers**: Set via `_headers` file
- **Asset optimization**: Automatic compression and caching
- **Bundle splitting**: Vendor and markdown libraries are split for better caching

#### Environment Variables

No environment variables are required for basic deployment. All processing happens client-side.

### Other Static Hosting Providers

The built application in the `dist` folder can be deployed to any static hosting provider:

- **Netlify**: Use build command `pnpm build` and publish directory `dist`
- **Vercel**: Zero-config deployment, just import your Git repository
- **GitHub Pages**: Use GitHub Actions with the build output from `dist`
- **Firebase Hosting**: Deploy the `dist` folder contents

## 🚀 Performance

- ⚡ **Lighthouse Score**: 100/100/100/100
- 📦 **Bundle Size**: Optimized with code splitting
- 🚀 **First Load**: < 100ms on fast connections
- 💾 **Caching**: Aggressive caching for static assets

## 🔒 Privacy & Security

- 🔒 **No data collection**: All content stays in your browser
- 🛡️ **Content Security Policy**: Strict CSP headers
- 🧹 **Content Sanitization**: All HTML output is sanitized
- 📱 **Offline capable**: Works without internet connection

## 🖥️ Browser Support

- ✅ Chrome/Edge 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Acknowledgments

- Built with [Vue 3](https://vuejs.org/) and [Vite](https://vitejs.dev/)
- Markdown parsing by [marked](https://marked.js.org/)
- Content sanitization by [DOMPurify](https://github.com/cure53/DOMPurify)
- Icons by [Material Design Icons](https://materialdesignicons.com/)
