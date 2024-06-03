import AdmZip from 'adm-zip';

async function extractFromZip(zipFilePath) {
    const zip = new AdmZip(zipFilePath);
    const zipEntries = zip.getEntries();

    const zipDirName = path.basename(zipFilePath, path.extname(zipFilePath));
    const extractionDir = path.join(uploadDir, zipDirName);
    fs.mkdirSync(extractionDir);

    zipEntries.forEach((zipEntry) => {
        // const entryName = zipEntry.entryName;
        // const entryPath = path.join(extractionDir, entryName);
        if (!zipEntry.isDirectory) {
            zip.extractEntryTo(zipEntry, extractionDir, false, true);
        }
    });
}

export default extractFromZip;