import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatedText } from "../components/AnimatedText";

export const Route = createFileRoute("/contact")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-[radial-gradient(circle_500px_at_top_left,#27505d,black)] md:bg-[radial-gradient(circle_900px_at_top_left,#27505d,black)] text-white min-h-screen p-2 md:p-0">
      <div className="pt-[100px] md:pt-[150px] flex flex-col">
        <AnimatedText id="heading">
          <div className="text-center text-4xl font-bold mb-10">Contact Us</div>
          <form action="" className="mx-auto w-[300px]">
            <input
              type="email"
              className="border rounded w-full p-2 my-1"
              placeholder="Email"
            />
            <textarea
              className="border rounded w-full p-2 my-1 h-[300px]"
              placeholder="Your message"
            />
            <button className="bg-blue-500 rounded w-full py-2 my-2 font-bold cursor-pointer hover:bg-blue-400 transition-all ease-in-out duration-300">
              Send
            </button>
          </form>
        </AnimatedText>
      </div>
    </div>
  );
}
