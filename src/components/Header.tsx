import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { signout } from "@/app/login/actions";

export default async function Header() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="flex w-full border-b">
      <div className="container flex h-12 max-w-6xl items-center justify-between">
        <nav className="flex items-center">
          <Link href="/" className="font-bold text-xl text-indigo-500">
            Donanonim
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <p className="text-sm">{user.email}</p>
              <form action={signout}>
                <button className="bg-indigo-500 py-1 px-2 text-white text-sm rounded-md">
                  Logout
                </button>
              </form>
              <Link
                href="/profile"
                className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-500 text-white text-sm"
              >
                DC
              </Link>
            </>
          ) : (
            <Link href="/login">
              <button className="bg-indigo-500 py-1 px-2 text-white text-sm rounded-md">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
