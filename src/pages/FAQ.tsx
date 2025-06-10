
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, Search, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const faqCategories = [
    {
      category: "Getting Started",
      faqs: [
        {
          question: "What is the minimum deposit amount?",
          answer: "The minimum deposit amount is $100 USDT. This allows investors of all sizes to participate in our daily return program."
        },
        {
          question: "How do I create an account?",
          answer: "Creating an account is simple: 1) Click 'Get Started', 2) Provide your email and create a password, 3) Complete KYC verification, 4) Connect your USDT wallet, and 5) Make your first deposit."
        },
        {
          question: "What cryptocurrencies do you accept?",
          answer: "Currently, we only accept USDT (Tether) deposits. This stablecoin approach ensures price stability and reduces volatility risk for our investment strategies."
        },
        {
          question: "Is there a maximum deposit limit?",
          answer: "Our Enterprise plan accepts deposits up to $100,000 USDT. For larger investments, please contact our team for custom enterprise solutions."
        }
      ]
    },
    {
      category: "Returns & Investments",
      faqs: [
        {
          question: "How do you generate 1% daily returns?",
          answer: "We generate returns through diversified strategies including arbitrage trading across exchanges, DeFi yield farming, liquidity provision, and automated market making. Our expert team manages risk while optimizing for consistent returns."
        },
        {
          question: "Are the returns guaranteed?",
          answer: "While we have maintained consistent 1% daily returns since launch, cryptocurrency investments carry inherent risks. Past performance does not guarantee future results. We employ strict risk management to maintain consistency."
        },
        {
          question: "When are returns credited to my account?",
          answer: "Returns are calculated and credited daily at 00:00 UTC. You can view your daily returns in real-time on your dashboard and withdraw them anytime."
        },
        {
          question: "Do returns compound automatically?",
          answer: "Yes, unless you withdraw your daily returns, they automatically compound with your principal, increasing your daily return amount."
        }
      ]
    },
    {
      category: "Withdrawals & Security",
      faqs: [
        {
          question: "How fast are withdrawals processed?",
          answer: "Most withdrawals are processed instantly. During high network congestion, withdrawals may take up to 30 minutes. There are no lock-up periods - you can withdraw anytime."
        },
        {
          question: "Are there withdrawal fees?",
          answer: "We cover standard network fees for withdrawals. However, during periods of high network congestion, a small network fee may apply."
        },
        {
          question: "How do you secure user funds?",
          answer: "We use multi-signature wallets, cold storage for 95% of funds, regular security audits, and work with leading security partners like Fireblocks and Ledger."
        },
        {
          question: "Can I withdraw my principal anytime?",
          answer: "Yes, there are no lock-up periods. You can withdraw your principal and earned returns at any time, 24/7."
        }
      ]
    },
    {
      category: "Platform & Technical",
      faqs: [
        {
          question: "What blockchain networks do you support?",
          answer: "We currently support USDT on Ethereum, Binance Smart Chain, and Polygon networks. More networks will be added based on user demand."
        },
        {
          question: "How can I track my investment performance?",
          answer: "Your dashboard provides real-time tracking of deposits, daily returns, total earnings, and portfolio performance with detailed charts and analytics."
        },
        {
          question: "Is the platform available globally?",
          answer: "Yes, RobinHood is available globally, except in restricted jurisdictions. Please check our Terms of Service for specific country restrictions."
        },
        {
          question: "Do you have a mobile app?",
          answer: "Currently, we offer a mobile-responsive web platform. A dedicated mobile app is in development and will be released soon."
        }
      ]
    },
    {
      category: "Risk & Compliance",
      faqs: [
        {
          question: "What are the main risks involved?",
          answer: "Main risks include market volatility, smart contract risks, regulatory changes, and liquidity risks. We mitigate these through diversification, audits, compliance monitoring, and maintaining high liquidity buffers."
        },
        {
          question: "Are you regulated?",
          answer: "We operate in compliance with applicable regulations and work with compliance partners. Our operations are transparent and auditable on the blockchain."
        },
        {
          question: "What happens if the platform faces technical issues?",
          answer: "We maintain 99.9% uptime with redundant systems. In rare cases of technical issues, user funds remain secure in multi-sig wallets, and our emergency protocols ensure quick resolution."
        },
        {
          question: "How do you handle regulatory compliance?",
          answer: "We work with leading compliance partners like Elliptic for AML/KYC, maintain transparent operations, and adapt to regulatory requirements in our operating jurisdictions."
        }
      ]
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br from-background to-muted/20">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            <HelpCircle className="w-4 h-4 mr-2" />
            FAQ
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent"> Questions</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Find answers to common questions about our platform, investment strategies, 
            security measures, and daily returns.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search FAQ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-4">
                  Try different keywords or browse all categories below.
                </p>
                <Button variant="outline" onClick={() => setSearchTerm("")}>
                  Clear Search
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {filteredFAQs.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h2 className="text-2xl font-bold mb-6 text-center">
                    {category.category}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem 
                        key={faqIndex} 
                        value={`${categoryIndex}-${faqIndex}`}
                        className="border rounded-lg"
                      >
                        <AccordionTrigger className="px-6 py-4 hover:no-underline">
                          <span className="text-left font-medium">
                            {faq.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                          <p className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Platform Statistics</h2>
            <p className="text-muted-foreground">
              Key numbers about our platform performance and user satisfaction
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-green-500 mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">Platform Uptime</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-500 mb-2">12,450+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-purple-500 mb-2">$2.4M+</div>
                <div className="text-sm text-muted-foreground">Total Invested</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-orange-500 mb-2">365</div>
                <div className="text-sm text-muted-foreground">Days of Operation</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Still Have Questions?</CardTitle>
              <CardDescription>
                Our support team is available 24/7 to help you with any questions
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <HelpCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1">Live Chat</h3>
                  <p className="text-sm text-muted-foreground">Instant support</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <HelpCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1">Email Support</h3>
                  <p className="text-sm text-muted-foreground">Detailed responses</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <HelpCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1">Community</h3>
                  <p className="text-sm text-muted-foreground">Telegram & Discord</p>
                </div>
              </div>
              
              <Button asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
