"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Brain, Radar, Target, Zap, Eye, Activity, TrendingUp, Clock, MapPin, Users } from "lucide-react"

interface ThreatData {
  id: string
  type: string
  severity: "critical" | "high" | "medium" | "low"
  confidence: number
  source: string
  target: string
  timestamp: string
  status: "active" | "blocked" | "investigating" | "resolved"
  aiPrediction: number
  location: string
}

interface AIModel {
  name: string
  accuracy: number
  status: "active" | "training" | "updating"
  lastUpdate: string
  threatsDetected: number
}

export default function ThreatDetectionEngine() {
  const [activeThreats, setActiveThreats] = useState<ThreatData[]>([])
  const [aiModels, setAiModels] = useState<AIModel[]>([])
  const [scanProgress, setScanProgress] = useState(0)
  const [isScanning, setIsScanning] = useState(false)

  // Simulate real-time threat detection
  useEffect(() => {
    const mockThreats: ThreatData[] = [
      {
        id: "T001",
        type: "Advanced Persistent Threat",
        severity: "critical",
        confidence: 94,
        source: "192.168.1.45",
        target: "Database Server",
        timestamp: "2024-01-15 14:32:15",
        status: "active",
        aiPrediction: 87,
        location: "External - Russia",
      },
      {
        id: "T002",
        type: "Phishing Campaign",
        severity: "high",
        confidence: 89,
        source: "email@suspicious-domain.com",
        target: "HR Department",
        timestamp: "2024-01-15 14:28:42",
        status: "blocked",
        aiPrediction: 92,
        location: "External - China",
      },
      {
        id: "T003",
        type: "Lateral Movement",
        severity: "medium",
        confidence: 76,
        source: "WORKSTATION-07",
        target: "File Server",
        timestamp: "2024-01-15 14:15:33",
        status: "investigating",
        aiPrediction: 68,
        location: "Internal Network",
      },
      {
        id: "T004",
        type: "Data Exfiltration",
        severity: "high",
        confidence: 91,
        source: "10.0.0.23",
        target: "Customer Database",
        timestamp: "2024-01-15 14:02:18",
        status: "blocked",
        aiPrediction: 95,
        location: "External - Unknown",
      },
    ]

    const mockAIModels: AIModel[] = [
      {
        name: "Behavioral Analysis Engine",
        accuracy: 94.7,
        status: "active",
        lastUpdate: "2024-01-15 13:45:00",
        threatsDetected: 1247,
      },
      {
        name: "Network Anomaly Detector",
        accuracy: 91.2,
        status: "active",
        lastUpdate: "2024-01-15 13:30:00",
        threatsDetected: 892,
      },
      {
        name: "Malware Signature Analyzer",
        accuracy: 97.8,
        status: "updating",
        lastUpdate: "2024-01-15 12:15:00",
        threatsDetected: 2156,
      },
      {
        name: "Zero-Day Predictor",
        accuracy: 87.3,
        status: "training",
        lastUpdate: "2024-01-15 11:00:00",
        threatsDetected: 34,
      },
    ]

    setActiveThreats(mockThreats)
    setAiModels(mockAIModels)
  }, [])

  const startDeepScan = () => {
    setIsScanning(true)
    setScanProgress(0)

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsScanning(false)
          return 100
        }
        // Ensure progress doesn't exceed 100%
        const increment = Math.random() * 10
        return Math.min(prev + increment, 100)
      })
    }, 500)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-400 border-red-400"
      case "high":
        return "text-orange-400 border-orange-400"
      case "medium":
        return "text-yellow-400 border-yellow-400"
      case "low":
        return "text-blue-400 border-blue-400"
      default:
        return "text-gray-400 border-gray-400"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-destructive border-destructive"
      case "blocked":
        return "text-accent border-accent"
      case "investigating":
        return "text-secondary border-secondary"
      case "resolved":
        return "text-primary border-primary"
      default:
        return "text-muted-foreground border-muted"
    }
  }

  return (
    <div className="space-y-6">
      {/* AI Detection Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-morphism cyber-glow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">94.7%</p>
                <p className="text-sm text-muted-foreground">AI Accuracy</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Radar className="h-8 w-8 text-secondary" />
              <div>
                <p className="text-2xl font-bold text-secondary">{activeThreats.length}</p>
                <p className="text-sm text-muted-foreground">Active Threats</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-accent" />
              <div>
                <p className="text-2xl font-bold text-accent">4,329</p>
                <p className="text-sm text-muted-foreground">Blocked Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 text-destructive" />
              <div>
                <p className="text-2xl font-bold text-destructive">2.3s</p>
                <p className="text-sm text-muted-foreground">Avg Response</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deep Scan Control */}
      <Card className="glass-morphism">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Proactive Deep Scan
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Real-time threat radar uses advanced AI algorithms to continuously scan network traffic, analyze behavioral
            patterns, and detect zero-day threats across all endpoints and network segments.
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-medium">AI-Powered Network Analysis</p>
              <p className="text-sm text-muted-foreground">
                Scanning 2,847 endpoints for behavioral anomalies and zero-day threats
              </p>
            </div>
            <Button onClick={startDeepScan} disabled={isScanning} className="cyber-glow">
              {isScanning ? "Scanning..." : "Start Deep Scan"}
            </Button>
          </div>
          {isScanning && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(scanProgress)}%</span>
              </div>
              <Progress value={scanProgress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Threat Detection Tabs */}
      <Tabs defaultValue="active-threats" className="space-y-4">
        <TabsList className="glass-morphism">
          <TabsTrigger value="active-threats">Active Threats</TabsTrigger>
          <TabsTrigger value="ai-models">AI Models</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="active-threats" className="space-y-4">
          <Card className="glass-morphism">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Real-Time Threat Detection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeThreats.map((threat) => (
                  <div key={threat.id} className="p-4 rounded-lg glass-morphism border border-border/50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className={getSeverityColor(threat.severity)}>
                          {threat.severity.toUpperCase()}
                        </Badge>
                        <div>
                          <h4 className="font-semibold">{threat.type}</h4>
                          <p className="text-sm text-muted-foreground">ID: {threat.id}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className={getStatusColor(threat.status)}>
                        {threat.status.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Source</p>
                        <p className="font-medium">{threat.source}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Target</p>
                        <p className="font-medium">{threat.target}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">AI Confidence</p>
                        <p className="font-medium text-primary">{threat.confidence}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Location</p>
                        <p className="font-medium flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {threat.location}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {threat.timestamp}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Prediction Score:</span>
                        <Badge variant="secondary" className="text-secondary">
                          {threat.aiPrediction}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-models" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiModels.map((model, index) => (
              <Card key={index} className="glass-morphism">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-primary" />
                      {model.name}
                    </span>
                    <Badge
                      variant="outline"
                      className={
                        model.status === "active"
                          ? "border-accent text-accent"
                          : model.status === "training"
                            ? "border-secondary text-secondary"
                            : "border-primary text-primary"
                      }
                    >
                      {model.status.toUpperCase()}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Accuracy</span>
                      <span className="text-primary font-bold">{model.accuracy}%</span>
                    </div>
                    <Progress value={model.accuracy} className="h-2" />

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Last Update</p>
                        <p className="font-medium">{model.lastUpdate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Threats Detected</p>
                        <p className="font-medium text-accent">{model.threatsDetected.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <Card className="glass-morphism">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-secondary" />
                Predictive Threat Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-gradient-to-r from-destructive/20 to-orange-500/20 border border-destructive/30">
                  <h4 className="font-semibold text-destructive mb-2">High Risk Prediction - Next 6 Hours</h4>
                  <p className="text-sm mb-3">
                    92% probability of targeted spear-phishing campaign against finance team
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>Target: 23 users</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Activity className="h-4 w-4" />
                      <span>Confidence: 92%</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-r from-secondary/20 to-primary/20 border border-secondary/30">
                  <h4 className="font-semibold text-secondary mb-2">Medium Risk Prediction - Next 24 Hours</h4>
                  <p className="text-sm mb-3">67% chance of DDoS attack on public-facing services</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      <span>Target: Web servers</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Activity className="h-4 w-4" />
                      <span>Confidence: 67%</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30">
                  <h4 className="font-semibold text-accent mb-2">Emerging Threat Pattern</h4>
                  <p className="text-sm mb-3">
                    New malware variant detected in similar organizations (healthcare sector)
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>Geographic: North America</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Timeline: 3-7 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
