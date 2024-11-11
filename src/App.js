import React, { useState } from 'react';
import DropZone from './components/DropZone';
import './App.css';
import { BlobServiceClient } from '@azure/storage-blob';

function App() {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [performer, setPerformer] = useState('');
    const [videoFile, setVideoFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!videoFile) {
            alert("Please upload a video file.");
            return;
        }

        // Log the form data (for debugging purposes)
        console.log({ name, date, performer, videoFile });

        // Proceed to upload the video to Azure
        try {
            await uploadFileToAzure(videoFile);
            alert("Form submitted and video uploaded successfully!");
        } catch (error) {
            console.error("Error during submission:", error);
            alert("Failed to submit form and upload video.");
        }
    };

    const handleVideoUpload = (file) => {
        setVideoFile(file);
    };

    const uploadFileToAzure = async (file) => {
        const sasUrl = "https://<your-storage-account>.blob.core.windows.net?<your-sas-token>";
        const containerName = "your-container-name";
        
        const blobServiceClient = new BlobServiceClient(sasUrl);
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blobClient = containerClient.getBlobClient(file.name);

        console.log("Uploading to Azure...");
        
        try {
            const response = await blobClient.uploadBrowserData(file);
            console.log("Upload successful:", response);
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error; // Re-throw error to be caught in handleSubmit
        }
    };

    return (
        <div className="container">
            <div className="left-box">
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name"
                        required
                    />

                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />

                    <label>Performer:</label>
                    <input
                        type="text"
                        value={performer}
                        onChange={(e) => setPerformer(e.target.value)}
                        placeholder="Enter performer name"
                        required
                    />

                    <input type="submit" value="Submit" className="submit-button" />
                </form>
            </div>

            <div className="right-box">
                <div className="header">Upload Your Video here:</div>
                <DropZone onFileSelect={handleVideoUpload} videoSrc={videoFile ? URL.createObjectURL(videoFile) : null} />
            </div>
        </div>
    );
}

export default App;
