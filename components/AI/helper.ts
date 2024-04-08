"use client";
import spoken from "spoken/build/spoken"

export const listen = (setTranscript: any) => {
    if (typeof window !== "undefined" && ('webkitSpeechRecognition' in window)) {
        const SpeechRecognition: any = window['webkitSpeechRecognition'];
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = event => {
            const transcript = event.results[0][0].transcript;
            setTranscript(transcript)
        };

        recognition.onerror = event => {
            console.error("Speech recognition error:", event.error);
        };

        recognition.start();
    }
}
