import { motion, useReducedMotion } from "framer-motion";

const PARTICLES = [
  { left: "15%", duration: 9.2, delay: 0.4 },
  { left: "28%", duration: 12.5, delay: 2.1 },
  { left: "42%", duration: 8.7, delay: 1.2 },
  { left: "55%", duration: 13.4, delay: 3.5 },
  { left: "68%", duration: 10.1, delay: 0.8 },
  { left: "75%", duration: 11.8, delay: 4.2 },
  { left: "83%", duration: 9.6, delay: 1.9 },
  { left: "22%", duration: 14.0, delay: 5.0 },
  { left: "36%", duration: 10.8, delay: 2.7 },
  { left: "62%", duration: 8.5, delay: 3.1 },
];

export default function HeroFloatingImage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "490px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
      }}
    >
      {/* Glow nền thở */}
      <motion.div
        style={{
          position: "absolute",
          width: "420px",
          height: "420px",
          borderRadius: "9999px",
          pointerEvents: "none",
          background:
            "radial-gradient(circle, rgba(255,30,30,0.35) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
        animate={
          shouldReduceMotion
            ? {}
            : { scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }
        }
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Ảnh chân dung — load-in rồi float vô hạn */}
      <motion.img
        src="/background.png"
        alt="Dang Dinh Nguyen"
        style={{
          position: "relative",
          zIndex: 10,
          maxHeight: "490px",
          objectFit: "contain",
          filter: "drop-shadow(0 0 40px rgba(255,0,0,0.25))",
        }}
        initial={{ opacity: 0, y: -40 }}
        animate={{
          opacity: 1,
          y: shouldReduceMotion ? 0 : [0, -10, 0],
        }}
        transition={
          shouldReduceMotion
            ? { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
            : {
                opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                y: {
                  delay: 0.6,
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }
        }
      />

      {/* Particle bay nhẹ quanh ảnh */}
      {!shouldReduceMotion &&
        PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            style={{
              position: "absolute",
              width: "4px",
              height: "4px",
              borderRadius: "9999px",
              backgroundColor: "rgba(255, 51, 68, 0.6)",
              left: p.left,
              bottom: "-10px",
            }}
            animate={{ y: [0, -300], opacity: [0, 0.7, 0] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
          />
        ))}
    </div>
  );
}
