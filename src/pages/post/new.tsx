import { type NextPage } from "next";
import "vditor/dist/index.css";
import Vditor from "vditor";
import { useEffect, useRef, useState } from "react";
import Drawer from "rc-drawer";
import { Button, Layout, Input } from "~/components";
import "twin.macro";

const NewPost: NextPage = () => {
  const [vd, setVd] = useState<any>();
  const vidtor = useRef<HTMLDivElement>(null);
  const [confirmPublish, setConfigPublish] = useState<boolean>(false);

  useEffect(() => {
    if (vidtor.current) {
      const vidtorInstant = new Vditor(vidtor.current, {
        after: () => {
          setVd(vidtorInstant.getValue());
        },
        cache: {
          enable: false,
        },
        debugger: true,
      });
    }
  }, []);

  const onClose = () => {
    console.log("sssss");
    setConfigPublish(false);
  };

  const beginPublish = () => {
    setConfigPublish(true);
  };

  return (
    <Layout>
      <section tw="flex justify-between">
        <div>
          <Input type="text" id="article-title" placeholder="请输入文章标题" />
        </div>
        <div className="">
          <Button onClick={beginPublish} type="outlined">
            发布
          </Button>
        </div>
      </section>
      <div ref={vidtor} />
      <Drawer
        open={confirmPublish}
        onClose={onClose}
        autoFocus={true}
        prefixCls="drawer"
        width="22.5rem"
      >
        <div tw="title-small box-border h-14 px-4 leading-[3.5rem] text-on-surface-variant">
          <section>
            <input type="file" placeholder="请上传封面图片" />
            <div className="list-images">封面图片区域</div>
          </section>
          <section>标签</section>
          <section>分类</section>
          <section>摘要</section>
          <Button type="filled" tw="w-full">
            确认发布
          </Button>
        </div>
      </Drawer>
    </Layout>
  );
};

export default NewPost;
