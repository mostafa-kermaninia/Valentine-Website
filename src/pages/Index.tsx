import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import FloatingHearts from "@/components/FloatingHearts";
import Celebration from "@/components/Celebration";
import useNoButtonDodge from "@/hooks/useNoButtonDodge";
import valentineBg from "@/assets/valentine-bg.jpg";
// import createRomanticMusic from "@/lib/romanticMusic";
import loveSong from "@/assets/song.mp3";

const romanticText = `Every moment with you feels like a beautiful dream I never want to wake up from. You are the reason my heart beats with purpose, the melody in every silence, and the warmth in every cold night. In a world full of ordinary, you are my extraordinary. My love for you is not just a feeling — it's a universe, ever-expanding, infinite, and breathtakingly beautiful.`;

const Index = () => {
  const [phase, setPhase] = useState<"text" | "card" | "question" | "celebration">("text");
  const [displayedText, setDisplayedText] = useState("");
  const [cardOpen, setCardOpen] = useState(false);
  // const musicRef = useRef<ReturnType<typeof createRomanticMusic> | null>(null);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const { noPosition, noScale, handleNoHover } = useNoButtonDodge();

  // Cleanup music on unmount
  useEffect(() => {
    return () => {
      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current.currentTime = 0;
      }
    };
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (phase !== "text") return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < romanticText.length) {
        setDisplayedText(romanticText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          toast("💌 A special card is waiting for you...", {
            className: "valentine-toast",
            duration: 3000,
          });
          setTimeout(() => setPhase("card"), 1500);
        }, 1000);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [phase]);

  const handleOpenCard = () => {
    setCardOpen(true);
// Start romantic music
    if (!musicRef.current) {
      musicRef.current = new Audio(loveSong);
      musicRef.current.loop = true; // اگر می‌خواهی آهنگ تکرار شود این خط بماند
      musicRef.current.volume = 0.5; // تنظیم بلندی صدا (بین 0 تا 1)
    }
    musicRef.current.play().catch(e => console.log("Playback failed:", e));
    toast("🎵 Can you hear the music of love? 🎶", {
      className: "valentine-toast",
      duration: 3000,
    });
    setTimeout(() => setPhase("question"), 2000);
  };

  const handleYes = () => {
    toast("💖 I LOVE YOU SO MUCH! 💖", {
      className: "valentine-toast",
      duration: 4000,
    });
    setPhase("celebration");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <FloatingHearts />

      {/* Background image overlay */}
      <div
        className="fixed inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url(${valentineBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />

      {/* Phase 1: Romantic Text */}
      <AnimatePresence mode="wait">
        {phase === "text" && (
          <motion.div
            key="text"
            className="relative z-10 flex min-h-screen items-center justify-center px-6"
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-2xl text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="mb-8 text-5xl"
              >
                💝
              </motion.div>
              <motion.h1
                className="font-display text-3xl md:text-5xl font-bold text-primary mb-8 italic"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                A Letter From My Heart
              </motion.h1>
              <p className="font-body text-lg md:text-2xl leading-relaxed text-foreground/90">
                {displayedText}
                <span className="inline-block w-0.5 h-6 bg-accent ml-1 animate-pulse" />
              </p>
            </div>
          </motion.div>
        )}

        {/* Phase 2: Valentine Card */}
        {phase === "card" && (
          <motion.div
            key="card"
            className="relative z-10 flex min-h-screen items-center justify-center px-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center">
              <motion.h2
                className="font-display text-2xl md:text-4xl text-accent mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                You have a special delivery... 💌
              </motion.h2>

              {!cardOpen ? (
                <motion.div
                  className="relative mx-auto w-72 md:w-96 h-48 md:h-64 rounded-xl bg-gradient-to-br from-primary to-rose-glow shadow-2xl animate-pulse-glow cursor-pointer flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenCard}
                >
                  <div className="text-center">
                    <p className="text-5xl mb-3">💌</p>
                    <p className="font-display text-xl text-primary-foreground font-bold">
                      Tap to Open
                    </p>
                    <p className="font-body text-sm text-primary-foreground/70 mt-1">
                      (with love inside)
                    </p>
                  </div>
                  {/* Decorative hearts */}
                  {[...Array(4)].map((_, i) => (
                    <span
                      key={i}
                      className="absolute animate-sparkle text-lg"
                      style={{
                        top: `${10 + i * 20}%`,
                        left: i % 2 === 0 ? "5%" : "85%",
                        animationDelay: `${i * 0.4}s`,
                      }}
                    >
                      ✨
                    </span>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  className="relative mx-auto w-72 md:w-96"
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: -170 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  style={{ perspective: 800, transformStyle: "preserve-3d", transformOrigin: "left center" }}
                >
                  <div className="w-full h-48 md:h-64 rounded-xl bg-gradient-to-br from-primary to-rose-glow shadow-2xl flex items-center justify-center">
                    <p className="font-display text-2xl text-primary-foreground">
                      Opening... 💕
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Phase 3: The Question */}
        {phase === "question" && (
          <motion.div
            key="question"
            className="relative z-10 flex min-h-screen items-center justify-center px-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center max-w-lg">
              <motion.div
                className="text-6xl mb-6"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                🌹
              </motion.div>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-primary mb-4">
                Will You Be My Valentine?
              </h2>
              <p className="font-body text-lg md:text-xl text-muted-foreground mb-12">
                And go on the most amazing date with me? 💕
              </p>

              <div className="flex items-center justify-center gap-8 relative">
                {/* YES Button */}
                <motion.button
                  className="px-10 py-4 rounded-xl bg-gradient-to-r from-primary to-rose-glow text-primary-foreground font-display text-xl md:text-2xl font-bold shadow-lg"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 0 20px hsl(350 80% 55% / 0.4)",
                      "0 0 40px hsl(350 80% 55% / 0.6)",
                      "0 0 20px hsl(350 80% 55% / 0.4)",
                    ],
                  }}
                  transition={{ boxShadow: { repeat: Infinity, duration: 2 } }}
                  onClick={handleYes}
                >
                  YES! 💖
                </motion.button>

                {/* NO Button - dodges away */}
                <motion.button
                  className="px-8 py-3 rounded-xl border border-border text-muted-foreground font-display text-lg"
                  style={{
                    transform: `translate(${noPosition.x}px, ${noPosition.y}px) scale(${noScale})`,
                    transition: "transform 0.3s ease-out",
                  }}
                  onMouseEnter={handleNoHover}
                  onTouchStart={handleNoHover}
                  onClick={handleNoHover}
                >
                  No 😢
                </motion.button>
              </div>

              <motion.p
                className="mt-8 font-body text-sm text-muted-foreground italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                (Hint: There's really only one correct answer here 😏)
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Celebration */}
      <Celebration show={phase === "celebration"} />
    </div>
  );
};

export default Index;
