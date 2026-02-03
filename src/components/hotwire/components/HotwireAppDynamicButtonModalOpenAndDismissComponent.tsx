'use client';
import dynamic from 'next/dynamic';

const DynamicButton = dynamic(
    () => import('@bagisto-native/react').then(mod => mod.DynamicButton),
    { ssr: false }
);

export default function HotwireAppDynamicButtonModalOpenAndDismissComponent() {
    return (
        <>
            {/* Cart Modal Open Event */}
            <DynamicButton
                modalOpenEvent={true}
                style={{ display: 'none' }}
            >
            </DynamicButton>

            {/* Cart Modal Close Event */}
            <DynamicButton
                modalDismissEvent={true}
                style={{ display: 'none' }}
            >
            </DynamicButton>
        </>
    );
}
