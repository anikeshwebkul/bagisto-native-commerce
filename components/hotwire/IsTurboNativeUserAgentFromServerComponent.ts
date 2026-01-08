import { headers } from 'next/headers';
import { isTurboNativeUserAgent } from "@bagisto-native/core";

export default async function IsTurboNativeUserAgentFromServerComponent() {
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || 'unknown';
    const isTurboNativeUserAgentDetected = isTurboNativeUserAgent(userAgent);
    return isTurboNativeUserAgentDetected;
}