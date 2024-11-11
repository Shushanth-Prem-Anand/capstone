import React, { useState } from 'react';
import { BlobServiceClient } from '@azure/storage-blob'; // Import Azure SDK

const DropZone = ({ onFileSelect, videoSrc }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files.length) {
            const file = e.dataTransfer.files[0];
            onFileSelect(file);
            uploadToAzure(file); // Upload the file to Azure
        }
    };

    const handleChange = (e) => {
        if (e.target.files.length) {
            const file = e.target.files[0];
            onFileSelect(file);
            uploadToAzure(file); // Upload the file to Azure
        }
    };

    const uploadToAzure = async (file) => {
        const sasToken = "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-08-28T16:12:41Z&st=2024-08-28T08:12:41Z&spr=https&sig=yH1sHY0r8o1EIL3XsWWE0oXlq2fFv%2BIOR54TJBTz4Po%3D"; // Replace with your SAS token
        const containerName = "dataset"; // Replace with your Blob Container name
        const storageAccountName = "artswim"; // Replace with your Storage Account name

        const blobServiceClient = new BlobServiceClient(`https://${storageAccountName}.blob.core.windows.net?${sasToken}`);
        const containerClient = blobServiceClient.getContainerClient(containerName);

        const blobClient = containerClient.getBlockBlobClient(file.name);
        try {
            const response = await blobClient.uploadData(file);
            console.log("Upload successful:", response);
        } catch (error) {
            console.error("Upload failed:", error.message);
        }
    };

    return (
        <div
            className={`drop-zone ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <input
                type="file"
                accept="video/*"
                onChange={handleChange}
                style={{ display: 'none' }}
                id="file-input"
            />
            <label htmlFor="file-input" className="drop-zone-label">
                {videoSrc ? (
                    <video controls>
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                ) : (
                    'Drop the video here or click to select a file'
                )}
            </label>
        </div>
    );
};

export default DropZone;
