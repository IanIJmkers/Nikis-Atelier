import React, { useRef, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TestimonialSection = styled.section`
  padding: 100px 5%;
  background-color: #faf5f7;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--dark);
  position: relative;

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

const TestimonialsContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuoteIcon = styled.div`
  font-size: 2.5rem;
  color: var(--primary);
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
`;

const TestimonialText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: var(--dark);
  font-style: italic;
`;

const ClientInfo = styled.div`
  margin-top: 2rem;
`;

const ClientName = styled.h4`
  font-size: 1.2rem;
  color: var(--dark);
  margin-bottom: 0.3rem;
`;

const ClientTitle = styled.p`
  font-size: 0.9rem;
  color: var(--accent);
`;

const NavigationButton = styled(motion.button)`
  position: absolute;
  background-color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--dark);
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.prev {
    left: 0;
  }

  &.next {
    right: 0;
  }
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.active ? "var(--accent)" : "var(--primary)"};
  border: none;
  padding: 0;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const ref = useRef(null);

  const testimonials = [
    {
      id: 1,
      text: "I've been coming to Niki's Atelier for over a year now, and I'm consistently amazed by the quality of their work. The nail designs are absolutely stunning, and the ambiance is so relaxing. It's my favorite self-care ritual!",
      name: "Sophia Williams",
      title: "Regular Client",
    },
    {
      id: 2,
      text: "Niki's Atelier created the most incredible nail designs for my wedding day. The attention to detail was exceptional, and the designs perfectly complemented my bridal look. I received so many compliments, and the nails looked flawless in all of our photos!",
      name: "Emma Thompson",
      title: "Bridal Client",
    },
    {
      id: 3,
      text: "The level of creativity and precision at Niki's Atelier is unmatched. I always look forward to my appointments because I know I'll leave with nail art that's truly unique and expertly crafted. Their gel manicures last longer than any I've had before!",
      name: "Olivia Chen",
      title: "Monthly Client",
    },
    {
      id: 4,
      text: "As someone who uses their hands in client meetings, having well-manicured nails is important to me. Niki's Atelier provides exceptional service that's both professional and luxurious. The staff is attentive, and the results are always perfect.",
      name: "Isabella Rodriguez",
      title: "Business Professional",
    },
  ];

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
    }),
  };

  return (
    <TestimonialSection id="testimonials" ref={ref}>
      <SectionTitle>Client Love</SectionTitle>
      <TestimonialsContainer>
        <NavigationButton
          className="prev"
          onClick={prevTestimonial}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaChevronLeft />
        </NavigationButton>

        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              backgroundColor: "white",
              borderRadius: "15px",
              padding: "3rem",
              textAlign: "center",
              boxShadow: "0 5px 25px rgba(0, 0, 0, 0.05)",
              width: "100%",
              maxWidth: "800px",
              position: "absolute",
            }}
          >
            <QuoteIcon>
              <FaQuoteLeft />
            </QuoteIcon>
            <TestimonialText>{testimonials[currentIndex].text}</TestimonialText>
            <ClientInfo>
              <ClientName>{testimonials[currentIndex].name}</ClientName>
              <ClientTitle>{testimonials[currentIndex].title}</ClientTitle>
            </ClientInfo>
          </motion.div>
        </AnimatePresence>

        <NavigationButton
          className="next"
          onClick={nextTestimonial}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaChevronRight />
        </NavigationButton>
      </TestimonialsContainer>

      <Dots>
        {testimonials.map((_, index) => (
          <Dot
            key={index}
            active={currentIndex === index}
            onClick={() => goToTestimonial(index)}
          />
        ))}
      </Dots>
    </TestimonialSection>
  );
};

// Correct way to export a component by default
export default Testimonials;
