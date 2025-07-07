"use client";

import React, { useState } from "react";
import { Card, Button, Icon } from "@/components";
import { companyInfo } from "@/data/content";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", role: "", message: "" });
    }, 3000);
  };

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-16 lg:py-24 bg-primary text-white">
        <div className="max-w-screen-xl mx-auto px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Ready to start your project? Let's discuss how we can help bring
            your vision to life.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card background="white" className="h-fit">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">
                    Send Us a Message
                  </h2>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you within 24
                    hours.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon
                        name="check-circle"
                        size="xl"
                        className="text-white"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-green-600 mb-2">
                      Thank You!
                    </h3>
                    <p className="text-gray-600">
                      Your message has been sent successfully. We'll get back to
                      you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-primary mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-section rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-primary mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-section rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                        placeholder="Enter your email address"
                      />
                    </div>

                    {/* Role */}
                    <div>
                      <label
                        htmlFor="role"
                        className="block text-sm font-medium text-primary mb-2"
                      >
                        Your Role
                      </label>
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-section rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select your role</option>
                        <option value="ceo">CEO/Founder</option>
                        <option value="cto">CTO/Technical Lead</option>
                        <option value="product">Product Manager</option>
                        <option value="developer">Developer</option>
                        <option value="designer">Designer</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-primary mb-2"
                      >
                        Project Details *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-section rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 resize-none"
                        placeholder="Tell us about your project, timeline, and requirements..."
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      loading={isSubmitting}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </div>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <Card background="white">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-primary">
                    Contact Information
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                        <Icon
                          name="envelope"
                          size="md"
                          className="text-white"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-primary">Email</p>
                        <p className="text-gray-600">{companyInfo.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                        <Icon name="phone" size="md" className="text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-primary">Phone</p>
                        <p className="text-gray-600">{companyInfo.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                        <Icon name="map-pin" size="md" className="text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-primary">Location</p>
                        <p className="text-gray-600">{companyInfo.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Social Links */}
              <Card background="white">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-primary">Follow Us</h3>

                  <div className="flex space-x-4">
                    <a
                      href={companyInfo.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-accent rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                    >
                      <span className="text-white text-lg">🐦</span>
                    </a>
                    <a
                      href={companyInfo.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-accent rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                    >
                      <span className="text-white text-lg">💼</span>
                    </a>
                    <a
                      href={companyInfo.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-accent rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                    >
                      <span className="text-white text-lg">🐱</span>
                    </a>
                  </div>
                </div>
              </Card>

              {/* Response Time */}
              <Card background="section">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Icon name="clock" size="md" className="text-accent" />
                    <h3 className="text-lg font-bold text-primary">
                      Response Time
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    We typically respond to all inquiries within 24 hours during
                    business days. For urgent matters, please call us directly.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
