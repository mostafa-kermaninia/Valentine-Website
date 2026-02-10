import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface CelebrationProps {
  show: boolean;
}

const Celebration = ({ show }: CelebrationProps) => {
  if (show) {
    // Fire confetti
    const duration = 5000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff4d6d", "#ffd700", "#ff8fab", "#fb6f92"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ff4d6d", "#ffd700", "#ff8fab", "#fb6f92"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-center px-8 max-w-lg"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 15, delay: 0.3 }}
          >
            <motion.div
              className="text-7xl mb-6"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              🎉❤️🎉
            </motion.div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary mb-6">
              YAAAY!
            </h1>
            <motion.p
              className="font-body text-xl md:text-2xl text-foreground leading-relaxed mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              I knew you'd say yes! 💕
            </motion.p>
            <motion.p
              className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              Get ready for the most magical Valentine's date ever. 
              I promise it'll be filled with love, laughter, and way too much chocolate. 🍫🌹
            </motion.p>
            <motion.p
              className="font-display text-2xl md:text-3xl italic text-accent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              See you on Feb 14th, my love ✨
            </motion.p>
            <motion.div
              className="mt-8 flex justify-center gap-4 text-4xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
            >
              {["🌹", "💋", "💝", "🥂", "✨"].map((emoji, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                >
                  {emoji}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Celebration;
