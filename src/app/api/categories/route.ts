import { GET_TREE_CATEGORIES } from "@/graphql";
import { bagistoFetch } from "@/utils/bagisto";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const variables = {
            parentId: body.parentId ?? 1,
        };

        const response = await bagistoFetch<any>({
            query: GET_TREE_CATEGORIES,
            variables: variables,
            cache: "no-store",
        });

        return Response.json({
            data: { ...response?.body?.data },
        });
    } catch (error) {
        return Response.json(
            {
                message: "Error querying the GraphQL API",
                error: error instanceof Error ? error.message : error,
            },
            { status: 500 }
        );
    }
}
