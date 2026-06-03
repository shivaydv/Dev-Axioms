import { web3,webdev } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const { GET } = createFromSource([web3,webdev] as any);
