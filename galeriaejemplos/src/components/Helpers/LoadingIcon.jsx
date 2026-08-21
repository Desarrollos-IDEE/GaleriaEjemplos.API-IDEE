import { motion } from "framer-motion";
const EJEMPLOS = '/galeriaejemplos/static/svg/API_1.svg';

const LoadingIcon = ({
    width = 512,
    height = 512,
    backgroundColor = "rgba(255, 255, 255, 0.6)",
    src = EJEMPLOS,
}) => (
    <div
        style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor,
            backdropFilter: "blur(2px)", // subtle polish ✨ optional
            zIndex: 9999,
        }}
    >
        <motion.img
            src={src}
            alt="Loading..."
            style={{
                width: width,
                height: height,
                objectFit: "contain",
            }}
            animate={{
                scale: [1, 1.12, 1],
                opacity: [0.85, 1, 0.85],
            }}
            transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
    </div>
);

export default LoadingIcon;
