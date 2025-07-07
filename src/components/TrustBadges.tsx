import React from "react";
import Card from "./Card";
import Icon from "./Icon";
import { trustBadges } from "@/data/content";

const TrustBadges: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Why Work With Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trust, transparency, and proven results - the foundation of every
            successful partnership
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustBadges.map((badge, index) => (
            <Card
              key={badge.id}
              hover
              background="accent"
              className="text-center group animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="space-y-4">
                {/* Icon */}
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Icon
                    name={badge.icon as any}
                    size="xl"
                    className="text-accent"
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold">{badge.title}</h3>

                {/* Description */}
                <p className="text-blue-100 text-sm leading-relaxed">
                  {badge.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
