import { defineStore } from 'pinia';

export interface FooterLink {
  title: string;
  url: string;
  icon: string;
}

export const useFooterStore = defineStore('footer', {
  state: () => ({
    links: [
      {
        title: 'GitHub',
        url: 'https://github.com/uzayyildirim/markdown-to-go',
        icon: 'mdi-github'
      },
      {
        title: 'Uzay Yildirim',
        url: 'https://uzay.me',
        icon: 'mdi-web'
      },
      {
        title: 'Buy Me a Coffee',
        url: 'https://buymeacoffee.com/uzayyildirim',
        icon: 'mdi-coffee'
      }
    ] as FooterLink[]
  })
}); 