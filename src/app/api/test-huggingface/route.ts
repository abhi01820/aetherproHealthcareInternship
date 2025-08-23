import {  NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.HUGGINGFACE_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { 
          error: 'Hugging Face API key not found',
          message: 'Please add HUGGINGFACE_API_KEY to your .env.local file'
        },
        { status: 500 }
      );
    }

    if (!apiKey.startsWith('hf_')) {
      return NextResponse.json(
        { 
          error: 'Invalid Hugging Face API key format',
          message: 'API key should start with hf_'
        },
        { status: 500 }
      );
    }

    // Test the API with a simple request using the improved model
    const response = await fetch(
      'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          inputs: 'Hello, how are you?',
          parameters: {
            max_length: 50,
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
        { 
          error: 'Hugging Face API test failed',
          details: errorData,
          message: 'Check if your API key is valid and has access'
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      message: 'Hugging Face API is working!',
      response: data,
      apiKey: apiKey.substring(0, 10) + '...' // Show first 10 chars for verification
    });

  } catch (error) {
    console.error('Error testing Hugging Face API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to test Hugging Face API',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 