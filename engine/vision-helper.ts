/**
 * Vision API helper — called by bridge-server via Bun subprocess
 * Usage: bun vision-helper.ts <json-file-path>
 * Input JSON: { endpoint, apiKey, body }
 * Output: SSE lines to stdout
 */
const args = process.argv.slice(2);
const inputPath = args[0];
if (!inputPath) { console.error('Usage: bun vision-helper.ts <json-path>'); process.exit(1); }

const fs = await import('fs');
const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

try {
    const response = await fetch(input.endpoint, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'x-api-key': input.apiKey,
            'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify(input.body),
    });

    if (!response.ok) {
        const errText = await response.text().catch(() => '');
        console.log(JSON.stringify({ type: 'error', error: `API Error ${response.status}: ${errText.slice(0, 300)}` }));
        process.exit(1);
    }

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let buf = '';

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split('\n');
        buf = lines.pop() || '';
        for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const data = line.slice(6).trim();
            if (data === '[DONE]') continue;
            // Forward raw SSE event as JSON line
            console.log(data);
        }
    }
    console.log(JSON.stringify({ type: 'done' }));
} catch (err: any) {
    console.log(JSON.stringify({ type: 'error', error: err.message || 'fetch failed' }));
    process.exit(1);
}
