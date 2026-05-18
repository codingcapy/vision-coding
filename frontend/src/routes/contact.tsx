import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatedText } from "../components/AnimatedText";
import { useCreateMessageMutation } from "../lib/api/messages";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const {
    mutate: createMessage,
    isPending: createMessagePending,
    error: createMessageError,
  } = useCreateMessageMutation();
  const [emailContent, setEmailContent] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [notification, setNotification] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (createMessagePending) return;
    createMessage(
      {
        email: emailContent,
        content: messageContent,
      },
      {
        onSuccess: () => {
          setEmailContent("");
          setMessageContent("");
          setNotification(
            "Message sent successfully! We will respond if required as soon as possible 😊",
          );
        },
        onError: (err) => {
          setNotification(err.toString());
        },
      },
    );
  }

  return (
    <div className="bg-[radial-gradient(circle_500px_at_top_left,#27505d,black)] md:bg-[radial-gradient(circle_900px_at_top_left,#27505d,black)] text-white min-h-screen p-2 md:p-0">
      <div className="pt-[100px] md:pt-[150px] flex flex-col">
        <AnimatedText id="heading">
          <div className="text-center text-4xl font-bold mb-10">Contact Us</div>
          <form onSubmit={handleSubmit} className="mx-auto w-[300px]">
            <input
              type="email"
              className="border rounded w-full p-2 my-1"
              placeholder="Email"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              required
            />
            <textarea
              className="border rounded w-full p-2 my-1 h-[300px]"
              placeholder="Your message"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              required
            />
            <button className="bg-blue-500 rounded w-full py-2 my-2 font-bold cursor-pointer hover:bg-blue-400 transition-all ease-in-out duration-300">
              Send
            </button>
          </form>
        </AnimatedText>
        <div
          className={`mx-auto font-bold ${notification === "Message sent successfully! We will respond if required as soon as possible 😊" ? " text-green-500" : "text-yellow-500"}`}
        >
          {notification}
        </div>
      </div>
    </div>
  );
}
