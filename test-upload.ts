import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const testUpload = async () => {
  try {
    const imagePath = 'C:\\Users\\User\\.gemini\\antigravity-ide\\brain\\e2dfbe24-9b72-4b92-92d8-78a7147fffc5\\sample_product_1783271160488.png';
    
    // Generate a valid token
    const token = jwt.sign(
      { id: '123456789012345678901234', role: 'admin' },
      process.env.JWT_ACCESS_SECRET as string,
      { expiresIn: '1h' }
    );

    const formData = new FormData();
    formData.append('name', 'Test Coffee Mug');
    formData.append('sku', `MUG-${Date.now()}`);
    formData.append('category', 'Kitchen');
    formData.append('purchasePrice', '10.50');
    formData.append('sellingPrice', '25.00');
    formData.append('stockQuantity', '100');
    
    // Append the image file
    formData.append('image', fs.createReadStream(imagePath));

    console.log('Sending request to POST /api/products...');
    const response = await axios.post('http://localhost:5000/api/products', formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Upload Successful!');
    console.log(response.data);
  } catch (error: any) {
    console.error('Upload Failed!');
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }
};

testUpload();
