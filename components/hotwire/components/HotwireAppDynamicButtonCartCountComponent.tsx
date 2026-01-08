'use client';
import dynamic from 'next/dynamic';

const DynamicButton = dynamic(
  () => import('@bagisto-native/react').then(mod => mod.DynamicButton),
  { ssr: false }
);

export default function HotwireAppDynamicButtonCartCountComponent() {
  return (
    <>
    {/* Cart Count */}
    <DynamicButton
      cartCountEvent={true}
      style={{ display: 'none' }}
    >
    </DynamicButton>
    </>
  );
}
