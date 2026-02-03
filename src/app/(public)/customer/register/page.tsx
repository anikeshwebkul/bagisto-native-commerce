import RegistrationForm from "@components/customer/RegistrationForm";
import { generateMetadataForPage } from "@utils/helper";
import { staticSeo } from "@utils/metadata";
import HotwireAppDynamicButtonComponent from "@components/hotwire/components/HotwireAppDynamicButtonComponent";

export const revalidate = 60;

export async function generateMetadata() {
  return generateMetadataForPage("", staticSeo.register);
}

export default async function Register() {
  return <>
    <RegistrationForm />
    <HotwireAppDynamicButtonComponent dataPageType="empty" />
  </>;
}
