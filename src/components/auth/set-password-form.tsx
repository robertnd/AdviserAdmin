import { useNavigate, useParams } from "react-router-dom";
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
import { successToast } from "@/lib/utils";
import { Icons } from "../ui/icons";
import { useSetPassword } from "@/services/mutations";
// import { SetPasswordObj } from "@/types"; // You'll need to define this type

// interface SetPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {
//   setToken: (userToken: string) => void;
//   token: string; // Token from the invitation link
// }

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(8).required("Password is required"),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required("Confirm Password is required"),
});

type IFormInput = yup.InferType<typeof schema>;

export function SetPasswordForm() {
  const navigate = useNavigate();
  const { code } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const {mutateAsync: setPasswordFn, isPending: isLoading} = useSetPassword()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const submitData: any = {
        code: code,
        user_id: data.email,
        password: data.password,
    };
    setPasswordFn(submitData).then(() => {
      successToast(`Password set successfully`);
      navigate("/login");
    })
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl">Set Password</CardTitle>
        <CardDescription>
          Create a new password for your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                {...register("email")}
              />
              {errors.email && (
                <span className="text-criticalRed">{errors.email?.message}</span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                required
                {...register("password")}
              />
              {errors.password && (
                <span className="text-criticalRed">{errors.password?.message}</span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <span className="text-criticalRed">{errors.confirmPassword?.message}</span>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Set Password
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

