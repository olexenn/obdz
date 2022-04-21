import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";

export class FileService {
  /**
   * Function to download Files
   * @param file
   * @returns unique file path
   */
  createFile(file: Express.Multer.File): string {
    const fileExtension = file.originalname.split(".").pop();
    const fileName = uuid.v4() + "." + fileExtension;
    const filePath = path.resolve(__dirname, "..", "static", "pfp");

    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }
    fs.writeFileSync(path.join(filePath, fileName), file.buffer);
    return fileName;
  }
}
