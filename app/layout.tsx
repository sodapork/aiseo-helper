import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import DynamicBackground from './components/DynamicBackground'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI SEO Helper - LLM Optimization Tools for AI Search',
  description: 'Professional tools to optimize your website for AI search engines, LLMs, and AI-powered discovery. Get found by AI assistants and chatbots.',
  keywords: 'LLM SEO, AI search optimization, AI discovery, chatbot optimization, AI assistant visibility, semantic search',
  authors: [{ name: 'AI SEO Helper' }],
  openGraph: {
    title: 'AI SEO Helper - LLM Optimization Tools for AI Search',
    description: 'Professional tools to optimize your website for AI search engines, LLMs, and AI-powered discovery. Get found by AI assistants and chatbots.',
    url: 'https://aiseohelper.com',
    siteName: 'AI SEO Helper',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI SEO Helper - LLM Optimization Tools for AI Search',
    description: 'Professional tools to optimize your website for AI search engines, LLMs, and AI-powered discovery. Get found by AI assistants and chatbots.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DynamicBackground>
          <Header />
          <main className="pt-16">
            {children}
          </main>
        </DynamicBackground>
      </body>
    </html>
  )
} 