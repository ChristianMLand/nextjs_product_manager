import Layout from "@/components/layout";
import { useRouter } from "next/router";
import Link from "next/link";
import { withSessionSsr } from "@/utils/session";
import { useDeleteProduct } from "@/services/client.services";
import { getProduct } from "@/services/server.services"; // same function that our api route is using!

export default function ViewProduct({ product, loggedUser }) {
    const router = useRouter();
    // const { data:product, isLoading } = useGetProduct(router.query.id);
    const { trigger:deleteProduct } = useDeleteProduct(product.id);

    const handleDelete = () => {
        deleteProduct().then(() => router.push("/products"));
    }

    return (
        <Layout loggedUser={ loggedUser }>
            <h2>View Product</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>User Who Posted</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{product.title}</td>
                        <td>{product.price}</td>
                        <td>{product.User.username}</td>
                        <td>{product.description}</td>
                    </tr>
                </tbody>
            </table>
            <div>
            { 
                loggedUser.id === product.UserId &&
                <>
                    <Link href={ `/products/${product.id}/edit` }>Edit</Link>
                    <button onClick={ handleDelete }>Delete</button>
                </>
            }
            </div>
        </Layout>
    );
};

// example of using SSR instead of fetching with useSWR
export const getServerSideProps = withSessionSsr(
    async ({ req, query }) => {
        const [product] = await getProduct(query.id);
        const loggedUser = req.session.user;

        if (!product) return { notFound: true };
        if (!loggedUser) return { redirect: { destination: "/" }}

        return { props: { product, loggedUser } }
    }
);