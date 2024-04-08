"use client";

import { Metadata } from "next";
import { listen } from "./helper";
import { useEffect, useState } from "react";
import Face from "./face";
import ScriptJS from 'scriptjs';
const axios = require('axios');

export const metadata: Metadata = {
    title: "AI - to the moon",
    description: ""
}

const loadScript = (src) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = () => {
            reject(new Error(`Failed to load script: ${src}`));
        };
        document.head.appendChild(script);
    });
};

const AIContent = () => {
    const [transcript, setTranscript] = useState<string>("");
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const data = {
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.7,
    };

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
    };

    useEffect(() => {
        const scripts = document.head.getElementsByTagName('script');
        const scriptUrls = Array.from(scripts).map((script) => script.src);
        const baseUrl = window.location.origin;
        const creoScriptUrl = `${baseUrl}/creo.js`;
        const usageScriptUrl = `${baseUrl}/usage.js`;

        if (!scriptUrls?.includes(creoScriptUrl)) {
            loadScript('/creo.js')
                .then(() => {
                    if (!scriptUrls?.includes(usageScriptUrl)) {
                        return loadScript('/usage.js');
                    }
                })
                .catch((error) => {
                    console.error('Error loading scripts:', error);
                });
        } else if (!scriptUrls?.includes(usageScriptUrl)) {
            loadScript('/usage.js')
                .catch((error) => {
                    console.error('Error loading scripts:', error);
                });
        }
    }, []);


    useEffect(() => {
        if (transcript) {
            setLoading(true);
            const newMessages = [
                ...messages,
                { role: 'user', content: transcript + "in 2-3 sentences do not use numbers" }
            ];
            axios.post('https://api.openai.com/v1/chat/completions', { ...data, messages: newMessages }, { headers })
                .then(response => {
                    setLoading(false);
                    const assistantMessage = (response?.data?.choices[0]?.message?.content);
                    setMessages([...newMessages, { role: 'assistant', content: assistantMessage }]);
                    ScriptJS('/usage.js', () => {
                        const fn = (window as any)?.playsyncronized;
                        if (typeof fn === 'function') {
                            fn(response?.data?.choices[0]?.message?.content);
                        } else {
                            console.error('playsyncronized is not a function or is not defined in the loaded script.');
                        }
                    });
                })
                .catch(error => {
                    console.error('Error:', error.response ? error.response.data : error.message);
                    setLoading(false);
                });
        }
    }, [transcript]);

    return (
        <>
            {typeof window !== "undefined" && (
                <section className="pt-32.5 lg:pt-45 xl:pt-50 pb-12.5 lg:pb-25 xl:pb-30">
                    <Face />

                    <div className="flex justify-center">
                        {loading ? <p>Loading AI response..</p> : <p></p>}
                    </div>
                    <div className="flex justify-center">
                        <button className="m-8 bg-primary hover:bg-primaryho ease-in-out duration-300 text-white text-regular rounded-full py-2.5 px-7.5" onClick={() => listen(setTranscript)}>Listen</button>
                        {/* <button className="m-8 bg-primary hover:bg-primaryho ease-in-out duration-300 text-white text-regular rounded-full py-2.5 px-7.5" onClick={() => stop()}>Stop</button> */}
                    </div>
                </section>
            )}
        </>
    );
};

export default AIContent;
