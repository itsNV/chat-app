import cloudinary from "cloudinary";

export const fileUploadToCloudinary = async (file,folder) => {
    
   

        const options = {
            folder,
            
        }
    
    options.resource_type = 'auto'

        return await cloudinary.uploader.upload(file,options)
        
   
}