import React from "react";
import clsx from "clsx";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg" | "xl";
  background?: "white" | "section" | "accent" | "primary";
  border?: boolean;
  shadow?: boolean;
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl";
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hover = false,
  padding = "lg",
  background = "white",
  border = false,
  shadow = true,
  rounded = "2xl",
}) => {
  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-12",
  };

  const backgroundClasses = {
    white: "bg-white",
    section: "bg-section",
    accent: "bg-accent text-white",
    primary: "bg-primary text-white",
  };

  const roundedClasses = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
  };

  const classes = clsx(
    paddingClasses[padding],
    backgroundClasses[background],
    roundedClasses[rounded],
    {
      "card-hover": hover,
      "border border-section": border,
      "shadow-lg": shadow,
    },
    className
  );

  return <div className={classes}>{children}</div>;
};

export default Card;
