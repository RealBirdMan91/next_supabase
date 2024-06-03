import { createClient } from "@/utils/supabase/server";
import { login, signup } from "@/utils/actions/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    redirect("/");
  }

  return (
    <main className="w-full min-h-screen flex justify-center items-center">
      <form className="flex flex-col bg-white w-full max-w-[450px] py-6 px-4 gap-6 rounded-md">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-neutral-500 text-sm">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="text-neutral-500 border border-neutral-200 rounded-md p-1"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-neutral-500 text-sm">
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="text-neutral-500 border border-neutral-200 rounded-md p-1"
          />
        </div>
        <div className="flex gap-3">
          <button
            formAction={login}
            className="bg-emerald-400 py-2 px-12 rounded-md"
          >
            Log in
          </button>
          <button
            formAction={signup}
            className="bg-emerald-400 py-2 px-12 rounded-md"
          >
            Sign up
          </button>
        </div>
      </form>
    </main>
  );
}
