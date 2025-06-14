import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageSquare, Clock, Globe, Send, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get detailed responses to complex questions",
      contact: "support@lazrchain.app",
      response: "Within 6 hours",
      color: "text-green-500"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Instant support for urgent matters",
      contact: "Available on platform",
      response: "Instant",
      color: "text-blue-500"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Enterprise clients and VIP support",
      contact: "+1 (555) 987-6543",
      response: "Business hours",
      color: "text-purple-500"
    }
  ];

  const communityChannels = [
    {
      name: "Telegram",
      members: "12.5K",
      description: "Official announcements and community discussions",
      link: "https://t.me/lazrchain"
    },
    {
      name: "Discord",
      members: "8.2K",
      description: "Real-time chat with the community and team",
      link: "https://discord.gg/lazrchain"
    },
    {
      name: "Twitter",
      members: "25K",
      description: "Latest updates and market insights",
      link: "https://twitter.com/lazrchain"
    },
    {
      name: "Medium",
      members: "5.1K",
      description: "In-depth articles and platform updates",
      link: "https://medium.com/@lazrchain"
    }
  ];

  const supportHours = [
    { day: "Monday - Friday", hours: "24/7" },
    { day: "Saturday - Sunday", hours: "24/7" },
    { day: "Live Chat", hours: "24/7" },
    { day: "Phone Support", hours: "9AM - 6PM EST" }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br from-background to-muted/20">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            <MessageSquare className="w-4 h-4 mr-2" />
            Contact & Support
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Get in Touch with
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent"> LazrChain</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            We're here to help 24/7. Whether you have questions about investments, 
            need technical support, or want to learn more about our platform.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Can We Help You?</h2>
            <p className="text-muted-foreground">
              Choose the best way to reach us based on your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} className="h-full">
                <CardHeader className="text-center">
                  <method.icon className={`w-12 h-12 mx-auto mb-4 ${method.color}`} />
                  <CardTitle className="text-xl">{method.title}</CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <div className="font-medium">{method.contact}</div>
                  <Badge variant="outline">
                    <Clock className="w-3 h-3 mr-1" />
                    {method.response}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we'll get back to you as soon as possible. 
                For urgent matters, please use our live chat feature.
              </p>
              
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="mt-1"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" size="lg">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-8">
              {/* Support Hours */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Support Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {supportHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-muted-foreground">{schedule.day}</span>
                        <Badge variant="outline">{schedule.hours}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Office Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Headquarters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="font-medium">LazrChain Technologies Inc.</div>
                    <div className="text-muted-foreground">
                      456 Tech Hub Road<br />
                      Innovation City, IC 67890<br />
                      United States
                    </div>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="text-sm text-muted-foreground">
                      <strong>Business Registration:</strong> IC-2025-987654<br />
                      <strong>Tax ID:</strong> 98-7654321
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Community Channels */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-muted-foreground">
              Connect with other investors and stay updated with the latest news
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communityChannels.map((channel, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Globe className="w-10 h-10 text-blue-500 mx-auto mb-2" />
                  <CardTitle className="text-lg">{channel.name}</CardTitle>
                  <CardDescription>{channel.members} members</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {channel.description}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Join Channel
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-r from-red-500/10 to-orange-500/10 border-t border-red-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">
            Emergency Support
          </h2>
          <p className="text-muted-foreground mb-6">
            For urgent security issues, unauthorized access, or critical platform problems
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="destructive">
              Report Security Issue
            </Button>
            <Button variant="outline">
              Emergency Hotline: +1 (555) 911-LAZR
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;