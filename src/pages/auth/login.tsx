import { LoginForm } from "@/components/auth/login-form";
import { IAuthProps } from "@/types";

export default function Login({ setToken }: IAuthProps) {
    return (
        <div className="flex items-center justify-center w-full min-h-screen">
            <LoginForm setToken={setToken} />
        </div>
    )
}