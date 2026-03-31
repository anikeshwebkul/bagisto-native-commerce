import Navbar from "@components/layout/navbar";
import { ReactNode } from "react";
import { CategoriesMenu } from "@components/layout/navbar/CategoriesMenu";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <div className="block lg:hidden">
        <Navbar categories={<CategoriesMenu />} />
      </div>
      <main className="mx-auto min-h-[calc(100vh-580px)] w-full px-4 md:px-8 lg:px-16 xl:px-28 mb-10">
        {children}
      </main>
    </>
  );
}
