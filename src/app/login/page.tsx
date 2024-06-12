import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { login, signup } from "./actions";

export default async function Login({
  searchParams,
}: {
  searchParams: { error: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/");
  }

  return (
    <section className="h-[calc(100vh-3rem)] flex items-center justify-center">
      <div className="w-full max-w-md p-4 bg-white shadow rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form id="login-form">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          {searchParams.error && (
            <div className="text-red-500 text-sm mb-4">
              {searchParams.error}
            </div>
          )}
          <div className="mb-4">
            <button
              formAction={login}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <button
            form="login-form"
            formAction={signup}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </button>
        </div>
      </div>
    </section>
  );
}
