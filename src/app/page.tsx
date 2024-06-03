import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { createBlogPost } from "@/utils/actions/post";

export default async function Home() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <main className="w-full min-h-screen flex justify-center items-center">
      <div className="flex flex-col bg-white w-full max-w-[450px] py-6 px-4 gap-6 rounded-md">
        <div>
          <h1 className="text-neutral-600 text-xl">Hello {data.user.email}</h1>
          <p className="text-neutral-400 text-sm">want to write some posts?</p>
        </div>
        <form className="flex flex-col bg-white w-full max-w-[450px] py-6 px-4 gap-6 rounded-md">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-neutral-500 text-sm">
              Title:
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              className="text-neutral-500 border border-neutral-200 rounded-md p-1"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="text" className="text-neutral-500 text-sm">
              Text:
            </label>
            <textarea
              id="text"
              name="text"
              required
              rows={3}
              className="text-neutral-500 border border-neutral-200 rounded-md p-1"
            ></textarea>
          </div>
          <div className="flex gap-3">
            <button
              className="bg-emerald-400 py-2 px-12 rounded-md"
              formAction={createBlogPost}
            >
              Write some Post
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
