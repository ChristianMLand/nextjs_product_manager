import { useGetLoggedUser, useLogoutUser } from "@/services/client.services"
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/base.module.css";

export default function Layout({ children, home, loggedUser }) {
    const { trigger:logout } = useLogoutUser();
    const router = useRouter();

    if (!router.isReady) return <h1>Loading...</h1>;

    return (
        <>
            <nav>
                <h1>Product Manager</h1>
                <p>Welcome, { loggedUser.username }</p>
                { !home && <Link href="/products">Home</Link> }
                <button onClick={ logout }>Logout</button>
            </nav>
            <main className={ styles.layout }>
                { children }
            </main>
        </>
    )
}