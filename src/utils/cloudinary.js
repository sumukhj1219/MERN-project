import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET  
});

const uploadToCloud = async (localFileUrl)=>{
    try {
		if(!localFileUrl) return null
		const response = await cloudinary.uploader.upload(localFileUrl,{
			resource_type: "auto"
		})
        console.log("File uploaded successfully",response.url)
		return response;
	} catch (error) {
		fs.unlinkSync(localFileUrl)
		return null;
	}
}
export {uploadToCloud}