

export const fileUpload = async (file) => {
  if (!file) throw new Error('No file to upload');

  const cloudUrl = 'https://api.cloudinary.com/v1_1/doilfq77p/upload';

  const formData = new FormData();
  formData.append('upload_preset', 'react-journal');
  formData.append('file', file);

  try {

    const response = await fetch(cloudUrl, {
      method: 'POST',
      body: formData
    });

    console.log(response);
    if (!response.ok) throw new Error('Problem to upload image');

    const cloudResponse = await response.json();
    console.log({cloudResponse});

    return cloudResponse.secure_url;

  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}