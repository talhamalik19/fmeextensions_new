import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    try {
        const token = res.req.query.token;
        const file = res.req.query.file;
        const action = res.req.query.action;

        if (token !== "ATBBEn6X4jwjc2tDmDRM69eGTdzrB92DC01B") {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const filePath = path.join(process.cwd(), 'json', `${file}`);

        if (action === 'delete') {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                return res.status(200).json({ message: 'File deleted successfully' });
            } else {
                return res.status(404).json({ message: 'File not found' });
            }
        } else if (action === 'deleteall') {
            if (!fs.existsSync(filePath)) {
                return res.status(404).json({ message: 'Folder not found' });
            }

            const files = fs.readdirSync(filePath);

            files.forEach(file => {
                if (file != '.gitignore') {
                    const filePathToDelete = path.join(filePath, file);
                    fs.unlinkSync(filePathToDelete);
                }
            });

            return res.status(200).json({ message: 'All files deleted successfully' });
        }

        const jsonData = fs.readFileSync(filePath, 'utf-8');
        const parsedData = JSON.parse(jsonData);
        res.status(200).json(parsedData);

    } catch (e) {
        res.status(400).json({ message: 'Unable To Read or Delete', error: e.message });
    }
}
