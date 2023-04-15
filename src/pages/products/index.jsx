import Form from "@/components/form";
import Product from "@/components/product";
import Layout from "@/components/layout";
// TODO cleanup component imports
import { useCreateProduct } from "@/services/client.services";
import { getAllProducts } from "@/services/server.services";
import { withSessionSsr } from "@/utils/session";
import { useState } from "react";

export default function Products({ allProducts, loggedUser }) {
    // const { data:products, mutate:setProducts, isLoading } = useGetAllProducts();
    const [products, setProducts] = useState(allProducts);

    const addToDom = product => {
        setProducts([...products, product]);
    }

    const removeFromDom = id => {
        setProducts(products.filter(product => product.id !== id))
    }

    return (
        <Layout loggedUser={loggedUser} home>
            <h2>Create a Product</h2>
            <Form
                name="Create"
                service={ useCreateProduct }
                onSuccess={ addToDom }
                clearOnSuccess
                fields={{
                    title: "text",
                    price: "number",
                    description: "text"
                }}
            />
            <hr />
            <h2>All Products</h2>
            <ul>
                { products.map((product, i) => 
                    <Product 
                        key={ i } 
                        product={ product }
                        removeFromDom={ removeFromDom }
                        loggedUser={ loggedUser }
                    />
                )}
            </ul>
        </Layout>
    );
}

export const getServerSideProps = withSessionSsr(
    async ({ req }) => {
        const [allProducts] = await getAllProducts();
        const loggedUser = req.session.user;

        if (!loggedUser) return { redirect: { destination: "/", permanent: false }}

        return { props: { allProducts, loggedUser } }
    }
);