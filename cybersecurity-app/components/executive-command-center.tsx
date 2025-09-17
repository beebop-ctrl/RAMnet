"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Crown, Globe, TrendingUp, Shield, Users, BarChart3, Activity, Zap, Target, Brain } from "lucide-react"

interface ExecutiveMetric {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "stable"
  risk: "low" | "medium" | "high" | "critical"
}

interface ThreatIntelligence {
  region: string
  threatLevel: number
  incidents: number
  trend: "increasing" | "decreasing" | "stable"
  primaryThreats: string[]
}

interface BusinessImpact {
  category: string
  riskScore: number
  affectedSystems: number
  mitigationStatus: "complete" | "in-progress" | "planned"
}

export default function ExecutiveCommandCenter() {
  const [executiveMetrics, setExecutiveMetrics] = useState<ExecutiveMetric[]>([])
  const [globalThreats, setGlobalThreats] = useState<ThreatIntelligence[]>([])
  const [businessImpacts, setBusinessImpacts] = useState<BusinessImpact[]>([])
  const [overallRiskScore, setOverallRiskScore] = useState(0)
  const [highlightedButtons, setHighlightedButtons] = useState<Set<string>>(new Set())

  useEffect(() => {
    const mockMetrics: ExecutiveMetric[] = [
      {
        title: "Security Posture Score",
        value: "94.7%",
        change: "+2.3%",
        trend: "up",
        risk: "low",
      },
      {
        title: "Threat Exposure",
        value: "Medium",
        change: "-15%",
        trend: "down",
        risk: "medium",
      },
      {
        title: "Compliance Status",
        value: "98.2%",
        change: "+0.8%",
        trend: "up",
        risk: "low",
      },
      {
        title: "Incident Response Time",
        value: "2.3 min",
        change: "-45%",
        trend: "down",
        risk: "low",
      },
      {
        title: "Staff Readiness",
        value: "91%",
        change: "+5%",
        trend: "up",
        risk: "low",
      },
    ]

    const mockGlobalThreats: ThreatIntelligence[] = [
      {
        region: "North America",
        threatLevel: 73,
        incidents: 1247,
        trend: "increasing",
        primaryThreats: ["Ransomware", "Phishing", "Supply Chain"],
      },
      {
        region: "Europe",
        threatLevel: 68,
        incidents: 892,
        trend: "stable",
        primaryThreats: ["State-sponsored", "Financial Fraud", "Data Theft"],
      },
      {
        region: "Asia Pacific",
        threatLevel: 81,
        incidents: 1563,
        trend: "increasing",
        primaryThreats: ["APT Groups", "Cryptocurrency", "IoT Attacks"],
      },
      {
        region: "Global",
        threatLevel: 76,
        incidents: 4127,
        trend: "increasing",
        primaryThreats: ["Zero-day Exploits", "AI-powered Attacks", "Cloud Security"],
      },
    ]

    const mockBusinessImpacts: BusinessImpact[] = [
      {
        category: "Revenue Protection",
        riskScore: 23,
        affectedSystems: 12,
        mitigationStatus: "in-progress",
      },
      {
        category: "Customer Data",
        riskScore: 45,
        affectedSystems: 8,
        mitigationStatus: "complete",
      },
      {
        category: "Operational Continuity",
        riskScore: 67,
        affectedSystems: 23,
        mitigationStatus: "planned",
      },
      {
        category: "Regulatory Compliance",
        riskScore: 12,
        affectedSystems: 3,
        mitigationStatus: "complete",
      },
    ]

    setExecutiveMetrics(mockMetrics)
    setGlobalThreats(mockGlobalThreats)
    setBusinessImpacts(mockBusinessImpacts)
    setOverallRiskScore(34)
  }, [])

  const handleButtonClick = (buttonId: string) => {
    setHighlightedButtons((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(buttonId)) {
        newSet.delete(buttonId)
      } else {
        newSet.add(buttonId)
      }
      return newSet
    })
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "critical":
        return "text-red-400 border-red-400 bg-red-400/10"
      case "high":
        return "text-orange-400 border-orange-400 bg-orange-400/10"
      case "medium":
        return "text-yellow-400 border-yellow-400 bg-yellow-400/10"
      case "low":
        return "text-green-400 border-green-400 bg-green-400/10"
      default:
        return "text-gray-400 border-gray-400 bg-gray-400/10"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-accent" />
      case "down":
        return <TrendingUp className="h-4 w-4 text-destructive rotate-180" />
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getMitigationColor = (status: string) => {
    switch (status) {
      case "complete":
        return "text-accent border-accent"
      case "in-progress":
        return "text-secondary border-secondary"
      case "planned":
        return "text-primary border-primary"
      default:
        return "text-muted-foreground border-muted"
    }
  }

  return (
    <div className="space-y-6">
      {/* Executive Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Crown className="h-8 w-8 text-primary cyber-glow" />
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Executive Command Center
            </h2>
            <p className="text-muted-foreground">Strategic cybersecurity overview for leadership</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Overall Risk Score</p>
          <div className="flex items-center gap-2">
            <p className="text-3xl font-bold text-accent">{overallRiskScore}</p>
            <Badge variant="outline" className="border-accent text-accent">
              LOW RISK
            </Badge>
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {executiveMetrics.map((metric, index) => (
          <Card key={index} className={`glass-morphism ${getRiskColor(metric.risk)}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm">{metric.title}</h3>
                {getTrendIcon(metric.trend)}
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="text-sm text-muted-foreground">{metric.change} from last month</p>
                </div>
                <Badge variant="outline" className={getRiskColor(metric.risk)}>
                  {metric.risk.toUpperCase()}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Executive Dashboard Tabs */}
      <Tabs defaultValue="global-threat" className="space-y-4">
        <TabsList className="glass-morphism">
          <TabsTrigger
            value="global-threat"
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
          >
            Global Threat Landscape
          </TabsTrigger>
          <TabsTrigger
            value="business-impact"
            className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary"
          >
            Business Impact Analysis
          </TabsTrigger>
          <TabsTrigger
            value="strategic-insights"
            className="data-[state=active]:bg-accent/20 data-[state=active]:text-accent"
          >
            Strategic Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="global-threat" className="space-y-4">
          {/* Holographic Risk Globe Simulation */}
          <Card className="glass-morphism">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Global Threat Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Threat Map Visualization */}
                <div className="space-y-4">
                  <div className="h-64 rounded-lg glass-morphism flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20"></div>
                    <div className="relative z-10 text-center">
                      <Globe className="h-16 w-16 text-primary mx-auto mb-4 cyber-pulse" />
                      <h3 className="text-lg font-semibold mb-2">Interactive Threat Globe</h3>
                      <p className="text-sm text-muted-foreground">Real-time global threat visualization</p>
                      <div className="mt-4 flex justify-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-destructive animate-pulse"></div>
                        <div className="w-3 h-3 rounded-full bg-secondary animate-pulse delay-100"></div>
                        <div className="w-3 h-3 rounded-full bg-accent animate-pulse delay-200"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className={`glass-morphism ${highlightedButtons.has("threat-analysis") ? "cyber-glow border-primary text-primary" : ""}`}
                      onClick={() => handleButtonClick("threat-analysis")}
                    >
                      Threat Analysis
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className={`glass-morphism ${highlightedButtons.has("risk-assessment") ? "cyber-glow border-secondary text-secondary" : ""}`}
                      onClick={() => handleButtonClick("risk-assessment")}
                    >
                      Risk Assessment
                    </Button>
                  </div>
                </div>

                {/* Regional Threat Breakdown */}
                <div className="space-y-4">
                  {globalThreats.map((threat, index) => (
                    <div key={index} className="p-4 rounded-lg glass-morphism border border-border/50">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">{threat.region}</h4>
                        <Badge
                          variant="outline"
                          className={
                            threat.threatLevel > 75
                              ? "border-destructive text-destructive"
                              : threat.threatLevel > 50
                                ? "border-secondary text-secondary"
                                : "border-accent text-accent"
                          }
                        >
                          {threat.threatLevel}% RISK
                        </Badge>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-sm">
                          <span>Threat Level</span>
                          <span>{threat.threatLevel}%</span>
                        </div>
                        <Progress value={threat.threatLevel} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span>Incidents: {threat.incidents.toLocaleString()}</span>
                        <div className="flex items-center gap-1">
                          {threat.trend === "increasing" ? (
                            <TrendingUp className="h-3 w-3 text-destructive" />
                          ) : threat.trend === "decreasing" ? (
                            <TrendingUp className="h-3 w-3 text-accent rotate-180" />
                          ) : (
                            <Activity className="h-3 w-3 text-muted-foreground" />
                          )}
                          <span className="capitalize">{threat.trend}</span>
                        </div>
                      </div>

                      <div className="mt-3">
                        <p className="text-xs text-muted-foreground mb-1">Primary Threats:</p>
                        <div className="flex flex-wrap gap-1">
                          {threat.primaryThreats.map((threatType, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {threatType}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business-impact" className="space-y-4">
          <Card className="glass-morphism">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-accent" />
                Business Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {businessImpacts.map((impact, index) => (
                  <div key={index} className="p-4 rounded-lg glass-morphism border border-border/50">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold">{impact.category}</h4>
                      <Badge variant="outline" className={getMitigationColor(impact.mitigationStatus)}>
                        {impact.mitigationStatus.replace("-", " ").toUpperCase()}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Risk Score</span>
                        <span className="font-bold text-lg">{impact.riskScore}</span>
                      </div>
                      <Progress value={impact.riskScore} className="h-2" />

                      <div className="grid grid-cols-1 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Affected Systems</p>
                          <p className="font-semibold">{impact.affectedSystems}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategic-insights" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Roadmap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <h4 className="font-semibold text-primary mb-2">Priority 1: Zero Trust Implementation</h4>
                    <p className="text-sm mb-2">Implement zero trust architecture to reduce attack surface by 67%</p>
                    <div className="flex items-center gap-2 text-xs">
                      <Badge variant="outline" className="border-primary text-primary">
                        ROI: 340%
                      </Badge>
                      <Badge variant="outline" className="border-accent text-accent">
                        Timeline: 6 months
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                    <h4 className="font-semibold text-secondary mb-2">Priority 2: Staff Training Enhancement</h4>
                    <p className="text-sm mb-2">Advanced phishing simulation reduces human error incidents by 45%</p>
                    <div className="flex items-center gap-2 text-xs">
                      <Badge variant="outline" className="border-secondary text-secondary">
                        ROI: 180%
                      </Badge>
                      <Badge variant="outline" className="border-accent text-accent">
                        Timeline: 3 months
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                    <h4 className="font-semibold text-accent mb-2">Priority 3: Cloud Security Posture</h4>
                    <p className="text-sm mb-2">Enhanced cloud monitoring prevents 89% of data exposure risks</p>
                    <div className="flex items-center gap-2 text-xs">
                      <Badge variant="outline" className="border-accent text-accent">
                        ROI: 220%
                      </Badge>
                      <Badge variant="outline" className="border-primary text-primary">
                        Timeline: 4 months
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-secondary" />
                  Executive Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg glass-morphism">
                    <h4 className="font-semibold mb-2">Current Security Posture</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Organization maintains strong defensive capabilities with 94.7% security score. Proactive threat
                      detection has prevented 4,329 attacks this month.
                    </p>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-accent" />
                      <span className="text-sm font-medium text-accent">Excellent Defense</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg glass-morphism">
                    <h4 className="font-semibold mb-2">Key Achievements</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center gap-2">
                        <Target className="h-3 w-3 text-primary" />
                        <span>45% reduction in incident response time</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Zap className="h-3 w-3 text-secondary" />
                        <span>Zero successful ransomware attacks</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Users className="h-3 w-3 text-accent" />
                        <span>91% staff security awareness score</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
