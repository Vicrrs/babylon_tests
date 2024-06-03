import fs from 'fs';
import path from 'path';
import formidable from 'formidable';
import AdmZip from 'adm-zip';

export const config = {
    api: {
        bodyParser: false,
    },
};

const uploadDir = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const form = new formidable.IncomingForm({
            uploadDir,
            keepExtensions: true,
        });

        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const { file } = files;
            const zipFilePath = file.path;

            const zip = new AdmZip(zipFilePath);
            const zipEntries = zip.getEntries();

            const zipDirName = path.basename(zipFilePath, path.extname(zipFilePath));
            const extractionDir = path.join(uploadDir, zipDirName);
            fs.mkdirSync(extractionDir);

            zipEntries.forEach((zipEntry) => {
                const entryName = zipEntry.entryName;
                const entryPath = path.join(extractionDir, entryName);
                if (!zipEntry.isDirectory) {
                    zip.extractEntryTo(zipEntry, extractionDir, false, true);
                }
            });

            res.status(200).json({ message: 'Files extracted successfully!', extractedDir: zipDirName });
        });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

export default handler;
