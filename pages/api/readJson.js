import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    try {
        const token = res.req.query.token;
        const file = res.req.query.file;
        if (token == process.env.NEXT_PUBLIC_URL) {
            const filePath = path.join(process.cwd(), 'json', `${file}`);
            const jsonData = fs.readFileSync(filePath, 'utf-8');
            const parsedData = JSON.parse(jsonData);
            res.status(200).json(parsedData);
        }
    } catch (e) { res.status(400).json({ message: 'Unable To Read' }); }
}