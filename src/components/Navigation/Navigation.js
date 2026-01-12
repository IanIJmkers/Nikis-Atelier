import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
  transition: background-color 0.3s ease;
  background-color: ${({ scrolled }) =>
    scrolled ? "var(--light)" : "transparent"};
  box-shadow: ${({ scrolled }) =>
    scrolled ? "0 2px 10px rgba(0,0,0,0.1)" : "none"};
`;

const LogoContainer = styled.div`
  width: 180px; /* Set fixed width to maintain layout */
  height: 36px; /* Set fixed height based on 1.8rem font size */
  position: relative;
`;

const Logo = styled(motion.div)`
  font-family: var(--font-main);
  font-size: 1.8rem;
  color: var(--dark);
  position: absolute;
  top: 0;
  left: 0;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 935px) {
    justify-content: flex-end;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;

  @media (max-width: 935px) {
    flex-direction: column;
    position: absolute;
    top: 70px;
    right: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
    width: 250px;
    background-color: var(--light);
    padding: 2rem;
    box-shadow: -2px 2px 10px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease-in-out;
    height: calc(100vh - 70px);
    z-index: 99;
  }
`;

const NavItem = styled.li`
  cursor: pointer;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: var(--accent);
    transition: width 0.3s ease;
    opacity: 0;
  }

  &:hover::after {
    width: 100%;
    opacity: 1;
  }

  @media (max-width: 935px) {
    margin-bottom: 1.5rem;

    &::after {
      bottom: -3px;
    }
  }
`;

const StyledLink = styled(Link)`
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--dark);
  text-decoration: none;
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 101;

  @media (max-width: 935px) {
    display: block;
    margin-left: 1rem;
  }
`;

const HamburgerIcon = styled.div`
  width: 25px;
  height: 20px;
  position: relative;
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;

  span {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    background: var(--dark);
    border-radius: 3px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;

    &:nth-child(1) {
      top: ${({ isOpen }) => (isOpen ? "9px" : "0px")};
      transform: ${({ isOpen }) => (isOpen ? "rotate(135deg)" : "rotate(0)")};
    }

    &:nth-child(2) {
      top: 9px;
      opacity: ${({ isOpen }) => (isOpen ? "0" : "1")};
    }

    &:nth-child(3) {
      top: ${({ isOpen }) => (isOpen ? "9px" : "18px")};
      transform: ${({ isOpen }) => (isOpen ? "rotate(-135deg)" : "rotate(0)")};
    }
  }
`;

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Get the services section position to determine when to show the logo
      const servicesSection = document.getElementById("services");
      if (servicesSection) {
        const servicesSectionTop = servicesSection.getBoundingClientRect().top;

        // Show logo when approaching the services section
        // We use a small offset (50px) to start the fade-in slightly before reaching the section
        if (servicesSectionTop <= 50) {
          setShowLogo(true);
        } else {
          setShowLogo(false);
        }
      }

      // Update active link based on scroll position
      const sections = [
        "home",
        "gallery",
        "services",
        "about",
        "testimonials",
        "booking",
      ];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveLink(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Nav scrolled={scrolled}>
      <LogoContainer>
        <AnimatePresence>
          {showLogo && (
            <Logo
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              Niki's Atelier
            </Logo>
          )}
        </AnimatePresence>
      </LogoContainer>

      <NavContainer>
        <NavLinks isOpen={isOpen}>
          {[
            "home",
            "gallery",
            "services",
            "about",
            "testimonials",
            "booking",
          ].map((item, index) => {
            const itemId = item.replace(/\s+/g, "-");
            return (
              <NavItem key={index}>
                <StyledLink
                  to={itemId}
                  smooth={true}
                  duration={500}
                  spy={true}
                  activeClass="active"
                  onClick={() => {
                    setIsOpen(false);
                    setActiveLink(itemId);
                  }}
                >
                  {item}
                </StyledLink>
              </NavItem>
            );
          })}
        </NavLinks>

        <HamburgerButton onClick={toggleMenu} aria-label="Toggle menu">
          <HamburgerIcon isOpen={isOpen}>
            <span></span>
            <span></span>
            <span></span>
          </HamburgerIcon>
        </HamburgerButton>
      </NavContainer>
    </Nav>
  );
};

export default Navigation;
