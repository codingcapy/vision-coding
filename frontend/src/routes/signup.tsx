import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatedText } from "../components/AnimatedText";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-[radial-gradient(circle_500px_at_top_left,#27505d,black)] md:bg-[radial-gradient(circle_900px_at_top_left,#27505d,black)] text-white min-h-screen p-2 md:p-0">
      <div className="pt-[100px] md:pt-[150px] flex flex-col">
        <AnimatedText id="heading">
          <div className="text-center text-4xl font-bold mb-10">Register</div>
          <form action="" className="mx-auto w-[300px]">
            <input
              type="email"
              className="border rounded w-full p-2 my-1"
              placeholder="Email"
            />
            <input
              type="password"
              className="border rounded w-full p-2 my-1"
              placeholder="Password"
            />
            <button className="bg-blue-500 rounded w-full py-2 my-2 font-bold cursor-pointer hover:bg-blue-400 transition-all ease-in-out duration-300">
              Register
            </button>
            <div>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 font-bold hover:text-blue-400 transition-all ease-in-out duration-300"
              >
                Sign in
              </Link>
            </div>
          </form>
        </AnimatedText>
      </div>
    </div>
  );
}
