const getPublicIdFromUrl = (url) => {
    const [folder, id] = url.split("/").slice(-2);
    const publicId = folder + "/" + id.split(".")[0];
    return publicId;
}

const deleteUploadedFile = async(url) => {
    const publicId = getPublicIdFromUrl(url);
    try {
        await cloudinary.uploader.destroy(publicId);
        console.info(`${url} was deleted`);
        return true;
    } catch (error) {
        console.error("Error while deleting file: ", error);
        return false;
    }
}

module.exports = {
    deleteUploadedFile,
  };