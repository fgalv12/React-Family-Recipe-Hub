export const handleImageUpload = (existingImage, imageFile) => {
    if (imageFile) {
      return URL.createObjectURL(imageFile);
    }
    return existingImage;
  };
  