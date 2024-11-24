import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { successToast } from "@/lib/utils";
import { Icons } from "../ui/icons";
import { loginUser } from "@/api-calls";
import { UserLoginObj } from "@/types";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  setToken: (userToken: string) => void
}

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  isRootAdmin: yup.boolean().required(),
});
type IFormInput = yup.InferType<typeof schema>;

export function LoginForm({ setToken }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      isRootAdmin: false,
    },
  });

  // const isRootAdmin = watch("isRootAdmin");

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setIsLoading(true);
      const userData: UserLoginObj = {
        email: data.email,
        password: data.password,
        isRootAdmin: data.isRootAdmin,
      };
      const res = await loginUser(userData);
      if (res?.status === 200) {
        setToken(res?.data?.data?.token)
        successToast("Login Successful");
        navigate("/dashboard")
      }
    } catch (err) {
      // Error handling...
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
      <form onSubmit={handleSubmit(onSubmit)}>
      {/* <div className="flex items-center mb-4 mt-4"> 
          <input
            type="checkbox"
            id="rootAdmin"
            className="mr-2"
            {...register("isRootAdmin")}
          /> 
          <Label htmlFor="rootAdmin">Root Admin?</Label>
        </div> */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-criticalRed">{errors.email?.message}</span>
              )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              {/* <Link to="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link> */}
            </div>
            <Input id="password" type="password" required {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-criticalRed">
                {errors.password?.message}
              </span>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Continue
          </Button>
          {/* <Button variant="outline" className="w-full">
            Login with Google
          </Button> */}
        </div>
        {/*<div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="underline">
            Sign up
          </Link>
        </div>
        */}
        </form>
      </CardContent>
    </Card>
  );
}
