import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import portraitImage from "../../assets/images/portrait.jpeg";

const AboutSection = styled.section`
  padding: 100px 5%;
  background-color: var(--light);
`;

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 4rem;

  @media (max-width: 992px) {
    flex-direction: column-reverse;
    text-align: center;
  }
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

const AboutImage = styled(motion.div)`
  flex: 1;

  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

const AboutContent = styled(motion.div)`
  flex: 1;
`;

const AboutTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: var(--dark);
`;

const AboutText = styled.p`
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: var(--dark);
  opacity: 0.9;
`;

const StatsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const StatItem = styled(motion.div)`
  text-align: center;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const StatNumber = styled.h4`
  font-size: 2.5rem;
  color: var(--accent);
  margin-bottom: 0.5rem;
`;

const StatTitle = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--dark);
`;

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <AboutSection id="about" ref={ref}>
      <SectionTitle>About Me</SectionTitle>
      <AboutContainer>
        <AboutContent
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <AboutTitle>Welcome to Niki's Atelier</AboutTitle>
          <AboutText>
            Welcome to Niki’s Atelier! I’m Niki, an art graduate with a passion
            for creativity and design. My goal is to bring a playful and modern
            twist to a traditionally feminine space—blending classic elegance
            with a fresh, creative edge. At Niki’s Atelier, you’ll find pieces
            that are chic, stylish, and full of personality. Whether through
            bold details, unique textures, or a hint of fun, I believe that
            sophistication doesn’t have to be serious. It’s all about embracing
            beauty with a touch of creativity!
          </AboutText>

          <StatsContainer
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.5,
                },
              },
            }}
          >
            <StatItem
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <StatNumber>5+</StatNumber>
              <StatTitle>Years of Experience</StatTitle>
            </StatItem>
            <StatItem
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <StatNumber>Custom</StatNumber>
              <StatTitle>Nail Designs</StatTitle>
            </StatItem>
            <StatItem
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <StatNumber>Certified</StatNumber>
              <StatTitle>In Gel & Acrylic Applications</StatTitle>
            </StatItem>
          </StatsContainer>
        </AboutContent>

        <AboutImage
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src={portraitImage}
            alt="Niki's Atelier interior"
            style={{ width: "90%", height: "auto" }}
          />
        </AboutImage>
      </AboutContainer>
    </AboutSection>
  );
};

export default About;
