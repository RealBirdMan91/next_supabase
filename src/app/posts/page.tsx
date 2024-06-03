import { Post } from "@/utils/actions/post";
import { createClient } from "@/utils/supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { init } from "next/dist/compiled/webpack/webpack";
import React from "react";
import PostList from "./_components/posts-list";

async function PostPage() {
  const supabase = createClient();

  const { data, error } = (await supabase
    .from("posts")
    .select("*")) as PostgrestSingleResponse<Post[]>;
  if (error) {
    throw error;
  }

  return (
    <main className="container m-auto my-14 flex flex-col gap-6 ">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-white">Post Page</h1>
        <p className="text-lg text-white">This is the post page.</p>
      </div>
      <PostList initData={data} />
    </main>
  );
}

export default PostPage;
