import { useDeleteProduct, useGetLoggedUser } from "@/services/client.services"
import Link from "next/link";

export default function Product({ product, removeFromDom, loggedUser }) {
    const { trigger:deleteProduct } = useDeleteProduct(product.id);

    const handleDelete = async () => {
        await deleteProduct(product.id).then(() => removeFromDom(product.id))
    };

    return (
        <li>
            <Link href={ `/products/${product.id}` }>{ product.title }</Link>
            { 
                loggedUser.id === product.UserId &&
                <button onClick={ handleDelete }>Delete</button>
            }
        </li>
    );
}