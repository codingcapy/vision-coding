import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatedText } from "../components/AnimatedText";
import { useCreateUserMutation } from "../lib/api/users";
import { useEffect, useState } from "react";
import useAuthStore from "../store/AuthStore";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  const { mutate: createUser, isPending: createUserPending } =
    useCreateUserMutation();
  const [notification, setNotification] = useState("");
  const { loginService, authLoading, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!user) navigate({ to: "/" });
  }, [user]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (createUserPending) return;
    const username = (e.target as HTMLFormElement).username.value;
    const email = (e.target as HTMLFormElement).email.value;
    const password = (e.target as HTMLFormElement).password.value;
    if (username.length > 32)
      return setNotification("Username too long! Max 32 characters");
    if (email.length > 255) return setNotification("Email too long!");
    if (password.length > 80)
      return setNotification("Password too long! Max character limit is 80");
    if (password.length < 8)
      return setNotification("Password must be at least 8 characters");
    createUser(
      { username, password, email },
      {
        onSuccess: () => {
          loginService(email, password);
          if (authLoading) setNotification("Loading...");
        },
        onError: (errorMessage) => setNotification(errorMessage.toString()),
      },
    );
  }

  return (
    <div className="bg-[radial-gradient(circle_500px_at_top_left,#27505d,black)] md:bg-[radial-gradient(circle_900px_at_top_left,#27505d,black)] text-white min-h-screen p-2 md:p-0">
      <div className="pt-[100px] md:pt-[150px] flex flex-col">
        <AnimatedText id="heading">
          <div className="text-center text-4xl font-bold mb-10">Register</div>
          <form onSubmit={handleSubmit} className="mx-auto w-[300px]">
            <input
              type="text"
              className="border rounded w-full p-2 my-1"
              placeholder="Username"
              id="username"
              name="username"
              required
            />
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
            <div className="text-yellow-500">{notification}</div>
          </form>
        </AnimatedText>
      </div>
    </div>
  );
}
