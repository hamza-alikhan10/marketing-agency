
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Lock, Eye, Users, Award, FileCheck, Globe, Server } from "lucide-react";

const Security = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: "Multi-Signature Wallets",
      description: "All funds are stored in multi-signature wallets requiring multiple approvals for any transaction.",
      details: "3-of-5 multisig configuration with hardware security modules"
    },
    {
      icon: Lock,
      title: "Cold Storage Protection",
      description: "95% of user funds are kept in offline cold storage wallets for maximum security.",
      details: "Air-gapped systems with bank-grade physical security"
    },
    {
      icon: Eye,
      title: "Blockchain Transparency",
      description: "All transactions and fund movements are publicly verifiable on the blockchain.",
      details: "Real-time on-chain verification and audit trails"
    },
    {
      icon: Server,
      title: "DDoS Protection",
      description: "Enterprise-grade infrastructure with advanced DDoS protection and monitoring.",
      details: "24/7 security monitoring with incident response team"
    }
  ];

  const audits = [
    {
      company: "CertiK",
      date: "March 2024",
      score: "96/100",
      status: "Passed",
      type: "Smart Contract Audit"
    },
    {
      company: "Hacken",
      date: "February 2024",
      score: "9.8/10",
      status: "Passed",
      type: "Platform Security Audit"
    },
    {
      company: "Quantstamp",
      date: "January 2024",
      score: "A+",
      status: "Passed",
      type: "DeFi Protocol Audit"
    }
  ];

  const partners = [
    {
      name: "Chainlink",
      role: "Price Feeds & Data",
      description: "Secure, reliable price data for all crypto assets"
    },
    {
      name: "Fireblocks",
      role: "Institutional Custody",
      description: "MPC-based wallet infrastructure and custody"
    },
    {
      name: "Elliptic",
      role: "Compliance & AML",
      description: "Blockchain analytics and compliance monitoring"
    },
    {
      name: "Ledger",
      role: "Hardware Security",
      description: "Hardware wallet integration and cold storage"
    }
  ];

  const riskManagement = [
    {
      title: "Portfolio Diversification",
      description: "Funds are spread across multiple high-liquidity crypto assets to minimize concentration risk."
    },
    {
      title: "Liquidity Management",
      description: "Maintain minimum 20% liquidity buffer for instant withdrawals and market volatility."
    },
    {
      title: "Smart Contract Risk",
      description: "Only interact with audited protocols and maintain emergency pause mechanisms."
    },
    {
      title: "Market Risk Controls",
      description: "Automated stop-loss and position sizing controls to protect against market downturns."
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br from-background to-muted/20">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">Security & Trust</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Security is Our
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent"> Top Priority</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            We employ industry-leading security measures, transparent operations, and comprehensive 
            audits to protect your investments and ensure platform reliability.
          </p>
        </div>
      </section>

      {/* Security Features */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Advanced Security Infrastructure</h2>
            <p className="text-muted-foreground">
              Multi-layered security approach protecting your funds at every level
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {securityFeatures.map((feature, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-green-500 mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      <strong>Technical Details:</strong> {feature.details}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Audits & Certifications */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Third-Party Audits & Certifications</h2>
            <p className="text-muted-foreground">
              Regular security audits by leading blockchain security firms
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {audits.map((audit, index) => (
              <Card key={index}>
                <CardHeader className="text-center">
                  <Award className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <CardTitle className="text-lg">{audit.company}</CardTitle>
                  <CardDescription>{audit.type}</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <Badge variant="outline">{audit.date}</Badge>
                  <div className="text-2xl font-bold text-green-500">{audit.score}</div>
                  <Badge className="bg-green-500">{audit.status}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline">
              View Full Audit Reports
            </Button>
          </div>
        </div>
      </section>

      {/* Risk Management */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Risk Management</h2>
            <p className="text-muted-foreground">
              Advanced risk controls and monitoring systems protect against market volatility
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {riskManagement.map((risk, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <FileCheck className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{risk.title}</h3>
                      <p className="text-muted-foreground text-sm">{risk.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners & Verifications */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted Partners & Integrations</h2>
            <p className="text-muted-foreground">
              Working with industry leaders to ensure maximum security and reliability
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <Globe className="w-10 h-10 text-blue-500 mx-auto mb-2" />
                  <CardTitle className="text-lg">{partner.name}</CardTitle>
                  <CardDescription className="text-sm font-medium text-green-600">
                    {partner.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    {partner.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
            <CardHeader className="text-center">
              <Eye className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-2xl">Blockchain Transparency</CardTitle>
              <CardDescription>
                Full transparency with real-time on-chain verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold">What You Can Verify:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      All deposit and withdrawal transactions
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Fund allocation to DeFi protocols
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Smart contract interactions
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Real-time portfolio composition
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold">Verification Tools:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Live blockchain explorer links
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Smart contract source code
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Public audit reports
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Real-time fund tracking
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center">
                <Button variant="outline">
                  View Transparency Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-r from-green-500 to-blue-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Invest with Confidence</h2>
          <p className="text-xl mb-8 opacity-90">
            Our comprehensive security measures and transparent operations ensure your 
            investments are protected while earning consistent returns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/plans">Start Investing Securely</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-green-500" asChild>
              <Link to="/contact">Contact Security Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Security;
