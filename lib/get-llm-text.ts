export async function getLLMText(page: {
  url: string;
  data: {
    title: string;
    getText: (format: 'processed') => Promise<string> | string;
  };
}) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})

${processed}`;
}