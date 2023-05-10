"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("@google-cloud/storage");
const storage = new storage_1.Storage({
    keyFilename: `../../${process.env.GCP_CLOUD_STORAGE_FN}`
});
const bucketName = 'fit-journal-image';
const bucket = storage.bucket(bucketName);
bucket.upload('../../twitter-icon.png', {
    destination: 'twitter-icon.png'
}, (err, file) => {
    if (err) {
        console.log(`Error found ${err.message}`);
    }
    else if (file) {
        console.log(`Image uploaded ${file} ${file === null || file === void 0 ? void 0 : file.publicUrl()}`);
    }
});
