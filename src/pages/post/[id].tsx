import { type NextPage } from "next";
import "twin.macro";
import { useRouter } from "next/router";
import { Layout } from "~/components";
import { api } from "~/utils";
import { Viewer } from "@bytemd/react";
import breaks from "@bytemd/plugin-breaks";
import frontMatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import byteMath from "@bytemd/plugin-math";
import zoom from "@bytemd/plugin-medium-zoom";
import mermaid from "@bytemd/plugin-mermaid";

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

const Post: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const postDetail = api.post.getId.useQuery((id as string) || "");
  return (
    <Layout>
      {postDetail.isLoading ? (
        <>Loading</>
      ) : (
        <>
          <article tw="container mx-auto">
            <header>
              <h1 tw="display-large">{postDetail?.data?.title}</h1>
              <div tw="display-medium">{postDetail?.data?.description}</div>
            </header>
            <Viewer
              value={postDetail?.data?.content || ""}
              plugins={plugins}
            ></Viewer>
          </article>
        </>
      )}
    </Layout>
  );
};

export default Post;
