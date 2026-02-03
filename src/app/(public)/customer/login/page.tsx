import LoginForm from "@components/customer/LoginForm";
import { generateMetadataForPage } from "@utils/helper";
import { staticSeo } from "@utils/metadata";
import HotwireAppDynamicButtonComponent from "@components/hotwire/components/HotwireAppDynamicButtonComponent";

export const revalidate = 60;

export async function generateMetadata() {
  return generateMetadataForPage("", staticSeo.login);
}


export default async function LoginPage() {
  return <>
    <LoginForm />
    <HotwireAppDynamicButtonComponent dataPageType="empty" />
  </>;
}
