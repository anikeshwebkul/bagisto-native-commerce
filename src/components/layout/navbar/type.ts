export interface NavbarResponse {
  categories: {
    edges: {
      node: {
        translation: {
          id: string;
          name: string;
          slug: string;
        };
      };
    }[];
  };
}

export type ActiveTabType = "home" | "category" | "cart" | "account" | null;