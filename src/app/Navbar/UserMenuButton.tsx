"use client";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";

interface UserMenuButtonProps {
  session: Session | null;
}

export default function UserMenuButton({ session }: UserMenuButtonProps) {
  const user = session?.user;

  return (
    <div className=" dropdown-end dropdown">
      <label tabIndex={0} className=" btn-ghost btn-circle btn">
        {user ? (
          <Image
            src={user?.image || "assets/logo.png"}
            width={40}
            height={40}
            className=" w-10 rounded-full"
            alt="Profile picture"
          />
        ) : (
          <GiHamburgerMenu />
        )}
      </label>
      <ul
        tabIndex={0}
        className=" dropdown-content menu rounded-box menu-sm z-30 mt-3 w-52 bg-base-100 p-2 shadow"
      >
        <li>
          {user ? (
            <button onClick={() => signOut({ callbackUrl: "/" })}>
              Sign out
            </button>
          ) : (
            <button onClick={() => signIn()}>Sign in</button>
          )}
        </li>
      </ul>
    </div>
  );
}
