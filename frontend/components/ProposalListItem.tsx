import {
  CheckCircleIcon,
  ChevronRightIcon,
  EnvelopeIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import Image from "next/image";

export interface ProposalListItemProps {
  amount: string;
  deployedDate: string;
  description: string;
  imageUrl: string;
  index: number;
  recipient: string;
  title: string;
  URL: string;
}

export const ProposalListItem = (props: ProposalListItemProps) => {
  return (
    <li key={props.index}>
      <Link href={`/dashboard/proposal/${props.index}`}>
        <div className="cursor-pointer block hover:bg-gray-50">
          <div className="flex items-center px-4 py-4 sm:px-6">
            <div className="flex min-w-0 flex-1 items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-12 w-12 rounded-full"
                  src={props.imageUrl}
                  alt=""
                />
              </div>
              <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                <div>
                  <p className="truncate text-sm font-medium text-indigo-600">
                    {props.title}
                  </p>
                  <p className="mt-2 flex items-center text-sm text-gray-500">
                    <span className="truncate">{props.description}</span>
                  </p>
                </div>
                <div className="hidden md:block">
                  <div>
                    <p className="text-sm text-gray-900">
                      Deployed on
                      <time dateTime={props.deployedDate}>
                        {props.deployedDate}
                      </time>
                    </p>
                    <p className="mt-2 items-center text-sm text-gray-500">
                      {props.amount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ChevronRightIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};
