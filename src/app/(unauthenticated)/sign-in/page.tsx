"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { setIsAuthenticated } from "@/state-store/slices/app.slice";
import { userManagementApi } from "@/api/user-management-api";
// import { postsApi } from "@/api/post-api";
import { authApi } from "@/api/auth-api";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { TriangleAlert } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
export default function Home() {
  const router = useRouter();
  const { setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const [loginUserTrigger, loginUserState] =
    authApi.endpoints.loginUser.useMutation();

  const signInFormSchema = z.object({
    username: z.string().min(1, { message: "Required" }),
    password: z.string().min(1, { message: "Required" }),
  });
  type SignInFormType = z.infer<typeof signInFormSchema>;
  const signInFormMessageLabels = {
    invalidCredentials: "Username or Password is incorrect",
  };
  const [signInFormMessageList, setSignInFormMessageList] = useState<any>([]);
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<SignInFormType>({
  //   resolver: zodResolver(signInFormSchema),
  // });
  const signInForm = useForm<SignInFormType>({
    resolver: zodResolver(signInFormSchema),
  });

  const signInFormOnSubmit = (data: SignInFormType) => {
    console.log("sign in form data: ", data);
    setIsLoading(true);
    loginUserTrigger({
      pin: "paper_class_app_tenant1",
      username_or_email: data.username,
      // password: "malith@14",
      password: data.password,
    })
      .unwrap()
      .then((fulfilled) => {
        setSignInFormMessageList((prevState: any) => {
          return [];
        });
        dispatch(setIsAuthenticated(true));
      })
      .catch((rejected) => {
        if (rejected?.data?.status === "invalid-credentials") {
          setSignInFormMessageList((prevState: any) => {
            return ["Username or Password is incorrect"];
          });
        }
        setIsLoading(false);
        console.error(rejected);
      });
  };

  useEffect(() => {
    // setTheme("light");
  }, []);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      signInForm.handleSubmit(signInFormOnSubmit)();
    }
  };
  return (
    <>
      <div className="flex flex-row w-full gap-[8px] justify-center items-center min-h-[calc(100vh-144px)] px-[64px] bg-background text-foreground">
        <div className="flex flex-col w-full gap-[8px]">
          <div className="flex flex-row w-full gap-[8px]">
            <div className="flex flex-col w-full justify-center items-center gap-[16px]">
              <Card className="w-full max-w-sm">
                <CardHeader>
                  <CardTitle>Login to your account</CardTitle>
                  <CardDescription>
                    Enter your details below to login to your account
                  </CardDescription>

                  {signInFormMessageList.map((message: any, index: number) => (
                    <div
                      key={index}
                      className="flex flex-row justify-center items-center text-red-500"
                    >
                      <TriangleAlert className="w-4 h-4 mr-1" />
                      <div>{message}</div>
                    </div>
                  ))}
                </CardHeader>

                {/* ✅ FORM SECTION */}
                <CardContent>
                  <form onSubmit={signInForm.handleSubmit(signInFormOnSubmit)}>
                    <div className="flex flex-col gap-6">
                      {/* Username Field */}
                      <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          type="text"
                          placeholder="Username"
                          {...signInForm.register("username")}
                          required
                        />
                      </div>

                      {/* Password Field */}
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <Label htmlFor="password">Password</Label>
                        </div>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Password"
                          {...signInForm.register("password")}
                          required
                        />
                      </div>
                    </div>

                    {/* ✅ Submit Button */}
                    <CardFooter className="flex-col gap-2 mt-6">
                      <Button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 cursor-pointer"
                        disabled={isLoading}
                        onClick={signInForm.handleSubmit(signInFormOnSubmit)}
                      >
                        {isLoading && (
                          <Spinner className="w-4 h-4 animate-spin" />
                        )}
                        {isLoading ? "Logging in..." : "Login"}
                      </Button>
                    </CardFooter>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
