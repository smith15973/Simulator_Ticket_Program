const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'SWR_Ticketing_System',
        allowedFormats: ['.png', '.jpg', '.jpeg', '.gif', '.sch', '.tis', '.evt', '.csv', '.html', '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.txt'],
    }
});

module.exports = {
    cloudinary,
    storage
};