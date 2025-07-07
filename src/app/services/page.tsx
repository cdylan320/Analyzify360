"use client";

import React, { useState } from "react";
import { Card, Button, Icon } from "@/components";
import { services, workflowSteps } from "@/data/services";

export default function Services() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showContactModal, setShowContactModal] = useState(false);

  const openServiceModal = (service: any) => {
    setSelectedService(service);
  };

  const closeServiceModal = () => {
    setSelectedService(null);
  };

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-16 lg:py-24 bg-primary text-white">
        <div className="max-w-screen-xl mx-auto px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Cutting-edge solutions across the full spectrum of modern technology
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card
                key={service.id}
                hover
                background="white"
                className="group cursor-pointer"
                onClick={() => openServiceModal(service)}
              >
                <div className="space-y-6">
                  {/* Icon & Title */}
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon
                        name={service.icon as any}
                        size="xl"
                        className="text-white"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-primary">
                        {service.title}
                      </h3>
                      <p className="text-accent font-medium">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Capabilities */}
                  <div>
                    <h4 className="font-bold text-primary mb-3">
                      Core Capabilities
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.capabilities.map((capability, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <div className="w-2 h-2 bg-accent rounded-full"></div>
                          <span className="text-sm text-gray-600">
                            {capability}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Learn More */}
                  <div className="pt-4">
                    <span className="text-accent font-medium group-hover:underline">
                      Learn More & View Full Capabilities →
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              How We Work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our proven process ensures successful project delivery from
              concept to launch
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workflowSteps.map((step, index) => (
              <Card
                key={step.number}
                hover
                background="section"
                className="text-center group"
              >
                <div className="space-y-4">
                  {/* Step Number */}
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-2xl">
                      {step.number}
                    </span>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-xl font-bold text-primary">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                    <Icon
                      name={selectedService.icon as any}
                      size="xl"
                      className="text-white"
                    />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-primary">
                      {selectedService.title}
                    </h2>
                    <p className="text-accent font-medium text-lg">
                      {selectedService.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeServiceModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Capabilities */}
                <div>
                  <h3 className="text-xl font-bold text-primary mb-4">
                    Core Capabilities
                  </h3>
                  <div className="space-y-3">
                    {selectedService.capabilities.map(
                      (capability: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                          <span className="text-gray-600">{capability}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-xl font-bold text-primary mb-4">
                    Key Features
                  </h3>
                  <div className="space-y-3">
                    {selectedService.features.map(
                      (feature: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center mt-0.5">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-8 border-t border-section mt-8">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => {
                      closeServiceModal();
                      setShowContactModal(true);
                    }}
                  >
                    Get Started
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={closeServiceModal}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Contact Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <Button
          variant="primary"
          size="lg"
          pill
          onClick={() => setShowContactModal(true)}
          className="shadow-2xl animate-pulse-accent"
        >
          Contact Us
        </Button>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-primary">Contact Us</h2>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600">
                  Ready to get started? We'd love to hear about your project.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Icon name="envelope" size="sm" className="text-accent" />
                    <span className="text-gray-600">hello@super2025.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="phone" size="sm" className="text-accent" />
                    <span className="text-gray-600">+1 (555) 123-4567</span>
                  </div>
                </div>
                <div className="pt-4">
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={() => setShowContactModal(false)}
                  >
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
