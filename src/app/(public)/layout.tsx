import { ReactNode } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { getThemeCustomization } from "@/utils/bagisto";
import { FACEBOOK_LINK, INSTAGRAM_LINK, TWITTER_LINK } from "@utils/constants";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const menu = await getThemeCustomization();
  const { COMPANY_NAME, SITE_NAME } = process.env;
  const copyrightName = COMPANY_NAME || SITE_NAME || "";
  const socialLinks = {
    facebook: FACEBOOK_LINK,
    instagram: INSTAGRAM_LINK,
    twitter: TWITTER_LINK,
  };

  return (
    <main>
      <Navbar />
      <div className="mx-auto min-h-[calc(100vh-580px)] w-full">
        {children}
      </div>
      <Footer menu={menu} copyrightName={copyrightName} socialLinks={socialLinks} />
    </main>
  );
}
