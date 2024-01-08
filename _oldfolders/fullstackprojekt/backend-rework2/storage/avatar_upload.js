import multer from "multer";
import { nanoid } from "nanoid";
import fs from "fs";
import { db } from "../db/db.js";

export function multerAvatarUpload() {
  const userImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      const userImagesPath = "uploads/user_images/";
      fs.mkdirSync(userImagesPath, { recursive: true });
      cb(null, userImagesPath);
      insertDBAvatar(req);
    },
    filename: (req, file, cb) => {
      const originalFileName = file.originalname;
      const extension = originalFileName.split(".").pop();

      const fileName = "avatar_" + nanoid() + "." + extension;
      cb(null, fileName);
    },
  });
  return multer({ storage: userImageStorage });
}

export function insertDBAvatar(req) {
  const uploadsID = nanoid();
  const user_image = 1;

  db.serialize(() => {
    const stmt = db.prepare(
      "INSERT INTO uploads (id, filename, path, user_image, created_at) VALUES (?, ?, ?, ?, ?)"
    );
    stmt.run(
      uploadsID,
      req.file.filename,
      req.file.path,
      user_image,
      Date.now(),
      (err) => {
        if (err) {
          console.error(err);
          return false;
        } else {
          const uploadId = stmt.lastID;
          console.log("Image inserted with ID:", uploadsID);
        }
      }
    );

    const stmt2 = db.prepare("UPDATE user SET image_id = ? WHERE id = ? ");
    stmt2.run(uploadsID, (err) => {
      if (err) {
        console.error(err);
        return false;
      } else {
        const uploadId = stmt2.lastID;
        console.log("Image inserted with ID:", uploadsID);
      }
    });
  });
}

