import { LogErrorInStrapi } from "@/lib/log-error";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const content = req.headers['content'];
        const note = req.headers['note'];
        const author = req.headers['author'];

        try {
            const pageData = await LogErrorInStrapi(content, note, author);
            res.status(200).json(pageData);
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
