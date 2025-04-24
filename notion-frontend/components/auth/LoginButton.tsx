'use client';

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <p>{session.user?.name}</p>
        <button onClick={() => signOut()} className="text-red-500">
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => signIn("google")} className="text-blue-500">
      Google 로그인
    </button>
  );
}
