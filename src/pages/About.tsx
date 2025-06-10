
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Shield, TrendingUp, Globe, Award, Target } from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "CEO & Co-Founder",
      experience: "8+ years DeFi & Traditional Finance",
      description: "Former Goldman Sachs quantitative trader with expertise in algorithmic trading and risk management."
    },
    {
      name: "Sarah Martinez",
      role: "CTO & Co-Founder",
      experience: "10+ years Blockchain Development",
      description: "Previously lead developer at Compound Protocol, specializing in smart contract security and DeFi infrastructure."
    },
    {
      name: "Michael Thompson",
      role: "Head of Risk Management",
      experience: "12+ years Risk Analysis",
      description: "Former JPMorgan risk analyst with extensive experience in crypto asset portfolio management."
    },
    {
      name: "Emma Davis",
      role: "Head of Operations",
      experience: "6+ years Crypto Operations",
      description: "Previously operations manager at Binance, expert in crypto compliance and regulatory frameworks."
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "Every decision is made with security and user fund protection as the top priority."
    },
    {
      icon: TrendingUp,
      title: "Consistent Performance",
      description: "We focus on sustainable, predictable returns rather than high-risk speculation."
    },
    {
      icon: Globe,
      title: "Transparency",
      description: "Full transparency in operations, smart contracts, and fund allocation strategies."
    },
    {
      icon: Users,
      title: "User-Centric",
      description: "Building tools and experiences that prioritize user needs and accessibility."
    }
  ];

  const achievements = [
    { metric: "$2.4M+", label: "Total Value Locked" },
    { metric: "99.9%", label: "Platform Uptime" },
    { metric: "12,450+", label: "Active Users" },
    { metric: "365", label: "Days of Operation" }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br from-background to-muted/20">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">About RobinHood</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Building the Future of
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent"> Crypto Investment</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            We're a team of experienced professionals committed to democratizing access to 
            consistent crypto investment returns through transparent, secure operations.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                RobinHood was founded with a simple mission: to provide retail investors with access to 
                institutional-grade crypto investment strategies that generate consistent, predictable returns.
              </p>
              <p className="text-muted-foreground mb-6">
                We believe that everyone should have access to professional crypto asset management, 
                not just institutional investors. Our platform democratizes access to sophisticated 
                trading strategies and DeFi opportunities.
              </p>
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-6">
                <h3 className="font-semibold mb-2 text-green-600 dark:text-green-400">Important Note</h3>
                <p className="text-sm text-muted-foreground">
                  <strong>We do not trade.</strong> We allocate funds to stable, liquid crypto assets 
                  and proven DeFi strategies managed by our expert team with strict risk controls.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-green-500 mb-2">
                      {achievement.metric}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {achievement.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground">
              The principles that guide every decision we make
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <value.icon className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                  <CardDescription>{value.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Experienced Team</h2>
            <p className="text-muted-foreground">
              Industry veterans with decades of combined experience in traditional finance, 
              DeFi, and blockchain technology.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <CardDescription className="font-medium">{member.role}</CardDescription>
                      <Badge variant="outline" className="mt-1">{member.experience}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology & Security */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <Shield className="w-10 h-10 text-green-500 mb-4" />
                <CardTitle>Transparent Smart Contracts</CardTitle>
                <CardDescription>
                  All fund movements and allocations are handled through audited smart contracts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Audited by leading security firms</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-blue-500" />
                  <span className="text-sm">Open-source verification available</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-purple-500" />
                  <span className="text-sm">Multi-signature wallet protection</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="w-10 h-10 text-blue-500 mb-4" />
                <CardTitle>Risk Management</CardTitle>
                <CardDescription>
                  Comprehensive risk controls and monitoring systems protect user funds
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Real-time portfolio monitoring</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-blue-500" />
                  <span className="text-sm">Automated risk limits and alerts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-purple-500" />
                  <span className="text-sm">Diversification across multiple strategies</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-r from-green-500 to-blue-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Join Our Growing Community</h2>
          <p className="text-xl mb-8 opacity-90">
            Experience professional crypto investment management with transparent operations 
            and consistent returns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/plans">Start Investing</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-green-500" asChild>
              <Link to="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
