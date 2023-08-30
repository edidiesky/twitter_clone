export const dropin = {
  hidden: {
    transform: "scale(0) rotate(720deg)",
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
  visible: {
    transform: " scale(1) rotate(0deg)",
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    transform: "scale(0) rotate(-720deg)",
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export const flip = {
  hidden: {
    transform: "translateY(100%)",
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
  visible: {
    transform: "translateY(0)",
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
  exit: {
    transform: "translateY(100%)",
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const slideUp = {
  hidden: {
    transform: "translateY('300%)",
    opacity: 1,
   
  },
  visible: {
    transform: "translateY(0)",
    opacity: 1,
    transition: {
      duration: 0.3,
      type: "spring",
      damping: 26,
      stiffness: 600,
    },
  },
  exit: {
    transform: "translateY(300%)",
    opacity: 1,
   
  },
};
