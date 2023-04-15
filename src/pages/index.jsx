import Form from "@/components/form";
import { useLoginUser, useRegisterUser } from "@/services/client.services";
import { useRouter } from "next/router";

export default function LogReg() {
    const router = useRouter();
    const navigateToHome = () => router.push("/products");
    return (
        <main>
            <Form 
                name="Register"
                service={ useRegisterUser }
                onSuccess={ navigateToHome }
                fields={{
                    username: "text",
                    email: "text",
                    password: "password",
                    confirmPassword: "password"
                }}
            />
            <hr />
            <Form 
                name="Login"
                service={ useLoginUser }
                onSuccess={ navigateToHome }
                fields={{
                    email: "text",
                    password: "password"
                }}
            />
        </main>
    );
}
