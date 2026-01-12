import React, { useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import shadeVideo from "../../assets/videos/shade.mp4";

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    rgba(255, 255, 255, 0.55),
    rgba(255, 255, 255, 0.35)
  );
`;

const VideoContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
`;

const CenterVideoContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%; /* Full width coverage */
  height: 100%; /* Full height coverage */
  overflow: hidden;
  /* Much more gradual and extended radial gradient for softer edges */
  mask-image: radial-gradient(
    ellipse 100% 100% at center,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.75) 20%,
    rgba(0, 0, 0, 0.7) 30%,
    rgba(0, 0, 0, 0.6) 40%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.2) 65%,
    rgba(0, 0, 0, 0.1) 75%,
    rgba(0, 0, 0, 0) 100%
  );
  -webkit-mask-image: radial-gradient(
    ellipse 100% 100% at center,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.75) 20%,
    rgba(0, 0, 0, 0.7) 30%,
    rgba(0, 0, 0, 0.6) 40%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.2) 65%,
    rgba(0, 0, 0, 0.1) 75%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const VideoBackground = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  opacity: 1;
  filter: brightness(1.1) contrast(0.9) blur(0.5px);
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
  padding: 0 2rem;
  z-index: 2;
  position: relative;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 1rem;
  color: var(--dark);
  line-height: 1.2;
  text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.7);
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: var(--dark);
  opacity: 0.9;
  line-height: 1.6;
  text-shadow: 0px 0px 5px rgba(255, 255, 255, 0.7);
`;

const Button = styled(motion.button)`
  background-color: var(--accent);
  color: var(--light);
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.3s ease;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-3px);
  }
`;

const Hero = () => {
  const shadeVideoRef = useRef(null);

  return (
    <HeroSection id="home">
      <VideoContainer>
        {/* Additional overlay for consistent coloring */}
        <VideoOverlay />

        {/* Center video with radial fade */}
        <CenterVideoContainer>
          <VideoBackground
            ref={shadeVideoRef}
            autoPlay
            loop
            muted
            playsInline
            src={shadeVideo}
          />
        </CenterVideoContainer>
      </VideoContainer>

      <HeroContent>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Niki's Atelier
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Timeless elegance with a creative and playful twist.
        </Subtitle>
        <Link
          to="services"
          spy={true}
          smooth={true}
          offset={-80}
          duration={500}
        >
          <Button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Services
          </Button>
        </Link>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;
