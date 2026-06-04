import { webdev, web3, blog } from '@/lib/source';
import { getLLMText } from '@/lib/get-llm-text';

// cached forever
export const revalidate = false;

export async function GET() {
  const scan = [...webdev.getPages(), ...web3.getPages(), ...blog.getPages()].map(getLLMText);
  const scanned = await Promise.all(scan);

  return new Response(scanned.join('\n\n'));
}