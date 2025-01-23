import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

export const useContentStore = defineStore('content', () => {
  const markdownContent = ref('');
  const htmlContent = ref('');
  const error = ref<string | null>(null);
  const selectedFont = ref('Calibri');
  const selectedColor = ref('#333333');
  const selectedMargin = ref('1');
  const showToast = ref(false);

  // Add computed property for title
  const documentTitle = computed(() => {
    const firstLine = markdownContent.value.split('\n')[0].replace(/^#\s*/, '');
    return firstLine.slice(0, 27);
  });

  // Configure marked options
  marked.setOptions({
    gfm: true,
    breaks: true,
    pedantic: false,
    silent: false
  });

  const updateContent = async (
    content: string, 
    font = selectedFont.value, 
    color = selectedColor.value,
    margin = selectedMargin.value
  ) => {
    try {
      markdownContent.value = content;
      selectedFont.value = font;
      selectedColor.value = color;
      selectedMargin.value = margin;
      
      // Save to localStorage
      localStorage.setItem('markdownContent', content)
      localStorage.setItem('selectedFont', font)
      localStorage.setItem('selectedColor', color)
      localStorage.setItem('selectedMargin', margin)
      
      // Parse markdown to HTML with HTML enabled
      const html = await marked.parse(content, {
        gfm: true,
        breaks: true
      });

      // Ensure html is a string before sanitizing
      if (typeof html === 'string') {
        // Sanitize HTML while preserving safe HTML tags
        const sanitizedHtml = DOMPurify.sanitize(html, {
          ADD_TAGS: ['div', 'span'], // Add any additional tags you want to allow
          ADD_ATTR: ['style', 'class'] // Add any additional attributes you want to allow
        });

        // Create styles with current font and color
        const styles = `
          <style>
            .markdown-body {
              font-family: ${font}, -apple-system, system-ui, sans-serif !important;
              color: ${color} !important;
              font-size: 16px;
              line-height: 1.6;
              padding: ${margin === '0' ? '0' : `${margin}rem`} !important;
            }
            .markdown-body * {
              font-family: inherit;
              color: inherit;
            }
            .markdown-body code, .markdown-body pre code {
              font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
            }
            /* Print styles */
            @media print {
              body { 
                margin: 0; 
                padding: 0;
                background: white !important;
              }
              .navbar, .input-section, .toolbar, .toast-message { 
                display: none !important; 
              }
              .preview-section { 
                overflow: visible !important;
                height: auto !important;
                background: white !important;
                box-shadow: none !important;
                margin: 0 !important;
                padding: 0 !important;
              }
              .preview { 
                padding: ${margin === '0' ? '0' : `${margin}rem`} !important;
                background: white !important;
              }
            }
            /* Rest of your existing styles */
            .markdown-body h1 { font-size: 2em; margin: 0.67em 0; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
            .markdown-body h2 { font-size: 1.5em; margin: 0.83em 0; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
            .markdown-body h3 { font-size: 1.25em; margin: 1em 0; }
            .markdown-body h4 { font-size: 1em; margin: 1.33em 0; }
            .markdown-body h5 { font-size: 0.875em; margin: 1.67em 0; }
            .markdown-body h6 { font-size: 0.85em; margin: 2.33em 0; }
            .markdown-body p { margin: 1em 0; }
            .markdown-body strong { font-weight: 600; }
            .markdown-body em { font-style: italic; }
            .markdown-body code {
              background: rgba(27,31,35,0.05);
              padding: 0.2em 0.4em;
              border-radius: 3px;
              font-size: 85%;
            }
            .markdown-body pre {
              background: #f6f8fa;
              padding: 16px;
              border-radius: 6px;
              overflow: auto;
              font-size: 85%;
              line-height: 1.45;
            }
            .markdown-body pre code {
              background: transparent;
              padding: 0;
              border-radius: 0;
            }
            .markdown-body ul, .markdown-body ol {
              margin: 1em 0;
              padding-left: 2em;
            }
            .markdown-body li { margin: 0.25em 0; }
            .markdown-body a {
              color: #0366d6;
              text-decoration: none;
            }
            .markdown-body a:hover {
              text-decoration: underline;
            }
            .markdown-body blockquote {
              margin: 1em 0;
              padding: 0 1em;
              color: #6a737d;
              border-left: 0.25em solid #dfe2e5;
            }
            .markdown-body img {
              max-width: 100%;
              height: auto;
            }
            .markdown-body hr {
              height: 0.25em;
              padding: 0;
              margin: 24px 0;
              background-color: #e1e4e8;
              border: 0;
            }
            .markdown-body table {
              border-spacing: 0;
              border-collapse: collapse;
              margin: 1em 0;
              width: 100%;
            }
            .markdown-body td, .markdown-body th {
              padding: 6px 13px;
              border: 1px solid #dfe2e5;
            }
            .markdown-body tr:nth-child(2n) {
              background-color: #f6f8fa;
            }
          </style>
        `;

        // Wrap the content with our styles
        htmlContent.value = `
          ${styles}
          <div class="markdown-body">
            ${sanitizedHtml}
          </div>
        `;
      }
      
      error.value = null;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred while processing the content';
      console.error('Error updating content:', e);
    }
  };

  const printDocument = () => {
    showToast.value = true;
    
    // Longer delay to ensure toast is visible before print dialog
    setTimeout(() => {
      window.print();
    }, 500);
    
    // Reset toast when print dialog closes
    const onAfterPrint = () => {
      showToast.value = false;
      window.removeEventListener('afterprint', onAfterPrint);
    };
    
    window.addEventListener('afterprint', onAfterPrint);
    
    // Fallback timeout in case afterprint doesn't fire
    setTimeout(() => {
      showToast.value = false;
      window.removeEventListener('afterprint', onAfterPrint);
    }, 10000);
  };

  const hasContent = computed(() => markdownContent.value.trim().length > 0);

  return {
    markdownContent,
    htmlContent,
    error,
    updateContent,
    printDocument,
    selectedFont,
    selectedColor,
    selectedMargin,
    documentTitle,
    showToast,
    hasContent
  };
}); 