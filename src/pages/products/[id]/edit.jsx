import Layout from "@/components/layout";
import Form from "@/components/form";
import { useUpdateProduct } from "@/services/client.services";
import { useRouter } from "next/router";
import { withSessionSsr } from "@/utils/session";
import { getProduct } from "@/services/server.services";

export default function EditProduct({ product, loggedUser }) {
    const router = useRouter();
    // const { data:product, isLoading } = useGetProduct(router.query.id);
    return (
        <Layout loggedUser={ loggedUser }>
            <h2>Edit Product</h2>
            <Form
                name="Update"
                service={() => useUpdateProduct(product.id)}
                onSuccess={() => router.push(`/products/${product.id}`)}
                fields={{
                    title: "text",
                    price: "number",
                    description: "text"
                }}
                values={product}
            />
        </Layout>
    );
};

export const getServerSideProps = withSessionSsr(
    async ({ req, query }) => {
        const [product] = await getProduct(query.id);
        const loggedUser = req.session.user;

        if (!product) return { notFound: true };
        if (!loggedUser) return { redirect: { destination: "/" }}

        return { props: { product, loggedUser } }
    }
);