import { AnimatedText } from "./AnimatedText";
import type { ValueCard } from "../routes";

export function HomeValueCard(props: { valueCard: ValueCard }) {
  const Icon = props.valueCard.icon;
  return (
    <AnimatedText id={props.valueCard.title}>
      <div className="mb-3 md:mb-0 rounded-xl border border-[#505050] bg-[#222222] p-5 hover:border-blue-500 transition-all ease-in-out duration-300">
        <div className="text-xl font-bold mb-5 flex items-center">
          <Icon />
          <div className="ml-2">{props.valueCard.title}</div>
        </div>
        <div>{props.valueCard.description}</div>
      </div>
    </AnimatedText>
  );
}
