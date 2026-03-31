import { GET_TREE_CATEGORIES } from "@/graphql";
import MobileMenu from "./MobileMenu";
import { cachedGraphQLRequest } from "@utils/hooks/useCache";
import { TreeCategoriesResponse } from "@/types/theme/category-tree";
import CategoriesMenuItem from "./CategoriesMenuItem";

export async function CategoriesMenu() {
  const data = await cachedGraphQLRequest<TreeCategoriesResponse>(
    "category",
    GET_TREE_CATEGORIES,
    { parentId: 1 }
  );


  const categories = data?.treeCategories || [];

  const filteredCategories = categories
    .filter((cat: any) => cat.id !== "1")
    .map((cat: any) => {
      const translation = cat.translation;
      return {
        id: cat.id,
        name: translation?.name || "",
        slug: translation?.slug || "",
      };
    })
    .filter((item: any) => item.name && item.slug);

  const menuData = [
    { id: "all", name: "All", slug: "" },
    ...filteredCategories.slice(0, 3),
  ];

  return (
    <>
      <MobileMenu menu={menuData} />
      <ul className="hidden gap-4 text-sm md:items-center lg:flex xl:gap-6">
        {menuData.map(
          (item: { id: string; name: string; slug: string }) => (
            <CategoriesMenuItem key={item?.id + item?.name} name={item.name} slug={item.slug} />
          )
        )}
      </ul>
    </>
  );
}