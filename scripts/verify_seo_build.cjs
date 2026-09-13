const fs = require('fs');

// 1. Verify sitemap.xml
const sitemap = fs.readFileSync('.next/server/app/sitemap.xml.body', 'utf8');
const hasLlms = sitemap.includes('https://www.msns.edu.pk/llms.txt');
const hasLlmsFull = sitemap.includes('https://www.msns.edu.pk/llms-full.txt');
const count = (sitemap.match(/<loc>/g) || []).length;
console.log(`[Sitemap] Total URLs: ${count} | llms.txt: ${hasLlms} | llms-full.txt: ${hasLlmsFull}`);

// 2. Verify JSON-LD in HTML files
const pages = ['downloads.html', 'resources.html', 'wazirabad.html', 'ghakhar.html', 'index.html'];
for (const p of pages) {
  const filePath = '.next/server/app/' + p;
  if (!fs.existsSync(filePath)) {
    console.log(`[HTML] ${p} not found`);
    continue;
  }
  const html = fs.readFileSync(filePath, 'utf8');
  const matches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  console.log(`[HTML] ${p} -> JSON-LD scripts: ${matches.length}`);
  matches.forEach((m, idx) => {
    try {
      const parsed = JSON.parse(m[1]);
      const desc = parsed['@graph']
        ? `Graph with ${parsed['@graph'].length} nodes: [${parsed['@graph'].map(n => n['@type']).slice(0, 5).join(', ')}...]`
        : `Single entity: ${JSON.stringify(parsed['@type'])}`;
      console.log(`   └─ Script #${idx + 1}: ${desc}`);
    } catch (err) {
      console.error(`   └─ Script #${idx + 1} PARSE ERROR: ${err.message}`);
    }
  });

  // Verify llms.txt discovery link in head
  const hasLlmLink = html.includes('href="/llms.txt"');
  const hasLlmFullLink = html.includes('href="/llms-full.txt"');
  console.log(`   └─ Discovery Links: /llms.txt (${hasLlmLink}), /llms-full.txt (${hasLlmFullLink})`);
}

// 3. Verify robots.txt
const robots = fs.readFileSync('public/robots.txt', 'utf8');
const hasAiTrainYes = robots.includes('ai-train=yes');
const hasGptBot = robots.includes('User-agent: GPTBot');
const hasPerplexity = robots.includes('User-agent: PerplexityBot');
const hasClaude = robots.includes('User-agent: ClaudeBot');
console.log(`[robots.txt] ai-train=yes: ${hasAiTrainYes} | GPTBot: ${hasGptBot} | Perplexity: ${hasPerplexity} | Claude: ${hasClaude}`);

// 4. Verify llms.txt and llms-full.txt line counts and formatting
const llmsTxt = fs.readFileSync('public/llms.txt', 'utf8');
const llmsFullTxt = fs.readFileSync('public/llms-full.txt', 'utf8');
console.log(`[llms.txt] Lines: ${llmsTxt.split('\n').length} | Characters: ${llmsTxt.length}`);
console.log(`[llms-full.txt] Lines: ${llmsFullTxt.split('\n').length} | Characters: ${llmsFullTxt.length}`);
