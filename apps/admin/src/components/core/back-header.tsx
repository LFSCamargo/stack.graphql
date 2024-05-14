import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

type BackHeaderProps = {
  title: string;
  description?: string;
  action?: () => void;
};

export function BackHeader(props: BackHeaderProps) {
  return (
    <div className="mb-5 flex flex-row items-center gap-2">
      <div
        onClick={props.action}
        className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 p-2"
      >
        <ArrowUturnLeftIcon className="h-6 w-6" />
      </div>
      <div className="flex flex-col">
        <h1 className=" font-bold tracking-tight">{props.title}</h1>
        <span className="text-sm opacity-50">{props.description}</span>
      </div>
    </div>
  );
}
