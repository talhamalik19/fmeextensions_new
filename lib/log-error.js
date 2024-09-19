const fs = require('fs');
const path = require('path');

export async function LogErrorInStrapi(content, note, author) {
    try {
        const filePathPage = path.join(process.cwd(), 'json/global', `logs.json`);
        fs.appendFile(filePathPage, `${JSON.stringify({ error_code: note, error: content, author:author })}\n`, (err) => {
            if (err) {
              console.error('Error writing error JSON file:', err);
            } else {
              console.log('error Data Saved');
            }
          });
    } catch (error) {
    }
}
