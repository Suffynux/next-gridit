import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";

const services = [
  { image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg", title: "IT Services", path: "/it-service" },
  { image: "https://images.pexels.com/photos/5685961/pexels-photo-5685961.jpeg", title: "Tech Recruitment", path: "/tech-recruitment" },
  { image: "https://images.pexels.com/photos/5950094/pexels-photo-5950094.jpeg", title: "Managed Services", path: "/managed-services" },
  { image: "https://images.pexels.com/photos/12899151/pexels-photo-12899151.jpeg", title: "IT Asset Management", path: "/ITAsset-Management" },
  { image: "https://images.pexels.com/photos/7709099/pexels-photo-7709099.jpeg", title: "Network & User Support", path: "/network-support" },
  { image: "https://images.pexels.com/photos/5922204/pexels-photo-5922204.jpeg", title: "Project & Change Management", path: "/project-management" },
  { image: "https://images.pexels.com/photos/8636609/pexels-photo-8636609.jpeg", title: "Creative & Digital Support", path: "/creative-support" },
];

const ServicesSection = () => {
  const [cardVisibility, setCardVisibility] = useState(services.map(() => false));
  const cardRefs = useRef([]);

  useEffect(() => {
    const observers = cardRefs.current.map((cardRef, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setCardVisibility((prev) => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 150);
          }
        },
        { threshold: 0.1 }
      );
      if (cardRef) observer.observe(cardRef);
      return observer;
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <MainLayout>
      <section className="relative py-20 min-h-screen">
  {/* Background image */}
  <div 
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: "url('https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg')" }}
  />
  
  {/* Blue branding overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#003A75]/80 to-[#2a4d8e]/80" />

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold text-center text-white mb-12">
      Explore All Our Services
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <div
          key={index}
          ref={(el) => (cardRefs.current[index] = el)}
          className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 transform ${
            cardVisibility[index]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          } hover:shadow-xl hover:-translate-y-2 flex flex-col`}
        >
          <div className="h-48 overflow-hidden">
            <img
              src={service.image}
              alt={service.title}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="p-5 flex flex-col justify-between flex-grow">
            <h3 className="text-lg font-semibold text-[#003A75] mb-4">
              {service.title}
            </h3>
            <Link
              to={service.path}
              className="mt-auto inline-block text-sm text-blue-600 font-medium hover:underline"
            >
              Read More →
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

    </MainLayout>
  );
};

export default ServicesSection;
