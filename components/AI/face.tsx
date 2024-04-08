import React from "react";
import Script from "next/script";

interface CustomImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    "rel:animated_src": string;
    "rel:auto_play": string;
}

const Face: React.FC = () => {
    const imgProps: CustomImgProps = {
        src: "https://i.imgur.com/ork8hoP.gif",
        "rel:animated_src": "https://i.imgur.com/ork8hoP.gif",
        "rel:auto_play": "0"
    };

    return (
        <>
            <center>
                <div id="imagecontainer">
                    <img
                        id="exampleimg"
                        {...imgProps}
                    />
                </div>
            </center>
        </>
    );
};

export default Face;
