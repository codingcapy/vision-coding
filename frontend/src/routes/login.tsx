import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatedText } from "../components/AnimatedText";
import useAuthStore from "../store/AuthStore";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { loginService, authLoading, user } = useAuthStore();
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!!user) navigate({ to: "/" });
  }, [user]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = (e.target as HTMLFormElement).email.value;
    const password = (e.target as HTMLFormElement).password.value;
    loginService(email, password);
    if (authLoading) setNotification("Loading...");
    if (!user) {
      setTimeout(() => {
        setNotification("Invalid login credentials");
      }, 700);
    }
  }

  return (
    <div className="bg-[radial-gradient(circle_500px_at_top_left,#27505d,black)] md:bg-[radial-gradient(circle_900px_at_top_left,#27505d,black)] text-white min-h-screen p-2 md:p-0">
      <div className="pt-[100px] md:pt-[150px] flex flex-col">
        <AnimatedText id="heading">
          <div className="text-center text-4xl font-bold mb-10">Sign in</div>
          <form onSubmit={handleSubmit} className="mx-auto w-[300px]">
            <input
              type="email"
              className="border rounded w-full p-2 my-1"
              placeholder="Email"
              id="email"
              name="email"
              required
            />
            <input
              type="password"
              className="border rounded w-full p-2 my-1"
              placeholder="Password"
              id="password"
              name="password"
              required
            />
            <button className="bg-blue-500 rounded w-full py-2 my-2 font-bold cursor-pointer hover:bg-blue-400 transition-all ease-in-out duration-300">
              Sign in
            </button>
            <div>
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-500 font-bold hover:text-blue-400 transition-all ease-in-out duration-300"
              >
                register
              </Link>
            </div>
            <div className="text-yellow-500">{notification}</div>
          </form>
        </AnimatedText>
      </div>
    </div>
  );
}
