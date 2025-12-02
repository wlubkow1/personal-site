"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Skills", path: "/skills" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="mb-10">
      <nav className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
        {/* Left: name + tag line */}
        <div className="flex items-center gap-3">
            <div className="h-22 w-22 rounded-full overflow-hidden border border-indigo-400/70 shadow-lg shadow-indigo-500/40">
            <Image
                src="/headshot.jpg"     
                alt="Wojciech Lubkowski"
                width={36}
                height={36}
                className="h-full w-full object-cover"
                priority
            />
            </div>

          <div>
            <Link
              href="/"
              className="text-xl sm:text-2xl font-semibold tracking-tight hover:text-indigo-300 transition"
            >
              Wojciech Lubkowski
            </Link>
            <p className="text-xs sm:text-sm text-gray-400">
              CS @ UMBC · Software Engineer
            </p>
          </div>
        </div>

        {/* Right: links */}
        <div className="flex gap-8 text-xl">
          {navLinks.map((link) => {
            const active = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`relative pb-1 transition ${
                  active ? "text-indigo-300" : "text-gray-300 hover:text-white"
                }`}
              >
                {link.name}
                {active && (
                  <span className="absolute left-0 -bottom-0.5 h-[2px] w-full rounded-full bg-indigo-400" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
