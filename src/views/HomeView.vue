<template>
  <div class="editor-container">
    <div class="input-section" :class="{ 'reveal': revealed }">
      <div class="toolbar" :class="{ 'reveal': revealed }">
        <div class="toolbar-group">
          <select v-model="selectedFont" @change="applyFont" class="font-select" data-tooltip="Font Family">
            <option value="Calibri">Calibri</option>
            <option value="Arial">Arial</option>
            <option value="Verdana">Verdana</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Tahoma">Tahoma</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Trebuchet MS">Trebuchet MS</option>
            <option value="Geneva">Geneva</option>
            <option value="Courier New">Courier New</option>
            <option value="Palatino">Palatino</option>
            <option value="Garamond">Garamond</option>
            <option value="Bookman">Bookman</option>
            <option value="Comic Sans MS">Comic Sans MS</option>
            <option value="Impact">Impact</option>
          </select>
          
          <input 
            type="color" 
            v-model="selectedColor" 
            @change="applyColor" 
            class="color-picker" 
            data-tooltip="Text Color"
          >
        </div>

        <div class="toolbar-group">
          <select 
            v-model="selectedMargin" 
            @change="applyMargin" 
            class="margin-select" 
            data-tooltip="Content Margins"
          >
            <option value="0">No Margin</option>
            <option value="0.5">Extra Narrow</option>
            <option value="1">Narrow</option>
            <option value="2">Normal</option>
            <option value="3">Wide</option>
            <option value="4">Extra Wide</option>
          </select>
        </div>

        <div class="toolbar-group">
          <button @click="insertMarkdown('**', '**')" data-tooltip="Bold">
            <i class="mdi mdi-format-bold"></i>
          </button>
          <button @click="insertMarkdown('*', '*')" data-tooltip="Italic">
            <i class="mdi mdi-format-italic"></i>
          </button>
          <button @click="insertMarkdown('# ', '')" data-tooltip="Heading 1">
            <i class="mdi mdi-format-header-1"></i>
          </button>
          <button @click="insertMarkdown('## ', '')" data-tooltip="Heading 2">
            <i class="mdi mdi-format-header-2"></i>
          </button>
        </div>

        <div class="toolbar-group">
          <button @click="insertMarkdown('- ', '')" data-tooltip="Bullet List">
            <i class="mdi mdi-format-list-bulleted"></i>
          </button>
          <button @click="insertMarkdown('1. ', '')" data-tooltip="Numbered List">
            <i class="mdi mdi-format-list-numbered"></i>
          </button>
          <button @click="insertMarkdown('[', '](url)')" data-tooltip="Link">
            <i class="mdi mdi-link"></i>
          </button>
          <button @click="insertMarkdown('![alt text](', ')')" data-tooltip="Image">
            <i class="mdi mdi-image"></i>
          </button>
          <button @click="insertMarkdown('---\n', '')" data-tooltip="Horizontal Line">
            <i class="mdi mdi-minus"></i>
          </button>
          <button @click="insertMarkdown('```\n', '\n```')" data-tooltip="Code Block">
            <i class="mdi mdi-code-tags"></i>
          </button>
        </div>

        <div class="toolbar-group">
          <button @click="triggerFileImport" data-tooltip="Import File (MD, TXT, HTML)">
            <i class="mdi mdi-file-import"></i>
          </button>
          <input 
            type="file" 
            ref="fileInputRef" 
            @change="handleFileImport" 
            accept=".md,.txt,.html,.htm" 
            style="display: none;"
          >
        </div>
      </div>

      <textarea
        v-model="store.markdownContent"
        placeholder="Enter Markdown here..."
        @input="handleInput"
        ref="textareaRef"
        :style="{ 
          fontFamily: selectedFont, 
          color: selectedColor,
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s'
        }"
      ></textarea>
    </div>
    <div 
      class="preview-section" 
      :class="{ 'reveal': revealed }"
      :style="{ transitionDelay: '0.2s' }"
    >
      <div class="preview" v-html="store.htmlContent"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useContentStore } from '../stores/content'
import { useRevealEffect } from '@/utils/animations'
import { usePreventClose } from '@/composables/usePreventClose'

const store = useContentStore()
const textareaRef = ref<HTMLTextAreaElement>()
const fileInputRef = ref<HTMLInputElement>()
const selectedFont = ref('Calibri')
const selectedColor = ref('#333333')
const selectedMargin = ref('1')
const revealed = useRevealEffect()

usePreventClose()

const handleInput = () => {
  store.updateContent(
    store.markdownContent, 
    selectedFont.value, 
    selectedColor.value,
    selectedMargin.value
  )
}

const applyFont = () => {
  if (textareaRef.value) {
    textareaRef.value.style.fontFamily = selectedFont.value
    store.updateContent(
      store.markdownContent, 
      selectedFont.value, 
      selectedColor.value,
      selectedMargin.value
    )
  }
}

const applyColor = () => {
  if (textareaRef.value) {
    textareaRef.value.style.color = selectedColor.value
    store.updateContent(
      store.markdownContent, 
      selectedFont.value, 
      selectedColor.value,
      selectedMargin.value
    )
  }
}

const applyMargin = () => {
  store.updateContent(
    store.markdownContent, 
    selectedFont.value, 
    selectedColor.value,
    selectedMargin.value
  )
}

const insertMarkdown = (prefix: string, suffix: string) => {
  const textarea = textareaRef.value
  if (!textarea) return

  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const text = textarea.value

  const selectedText = text.substring(start, end)
  const replacement = prefix + selectedText + suffix
  
  const newText = text.substring(0, start) + replacement + text.substring(end)
  store.updateContent(
    newText, 
    selectedFont.value, 
    selectedColor.value,
    selectedMargin.value
  )
  
  // Reset cursor position
  textarea.focus()
  const newCursorPos = start + prefix.length + selectedText.length + suffix.length
  textarea.setSelectionRange(newCursorPos, newCursorPos)
}

const triggerFileImport = () => {
  if (fileInputRef.value) {
    fileInputRef.value.click()
  }
}

const handleFileImport = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) return
  
  if (!store.validateFileType(file)) {
    store.error = 'Please select a valid file type (MD, TXT, HTML)'
    return
  }
  
  store.importFile(file, () => {
    // Reset the file input so the same file can be imported again
    if (fileInputRef.value) {
      fileInputRef.value.value = ''
    }
  })
}

onMounted(() => {
  // Load saved content if it exists
  const savedContent = localStorage.getItem('markdownContent')
  if (savedContent) {
    store.updateContent(
      savedContent,
      selectedFont.value,
      selectedColor.value,
      selectedMargin.value
    )
  }
})

watch(() => store.documentTitle, (newTitle) => {
  document.title = newTitle || 'Markdown To Go'
}, { immediate: true })
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap');

.editor-container {
  display: flex;
  height: calc(100vh - 4rem - 3rem); /* Subtract navbar and footer heights */
  width: 100%;
  background: #f8f9fa;
}

.input-section, .preview-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  margin: 1rem;
  border-radius: 8px;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.reveal {
  opacity: 1;
  transform: translateY(0);
}

.toolbar {
  padding: 0.75rem;
  background-color: #ffffff;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.toolbar.reveal {
  opacity: 1;
  transform: translateY(0);
}

.toolbar-group {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0 0.5rem;
  border-right: 1px solid #eaeaea;
}

.toolbar-group:last-child {
  border-right: none;
}

.toolbar button {
  padding: 0.5rem;
  background: white;
  border: 1px solid #eaeaea;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  color: #333;
  transition: all 0.2s ease;
  opacity: 0;
  animation: fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.toolbar button:hover {
  background-color: #f8f9fa;
  border-color: #ddd;
  transform: translateY(-1px);
}

.toolbar i {
  font-size: 1.2rem;
  color: #555;
}

.font-select {
  padding: 0.5rem;
  border: 1px solid #eaeaea;
  border-radius: 6px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  color: #333;
  min-width: 140px;
  cursor: pointer;
}

.color-picker {
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid #eaeaea;
  border-radius: 6px;
  cursor: pointer;
}

.margin-select {
  padding: 0.5rem;
  border: 1px solid #eaeaea;
  border-radius: 6px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  color: #333;
  min-width: 120px;
  cursor: pointer;
}

textarea {
  flex: 1;
  width: 100%;
  padding: 1.5rem;
  border: none;
  border-radius: 0;
  font-family: Calibri, sans-serif;
  font-size: 1rem;
  resize: none;
  outline: none;
  line-height: 1.6;
  color: #333;
}

.preview-section {
  background-color: white;
  overflow-y: auto;
}

.preview {
  padding: 2rem;
  max-width: 100%;
  min-height: 100%;
  background-color: white;
}

/* Responsive Design */
@media (max-width: 768px) {
  .editor-container {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
    padding: 0.5rem;
  }

  .input-section, .preview-section {
    width: 100%;
    margin: 0.5rem 0;
    height: auto;
    flex: 0 1 auto; /* Allow shrinking but not growing */
  }

  .input-section {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
  }

  .preview-section {
    min-height: 40vh;
  }

  textarea {
    min-height: 50vh;
    height: 100%;
    flex: 1 1 auto; /* Allow growing and shrinking */
    overflow-y: auto;
    resize: vertical; /* Allow manual resizing */
  }

  .toolbar {
    padding: 0.5rem;
    gap: 0.5rem;
    flex: 0 0 auto; /* Don't grow or shrink */
  }

  .toolbar-group {
    padding: 0;
    border-right: none;
  }

  .font-select {
    min-width: 120px;
  }

  .margin-select {
    min-width: 100px;
  }
}

@media print {
  .editor-container {
    background: white !important;
  }
  
  .input-section, .preview-section {
    background: white !important;
    box-shadow: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }
}

.toolbar button {
  animation-delay: 100ms;
}

.toolbar-group:nth-child(1) button { animation-delay: 100ms; }
.toolbar-group:nth-child(2) button { animation-delay: 200ms; }
.toolbar-group:nth-child(3) button { animation-delay: 300ms; }
.toolbar-group:nth-child(4) button { animation-delay: 400ms; }

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
