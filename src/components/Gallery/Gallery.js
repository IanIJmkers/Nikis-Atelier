import React, { useRef, useState } from "react";
import styled from "styled-components";
import { motion, useInView, AnimatePresence } from "framer-motion";

// Keeping all your styled components exactly as they are
const GallerySection = styled.section`
  padding: 100px 5%;
  background-color: var(--light);
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--dark);
  position: relative;
  font-family: var(--font-display);
  font-weight: 300;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: var(--accent);
  }
`;

const GalleryGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const GalleryItem = styled(motion.div)`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  aspect-ratio: 1 / 1;
  cursor: pointer;
`;

const GalleryImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const GalleryOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(191, 155, 168, 0.7); /* Updated to boho pink palette */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1.5rem;
`;

const OverlayText = styled(motion.h3)`
  color: var(--white);
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;
  font-family: var(--font-display);
  font-weight: 300;
`;

const OverlayDescription = styled(motion.p)`
  color: var(--white);
  font-size: 1rem;
  text-align: center;
  margin-top: 0.5rem;
  opacity: 0.9;
`;

// New component for expanded view
const ExpandedView = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const ExpandedImage = styled(motion.img)`
  max-width: 90%;
  max-height: 80vh;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: var(--accent);
  color: var(--white);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selectedImage, setSelectedImage] = useState(null);

  // Slowed down title animation for more elegance
  const titleAnimation = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.4, // Much slower title fade-in
        ease: "easeOut",
      },
    },
  };

  // Slowed down and refined container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25, // More space between item appearances
        delayChildren: 0.6, // Longer delay before items start appearing
        duration: 1.2, // Longer overall duration
        ease: "easeInOut", // Smoother easing function
      },
    },
  };

  // Gentler item entrance animations
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 }, // Added y movement for flowing entrance
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 40, // Much softer spring
        damping: 14, // Balanced damping for gentle movement
        mass: 1, // Added mass for more graceful physics
        duration: 1.4, // Much longer duration for calm appearance
      },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  // Keeping these the same for hover effects
  const imageVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      transition: { duration: 0.4 },
    },
  };

  const overlayVariants = {
    initial: { opacity: 0 },
    hover: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    hover: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: 0.1,
      },
    },
  };

  // Enhanced gallery items
  const galleryItems = [
    {
      id: 1,
      image: "/images/1.JPG",
      title: "Elegant French Manicure",
      description: "A timeless classic with a modern twist",
    },
    {
      id: 2,
      image: "/images/2.jpg",
      title: "Sparkle Gel Design",
      description: "Luxurious and eye-catching for special occasions",
    },
    {
      id: 3,
      image: "/images/3.jpg",
      title: "Minimalist Art",
      description: "Simple, elegant designs for the modern woman",
    },
    {
      id: 4,
      image: "/images/4.jpg",
      title: "Summer Collection",
      description: "Vibrant colors inspired by tropical getaways",
    },
    {
      id: 5,
      image: "/images/5.jpg",
      title: "Wedding Nails",
      description: "Subtle elegance for your special day",
    },
    {
      id: 6,
      image: "/images/6.jpg",
      title: "Bold Geometric Patterns",
      description: "Contemporary designs with striking visual impact",
    },
  ];

  return (
    <GallerySection id="gallery" ref={ref}>
      <SectionTitle
        variants={titleAnimation}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        My Work
      </SectionTitle>

      <GalleryGrid
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {galleryItems.map((item, index) => (
          <GalleryItem
            key={item.id}
            variants={itemVariants}
            whileHover="hover"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            // Custom transition for each item for a more flowing, staggered effect
            custom={index}
            onClick={() => setSelectedImage(item)}
          >
            <GalleryImage
              src={
                item.image ||
                `https://via.placeholder.com/400x400?text=${encodeURIComponent(
                  item.title
                )}`
              }
              alt={item.title}
              variants={imageVariants}
              initial="initial"
              whileHover="hover"
            />
            <GalleryOverlay
              variants={overlayVariants}
              initial="initial"
              whileHover="hover"
            >
              <OverlayText variants={textVariants}>{item.title}</OverlayText>
              <OverlayDescription variants={textVariants}>
                {item.description}
              </OverlayDescription>
            </GalleryOverlay>
          </GalleryItem>
        ))}
      </GalleryGrid>

      {/* Modal with gentler transitions */}
      <AnimatePresence mode="wait">
        {selectedImage && (
          <ExpandedView
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.7 } }}
            exit={{ opacity: 0, transition: { duration: 0.7 } }}
            onClick={() => setSelectedImage(null)}
          >
            <ExpandedImage
              src={
                selectedImage.image ||
                `https://via.placeholder.com/800x800?text=${encodeURIComponent(
                  selectedImage.title
                )}`
              }
              alt={selectedImage.title}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 70, // Gentler spring
                  damping: 20,
                  duration: 0.8,
                },
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
                transition: { duration: 0.6 },
              }}
              onClick={(e) => e.stopPropagation()}
            />
            <CloseButton
              onClick={() => setSelectedImage(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              ✕
            </CloseButton>
          </ExpandedView>
        )}
      </AnimatePresence>
    </GallerySection>
  );
};

export default Gallery;
