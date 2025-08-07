import {  NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Using Hugging Face Inference API (free tier)
    const apiKey = process.env.HUGGINGFACE_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Hugging Face API key not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(
      'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          inputs: `You are an AAPC-certified medical coder. ${prompt}`,
          parameters: {
            max_length: 1000,
            temperature: 0.7,
            do_sample: true,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Hugging Face API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to generate recommendations' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Extract the generated text from the response
    let recommendations = '';
    if (Array.isArray(data) && data.length > 0) {
      recommendations = data[0].generated_text || 'No response generated';
    } else if (typeof data === 'string') {
      recommendations = data;
    } else if (data && typeof data === 'object') {
      // Handle different response formats
      recommendations = data.generated_text || data.text || JSON.stringify(data);
    } else {
      recommendations = 'No response generated';
    }

    // Clean up the response
    recommendations = recommendations.replace(/^.*?You are an AAPC-certified medical coder\.\s*/i, '');

    return NextResponse.json({ recommendations });
  } catch (error) {
    console.error('Error calling Hugging Face API:', error);
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
} 