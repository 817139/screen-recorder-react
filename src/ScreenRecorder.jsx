import React, { useState, useRef } from 'react';
import './ScreenRecorder.css';

const ScreenRecorder = () => {
    const [recording, setRecording] = useState(false);
    const mediaRecorder = useRef(null);
    const chunks = useRef([]);

    const toggleRecording = () => {
        setRecording(!recording);
        if (!recording) {
            startRecording();
        } else {
            stopRecording();
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({ video: { mediaSource: 'video' }, audio: true });
            mediaRecorder.current = new MediaRecorder(stream, { mimeType: 'video/webm' });

            mediaRecorder.current.ondataavailable = (e) => {
                if (e.data.size) {
                    chunks.current.push(e.data);
                }
            };

            mediaRecorder.current.onstop = () => {
                const blob = new Blob(chunks.current, { type: 'video/webm' });
                chunks.current = [];
                const dataDownloadUrl = URL.createObjectURL(blob);

                const a = document.createElement('a');
                a.href = dataDownloadUrl;
                a.download = 'recording.webm';
                a.click();
                URL.revokeObjectURL(dataDownloadUrl);
            };

            mediaRecorder.current.start(250);
        } catch (err) {
            console.error('Error starting recording: ', err);
        }
    };

    const stopRecording = () => {
        mediaRecorder.current.stop();
    };

    return (
        <div className="container">
            <h1>SCREEN RECORDER</h1>
            <button onClick={toggleRecording}>
                {recording ? 'Stop Recording' : 'Start Recording'}
            </button>
        </div>
    );
};

export default ScreenRecorder;
