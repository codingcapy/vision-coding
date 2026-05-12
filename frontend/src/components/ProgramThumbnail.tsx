import { Link } from "@tanstack/react-router";
import type { Program } from "../routes/programs";

export function ProgramThumbnail(props: { program: Program }) {
  const Icon = props.program.icon;

  return (
    <Link
      to={`/courses/${props.program.subpath}`}
      className="flex flex-col border rounded p-5 bg-[#222222] mb-3 sm:mb-0 hover:border-blue-500 transition-all ease-in-out duration-300"
    >
      <div className="mx-auto mb-2">
        <Icon size={35} />
      </div>
      <div className="text-xl font-bold mb-2 text-yellow-500">
        {props.program.title}
      </div>
      <div className="text-sm">{props.program.description}</div>
    </Link>
  );
}
