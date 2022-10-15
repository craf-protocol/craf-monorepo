// TODO: Update icons
import {
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, useState } from "react";
import { useRouter } from "next/router";

const navigation = [
  {
    name: "Proposals",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    name: "History",
    href: "/dashboard/history",
    icon: UsersIcon,
  },
  {
    name: "Leaderboard",
    href: "/dashboard/leaderboard",
    icon: FolderIcon,
  },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export const SideNavigationLayout = ({ children }: any) => {
  const { pathname } = useRouter();

  return (
    <aside className="fixed flex flex-row h-screen w-screen">
      {/* Static sidebar for desktop */}
      <div className="hidden md:inset-y-0 md:flex md:w-64 md:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
          <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 space-y-1 px-2 py-4">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <p className={classNames(
                    pathname === item.href
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "cursor-pointer group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                  >
                  <item.icon
                    className={classNames(
                      pathname === item.href
                        ? "text-gray-300"
                        : "text-gray-400 group-hover:text-gray-300",
                      "mr-3 flex-shrink-0 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </p>
                  </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <main className="flex-1">{children}</main>
    </aside>
  );
};
