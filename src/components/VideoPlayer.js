import React from 'react';

function VideoPlayer({ videoSrc }) {
    return (
        <div className="video-container">
            {videoSrc && (
                <video controls>
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
    );
}

export default VideoPlayer;
