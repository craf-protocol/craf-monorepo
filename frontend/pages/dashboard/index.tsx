import { Fragment, ReactNode, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { NextPage } from "next";
import Link from "next/link";
import { AppProps } from "next/app";
import {SideNav} from "../../components/SideNav";

const Dashboard = () => {
  return <SideNav />
};

export default Dashboard;
