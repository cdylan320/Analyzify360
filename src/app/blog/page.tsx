import React from "react";
import Link from "next/link";
import { Card, Button, Icon } from "@/components";
import { blogPosts } from "@/data/content";

export default function Blog() {
  const categories = [
    "All",
    "AI & Machine Learning",
    "Blockchain",
    "Design",
    "Development",
  ];
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-16 lg:py-24 bg-primary text-white">
        <div className="max-w-screen-xl mx-auto px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">Our Blog</h1>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Insights, tutorials, and industry trends from our team of experts
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {blogPosts.map((post) => (
                  <Card
                    key={post.id}
                    hover
                    background="white"
                    className="group"
                  >
                    <div className="space-y-4">
                      {/* Post Header */}
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                          <Icon
                            name="light-bulb"
                            size="md"
                            className="text-white"
                          />
                        </div>
                        <div>
                          <span className="text-sm text-accent font-medium">
                            {post.category}
                          </span>
                          <p className="text-sm text-gray-500">
                            {post.date} • {post.readTime}
                          </p>
                        </div>
                      </div>

                      {/* Post Content */}
                      <div className="space-y-3">
                        <h2 className="text-2xl font-bold text-primary group-hover:text-accent transition-colors duration-200">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Post Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-section">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-section rounded-full flex items-center justify-center">
                            <span className="text-primary font-medium text-sm">
                              {post.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <span className="text-sm text-gray-600">
                            By {post.author}
                          </span>
                        </div>
                        <button className="text-accent font-medium hover:text-blue-600 transition-colors duration-200 group-hover:underline">
                          Read More →
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Posts
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Categories */}
              <Card background="white">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-primary">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-section hover:text-primary rounded-lg transition-colors duration-200"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Recent Posts */}
              <Card background="white">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-primary">
                    Recent Posts
                  </h3>
                  <div className="space-y-4">
                    {recentPosts.map((post) => (
                      <div key={post.id} className="space-y-2">
                        <h4 className="font-medium text-primary hover:text-accent transition-colors duration-200 cursor-pointer">
                          {post.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {post.date} • {post.readTime}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Write for Us */}
              <Card background="accent" className="text-center">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto">
                    <Icon name="light-bulb" size="xl" className="text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Write for Us</h3>
                  <p className="text-blue-100">
                    Share your expertise with our community. We're always
                    looking for quality content.
                  </p>
                  <Button
                    variant="secondary"
                    size="md"
                    className="bg-white text-accent hover:bg-gray-100"
                  >
                    Submit Article
                  </Button>
                </div>
              </Card>

              {/* Newsletter */}
              <Card background="section">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-primary">
                    Stay Updated
                  </h3>
                  <p className="text-gray-600">
                    Subscribe to our newsletter for the latest insights and
                    updates.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                    <Button variant="primary" size="md" fullWidth>
                      Subscribe
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
