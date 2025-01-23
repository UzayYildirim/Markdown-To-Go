declare module 'html-to-docx' {
  function htmlToDocx(html: string): Promise<Buffer>
  export = htmlToDocx
} 