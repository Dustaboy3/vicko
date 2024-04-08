"use client"

import dynamic from "next/dynamic";
import RootLayout from "../layout";

const AIContent = dynamic(() => import("../../../components/AI/index"), {
    ssr: false,
});

const AI = () => {
    return (
        <RootLayout>
            <AIContent />
        </RootLayout>
    );
};

export default AI;
