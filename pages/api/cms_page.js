import { fetchPageData } from "@/lib/cms-page";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const currency_code = req.headers['content-currency'];
    const store_code = req.headers['store'];
    const identifier = req.headers['identifier'];

    try {
      const pageData = await fetchPageData(currency_code, store_code, identifier);
      res.status(200).json(pageData);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
