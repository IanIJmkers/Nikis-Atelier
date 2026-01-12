import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Mail,
  Clock,
  CreditCard,
  Check,
  User,
  Phone,
  MessageSquare,
} from "lucide-react";

// Import Stripe components
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Import Firebase
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const functions = getFunctions(app);

// Initialize Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// Styled Components
const BookingSection = styled.section`
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

const BookingContainer = styled(motion.div)`
  max-width: 900px;
  margin: 0 auto;
  background-color: var(--white);
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.04);
  overflow: hidden;
`;

const StepIndicators = styled.div`
  display: flex;
  justify-content: center;
  padding: 2.5rem 2rem;
  border-bottom: 1px solid var(--secondary);
  background-color: var(--white);

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const StepItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 0 1.5rem;

  @media (max-width: 768px) {
    margin: 0 0.75rem;
  }
`;

const StepCircle = styled(motion.div)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.$active
      ? "var(--primary)"
      : props.$completed
      ? "var(--accent)"
      : "var(--secondary)"};
  color: ${(props) =>
    props.$active || props.$completed ? "var(--white)" : "var(--mid)"};
  position: relative;
  transition: all 0.4s ease;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const StepConnector = styled.div`
  position: absolute;
  top: 25px;
  left: 100%;
  width: 60px;
  height: 2px;
  background-color: ${(props) =>
    props.$completed ? "var(--accent)" : "var(--secondary)"};
  transition: all 0.4s ease;

  @media (max-width: 768px) {
    width: 40px;
    top: 20px;
  }
`;

const StepLabel = styled.span`
  margin-top: 0.75rem;
  font-size: 0.85rem;
  font-weight: ${(props) => (props.$active ? "500" : "300")};
  color: ${(props) => (props.$active ? "var(--primary)" : "var(--mid)")};
  letter-spacing: 0.05em;
  font-family: var(--font-primary);

  @media (max-width: 768px) {
    font-size: 0.7rem;
    margin-top: 0.5rem;
  }
`;

const FormContent = styled.div`
  padding: 3rem 2.5rem;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const FormTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 400;
  color: var(--dark);
  margin-bottom: 1rem;
  font-family: var(--font-display);
`;

const FormDescription = styled.p`
  color: var(--mid);
  margin-bottom: 2.5rem;
  line-height: 1.8;
  font-size: 0.95rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 400;
  color: var(--dark);
  margin-bottom: 0.5rem;
  font-family: var(--font-primary);

  span {
    color: var(--accent);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem 1rem;
  border: 1px solid var(--secondary);
  border-radius: 6px;
  font-size: 0.95rem;
  font-family: var(--font-primary);
  color: var(--dark);
  background-color: var(--white);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(196, 164, 174, 0.1);
  }

  &::placeholder {
    color: var(--mid);
    opacity: 0.6;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.9rem 1rem;
  border: 1px solid var(--secondary);
  border-radius: 6px;
  font-size: 0.95rem;
  font-family: var(--font-primary);
  color: var(--dark);
  background-color: var(--white);
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(196, 164, 174, 0.1);
  }

  &::placeholder {
    color: var(--mid);
    opacity: 0.6;
  }
`;

const GridInputs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled(motion.div)`
  padding: 1.5rem;
  border: 2px solid
    ${(props) => (props.$selected ? "var(--primary)" : "var(--secondary)")};
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) =>
    props.$selected ? "rgba(196, 164, 174, 0.05)" : "var(--white)"};
  transition: all 0.3s ease;
  margin-bottom: 1rem;

  &:hover {
    border-color: var(--primary);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(74, 63, 67, 0.08);
  }
`;

const ServiceName = styled.h4`
  font-size: 1.2rem;
  font-weight: 400;
  color: var(--dark);
  margin-bottom: 0.5rem;
  font-family: var(--font-display);
`;

const ServiceDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.75rem;
`;

const ServiceTime = styled.span`
  font-size: 0.85rem;
  color: var(--mid);
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const ServicePrice = styled.span`
  font-size: 1.3rem;
  font-weight: 400;
  color: var(--primary);
  font-family: var(--font-display);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled(motion.button)`
  flex: 1;
  padding: 0.9rem 2rem;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  font-family: var(--font-primary);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled(Button)`
  background-color: var(--primary);
  color: var(--white);

  &:hover:not(:disabled) {
    background-color: var(--dark);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(74, 63, 67, 0.15);
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: var(--dark);
  border: 1px solid var(--secondary);

  &:hover:not(:disabled) {
    border-color: var(--primary);
    color: var(--primary);
  }
`;

const SummaryBox = styled.div`
  background-color: var(--secondary);
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(74, 63, 67, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const SummaryLabel = styled.span`
  font-weight: 400;
  color: var(--dark);
  font-size: 0.95rem;
`;

const SummaryValue = styled.span`
  color: var(--mid);
  font-size: 0.95rem;
  text-align: right;
  max-width: 60%;
`;

const DepositBox = styled.div`
  background: linear-gradient(
    135deg,
    rgba(196, 164, 174, 0.1),
    rgba(217, 191, 199, 0.1)
  );
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  border: 1px solid var(--accent);
`;

const DepositTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 400;
  color: var(--dark);
  margin-bottom: 0.75rem;
  font-family: var(--font-display);
`;

const DepositDescription = styled.p`
  color: var(--mid);
  font-size: 0.9rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
`;

const DepositAmount = styled.div`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 300;
  color: var(--primary);
  font-family: var(--font-display);
  margin: 1rem 0;
`;

const CalendlyContainer = styled.div`
  border: 1px solid var(--secondary);
  border-radius: 8px;
  overflow: hidden;
  margin-top: 1.5rem;
`;

const CalendlyHeader = styled.div`
  background-color: var(--secondary);
  padding: 1rem 1.5rem;
  font-weight: 400;
  color: var(--dark);
  border-bottom: 1px solid rgba(74, 63, 67, 0.1);
  font-family: var(--font-primary);
`;

const ConfirmationBox = styled.div`
  text-align: center;
  padding: 2rem;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(
    135deg,
    rgba(196, 164, 174, 0.2),
    rgba(217, 191, 199, 0.2)
  );
  border-radius: 50%;
  margin: 0 auto 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
`;

const ConfirmationTitle = styled.h3`
  font-size: 2rem;
  font-weight: 400;
  color: var(--dark);
  margin-bottom: 1rem;
  font-family: var(--font-display);
`;

const ConfirmationText = styled.p`
  color: var(--mid);
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const ReferenceBox = styled.div`
  background-color: var(--secondary);
  padding: 1.5rem;
  border-radius: 8px;
  text-align: left;
  margin: 2rem 0;
`;

const ReferenceLabel = styled.p`
  font-size: 0.85rem;
  color: var(--mid);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ReferenceCode = styled.p`
  font-family: "Courier New", monospace;
  font-size: 0.9rem;
  background-color: rgba(74, 63, 67, 0.05);
  padding: 0.75rem;
  border-radius: 4px;
  word-break: break-all;
  color: var(--dark);
`;

const AppointmentDetails = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(74, 63, 67, 0.1);
`;

const DetailLabel = styled.p`
  font-size: 0.85rem;
  color: var(--mid);
  margin-bottom: 0.3rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const DetailValue = styled.p`
  font-weight: 400;
  color: var(--dark);
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

// Payment Form Component
const PaymentForm = ({
  amount,
  description,
  formValues,
  selectedService,
  appointmentTime,
  onSuccess,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const createPaymentIntent = httpsCallable(functions, "createPaymentIntent");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      setIsProcessing(false);
      return;
    }

    try {
      const response = await createPaymentIntent({
        amount: parseFloat(amount.replace("€", "")) * 100,
        description,
        customer: {
          name: `${formValues.firstName} ${formValues.lastName}`,
          email: formValues.email,
          phone: formValues.phone,
        },
        metadata: {
          service: selectedService.name,
          appointmentTime: appointmentTime || "Not scheduled yet",
        },
      });

      const { clientSecret } = response.data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${formValues.firstName} ${formValues.lastName}`,
            email: formValues.email,
          },
        },
      });

      setIsProcessing(false);

      if (result.error) {
        setPaymentError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        await addDoc(collection(db, "bookings"), {
          customer: {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            email: formValues.email,
            phone: formValues.phone,
            requests: formValues.requests,
          },
          service: {
            id: selectedService.id,
            name: selectedService.name,
            price: selectedService.price,
            duration: selectedService.time,
          },
          appointmentTime: appointmentTime,
          depositAmount: amount,
          paymentIntentId: result.paymentIntent.id,
          status: "confirmed",
          createdAt: serverTimestamp(),
        });

        onSuccess(result.paymentIntent.id);
      }
    } catch (error) {
      console.error("Payment failed:", error);
      setPaymentError("Payment processing failed. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup>
        <Label>Card Details</Label>
        <div
          style={{
            padding: "0.9rem 1rem",
            border: "1px solid var(--secondary)",
            borderRadius: "6px",
            backgroundColor: "var(--white)",
          }}
        >
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#4a3f43",
                  fontFamily: "Raleway, sans-serif",
                  "::placeholder": {
                    color: "#8b7377",
                  },
                },
              },
            }}
          />
        </div>
      </InputGroup>

      {paymentError && (
        <div
          style={{
            marginBottom: "1.5rem",
            padding: "0.9rem",
            backgroundColor: "rgba(220, 53, 69, 0.1)",
            color: "#dc3545",
            borderRadius: "6px",
            fontSize: "0.9rem",
          }}
        >
          {paymentError}
        </div>
      )}

      <PrimaryButton type="submit" disabled={!stripe || isProcessing}>
        <CreditCard size={18} />
        {isProcessing ? "Processing..." : `Pay Deposit ${amount}`}
      </PrimaryButton>
    </form>
  );
};

// Main Booking Component
const Booking = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [currentStep, setCurrentStep] = useState(1);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    requests: "",
  });
  const [selectedService, setSelectedService] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState(null);
  const [calendlyInitialized, setCalendlyInitialized] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState(null);

  const calendlyRef = useRef(null);

  const services = [
    {
      id: "service1",
      name: "Classic Manicure",
      time: "60 min",
      price: "€45",
      depositAmount: "€15",
      calendlyUrl: "https://calendly.com/your-username/classic-manicure",
    },
    {
      id: "service2",
      name: "Gel Manicure",
      time: "75 min",
      price: "€65",
      depositAmount: "€20",
      calendlyUrl: "https://calendly.com/your-username/gel-manicure",
    },
    {
      id: "service3",
      name: "Luxury Spa Manicure",
      time: "90 min",
      price: "€85",
      depositAmount: "€25",
      calendlyUrl: "https://calendly.com/your-username/luxury-spa",
    },
  ];

  const titleAnimation = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.4, ease: "easeOut" },
    },
  };

  const containerAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 40,
        damping: 14,
        duration: 1.2,
      },
    },
  };

  const getSelectedServiceData = () => {
    return services.find((s) => s.id === selectedService);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handlePaymentSuccess = (paymentIntentId) => {
    setPaymentId(paymentIntentId);
    setPaymentSuccess(true);
    setCurrentStep(4);
  };

  const isStep1Valid = () => {
    return (
      formValues.firstName.trim() !== "" &&
      formValues.lastName.trim() !== "" &&
      formValues.email.trim() !== "" &&
      formValues.phone.trim() !== ""
    );
  };

  const isStep2Valid = () => {
    return selectedService !== null && appointmentTime !== null;
  };

  useEffect(() => {
    if (currentStep === 2 && !calendlyInitialized) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => setCalendlyInitialized(true);
      document.head.appendChild(script);

      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, [currentStep, calendlyInitialized]);

  useEffect(() => {
    if (currentStep === 2 && calendlyInitialized && selectedService) {
      const selectedServiceData = getSelectedServiceData();
      if (selectedServiceData && window.Calendly && calendlyRef.current) {
        window.Calendly.initInlineWidget({
          url: selectedServiceData.calendlyUrl,
          parentElement: calendlyRef.current,
          prefill: {
            name: `${formValues.firstName} ${formValues.lastName}`,
            email: formValues.email,
          },
        });

        window.addEventListener("message", function (e) {
          if (e.data.event && e.data.event.indexOf("calendly") === 0) {
            if (e.data.event === "calendly.event_scheduled") {
              setAppointmentTime(e.data.payload.event.start_time);
            }
          }
        });
      }
    }
  }, [currentStep, calendlyInitialized, selectedService, formValues]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <FormTitle>Your Information</FormTitle>
            <FormDescription>
              Please share your contact details so we can create your
              personalized booking.
            </FormDescription>

            <GridInputs>
              <InputGroup>
                <Label>
                  First Name <span>*</span>
                </Label>
                <Input
                  type="text"
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                  required
                />
              </InputGroup>

              <InputGroup>
                <Label>
                  Last Name <span>*</span>
                </Label>
                <Input
                  type="text"
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                  required
                />
              </InputGroup>
            </GridInputs>

            <InputGroup>
              <Label>
                Email Address <span>*</span>
              </Label>
              <Input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>
                Phone Number <span>*</span>
              </Label>
              <Input
                type="tel"
                name="phone"
                value={formValues.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 000-0000"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Special Requests</Label>
              <TextArea
                name="requests"
                value={formValues.requests}
                onChange={handleInputChange}
                placeholder="Share any special requests or preferences for your appointment"
              />
            </InputGroup>

            <ButtonGroup>
              <PrimaryButton onClick={nextStep} disabled={!isStep1Valid()}>
                Continue
              </PrimaryButton>
            </ButtonGroup>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <FormTitle>Select Service & Schedule</FormTitle>
            <FormDescription>
              Choose your preferred service and select an available appointment
              time.
            </FormDescription>

            <div style={{ marginBottom: "2rem" }}>
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  $selected={selectedService === service.id}
                  onClick={() => setSelectedService(service.id)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <ServiceName>{service.name}</ServiceName>
                  <ServiceDetails>
                    <ServiceTime>
                      <Clock size={16} />
                      {service.time}
                    </ServiceTime>
                    <ServicePrice>{service.price}</ServicePrice>
                  </ServiceDetails>
                </ServiceCard>
              ))}
            </div>

            {selectedService && (
              <CalendlyContainer>
                <CalendlyHeader>Select Your Appointment Time</CalendlyHeader>
                <div
                  ref={calendlyRef}
                  style={{ height: "600px" }}
                  className="calendly-inline-widget"
                />
              </CalendlyContainer>
            )}

            <ButtonGroup>
              <SecondaryButton onClick={prevStep}>Back</SecondaryButton>
              <PrimaryButton onClick={nextStep} disabled={!isStep2Valid()}>
                Continue
              </PrimaryButton>
            </ButtonGroup>
          </motion.div>
        );

      case 3:
        const selectedServiceData = getSelectedServiceData();
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <FormTitle>Confirm & Pay</FormTitle>
            <FormDescription>
              Review your booking details and complete your deposit to secure
              your appointment.
            </FormDescription>

            <SummaryBox>
              <SummaryRow>
                <SummaryLabel>Name</SummaryLabel>
                <SummaryValue>
                  {formValues.firstName} {formValues.lastName}
                </SummaryValue>
              </SummaryRow>
              <SummaryRow>
                <SummaryLabel>Email</SummaryLabel>
                <SummaryValue>{formValues.email}</SummaryValue>
              </SummaryRow>
              <SummaryRow>
                <SummaryLabel>Phone</SummaryLabel>
                <SummaryValue>{formValues.phone}</SummaryValue>
              </SummaryRow>
              <SummaryRow>
                <SummaryLabel>Service</SummaryLabel>
                <SummaryValue>{selectedServiceData?.name}</SummaryValue>
              </SummaryRow>
              <SummaryRow>
                <SummaryLabel>Duration</SummaryLabel>
                <SummaryValue>{selectedServiceData?.time}</SummaryValue>
              </SummaryRow>
              <SummaryRow>
                <SummaryLabel>Total Price</SummaryLabel>
                <SummaryValue>{selectedServiceData?.price}</SummaryValue>
              </SummaryRow>
              <SummaryRow>
                <SummaryLabel>Appointment</SummaryLabel>
                <SummaryValue>
                  {appointmentTime
                    ? new Date(appointmentTime).toLocaleString()
                    : "As scheduled"}
                </SummaryValue>
              </SummaryRow>
              {formValues.requests && (
                <SummaryRow>
                  <SummaryLabel>Notes</SummaryLabel>
                  <SummaryValue>{formValues.requests}</SummaryValue>
                </SummaryRow>
              )}
            </SummaryBox>

            <DepositBox>
              <DepositTitle>Deposit Required</DepositTitle>
              <DepositDescription>
                A small deposit is required to secure your booking. This amount
                will be deducted from your final service price.
              </DepositDescription>
              <DepositAmount>
                {selectedServiceData?.depositAmount}
              </DepositAmount>
            </DepositBox>

            <Elements stripe={stripePromise}>
              <PaymentForm
                amount={selectedServiceData?.depositAmount}
                description={`Deposit for ${selectedServiceData?.name}`}
                formValues={formValues}
                selectedService={selectedServiceData}
                appointmentTime={appointmentTime}
                onSuccess={handlePaymentSuccess}
              />
            </Elements>

            <ButtonGroup style={{ marginTop: "1.5rem" }}>
              <SecondaryButton onClick={prevStep}>Back</SecondaryButton>
            </ButtonGroup>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ConfirmationBox>
              <SuccessIcon>
                <Check size={40} />
              </SuccessIcon>

              <ConfirmationTitle>Booking Confirmed</ConfirmationTitle>

              <ConfirmationText>
                Thank you for your booking. A confirmation email has been sent
                to {formValues.email} with all your appointment details.
              </ConfirmationText>

              <ReferenceBox>
                <ReferenceLabel>Booking Reference</ReferenceLabel>
                <ReferenceCode>{paymentId}</ReferenceCode>

                <AppointmentDetails>
                  <DetailLabel>Your Appointment</DetailLabel>
                  <DetailValue>
                    {getSelectedServiceData()?.name} (
                    {getSelectedServiceData()?.time})
                  </DetailValue>
                  <DetailValue>
                    {appointmentTime
                      ? new Date(appointmentTime).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })
                      : "As scheduled via Calendly"}
                  </DetailValue>
                </AppointmentDetails>
              </ReferenceBox>

              <PrimaryButton onClick={() => window.location.reload()}>
                Book Another Appointment
              </PrimaryButton>
            </ConfirmationBox>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const steps = [
    { step: 1, label: "Info", icon: User },
    { step: 2, label: "Schedule", icon: Calendar },
    { step: 3, label: "Payment", icon: CreditCard },
    { step: 4, label: "Confirmed", icon: Check },
  ];

  return (
    <BookingSection id="booking" ref={ref}>
      <SectionTitle
        variants={titleAnimation}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        Book Your Appointment
      </SectionTitle>

      <BookingContainer
        variants={containerAnimation}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <StepIndicators>
          {steps.map((stepItem, index) => (
            <StepItem key={stepItem.step}>
              <StepCircle
                $active={currentStep === stepItem.step}
                $completed={currentStep > stepItem.step}
                whileHover={{ scale: 1.05 }}
              >
                {currentStep > stepItem.step ? (
                  <Check size={20} />
                ) : (
                  <stepItem.icon size={20} />
                )}

                {index < steps.length - 1 && (
                  <StepConnector $completed={currentStep > index + 1} />
                )}
              </StepCircle>
              <StepLabel $active={currentStep === stepItem.step}>
                {stepItem.label}
              </StepLabel>
            </StepItem>
          ))}
        </StepIndicators>

        <FormContent>
          <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
        </FormContent>
      </BookingContainer>
    </BookingSection>
  );
};

export default Booking;
