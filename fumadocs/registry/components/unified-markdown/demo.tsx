'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SSEMessageGenerator } from '~/registry/utils/stream';
import { UnifiedMarkdown } from './index';

const longContent = `
# About This Project

Welcome to **MyAI Portal** 


\`\`\`javascript
const a = 1;
console.log(a);
\`\`\`

---

## 🚀 Features

- **Markdown Rendering** with support for tables, math formulas, and syntax highlighting.
- **Next.js 14** + **React 19** + **TypeScript** for modern web development.
- **Tailwind CSS** & **shadcn/ui** for elegant interfaces.
- **Internationalization**: Easily switch languages.

---

> “The best software is built by a community.”

Check out the [GitHub repo](https://github.com/myaiportal/myai) and join us!

- [x] Markdown parsing
- [ ] AI-powered chat
---

## 📚 Example Table

| Name         | Role          | Active |
| ------------ | ------------- | ------ |
| Alice        | Frontend      | ✅     |
| Bob          | Backend       | ✅     |
| Charlie      | DevOps        | ❌     |

---

## 🧮 Math Support

Inline math like $E=mc^2$ and block math:

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$



😊
`;

const shortContent = `
Welcome to 😊 **MyAI Portal** 

I'm a chatbot that can answer your questions and help you with your tasks. 😊
`;

export default function Demo() {
  const [content, setContent] = useState<string>('');
  const abortControllerRef = useRef<AbortController | null>(null);
  const [hasNextChunk, setHasNextChunk] = useState(false);
  const [useLongContent, setUseLongContent] = useState(false);

  const handleStart = async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setContent('');
    setHasNextChunk(true);
    const c = useLongContent ? longContent : shortContent;

    // 模拟 fetch 返回的 SSE 流
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        for (let i = 0; i < c.length; i++) {
          if (abortController.signal.aborted) break;
          const char = c.at(i);
          // 模拟 SSE 格式: data: "char"\n\n
          const chunk = `data: ${JSON.stringify(char)}\n\n`;
          controller.enqueue(encoder.encode(chunk));
          await new Promise((resolve) => setTimeout(resolve, 5));
        }
        controller.close();
      },
    });

    const startTime = performance.now();
    try {
      console.log('started at ', startTime);
      const generator = SSEMessageGenerator(stream);
      for await (const message of generator) {
        console.log('message', message);
        if (abortController.signal.aborted) break;
        try {
          const char = JSON.parse(message);
          setContent((prev) => prev + char);
        } catch {
          // ignore
        }
      }
      console.log('cost time ', performance.now() - startTime);
    } finally {
      if (!abortController.signal.aborted) {
        setHasNextChunk(false);
      }
    }
  };

  const handleReset = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setContent('');
    setHasNextChunk(false);
  };

  return (
    <div className="">
      <div className="flex gap-4">
        <Button onClick={handleStart}>Start</Button>
        <Button onClick={handleReset}>Reset</Button>
        <Button variant={'secondary'} onClick={() => setUseLongContent(!useLongContent)}>
          Switch {useLongContent ? 'short' : 'long'}
        </Button>
      </div>
      <UnifiedMarkdown className="flex-1" content={content} hasNextChunk={hasNextChunk} />
    </div>
  );
}
