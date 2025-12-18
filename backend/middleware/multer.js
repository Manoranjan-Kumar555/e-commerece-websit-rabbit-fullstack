import multer from "multer";

const storage = multer.memoryStorage();

// single uplaod

export const singleUplaod = multer({storage}).single("file")

// Multiple uplaod upto 5 images

export const multipleUplaod = multer({storage}).array("files", 5);