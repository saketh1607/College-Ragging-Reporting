import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { uploadToCloudinary } from '../utils/cloudinary';

export const createReport = async (reportData, files) => {
  try {
    // Upload images to Cloudinary
    const imageUrls = await Promise.all(
      files.map(file => uploadToCloudinary(file))
    );

    // Create the report document in Firebase
    const reportRef = await addDoc(collection(db, 'reports'), {
      ...reportData,
      imageUrls, // Store Cloudinary URLs
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return reportRef.id;
  } catch (error) {
    console.error('Error creating report:', error);
    throw new Error('Failed to create report. Please try again.');
  }
}; 