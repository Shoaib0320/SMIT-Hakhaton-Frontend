import CryptoJS from "crypto-js"; // Import the crypto-js library

export async function uploadCourseImage(file) {
  // const cloudName = import.meta.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  // const apiKey = import.meta.env.REACT_APP_CLOUDINARY_API_KEY;
  // const apiSecret = import.meta.env.REACT_APP_CLOUDINARY_API_SECRET;

  const cloudName = 'duvdqnoht'
  const apiKey = '538347923483567';
  const apiSecret = '7TQyo_k4m7_boBRTT8viSXuLix0'

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = generateSignature(timestamp, apiSecret);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);

  console.log(formData); // Log the formData to ensure it's set correctly

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  return response.ok ? data.secure_url : null;
}

const generateSignature = (timestamp, apiSecret) => {
  return CryptoJS.SHA256(`timestamp=${timestamp}${apiSecret}`).toString(CryptoJS.enc.Hex);
};

