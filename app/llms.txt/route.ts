import { webdev, web3, blog } from '@/lib/source';
import { llms } from 'fumadocs-core/source';

// cached forever
export const revalidate = false;

export function GET() {
  const webdevIndex = llms(webdev as any).index();
  const web3Index = llms(web3 as any).index();
  const blogIndex = llms(blog as any).index();

  const combined = [
    '# Dev Axioms',
    '',
    '> Tech learning, interview preparation, and skill development focusing on the fundamentals of software development.',
    '',
    '## Web Development',
    webdevIndex.replace(/^# Docs\n+/g, ''),
    '',
    '## Web3',
    web3Index.replace(/^# Docs\n+/g, ''),
    '',
    '## Blog',
    blogIndex.replace(/^# Docs\n+/g, ''),
  ].join('\n');

  return new Response(combined, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}