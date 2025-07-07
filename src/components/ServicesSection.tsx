import React from "react";
import Card from "./Card";
import Icon from "./Icon";
import { services } from "@/data/services";

const ServicesSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We deliver cutting-edge solutions across the full spectrum of modern
            technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              hover
              className="group cursor-pointer"
              background="white"
              shadow
            >
              <div className="text-center space-y-6">
                {/* Icon */}
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Icon
                    name={service.icon as any}
                    size="xl"
                    className="text-white"
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-primary">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-accent font-medium">{service.description}</p>

                {/* Capabilities */}
                <div className="space-y-2">
                  {service.capabilities.slice(0, 4).map((capability, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-sm text-gray-600">
                        {capability}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Learn More Link */}
                <div className="pt-4">
                  <button className="text-accent font-medium hover:text-blue-600 transition-colors duration-200 group-hover:underline">
                    Learn More →
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
