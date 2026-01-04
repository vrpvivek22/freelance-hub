import uploadToCloudinary from "../../helpers/cloudinaryHelper.js";
import clientImage from "../../models/client-model/client-image.js";

export const uploadClientImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required. Please upload an image",
      });
    }

    const { url, publicId } = await uploadToCloudinary(req.file.path);

    const newlyUploadedImage = new clientImage({
      url,
      publicId,
      uploadedBy: req.user.userId,
      role: "client",
    });

    await newlyUploadedImage.save();

    res.status(200).json({
      success: true,
      message: "ClientImage uploaded successfully",
      image: newlyUploadedImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};
