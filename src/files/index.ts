import * as fs from 'fs';
const fileType = require('file-type');

interface IFile {
  mimetype: string;
  uri: string;
}
export class FileFormat {
  /**
   * Convert file type to Base64
   *
   * @param file
   */
  public static async fileToBase64(file: any) {
    return file.buffer.toString('base64');
  }

  /**
   * Create image file from base64
   *
   * @param base64
   * @param path
   * @param filename
   */
  public static base64ToFile(base64: string, path: string, filename: string): IFile {
    const base64Data = base64.replace(/^data:image\/png;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');
    const mimeInfo = fileType(imageBuffer);
    const imageName = `${filename}_${Date.now()}.${mimeInfo.ext}`;

    fs.writeFile(`${path}${imageName}`, imageBuffer, { encoding: 'base64' }, err => {
      if (err) throw { err };
    });

    const newFile: IFile = {
      mimetype: mimeInfo.mime,
      uri: imageName,
    };

    return newFile;
  }
}
