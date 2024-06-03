"use client";
import { Post } from "@/utils/actions/post";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect } from "react";

function PostList({ initData }: { initData: Post[] }) {
  const supabase = createClient();
  const [posts, setPosts] = React.useState<Post[]>(initData);

  supabase
    .channel("posts-follow-up")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "posts",
      },
      async (payload) => {
        const subscribedPost = payload.new as Post;
        setPosts((prevPosts) => [...prevPosts, subscribedPost]);
      }
    )
    .subscribe();

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id} className="bg-white p-4 rounded-md my-2">
          <h2 className="text-xl font-bold text-neutral-600">{post.title}</h2>
          <p className="text-lg text-neutral-500">{post.text}</p>
        </li>
      ))}
    </ul>
  );
}

export default PostList;
