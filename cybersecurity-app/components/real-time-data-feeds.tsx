"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Radio, Rss, Globe, Activity, AlertTriangle, Clock, MapPin, Eye, Brain, Target, Shield } from "lucide-react"

interface ThreatFeed {
  id: string
  source: string
  timestamp: string
  threatType: string
  severity: "critical" | "high" | "medium" | "low"
  description: string
  indicators: string[]
  confidence: number
  location: string
  status: "new" | "processing" | "correlated" | "dismissed"
}

interface IntelligenceFeed {
  id: string
  feedName: string
  provider: string
  status: "active" | "inactive" | "error"
  lastUpdate: string
  recordsToday: number
  reliability: number
  latency: number
}

interface CorrelationResult {
  id: string
  primaryThreat: string
  correlatedThreats: string[]
  confidence: number
  riskScore: number
  recommendation: string
  timestamp: string
}

interface DataStream {
  name: string
  type: "threat" | "vulnerability" | "intelligence" | "network"
  status: "streaming" | "paused" | "error"
  throughput: number
  latency: number
  enabled: boolean
}

export default function RealTimeDataFeeds() {
  const [threatFeeds, setThreatFeeds] = useState<ThreatFeed[]>([])
  const [intelligenceFeeds, setIntelligenceFeeds] = useState<IntelligenceFeed[]>([])
  const [correlationResults, setCorrelationResults] = useState<CorrelationResult[]>([])
  const [dataStreams, setDataStreams] = useState<DataStream[]>([])
  const [autoCorrelation, setAutoCorrelation] = useState(true)
  const [feedsEnabled, setFeedsEnabled] = useState(true)

  useEffect(() => {
    // Mock real-time data feeds
    const mockThreatFeeds: ThreatFeed[] = [
      {
        id: "TF001",
        source: "Global Threat Intelligence",
        timestamp: "2024-01-15 14:45:23",
        threatType: "Malware Campaign",
        severity: "critical",
        description: "New ransomware variant targeting healthcare infrastructure",
        indicators: ["malware.exe", "192.168.1.100", "suspicious-domain.com"],
        confidence: 94,
        location: "Eastern Europe",
        status: "new",
      },
      {
        id: "TF002",
        source: "Dark Web Monitor",
        timestamp: "2024-01-15 14:43:15",
        threatType: "Data Breach",
        severity: "high",
        description: "Corporate credentials being sold on underground forums",
        indicators: ["leaked-db.sql", "admin@company.com", "darkmarket.onion"],
        confidence: 87,
        location: "Unknown",
        status: "processing",
      },
      {
        id: "TF003",
        source: "Honeypot Network",
        timestamp: "2024-01-15 14:41:08",
        threatType: "Reconnaissance",
        severity: "medium",
        description: "Automated scanning activity from botnet infrastructure",
        indicators: ["scanner-bot", "203.0.113.45", "port-scan-pattern"],
        confidence: 76,
        location: "Asia Pacific",
        status: "correlated",
      },
      {
        id: "TF004",
        source: "Threat Research Labs",
        timestamp: "2024-01-15 14:38:42",
        threatType: "Zero-Day Exploit",
        severity: "critical",
        description: "Previously unknown vulnerability being actively exploited",
        indicators: ["exploit-kit.js", "CVE-2024-XXXX", "payload.bin"],
        confidence: 91,
        location: "Global",
        status: "new",
      },
    ]

    const mockIntelligenceFeeds: IntelligenceFeed[] = [
      {
        id: "IF001",
        feedName: "MITRE ATT&CK Feed",
        provider: "MITRE Corporation",
        status: "active",
        lastUpdate: "2024-01-15 14:44:00",
        recordsToday: 1247,
        reliability: 98,
        latency: 45,
      },
      {
        id: "IF002",
        feedName: "NIST CVE Database",
        provider: "NIST",
        status: "active",
        lastUpdate: "2024-01-15 14:42:30",
        recordsToday: 892,
        reliability: 99,
        latency: 23,
      },
      {
        id: "IF003",
        feedName: "Threat Actor Intelligence",
        provider: "CrowdStrike",
        status: "active",
        lastUpdate: "2024-01-15 14:40:15",
        recordsToday: 456,
        reliability: 95,
        latency: 67,
      },
      {
        id: "IF004",
        feedName: "Malware Signatures",
        provider: "VirusTotal",
        status: "error",
        lastUpdate: "2024-01-15 14:15:22",
        recordsToday: 0,
        reliability: 97,
        latency: 0,
      },
      {
        id: "IF005",
        feedName: "Geopolitical Risk Feed",
        provider: "Recorded Future",
        status: "active",
        lastUpdate: "2024-01-15 14:43:45",
        recordsToday: 234,
        reliability: 89,
        latency: 156,
      },
    ]

    const mockCorrelationResults: CorrelationResult[] = [
      {
        id: "CR001",
        primaryThreat: "Ransomware Campaign - Healthcare Sector",
        correlatedThreats: [
          "Phishing emails targeting medical staff",
          "VPN brute force attacks",
          "Medical device vulnerabilities",
        ],
        confidence: 92,
        riskScore: 87,
        recommendation: "Implement emergency response protocol for healthcare infrastructure",
        timestamp: "2024-01-15 14:44:30",
      },
      {
        id: "CR002",
        primaryThreat: "Supply Chain Compromise",
        correlatedThreats: [
          "Software update anomalies",
          "Certificate authority irregularities",
          "Third-party vendor alerts",
        ],
        confidence: 84,
        riskScore: 73,
        recommendation: "Audit all third-party integrations and software dependencies",
        timestamp: "2024-01-15 14:41:15",
      },
      {
        id: "CR003",
        primaryThreat: "State-Sponsored APT Activity",
        correlatedThreats: ["Diplomatic sector targeting", "Critical infrastructure probing", "Zero-day exploitation"],
        confidence: 89,
        riskScore: 94,
        recommendation: "Activate enhanced monitoring for critical national infrastructure",
        timestamp: "2024-01-15 14:38:22",
      },
    ]

    const mockDataStreams: DataStream[] = [
      {
        name: "Global Threat Intelligence",
        type: "threat",
        status: "streaming",
        throughput: 1247,
        latency: 45,
        enabled: true,
      },
      {
        name: "Vulnerability Feeds",
        type: "vulnerability",
        status: "streaming",
        throughput: 892,
        latency: 23,
        enabled: true,
      },
      {
        name: "Network Traffic Analysis",
        type: "network",
        status: "streaming",
        throughput: 15678,
        latency: 12,
        enabled: true,
      },
      {
        name: "Dark Web Monitoring",
        type: "intelligence",
        status: "paused",
        throughput: 0,
        latency: 0,
        enabled: false,
      },
      {
        name: "Honeypot Data",
        type: "threat",
        status: "streaming",
        throughput: 456,
        latency: 67,
        enabled: true,
      },
    ]

    setThreatFeeds(mockThreatFeeds)
    setIntelligenceFeeds(mockIntelligenceFeeds)
    setCorrelationResults(mockCorrelationResults)
    setDataStreams(mockDataStreams)

    // Simulate real-time updates
    const interval = setInterval(() => {
      // Add new threat feed every 30 seconds (simulated)
      const newThreat: ThreatFeed = {
        id: `TF${Date.now()}`,
        source: "Live Threat Feed",
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
        threatType: ["Phishing", "Malware", "DDoS", "Data Breach"][Math.floor(Math.random() * 4)],
        severity: ["critical", "high", "medium", "low"][Math.floor(Math.random() * 4)] as any,
        description: "Real-time threat detected by AI monitoring systems",
        indicators: [
          `indicator-${Date.now()}`,
          `ip-${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        ],
        confidence: Math.floor(Math.random() * 40) + 60,
        location: ["North America", "Europe", "Asia Pacific", "Unknown"][Math.floor(Math.random() * 4)],
        status: "new",
      }

      setThreatFeeds((prev) => [newThreat, ...prev.slice(0, 9)])
    }, 10000) // Update every 10 seconds for demo

    return () => clearInterval(interval)
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-400 border-red-400 bg-red-400/10"
      case "high":
        return "text-orange-400 border-orange-400 bg-orange-400/10"
      case "medium":
        return "text-yellow-400 border-yellow-400 bg-yellow-400/10"
      case "low":
        return "text-blue-400 border-blue-400 bg-blue-400/10"
      default:
        return "text-gray-400 border-gray-400 bg-gray-400/10"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "streaming":
        return "text-accent border-accent bg-accent/10"
      case "new":
        return "text-primary border-primary bg-primary/10"
      case "processing":
        return "text-secondary border-secondary bg-secondary/10"
      case "correlated":
        return "text-accent border-accent bg-accent/10"
      case "error":
      case "paused":
        return "text-destructive border-destructive bg-destructive/10"
      case "inactive":
        return "text-muted-foreground border-muted bg-muted/10"
      default:
        return "text-muted-foreground border-muted bg-muted/10"
    }
  }

  const toggleDataStream = (index: number) => {
    setDataStreams((prev) =>
      prev.map((stream, i) =>
        i === index ? { ...stream, enabled: !stream.enabled, status: stream.enabled ? "paused" : "streaming" } : stream,
      ),
    )
  }

  return (
    <div className="space-y-6">
      {/* Data Feeds Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Radio className="h-8 w-8 text-primary cyber-glow" />
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Real-Time Data Feeds
            </h2>
            <p className="text-muted-foreground">Live threat intelligence and correlation engine</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch checked={autoCorrelation} onCheckedChange={setAutoCorrelation} />
            <span className="text-sm">Auto Correlation</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={feedsEnabled} onCheckedChange={setFeedsEnabled} />
            <span className="text-sm">Live Feeds</span>
          </div>
          <Badge variant="outline" className="border-accent text-accent animate-pulse">
            {feedsEnabled ? "LIVE" : "PAUSED"}
          </Badge>
        </div>
      </div>

      {/* Data Stream Status */}
      <Card className="glass-morphism">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Data Stream Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataStreams.map((stream, index) => (
              <div key={index} className="p-3 rounded-lg glass-morphism border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">{stream.name}</h4>
                  <Switch checked={stream.enabled} onCheckedChange={() => toggleDataStream(index)} size="sm" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <Badge variant="outline" className={getStatusColor(stream.status)}>
                      {stream.status.toUpperCase()}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {stream.type.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-muted-foreground">Throughput</p>
                      <p className="font-semibold">{stream.throughput.toLocaleString()}/hr</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Latency</p>
                      <p className="font-semibold">{stream.latency}ms</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Data Tabs */}
      <Tabs defaultValue="live-threats" className="space-y-4">
        <TabsList className="glass-morphism">
          <TabsTrigger value="live-threats">Live Threat Feed</TabsTrigger>
          <TabsTrigger value="intelligence-feeds">Intelligence Sources</TabsTrigger>
          <TabsTrigger value="correlations">Threat Correlations</TabsTrigger>
        </TabsList>

        <TabsContent value="live-threats" className="space-y-4">
          <Card className="glass-morphism">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rss className="h-5 w-5 text-destructive" />
                Live Threat Intelligence Stream
                <Badge variant="outline" className="border-accent text-accent animate-pulse ml-2">
                  STREAMING
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {threatFeeds.map((feed) => (
                  <div key={feed.id} className="p-4 rounded-lg glass-morphism border border-border/50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className={getSeverityColor(feed.severity)}>
                            {feed.severity.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className={getStatusColor(feed.status)}>
                            {feed.status.toUpperCase()}
                          </Badge>
                        </div>
                        <h4 className="font-semibold">{feed.threatType}</h4>
                        <p className="text-sm text-muted-foreground">{feed.description}</p>
                      </div>
                      <div className="text-right text-xs">
                        <p className="font-semibold text-primary">{feed.confidence}%</p>
                        <p className="text-muted-foreground">confidence</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-3">
                      <div>
                        <p className="text-muted-foreground">Source</p>
                        <p className="font-medium">{feed.source}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Location</p>
                        <p className="font-medium flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {feed.location}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Timestamp</p>
                        <p className="font-medium flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {feed.timestamp}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Indicators</p>
                        <p className="font-medium">{feed.indicators.length} IOCs</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {feed.indicators.slice(0, 3).map((indicator, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {indicator}
                        </Badge>
                      ))}
                      {feed.indicators.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{feed.indicators.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs bg-transparent">
                        <Eye className="h-3 w-3 mr-1" />
                        Investigate
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs bg-transparent">
                        <Target className="h-3 w-3 mr-1" />
                        Block IOCs
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs bg-transparent">
                        <Brain className="h-3 w-3 mr-1" />
                        Correlate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="intelligence-feeds" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {intelligenceFeeds.map((feed) => (
              <Card key={feed.id} className="glass-morphism">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      {feed.feedName}
                    </span>
                    <Badge variant="outline" className={getStatusColor(feed.status)}>
                      {feed.status.toUpperCase()}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Provider</p>
                        <p className="font-semibold">{feed.provider}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Reliability</p>
                        <p className="font-semibold text-accent">{feed.reliability}%</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Feed Quality</span>
                        <span>{feed.reliability}%</span>
                      </div>
                      <Progress value={feed.reliability} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Records Today</p>
                        <p className="font-semibold text-secondary">{feed.recordsToday.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Latency</p>
                        <p className="font-semibold">{feed.latency}ms</p>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">Last Update: {feed.lastUpdate}</div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs flex-1 bg-transparent">
                        <Activity className="h-3 w-3 mr-1" />
                        Monitor
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs flex-1 bg-transparent">
                        <Shield className="h-3 w-3 mr-1" />
                        Configure
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="correlations" className="space-y-4">
          <Card className="glass-morphism">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-secondary" />
                AI-Powered Threat Correlations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {correlationResults.map((result) => (
                  <div key={result.id} className="p-4 rounded-lg glass-morphism border border-border/50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{result.primaryThreat}</h4>
                        <p className="text-sm text-muted-foreground">{result.recommendation}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-destructive">{result.riskScore}</p>
                        <p className="text-xs text-muted-foreground">Risk Score</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Correlation Confidence</span>
                        <span className="text-sm font-medium text-primary">{result.confidence}%</span>
                      </div>
                      <Progress value={result.confidence} className="h-2" />

                      <div>
                        <p className="text-sm font-medium mb-2">Correlated Threats:</p>
                        <div className="space-y-1">
                          {result.correlatedThreats.map((threat, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <AlertTriangle className="h-3 w-3 text-secondary" />
                              <span>{threat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Correlation Time: {result.timestamp}</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-xs bg-transparent">
                            <Eye className="h-3 w-3 mr-1" />
                            Details
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs bg-transparent">
                            <Shield className="h-3 w-3 mr-1" />
                            Act
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
