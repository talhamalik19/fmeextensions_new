import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    try {
        const token = res.req.query.token;
        const value = res.req.query.value;

        if (token === 'ATBBEn6X4jwjc2tDmDRM69eGTdzrB92DC01B') {
            const filePath = path.join(process.cwd(), 'json', 'trigger.json');
            
            // Convert value to boolean
            let booleanValue;
            if (value.toLowerCase() === 'true') {
                booleanValue = true;
            } else if (value.toLowerCase() === 'false') {
                booleanValue = false;
            } else {
                booleanValue = false; // Default value if the string is not 'true' or 'false'
            }

            const data = {
                "updateHome": booleanValue
            };

            fs.writeFile(filePath, JSON.stringify(data), (err) => {
                if (err) {
                    res.status(500).json({ message: 'Error writing JSON file' });
                } else {
                    res.status(200).json({ message: `Updated ${booleanValue}` });
                }
            });
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}
