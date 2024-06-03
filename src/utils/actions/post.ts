"use server";

import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export type Post = {
  title: string;
  text: string;
  created_at: string;
  id: number;
};

export async function createBlogPost(formData: FormData) {
  const supabase = createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    title: formData.get("title") as string,
    text: formData.get("text") as string,
  };

  const { data: response, error } = (await supabase
    .from("posts")
    .insert(data)) as PostgrestSingleResponse<Post>;

  if (error) {
    throw error;
  }

  revalidatePath("/posts");
  redirect("/posts");
}
