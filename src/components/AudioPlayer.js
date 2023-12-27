import React from 'react'
import ReactAudioPlayer from 'react-audio-player';

function AudioPlayer({ url }) {
    return (
        <div style={{ position: "fixed", bottom: "0", width: "100%" }}>
            <ReactAudioPlayer
                src={url}
                autoPlay
                controls
            />
        </div>
    )
}

export default AudioPlayer