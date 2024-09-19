import { fetchSlugData } from "@/lib/verify-slug";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const currency_code = req.headers['content-currency'];
    const store = req.headers['store'];
    const store_code = store.split('__')[0];
    const identifier = store.split('__')[1];

    let update = false;
    if(store.split('__')[2] == 'true'){
      update = true;
    }

    try {
      const pageData = await fetchSlugData(currency_code, store_code, identifier, update);
      res.status(200).json(pageData);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
