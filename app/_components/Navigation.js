"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navigation({ session }) {
  const pathname = usePathname().split("/")[1];

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className={`hover:text-accent-400 transition-colors ${
              pathname === "cabins" && "text-accent-400"
            }`}
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={`hover:text-accent-400 transition-colors ${
              pathname === "about" && "text-accent-400"
            }`}
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className={`hover:text-accent-400 transition-colors flex items-center gap-4 ${
                pathname === "account" && "text-accent-400"
              }`}
            >
              <div className="relative h-8 w-8 rounded-full">
                <Image
                  className="h-8 rounded-full object-cover"
                  width={100}
                  height={100}
                  src={session.user.image}
                  alt={session.user.name}
                  referrerPolicy="no-referrer"
                />
              </div>
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
