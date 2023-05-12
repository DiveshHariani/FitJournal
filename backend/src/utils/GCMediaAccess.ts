import { Storage } from '@google-cloud/storage';

const storage: Storage = new Storage({
    keyFilename: `../../${process.env.GCP_CLOUD_STORAGE_FN}`
})

const bucketName = 'fit-journal-image';
const bucket = storage.bucket(bucketName);

bucket.upload(
    '../../twitter-icon.png',
    {
        destination: 'twitter-icon.png'
    },
    (err, file) => {
        if(err) {
            console.log(`Error found ${err.message}`);
        } else if(file) {
            console.log(`Image uploaded ${file} ${file?.publicUrl()}`);
            
        }
    }
)