"use client";

import React, { useState } from "react";
import { Card, Button, Icon } from "@/components";
import { careerPositions } from "@/data/content";

export default function Careers() {
  const [selectedPosition, setSelectedPosition] = useState<any>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: null as File | null,
  });

  const techPositions = careerPositions.filter((pos) => pos.type === "tech");
  const clientPositions = careerPositions.filter(
    (pos) => pos.type === "client"
  );

  const openPositionModal = (position: any) => {
    setSelectedPosition(position);
  };

  const closePositionModal = () => {
    setSelectedPosition(null);
  };

  const openApplicationModal = (position: any) => {
    setSelectedPosition(position);
    setShowApplicationModal(true);
  };

  const closeApplicationModal = () => {
    setShowApplicationModal(false);
    setApplicationData({
      name: "",
      email: "",
      phone: "",
      coverLetter: "",
      resume: null,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setApplicationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setApplicationData((prev) => ({
      ...prev,
      resume: file,
    }));
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle application submission
    console.log("Application submitted:", applicationData);
    closeApplicationModal();
  };

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-16 lg:py-24 bg-primary text-white">
        <div className="max-w-screen-xl mx-auto px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">Join Our Team</h1>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Be part of a global team that's shaping the future of technology
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 lg:py-24 bg-accent text-white">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Join Us?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto">
                <Icon name="chart-bar" size="xl" className="text-accent" />
              </div>
              <h3 className="text-xl font-bold">Growth</h3>
              <p className="text-blue-100">
                Accelerate your career with challenging projects and continuous
                learning opportunities
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto">
                <Icon name="globe" size="xl" className="text-accent" />
              </div>
              <h3 className="text-xl font-bold">Remote</h3>
              <p className="text-blue-100">
                Work from anywhere with a global team and flexible working
                arrangements
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto">
                <Icon name="light-bulb" size="xl" className="text-accent" />
              </div>
              <h3 className="text-xl font-bold">Learning</h3>
              <p className="text-blue-100">
                Stay at the cutting edge with learning budgets and conference
                attendance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Tech Roles */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-8">
                Tech Roles
              </h2>
              <div className="space-y-6">
                {techPositions.map((position) => (
                  <Card
                    key={position.id}
                    hover
                    background="white"
                    className="group cursor-pointer"
                    onClick={() => openPositionModal(position)}
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors duration-200">
                            {position.title}
                          </h3>
                          <p className="text-gray-600">{position.location}</p>
                        </div>
                        <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                          <Icon name="code" size="md" className="text-white" />
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {position.description}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-section">
                        <span className="text-sm text-gray-500">
                          {position.requirements.length} requirements
                        </span>
                        <span className="text-accent font-medium group-hover:underline">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Client Roles */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-8">
                US/UK Roles
              </h2>
              <div className="space-y-6">
                {clientPositions.map((position) => (
                  <Card
                    key={position.id}
                    hover
                    background="white"
                    className="group cursor-pointer"
                    onClick={() => openPositionModal(position)}
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors duration-200">
                            {position.title}
                          </h3>
                          <p className="text-gray-600">{position.location}</p>
                        </div>
                        <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                          <Icon name="users" size="md" className="text-white" />
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {position.description}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-section">
                        <span className="text-sm text-gray-500">
                          {position.requirements.length} requirements
                        </span>
                        <span className="text-accent font-medium group-hover:underline">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Position Details Modal */}
      {selectedPosition && !showApplicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-primary">
                    {selectedPosition.title}
                  </h2>
                  <p className="text-gray-600 text-lg">
                    {selectedPosition.location}
                  </p>
                </div>
                <button
                  onClick={closePositionModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-8">
                {/* Description */}
                <div>
                  <h3 className="text-xl font-bold text-primary mb-4">
                    About This Role
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedPosition.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Requirements */}
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">
                      Requirements
                    </h3>
                    <ul className="space-y-2">
                      {selectedPosition.requirements.map(
                        (req: string, index: number) => (
                          <li
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                            <span className="text-gray-600">{req}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">
                      Benefits
                    </h3>
                    <ul className="space-y-2">
                      {selectedPosition.benefits.map(
                        (benefit: string, index: number) => (
                          <li
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center mt-0.5">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            <span className="text-gray-600">{benefit}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>

                {/* Apply Button */}
                <div className="pt-8 border-t border-section">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => openApplicationModal(selectedPosition)}
                    >
                      Apply Now
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={closePositionModal}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Application Modal */}
      {showApplicationModal && selectedPosition && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-primary">
                    Apply for {selectedPosition.title}
                  </h2>
                  <p className="text-gray-600">{selectedPosition.location}</p>
                </div>
                <button
                  onClick={closeApplicationModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmitApplication} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={applicationData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-section rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={applicationData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-section rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={applicationData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-section rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>

                {/* Cover Letter */}
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Cover Letter *
                  </label>
                  <textarea
                    name="coverLetter"
                    value={applicationData.coverLetter}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-section rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                    placeholder="Tell us why you're interested in this position..."
                  />
                </div>

                {/* Resume Upload */}
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Resume/CV *
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    required
                    className="w-full px-4 py-3 border border-section rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Accepted formats: PDF, DOC, DOCX (max 5MB)
                  </p>
                </div>

                {/* Submit */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="flex-1"
                  >
                    Submit Application
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={closeApplicationModal}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
