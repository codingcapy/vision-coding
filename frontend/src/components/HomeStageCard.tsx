import type { StageCard } from "../routes";

export function HomeStageCard(props: { stageCard: StageCard }) {
  return (
    <div className="border rounded-xl border-[#505050] bg-[#222222] p-5 mb-3 md:mb-0 hover:border-blue-500 transition-all ease-in-out duration-300">
      <div className="text-xl font-bold text-[#cccccc] mb-2">
        {props.stageCard.title}
      </div>
      <div className="text-lg font-bold text-yellow-500 mb-2">
        {props.stageCard.description}
      </div>
      <ul className="list-disc pl-5">
        {props.stageCard.topics.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
