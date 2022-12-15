import axios from "axios";



const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;


export async function uploadImage(image, id, folder){
    const data = new FormData();
    console.log({image, folder})
    data.append('file', image);
    data.append('upload_preset', uploadPreset);
    data.append('cloud_name', cloudName);
    data.append('folder', folder);
    data.append('public_id', id);

    try {
        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,data
        );
        return res.data.url;
    } catch (error) {
        console.log(error);
        
    }

} 

