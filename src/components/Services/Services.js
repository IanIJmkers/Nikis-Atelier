import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";

const ServiceSection = styled.section`
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

const ServiceContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const CategorySection = styled(motion.div)`
  margin-bottom: 4rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CategoryTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 300;
  color: var(--dark);
  margin-bottom: 2rem;
  font-family: var(--font-display);
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--secondary);
`;

const ServiceList = styled.div`
  background-color: var(--white);
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.04);
  overflow: hidden;
`;

const ServiceItem = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.75rem 2rem;
  border-bottom: 1px solid var(--secondary);
  transition: all 0.3s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: rgba(196, 164, 174, 0.03);
    padding-left: 2.5rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.5rem 1.5rem;
    gap: 0.75rem;

    &:hover {
      padding-left: 1.5rem;
    }
  }
`;

const ServiceInfo = styled.div`
  flex: 1;
`;

const ServiceName = styled.h4`
  font-size: 1.1rem;
  font-weight: 400;
  color: var(--dark);
  margin-bottom: 0.4rem;
  font-family: var(--font-primary);
  letter-spacing: 0.02em;
`;

const ServiceDescription = styled.p`
  font-size: 0.9rem;
  color: var(--mid);
  line-height: 1.6;
  opacity: 0.85;
  max-width: 500px;
`;

const ServicePricing = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;

  @media (max-width: 768px) {
    align-items: flex-start;
    width: 100%;
  }
`;

const ServicePrice = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--primary);
  font-family: var(--font-display);
  white-space: nowrap;
`;

const ServiceDuration = styled.span`
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--mid);
  opacity: 0.75;
  font-style: italic;
`;

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const titleAnimation = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.4,
        ease: "easeOut",
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + index * 0.15,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 * index,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const serviceCategories = [
    {
      category: "Manicure Services",
      services: [
        {
          name: "Classic Manicure",
          description:
            "Nail shaping, cuticle care, hand massage, and polish application",
          price: "€35",
          duration: "45 min",
        },
        {
          name: "Gel Polish Manicure",
          description:
            "Long-lasting gel polish with all classic manicure benefits",
          price: "€45",
          duration: "60 min",
        },
        {
          name: "Luxury Spa Manicure",
          description:
            "Exfoliation, hydrating mask, extended massage, and premium polish",
          price: "€55",
          duration: "75 min",
        },
        {
          name: "Express Manicure",
          description: "Quick nail shaping and polish for those on the go",
          price: "€25",
          duration: "30 min",
        },
      ],
    },
    {
      category: "Pedicure Services",
      services: [
        {
          name: "Classic Pedicure",
          description:
            "Nail shaping, cuticle care, callus removal, foot massage, and polish",
          price: "€45",
          duration: "60 min",
        },
        {
          name: "Gel Polish Pedicure",
          description:
            "Long-lasting gel polish with all classic pedicure benefits",
          price: "€55",
          duration: "75 min",
        },
        {
          name: "Luxury Spa Pedicure",
          description:
            "Complete rejuvenation with exfoliation, mask, extended massage, and premium polish",
          price: "€65",
          duration: "90 min",
        },
        {
          name: "Express Pedicure",
          description: "Quick nail care and polish application",
          price: "€35",
          duration: "45 min",
        },
      ],
    },
  ];

  return (
    <ServiceSection id="services" ref={ref}>
      <SectionTitle
        variants={titleAnimation}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        My Services
      </SectionTitle>

      <ServiceContainer>
        {serviceCategories.map((category, categoryIndex) => (
          <CategorySection
            key={categoryIndex}
            custom={categoryIndex}
            variants={categoryVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <CategoryTitle>{category.category}</CategoryTitle>
            <ServiceList>
              {category.services.map((service, serviceIndex) => (
                <ServiceItem
                  key={serviceIndex}
                  custom={serviceIndex}
                  variants={itemVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  <ServiceInfo>
                    <ServiceName>{service.name}</ServiceName>
                    <ServiceDescription>
                      {service.description}
                    </ServiceDescription>
                  </ServiceInfo>
                  <ServicePricing>
                    <ServicePrice>{service.price}</ServicePrice>
                    <ServiceDuration>{service.duration}</ServiceDuration>
                  </ServicePricing>
                </ServiceItem>
              ))}
            </ServiceList>
          </CategorySection>
        ))}
      </ServiceContainer>
    </ServiceSection>
  );
};

export default Services;
