"use server";

import Message from "./Message";

import { cookies } from "next/headers";

const FlashMessages = async () => {
  const cookieStore = await cookies();

  const messages = ["success", "error", "warning", "info"]
    .flatMap((key) => {
      const messageOrMessages = cookieStore.get(`flash:${key}`)?.value;

      if (!messageOrMessages) return [];
      if (Array.isArray(messageOrMessages)) {
        return messageOrMessages.map((message) => ({
          type: key,
          message,
        }));
      }

      return [{ type: key, message: messageOrMessages }];
    })
    .filter(({ message }) => Boolean(message));

  if (!messages.length) return null;

  return (
    <div className="flash-messages">
      {messages.map((messageProps, messageIndex) => (
        <Message key={messageIndex} {...messageProps} />
      ))}
    </div>
  );
};

export default FlashMessages;
