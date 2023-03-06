import { type NextPage } from "next";
import "vditor/dist/index.css";
import Vditor from "vditor";
import { useEffect, useRef, useState } from "react";
import Drawer from "rc-drawer";

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

  const showval = () => {
    console.log("vd", vd);
  };

  const onClose = () => {
    setConfigPublish(false);
  };

  const beginPublish = () => {
    setConfigPublish(true);
  };

  return (
    <>
      <section className="flex justify-between">
        <div>
          <label htmlFor="article-title">文章标题</label>
          <input type="text" id="article-title" placeholder="请输入文章标题" />
        </div>
        <div className="">
          <button onClick={beginPublish}>发布</button>
        </div>
      </section>

      <Drawer
        open={confirmPublish}
        onClose={onClose}
        handler={false}
        level={null}
        afterVisibleChange={(c: boolean) => {}}
        width="22.5rem"
      >
        <div className="text-on-surface-variant title-small box-border h-14 px-4 leading-[3.5rem]">
          <section>
            <input type="file" placeholder="请上传封面图片" />
            <div className="list-images">封面图片区域</div>
          </section>
          <section>标签</section>
          <section>分类</section>
          <section>摘要</section>
        </div>
        <div className="border-outline box-border border-t-[0.0625rem] border-solid px-2 "></div>
      </Drawer>
      <div ref={vidtor} />
    </>
  );
};

export default NewPost;
