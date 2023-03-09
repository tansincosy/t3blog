import { type NextPage } from "next";
import { useEffect, useState } from "react";
import Drawer from "rc-drawer";
import { Button, Layout, Input, Card, Fab } from "~/components";
import breaks from "@bytemd/plugin-breaks";
import frontMatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import byteMath from "@bytemd/plugin-math";
import zoom from "@bytemd/plugin-medium-zoom";
import mermaid from "@bytemd/plugin-mermaid";
import { Editor } from "@bytemd/react";
import "twin.macro";
import { api } from "~/utils";
import { useRouter } from "next/router";
import throttle from "lodash/throttle";
const plugins = [
  gfm(),
  breaks(),
  gemoji(),
  highlight(),
  byteMath(),
  zoom(),
  mermaid(),
  frontMatter(),
];

const NewPost: NextPage = () => {
  const route = useRouter();
  const draftId = route.query.draft_id as string;
  const postDraft = api.post.getPostById.useQuery(draftId || "");
  const postMutation = api.post.savePostDraft.useMutation({
    onMutate(variables) {
      if (draftId === "new") {
        return { ...postDraft.data, ...variables };
      }
    },
  });
  const [value, setValue] = useState<string>("");
  const [confirmPublish, setConfigPublish] = useState<boolean>(false);
  const [articleTitle, setArticleTitle] = useState<string>("");
  useEffect(() => {
    if (route.query.draft_id) {
      setValue(postDraft.data?.content || "");
      setArticleTitle(postDraft.data?.title || "");
    }
  }, [postDraft.data?.content]);

  const onClose = () => {
    setConfigPublish(false);
  };

  const beginPublish = () => {
    setConfigPublish(true);
  };

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setArticleTitle(event.target.value);
  };

  const editorOnChange = throttle((markContent: string) => {
    postMutation.mutate({
      id: postMutation.data?.id,
      title: articleTitle,
      content: markContent,
    });
    setValue(markContent);
  }, 2000);

  return (
    <Layout>
      <section tw="flex justify-between">
        <div tw="flex-1">
          <Input
            type="text"
            id="article-title"
            placeholder="请输入文章标题"
            value={articleTitle}
            onChange={onInputChange}
          />
        </div>
      </section>
      <Editor value={value} plugins={plugins} onChange={editorOnChange} />
      <Fab
        onClick={beginPublish}
        icon="edit"
        tw="fixed right-2 bottom-2 z-40"
        size="medium"
      ></Fab>
      <Drawer
        open={confirmPublish}
        onClose={onClose}
        autoFocus={true}
        prefixCls="drawer"
      >
        <div tw="title-small box-border h-14 px-4 leading-[3.5rem] text-on-surface-variant ">
          <Card tw="h-64 w-64">
            <input
              type="file"
              placeholder="请上传封面图片"
              tw="hidden"
              id="upload-image"
            />
            <label
              tw="w-full h-full block cursor-pointer"
              htmlFor="upload-image"
            >
              封面图片区域
            </label>
          </Card>
          <Card>标签</Card>
          <Card>分类</Card>
          <Card>摘要</Card>
          <Button type="filled" tw="w-full">
            确认发布
          </Button>
        </div>
      </Drawer>
    </Layout>
  );
};

export default NewPost;
