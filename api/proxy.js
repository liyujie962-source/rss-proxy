export default async function handler(req, res) {
  const target = req.query.url;
  if (!target) return res.status(400).send('missing url');
  try {
    const r = await fetch(decodeURIComponent(target), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });
    const text = await r.text();
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(text);
  } catch(e) {
    res.status(500).send('error: ' + e.message);
  }
}
