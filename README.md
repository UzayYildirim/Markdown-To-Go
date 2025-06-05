# Markdown To Go 📝

<p align="center">
  <img src="/Markdown2Go.svg" alt="Markdown To Go Logo" width="200"/>
</p>

<p align="center">
  **A modern, online Markdown editor with real-time preview and customization options.**
</p>

![Responsive Screenshot](https://github.com/UzayYildirim/Markdown-To-Go/blob/main/screenshots/MD2GO_Responsive.png?raw=true)

## Available Online
[Markdown To Go is now available online!](https://markdown.to-go.cloud)

## ✨ Features

* **Real-time Preview**: View formatted content as you type
* **Font Selection**: Choose from various professional fonts
* **Color Customization**: Personalize text color
* **Adjustable Margins**: Fine-tune layout for presentation
* **PDF Export**: Generate PDFs with one click
* **No Account Required**: Start immediately, no sign-up
* **Local Storage**: Auto-saves work in the browser
* **Responsive Design**: Works on desktop and mobile
* **Syntax Highlighting**: Code formatting for technical docs
* **Privacy-Focused**: Content stays in your browser

## 🚀 Getting Started

### Prerequisites

* Node.js (v18 or higher)
* pnpm (v8 or higher)

### Installation & Development

1. Clone the repository:

   ```bash
   git clone https://github.com/uzayyildirim/markdown-to-go.git
   cd markdown-to-go
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Build for production:

   ```bash
   pnpm build
   ```

## 🚢 Deployment

### Normal Build (Any Static Server)

1. Build the project:

   ```bash
   pnpm build
   ```

2. The output files will be in the `dist` directory. Deploy these files to your static hosting provider or web server. For best performance:

   * Enable gzip compression
   * Set appropriate cache headers
   * Configure SSL (HTTPS)

### Cloudflare Pages (Optimized)

This project includes optimizations for Cloudflare Pages, such as static routing, security headers, and asset caching.

#### Git Integration (Recommended)

1. Push the code to a Git repository (e.g., GitHub).
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/) and create a new project.
3. Connect your repository.
4. Set build settings:

   * **Framework preset**: None
   * **Build command**: `pnpm build-cf`
   * **Publish directory**: `dist`
   * **Root directory**: `/`
5. Save and deploy.

#### Direct Upload

1. Build locally:

   ```bash
   pnpm build-cf
   ```

2. Go to [Cloudflare Pages](https://pages.cloudflare.com/) and click "Upload assets".

3. Upload the contents of the `dist` folder.

## 🛠️ Built With

* Vue 3
* TypeScript
* Vite
* Pinia
* Marked.js
* DOMPurify

## 📦 Project Structure

* **public/**: Static assets
* **src/**

  * **assets/**: Global styles and images
  * **components/**: Vue components
  * **router/**: Vue Router config
  * **stores/**: Pinia stores
  * **types/**: TypeScript definitions
  * **utils/**: Utility functions
  * **views/**: Page components
* **scripts/**: Build and maintenance scripts
* **package.json**: Dependencies and scripts

## 🌟 Support

If you find this project helpful, consider:

* Giving it a star ⭐
* [Buying me a coffee](https://buymeacoffee.com/uzayyildirim)

![Mobile Screenshot](https://github.com/UzayYildirim/Markdown-To-Go/blob/main/screenshots/MD2GO_Mobile.png?raw=true)
![Print Dialog Screenshot](https://github.com/UzayYildirim/Markdown-To-Go/blob/main/screenshots/MD2GO_PrintDialog.png?raw=true)

## 🚀 Performance

* **Optimized Bundle Size** with code splitting
* **Fast Initial Load** on modern connections
* **Aggressive Caching** for static assets

## 🔒 Privacy & Security

* **No Data Collection**: All content remains in your browser
* **Content Security Policy**: Strict CSP headers
* **Content Sanitization**: All HTML output is sanitized
* **Offline Capable**: Works without an internet connection

## 🖥️ Browser Support

* Chrome/Edge 80+
* Firefox 75+
* Safari 13+
* Modern mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🎉 Acknowledgments

* Vue 3 & Vite
* Markdown parsing via Marked.js
* Content sanitization by DOMPurify
* Icons by Material Design Icons
