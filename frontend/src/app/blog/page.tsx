"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  AnimatedSection,
  StaggeredContainer,
  SmoothSection,
  ProfessionalCard,
  GridBackground,
  Icon,
  Button,
} from "@/components";
import {
  blogPosts,
  blogCategories,
  BlogPost,
  BlogCategory,
} from "@/data/content";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const { scrollYProgress } = useScroll();
  const blogRef = useRef<HTMLDivElement>(null);
  const blogInView = useInView(blogRef, { once: true });

  // Ensure client-side only rendering for animations
  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter and search logic
  const getFilteredPosts = (): BlogPost[] => {
    let filtered = blogPosts;

    if (selectedCategory !== "all") {
      const category = blogCategories.find(
        (cat) => cat.id === selectedCategory
      );
      if (category) {
        filtered = filtered.filter((post) => post.category === category.name);
      }
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags?.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    return filtered;
  };

  const filteredPosts = getFilteredPosts();
  const featuredPosts = blogPosts.filter((post) => post.featured);
  const postsPerPage = 6;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Floating elements for background
  const floatingIconPositions = [
    { left: 10, top: 20 },
    { left: 80, top: 15 },
    { left: 15, top: 70 },
    { left: 90, top: 60 },
    { left: 25, top: 45 },
    { left: 70, top: 80 },
    { left: 45, top: 25 },
    { left: 60, top: 55 },
    { left: 30, top: 85 },
    { left: 85, top: 35 },
    { left: 5, top: 50 },
    { left: 95, top: 75 },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatViews = (views: number = 0) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  return (
    <div className="pt-16 overflow-hidden">
      {/* Ultra Modern Hero Section */}
      <motion.section
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Advanced Modern Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950"></div>

        {/* Animated Mesh Gradient */}
        <div className="absolute inset-0 opacity-60">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(139,92,246,0.4),transparent_50%)] animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.3),transparent_50%)] animate-pulse delay-700"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(16,185,129,0.3),transparent_50%)] animate-pulse delay-1000"></div>
        </div>

        {/* Floating Blog Icons - Client-side only */}
        {mounted && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {floatingIconPositions.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, i % 2 === 0 ? 15 : -15, 0],
                  rotate: [0, 360],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                <Icon
                  name={
                    ["lightbulb", "code", "heart", "briefcase"][i % 4] as any
                  }
                  size="lg"
                  className="text-blue-400/20"
                />
              </motion.div>
            ))}
          </div>
        )}

        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <div className="text-center">
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
              className="inline-flex items-center justify-center px-6 py-3 mb-12 text-xs font-semibold text-white/90 bg-white/5 rounded-full border border-white/10 backdrop-blur-2xl shadow-2xl tracking-wide"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent uppercase tracking-wider">
                Tech Insights • Industry Trends • Expert Knowledge
              </span>
            </motion.div>

            {/* Ultra Modern Typography */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="mb-12"
            >
              <h1 className="text-6xl lg:text-9xl font-black mb-6 leading-none tracking-tight">
                <span className="block text-white drop-shadow-2xl">Our</span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent animate-gradient-x">
                  Blog
                </span>
              </h1>
              <p className="text-lg lg:text-xl font-normal text-white/80 mb-6 leading-relaxed max-w-3xl mx-auto">
                Insights from the Future of Tech
              </p>
            </motion.div>

            {/* Glassmorphism Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="max-w-4xl mx-auto mb-12"
            >
              <div className="bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 p-6 lg:p-8 shadow-2xl">
                <p className="text-base lg:text-lg leading-relaxed text-white/75 font-normal">
                  Dive deep into the latest trends in AI, blockchain,
                  development, and design. Expert insights, practical tutorials,
                  and industry analysis from our team of innovators.
                </p>
              </div>
            </motion.div>

            {/* Blog Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
            >
              {[
                {
                  value: `${blogPosts.length}+`,
                  label: "Articles",
                  icon: "lightbulb",
                },
                {
                  value: `${blogCategories.length}`,
                  label: "Categories",
                  icon: "briefcase",
                },
                { value: "Weekly", label: "New Posts", icon: "clock" },
                { value: "Expert", label: "Authors", icon: "users" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 text-center group hover:bg-white/15 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Icon
                      name={stat.icon as any}
                      size="md"
                      className="text-white"
                    />
                  </div>
                  <div className="text-2xl font-black text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/70 text-sm font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Modern CTA */}
            {/* <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNewsletter(true)}
                className="group relative px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-white overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                <span className="relative flex items-center justify-center space-x-3">
                  <span>Subscribe to Newsletter</span>
                  <Icon name="mail" size="md" />
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-6 bg-white/10 backdrop-blur-xl rounded-2xl font-bold text-white border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-2xl"
              >
                <span className="flex items-center justify-center space-x-3">
                  <span>Explore Categories</span>
                  <Icon name="arrow" size="md" />
                </span>
              </motion.button>
            </motion.div> */}
          </div>
        </div>
      </motion.section>

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <SmoothSection className="relative py-24 lg:py-32 bg-white">
          <GridBackground className="opacity-5" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
            <AnimatedSection className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center justify-center px-4 py-2 mb-6 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full border border-blue-200"
              >
                <Icon name="heart" size="sm" className="mr-2" strokeWidth={2} />
                Featured Articles
              </motion.div>

              <h2 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
                <span className="text-slate-900">Latest</span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                  Featured Posts
                </span>
              </h2>

              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"></div>

              <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                Handpicked articles featuring the most impactful insights and
                cutting-edge developments in technology.
              </p>
            </AnimatedSection>

            <StaggeredContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredPosts.slice(0, 3).map((post, index) => (
                <div
                  key={post.id}
                  onMouseEnter={() => setHoveredPost(post.id)}
                  onMouseLeave={() => setHoveredPost(null)}
                >
                  <ProfessionalCard
                    delay={index * 0.2}
                    hoverEffect="lift"
                    className="group bg-white rounded-3xl border border-slate-200/80 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden min-h-[400px]"
                  >
                    {/* Featured Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white text-xs font-bold shadow-lg">
                        Featured
                      </div>
                    </div>

                    {/* Post Image */}
                    <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 group-hover:opacity-80 transition-opacity duration-500"></div>
                      <div className="absolute bottom-4 right-4">
                        <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon
                            name={
                              post.category.includes("AI")
                                ? "cpu"
                                : post.category.includes("Blockchain")
                                  ? "shield-check"
                                  : post.category.includes("Design")
                                    ? "lightbulb"
                                    : "code"
                            }
                            size="md"
                            className="text-slate-700"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="p-8 flex flex-col h-full">
                      {/* Category & Meta */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-2 text-slate-500 text-xs">
                          <Icon name="clock" size="sm" />
                          {post.readTime}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="line-clamp-1 text-xl font-black text-slate-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-slate-600 leading-relaxed mb-6 flex-grow line-clamp-2">
                        {post.excerpt}
                      </p>

                      {/* Author & Stats */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                            {post.authorAvatar}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 text-sm">
                              {post.author}
                            </div>
                            <div className="text-slate-500 text-xs">
                              {formatDate(post.date)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-slate-500 text-xs">
                          <div className="flex items-center gap-1">
                            <Icon name="eye" size="sm" />
                            {formatViews(post.views)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="heart" size="sm" />
                            {post.likes}
                          </div>
                        </div>
                      </div>
                    </div>
                  </ProfessionalCard>
                </div>
              ))}
            </StaggeredContainer>
          </div>
        </SmoothSection>
      )}

      {/* Main Blog Grid */}
      <SmoothSection className="relative py-16 bg-slate-50">
        {/* Search and Filter Section */}

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles, topics, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg text-slate-900 placeholder-slate-500"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Icon name="search" size="md" className="text-slate-400" />
              </div>
            </div>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-2"
          >
            <motion.button
              onClick={() => setSelectedCategory("all")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-1 rounded-xl font-bold transition-all duration-300 ${selectedCategory === "all"
                ? "bg-gradient-to-r from-slate-700 to-slate-900 text-white shadow-xl"
                : "bg-white text-slate-700 hover:bg-slate-100 shadow-lg border border-slate-200"
                }`}
            >
              All Articles
              <span className="ml-2 text-sm opacity-75">
                ({blogPosts.length})
              </span>
            </motion.button>

            {blogCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${selectedCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-xl`
                  : "bg-white text-slate-700 hover:bg-slate-100 shadow-lg border border-slate-200"
                  }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">
                  ({category.count})
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        <GridBackground className="opacity-5" />

        <div
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12"
          ref={blogRef}
        >
          {/* Results Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {searchQuery || selectedCategory !== "all"
                    ? `Search Results (${filteredPosts.length})`
                    : `All Articles (${blogPosts.length})`}
                </h3>
                {(searchQuery || selectedCategory !== "all") && (
                  <p className="text-slate-600 mt-1">
                    {searchQuery && `Searching for "${searchQuery}"`}
                    {searchQuery && selectedCategory !== "all" && " in "}
                    {selectedCategory !== "all" &&
                      `${blogCategories.find((c) => c.id === selectedCategory)
                        ?.name
                      }`}
                  </p>
                )}
              </div>
              {(searchQuery || selectedCategory !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors duration-200"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </motion.div>

          {/* Blog Posts Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${searchQuery}-${currentPage}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {currentPosts.length > 0 ? (
                <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {currentPosts.map((post, index) => (
                    <div
                      key={post.id}
                      onMouseEnter={() => setHoveredPost(post.id)}
                      onMouseLeave={() => setHoveredPost(null)}
                    >
                      <ProfessionalCard
                        delay={index * 0.1}
                        hoverEffect="lift"
                        className="group bg-white rounded-3xl border border-slate-200/80 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden min-h-[450px]"
                      >
                        {/* Post Image */}
                        <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 group-hover:opacity-80 transition-opacity duration-500"></div>
                          <div className="absolute bottom-4 right-4">
                            <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <Icon
                                name={
                                  post.category.includes("AI")
                                    ? "cpu"
                                    : post.category.includes("Blockchain")
                                      ? "shield-check"
                                      : post.category.includes("Design")
                                        ? "lightbulb"
                                        : "code"
                                }
                                size="sm"
                                className="text-slate-700"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Post Content */}
                        <div className="p-6 flex flex-col h-full">
                          {/* Category & Meta */}
                          <div className="flex items-center justify-between mb-3">
                            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200">
                              {post.category}
                            </span>
                            <div className="flex items-center gap-1 text-slate-500 text-xs">
                              <Icon name="clock" size="sm" />
                              {post.readTime}
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="line-clamp-1 text-lg font-black text-slate-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">
                            {post.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="line-clamp-2 text-slate-600 leading-relaxed mb-4 flex-grow text-sm">
                            {post.excerpt}
                          </p>

                          {/* Tags */}
                          {post.tags && (
                            <div className="flex flex-wrap gap-1 mb-4">
                              {post.tags.slice(0, 3).map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Author & Stats */}
                          <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                                {post.authorAvatar}
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900 text-xs">
                                  {post.author}
                                </div>
                                <div className="text-slate-500 text-xs">
                                  {formatDate(post.date)}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 text-xs">
                              <div className="flex items-center gap-1">
                                <Icon name="eye" size="sm" />
                                {formatViews(post.views)}
                              </div>
                              <div className="flex items-center gap-1">
                                <Icon name="heart" size="sm" />
                                {post.likes}
                              </div>
                            </div>
                          </div>

                          {/* Read More */}
                          <div className="pt-3">
                            <motion.div
                              className="flex items-center text-blue-600 font-semibold text-sm group-hover:text-blue-700 transition-colors cursor-pointer"
                              animate={{ x: hoveredPost === post.id ? 5 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <span>Read Article</span>
                              <Icon
                                name="arrow-right"
                                size="sm"
                                className="ml-1"
                              />
                            </motion.div>
                          </div>
                        </div>
                      </ProfessionalCard>
                    </div>
                  ))}
                </StaggeredContainer>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon name="search" size="xl" className="text-slate-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    No Articles Found
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Try adjusting your search criteria or browse our categories.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                    }}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors duration-200"
                  >
                    View All Articles
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center items-center gap-2"
            >
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-slate-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg transition-colors ${currentPage === page
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-slate-200 hover:bg-slate-50"
                      }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white border border-slate-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              >
                Next
              </button>
            </motion.div>
          )}
        </div>
      </SmoothSection>

      {/* Newsletter Modal */}
      <AnimatePresence>
        {showNewsletter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowNewsletter(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icon name="mail" size="xl" className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Stay Updated
                </h3>
                <p className="text-slate-600 mb-6">
                  Get the latest tech insights, tutorials, and industry trends
                  delivered to your inbox.
                </p>
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowNewsletter(false)}
                      className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
                    >
                      Maybe Later
                    </button>
                    <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
}
