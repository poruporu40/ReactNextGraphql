import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const uploadDir = path.join(process.cwd(), process.env.PUBLIC_PATH, process.env.NEXT_PUBLIC_AVATAR_PATH);
  const form = formidable({
    uploadDir,
    keepExtensions: true,
  });

  // アップロードディレクトリが存在しない場合は作成
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error parsing the files:', err);
      res.status(500).json({ error: 'Failed to upload image' });
      return;
    }

    console.log('Parsed files:', files); // ファイルの内容をログに出力

    const fileArray = files.avatar;
    const file = Array.isArray(fileArray) ? fileArray[0] : fileArray;

    if (file && fs.existsSync(file.filepath)) {
      const fileName = file.newFilename || file.originalFilename;
      const filePath = path.join(uploadDir, fileName);
      try {
        fs.renameSync(file.filepath, filePath);

        // ファイル名だけを返す
        res.status(200).json({ fileName });
      } catch (renameError) {
        console.error('Error moving the file:', renameError);
        res.status(500).json({ error: 'Failed to move uploaded file' });
      }
    } else {
      console.error('No file uploaded or file not found');
      res.status(400).json({ error: 'No file uploaded or file not found' });
    }
  });
} 