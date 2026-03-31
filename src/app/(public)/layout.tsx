import { ReactNode } from "react";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { getThemeCustomization } from "@/utils/bagisto";
import { CategoriesMenu } from "@/components/layout/navbar/CategoriesMenu";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const menuData = await getThemeCustomization();
  const { COMPANY_NAME, SITE_NAME } = process.env;

  return (
    <main>
      <Navbar categories={<CategoriesMenu />} />
      <div className="mx-auto min-h-[calc(100vh-580px)] w-full mb-10">
        {children}
      </div>
      <Footer
        menu={menuData}
        companyName={COMPANY_NAME}
        siteName={SITE_NAME}
      />
    </main>
  );
}
