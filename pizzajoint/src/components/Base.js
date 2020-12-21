import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// We can use variants to configure animate, initial and transition properties.
// Just create an object outside the Component and add objects for visible and hidden.
// Visible is for animateand Hidden is for Initial
const conatinerVariants = {
  hidden: {
    x: "100vw",
    opacity: 0,
  },
  visible: {
    opacity: 1,
    x: 0,
    // You can nest the transition in the animate property and it automatically applies it
    transition: {
      type: "spring",
      delay: 0.5,
    },
  },
  exit: {
    x: "-100vw",
    transition: {
      ease: "easeInOut",
    },
  },
};

const nextVariants = {
  hidden: {
    x: "-100vw",
  },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 120,
    },
  },
};

const buttonVariants = {
  // applying below object to whileHover in button
  hover: {
    // the below is the keyframes for the animation on hover to the button
    // scale: [1, 1.1, 1, 1.1, 1, 1.1, 1],
    scale: 1.1,
    textShadow: "0px 0px 8px rgb(255, 255, 255)",
    boxShadow: "0px 0px 8px rgb(255, 255, 255)",
    // adding transition to use 'yoyo' property
    transition: {
      duration: 0.3,
      // yoyo property is useful to run repeated animation of keyframes
      // here yoyo runs hover property infinitely
      yoyo: Infinity,
    },
  },
};

const Base = ({ addBase, pizza }) => {
  const bases = ["Classic", "Thin & Crispy", "Thick Crust"];

  return (
    <motion.div
      className="base container"
      // this is how you can use variants
      variants={conatinerVariants}
      // assigning the variant object key to the props to access value object
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h3>Step 1: Choose Your Base</h3>
      <ul>
        {bases.map((base) => {
          let spanClass = pizza.base === base ? "active" : "";
          return (
            <motion.li
              key={base}
              onClick={() => addBase(base)}
              whileHover={{
                scale: 1.3,
                color: "#f8e112",
                originX: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
              }}
            >
              <span className={spanClass}>{base}</span>
            </motion.li>
          );
        })}
      </ul>

      {pizza.base && (
        <motion.div
          className="next"
          // motion components overrides the variants of parent component
          // thus this div overrides the initial, animate and transition properties from parent div
          variants={nextVariants}
        >
          <Link to="/toppings">
            <motion.button variants={buttonVariants} whileHover="hover">
              Next
            </motion.button>
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Base;
