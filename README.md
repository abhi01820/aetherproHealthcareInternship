This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## AI Chatbot Integration

This project includes an AI-powered medical coding audit chatbot that provides recommendations based on patient data. The chatbot uses OpenAI's GPT-4 model to generate comprehensive medical coding audit reports.

### Setup OpenAI API

1. Get your OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a `.env.local` file in the root directory
3. Add your OpenAI API key:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

### Features

- **Medical Coding Audit**: Analyzes patient data and provides coding recommendations
- **NCCI Compliance**: Identifies bundling/unbundling issues
- **Documentation Review**: Assesses completeness of medical documentation
- **Revenue Optimization**: Suggests opportunities for improved billing
- **Real-time Analysis**: Generates recommendations based on current patient data

### Usage

1. Fill in patient data in the Vitals form
2. Click the "AI-ChatBot" button
3. Review the generated medical coding audit report
4. Use the "Regenerate" button for new recommendations

### API Endpoints

- `POST /api/openai` - Handles OpenAI API requests for medical coding audits

### Security

- API keys are stored securely in environment variables
- All requests are validated and sanitized
- Error handling prevents exposure of sensitive information
