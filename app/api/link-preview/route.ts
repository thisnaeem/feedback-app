import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const preview = {
      title: $('meta[property="og:title"]').attr('content') || 
             $('title').text() || 
             url,
      description: $('meta[property="og:description"]').attr('content') || 
                   $('meta[name="description"]').attr('content') || 
                   '',
      image: $('meta[property="og:image"]').attr('content') || 
             undefined
    };

    return NextResponse.json({ preview });
  } catch (error) {
    console.error('Error fetching link preview:', error);
    return NextResponse.json({ preview: null }, { status: 500 });
  }
} 