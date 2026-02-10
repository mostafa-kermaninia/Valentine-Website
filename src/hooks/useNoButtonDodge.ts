import { useState, useCallback } from "react";
import { toast } from "sonner";

const funnyNoMessages = [
  "Nice try! But NO is not an option 😏",
  "Oops! That button seems broken... try the other one! 💕",
  "The 'No' button has left the chat 🏃‍♂️💨",
  "Error 404: 'No' not found in my heart ❤️",
  "Did you really think I'd let you say no? 😂",
  "That button is on vacation. Try YES! 🌴",
  "No? NO?! My heart can't process that command 💔➡️❤️",
  "The universe has spoken: only YES works here ✨",
  "Fun fact: the 'No' button is just decoration 🎨",
  "I asked the developer, they said 'No' is deprecated 🤓",
];

const useNoButtonDodge = () => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noAttempts, setNoAttempts] = useState(0);
  const [noScale, setNoScale] = useState(1);

  const handleNoHover = useCallback(() => {
    const newX = (Math.random() - 0.5) * 300;
    const newY = (Math.random() - 0.5) * 200;
    setNoPosition({ x: newX, y: newY });
    setNoAttempts((prev) => prev + 1);
    setNoScale((prev) => Math.max(0.3, prev - 0.08));

    const msg = funnyNoMessages[Math.floor(Math.random() * funnyNoMessages.length)];
    toast(msg, {
      className: "valentine-toast",
      duration: 2500,
    });
  }, []);

  return { noPosition, noAttempts, noScale, handleNoHover };
};

export default useNoButtonDodge;
