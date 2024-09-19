import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    try {
        const token = res.req.query.token;
        const file = res.req.query.file;
        if (token == "ATBBEn6X4jwjc2tDmDRM69eGTdzrB92DC01B") {
            const filePath = path.join(process.cwd(), 'json', `${file}`);
            const jsonData = fs.readFileSync(filePath, 'utf-8');
            const parsedData = JSON.parse(jsonData);
            res.status(200).json(parsedData);
        }
    } catch (e) { res.status(400).json({ message: 'Unable To Read' }); }
}