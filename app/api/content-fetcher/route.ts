import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate URL format
    let parsedUrl;
    try {
      parsedUrl = new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    // Fetch the webpage content
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AI-SEO-Helper/1.0; +https://aiseohelper.com)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch URL: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const html = await response.text();

    // Extract text content from HTML
    const content = extractTextFromHTML(html);

    if (!content || content.trim().length < 50) {
      return NextResponse.json(
        { error: 'No readable content found on this page' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      content: content.trim(),
      url: url,
      wordCount: content.split(/\s+/).length,
    });

  } catch (error) {
    console.error('Content fetcher error:', error);
    
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timeout - URL took too long to respond' },
        { status: 408 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch content from URL' },
      { status: 500 }
    );
  }
}

function extractTextFromHTML(html: string): string {
  // Remove script and style elements
  let text = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, '')
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '');

  // Extract text from common content containers
  const contentSelectors = [
    'article',
    'main',
    '.content',
    '.post-content',
    '.entry-content',
    '.article-content',
    '.blog-content',
    '.post-body',
    '.entry-body',
    '.article-body',
    '.content-body',
    '.main-content',
    '.text-content',
    '.story-content',
    '.page-content',
    '.body-content',
    '.post-text',
    '.entry-text',
    '.article-text',
    '.content-text',
    '.main-text',
    '.text-body',
    '.story-text',
    '.page-text',
    '.body-text',
  ];

  let extractedContent = '';

  // Try to find content in specific containers first
  for (const selector of contentSelectors) {
    const regex = new RegExp(`<${selector}[^>]*>([\\s\\S]*?)<\\/${selector}>`, 'gi');
    const matches = text.match(regex);
    if (matches && matches.length > 0) {
      extractedContent = matches.join(' ');
      break;
    }
  }

  // If no specific content found, extract from body
  if (!extractedContent) {
    const bodyMatch = text.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch) {
      extractedContent = bodyMatch[1];
    } else {
      extractedContent = text;
    }
  }

  // Convert HTML to plain text
  let plainText = extractedContent
    .replace(/<[^>]+>/g, ' ') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces
    .replace(/&amp;/g, '&') // Replace HTML entities
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();

  // Remove excessive whitespace and clean up
  plainText = plainText
    .replace(/\n\s*\n/g, '\n\n') // Remove excessive line breaks
    .replace(/\s+/g, ' ') // Normalize spaces
    .trim();

  return plainText;
} 