import { type NextPage } from "next";
import Head from "next/head";
import "twin.macro";
import { Button, Card, Icon, Input, Layout } from "~/components";
import { useForm, type SubmitHandler } from "react-hook-form";
import { getCsrfToken, signIn } from "next-auth/react";
import type { GetServerSidePropsContext } from "next";
import { type LoginForm } from "types/login-input.types";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z
  .object({
    username: z.string().min(3).max(20),
    password: z.string().min(6).max(20),
    csrfToken: z.string(),
  })
  .required();

const SignIn: NextPage<{ csrfToken: string }> = ({ csrfToken }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });
  const route = useRouter();

  const signErrorQuery = route.query;

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    await signIn("credentials", {
      username: data.username,
      password: data.password,
      csrfToken: data.csrfToken,
      redirect: true,
      callbackUrl: "/",
    });
  };

  const reBackHome = () => {
    route.push("/");
  };

  return (
    <>
      <Head>
        <title>登录</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout hiddenTopFooter={true}>
        <div tw="mt-52 container mx-auto px-4 md:w-96">
          <div tw=" mb-4 ">
            <h1 tw="headline-large text-center text-on-surface ">
              登录您的博客
            </h1>
            {signErrorQuery.error && (
              <Card tw="body-small bg-error-container text-error py-2 flex items-center justify-center px-4">
                <Icon name="Error" tw="mr-2"></Icon>
                {signErrorQuery.error === "CredentialsSignin" && (
                  <div tw="flex-1">用户名或密码错误</div>
                )}
              </Card>
            )}
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="hidden"
              defaultValue={csrfToken}
              {...register("csrfToken")}
            />
            <Input
              autoComplete="username"
              trailingIcon={<Icon name="account_circle"></Icon>}
              placeholder="用户名"
              errors={errors}
              {...register("username")}
            ></Input>
            <Input
              type="password"
              autoComplete="current-password"
              trailingIcon={<Icon name="password"></Icon>}
              {...register("password")}
              placeholder="密码"
              errors={errors}
            ></Input>
            <div tw="flex flex-col md:flex-row justify-center space-y-2 md:(space-x-2 space-y-0)">
              <Button type="tonal" onClick={reBackHome} tw="w-full">
                返回
              </Button>
              <Button nativeType="submit" type="filled" tw="w-full">
                登录
              </Button>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default SignIn;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
