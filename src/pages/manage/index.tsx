import { type NextPage } from "next";
import "twin.macro";
import { api } from "~/utils/api";
import { Card, Button, Icon, Input, Layout } from "~/components";
import Image from "next/image";
import { prisma } from "~/server/db";



const Manage: NextPage = () => {
  const onSearchHandle = () => {};
  const {open} = useSnackbar();
  const editItem =(blog)=>{
    
  }
  const delItem = (blog) => {
    open(`${blog.title} 删除成功！`)
  }
  const blogTableCols = [
    {title: "标题",
     dataIndex: "title",
     key: "title",},
    {title:"发布日期",
     dataIndex: "pushlish_date",
     key: "publish_date"},
    {title:"标签",
     dataIndex: "tag",
     key: "tag"},
    {title:"操作",
     dataIndex: "",
     key: "operation",
     render:(data)=> {
       return <>
         <Button onClick={()=>{
         editItem(data)
         }}>编辑</Button>
         <Button 
          tw="text-error bg-on-error"        onClick={()=>{delItem(data)}}>删除</Button>
       </>
     }
    }
  ];






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
