import React from 'react'

// Simple markdown to HTML converter for blog content
export function markdownToHtml(markdown: string): string {
  let html = markdown

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')

  // Bold and italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline">$1</a>')

  // Lists
  html = html.replace(/^\* (.*$)/gim, '<li>$1</li>')
  html = html.replace(/^- (.*$)/gim, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>)/s, '<ul class="list-disc list-inside mb-4">$1</ul>')

  // Paragraphs
  html = html.replace(/\n\n/g, '</p><p class="mb-4">')
  html = html.replace(/^(?!<[h|u|p|s])(.*$)/gim, '<p class="mb-4">$1</p>')

  // Clean up empty paragraphs
  html = html.replace(/<p class="mb-4"><\/p>/g, '')
  html = html.replace(/<p class="mb-4"><\/p>/g, '')

  // Pro tip styling
  html = html.replace(
    /\*\*(.*?)\*\*/g, 
    '<span class="font-semibold text-blue-600">$1</span>'
  )

  return html
}

// Component for rendering markdown content
export function MarkdownContent({ content }: { content: string }) {
  const htmlContent = markdownToHtml(content)
  
  return (
    <div 
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
} 