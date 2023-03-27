import { type NextPage } from "next";
import "twin.macro";
import { api } from "~/utils/api";
import { Card, Chips, Icon, Input, Layout } from "~/components";
import Image from "next/image";
import { prisma } from "~/server/db";

const Manage: NextPage = () => {
  const onSearchHandle = () => {};
  return (
    <>
      <Layout>
        <section tw="container mx-auto items-stretch mt-8">
          <Input
            onChange={onSearchHandle}
            trailingIcon={<Icon name="search"></Icon>}
          ></Input>
          <div tw="display-small md:display-medium lg:display-large text-on-surface px-4">
            博客列表
          </div>
          <div></div>
        </section>
      </Layout>
    </>
  );
};

export default Manage;
