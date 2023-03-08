import { type NextPage } from "next";
import { useEffect, useState } from "react";
import Drawer from "rc-drawer";
import { Button, Layout, Input } from "~/components";
import breaks from "@bytemd/plugin-breaks";
import frontmatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import byteMath from "@bytemd/plugin-math";
import zoom from "@bytemd/plugin-medium-zoom";
import mermaid from "@bytemd/plugin-mermaid";
import { Editor } from "@bytemd/react";
import "twin.macro";
import { api } from "~/utils";
import debounce from "lodash/debounce";
const plugins = [
  gfm(),
  breaks(),
  gemoji(),
  highlight(),
  byteMath(),
  zoom(),
  mermaid(),
  frontmatter(),
];

const NewPost: NextPage = () => {
  const postDraft = api.post.getPostById.useQuery("") || "";
  const postMutation = api.post.savePostDraft.useMutation();
  const [value, setValue] = useState("");
  const [confirmPublish, setConfigPublish] = useState<boolean>(false);

  useEffect(() => {
    setValue(postDraft.data?.content || "");
  }, []);

  const onClose = () => {
    setConfigPublish(false);
  };

  const beginPublish = () => {
    setConfigPublish(true);
  };

  const editorOnChange = debounce((markContent: string) => {
    console.log("2s callback");
    postMutation.mutate({
      id: postDraft.data?.id,
      title: "",
      content: markContent,
    });
    setValue(markContent);
  }, 2000);

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
      <Editor value={value} plugins={plugins} onChange={editorOnChange} />
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
