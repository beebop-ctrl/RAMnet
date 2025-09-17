"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { TrendingUp, Brain, Activity, Target, AlertTriangle, Shield, Eye, Plus, Archive } from "lucide-react"

interface RiskTrajectory {
  timeframe: string
  currentRisk: number
  predictedRisk: number
  confidence: number
  factors: string[]
}

interface ThreatPrediction {
  id: string
  threatType: string
  probability: number
  timeframe: string
  severity: "critical" | "high" | "medium" | "low"
  targetSectors: string[]
  mitigationRecommendations: string[]
  confidence: number
}

interface VulnerabilityForecast {
  cve: string
  description: string
  exploitProbability: number
  weaponizationEta: string
  affectedSystems: number
  patchPriority: "immediate" | "high" | "medium" | "low"
  riskScore: number
}

interface AIModelPerformance {
  modelName: string
  accuracy: number
  precision: number
  recall: number
  f1Score: number
  lastTrained: string
  predictionsToday: number
  status: "optimal" | "retraining" | "degraded"
}

interface PredictiveAnalyticsCenterProps {
  isAdmin: boolean
}

export default function PredictiveAnalyticsCenter({ isAdmin }: PredictiveAnalyticsCenterProps) {
  const [riskTrajectories, setRiskTrajectories] = useState<RiskTrajectory[]>([])
  const [threatPredictions, setThreatPredictions] = useState<ThreatPrediction[]>([])
  const [vulnerabilityForecasts, setVulnerabilityForecasts] = useState<VulnerabilityForecast[]>([])
  const [aiModels, setAiModels] = useState<AIModelPerformance[]>([])
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d")
  const [selectedSector, setSelectedSector] = useState("all")
  const [showAddThreatDialog, setShowAddThreatDialog] = useState(false)
  const [showAddVulnDialog, setShowAddVulnDialog] = useState(false)
  const [newThreatType, setNewThreatType] = useState("")
  const [newVulnCve, setNewVulnCve] = useState("")
  const [highlightedButtons, setHighlightedButtons] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Mock predictive analytics data
    const mockRiskTrajectories: RiskTrajectory[] = [
      {
        timeframe: "Next 24 Hours",
        currentRisk: 34,
        predictedRisk: 42,
        confidence: 94,
        factors: ["Increased phishing activity", "Holiday season vulnerability", "New CVE disclosure"],
      },
      {
        timeframe: "Next 7 Days",
        currentRisk: 34,
        predictedRisk: 58,
        confidence: 87,
        factors: ["Geopolitical tensions", "Supply chain vulnerabilities", "Zero-day exploitation trends"],
      },
      {
        timeframe: "Next 30 Days",
        currentRisk: 34,
        predictedRisk: 71,
        confidence: 76,
        factors: ["Seasonal attack patterns", "Regulatory changes", "Emerging threat actors"],
      },
      {
        timeframe: "Next 90 Days",
        currentRisk: 34,
        predictedRisk: 45,
        confidence: 68,
        factors: ["Security investments", "Staff training completion", "Infrastructure upgrades"],
      },
    ]

    const mockThreatPredictions: ThreatPrediction[] = [
      {
        id: "TP001",
        threatType: "AI-Powered Phishing Campaign",
        probability: 89,
        timeframe: "Next 48 hours",
        severity: "high",
        targetSectors: ["Finance", "Healthcare", "Government"],
        mitigationRecommendations: ["Enhanced email filtering", "User awareness training", "MFA enforcement"],
        confidence: 92,
      },
      {
        id: "TP002",
        threatType: "Supply Chain Compromise",
        probability: 67,
        timeframe: "Next 2 weeks",
        severity: "critical",
        targetSectors: ["Technology", "Manufacturing", "Defense"],
        mitigationRecommendations: ["Vendor security assessments", "Code signing verification", "Network segmentation"],
        confidence: 84,
      },
      {
        id: "TP003",
        threatType: "Ransomware-as-a-Service",
        probability: 73,
        timeframe: "Next 7 days",
        severity: "high",
        targetSectors: ["Healthcare", "Education", "Local Government"],
        mitigationRecommendations: ["Backup verification", "Endpoint protection", "Incident response drills"],
        confidence: 88,
      },
      {
        id: "TP004",
        threatType: "Cloud Misconfiguration Exploitation",
        probability: 56,
        timeframe: "Next 30 days",
        severity: "medium",
        targetSectors: ["Startups", "E-commerce", "SaaS Providers"],
        mitigationRecommendations: ["Cloud security posture management", "Access reviews", "Configuration audits"],
        confidence: 79,
      },
    ]

    const mockVulnerabilityForecasts: VulnerabilityForecast[] = [
      {
        cve: "CVE-2024-0001",
        description: "Remote code execution in popular web framework",
        exploitProbability: 94,
        weaponizationEta: "2-3 days",
        affectedSystems: 1247,
        patchPriority: "immediate",
        riskScore: 9.8,
      },
      {
        cve: "CVE-2024-0002",
        description: "Privilege escalation in container runtime",
        exploitProbability: 78,
        weaponizationEta: "1-2 weeks",
        affectedSystems: 456,
        patchPriority: "high",
        riskScore: 8.4,
      },
      {
        cve: "CVE-2024-0003",
        description: "Information disclosure in database driver",
        exploitProbability: 45,
        weaponizationEta: "3-4 weeks",
        affectedSystems: 89,
        patchPriority: "medium",
        riskScore: 6.2,
      },
      {
        cve: "CVE-2024-0004",
        description: "Cross-site scripting in admin panel",
        exploitProbability: 23,
        weaponizationEta: "6-8 weeks",
        affectedSystems: 34,
        patchPriority: "low",
        riskScore: 4.1,
      },
    ]

    const mockAiModels: AIModelPerformance[] = [
      {
        modelName: "Threat Trajectory Predictor",
        accuracy: 94.7,
        precision: 92.3,
        recall: 89.1,
        f1Score: 90.6,
        lastTrained: "2024-01-14 08:30:00",
        predictionsToday: 1247,
        status: "optimal",
      },
      {
        modelName: "Vulnerability Weaponization Forecaster",
        accuracy: 87.2,
        precision: 85.8,
        recall: 91.4,
        f1Score: 88.5,
        lastTrained: "2024-01-13 14:15:00",
        predictionsToday: 892,
        status: "optimal",
      },
      {
        modelName: "Attack Pattern Classifier",
        accuracy: 91.8,
        precision: 89.7,
        recall: 93.2,
        f1Score: 91.4,
        lastTrained: "2024-01-12 22:45:00",
        predictionsToday: 2156,
        status: "retraining",
      },
      {
        modelName: "Threat Actor Attribution Engine",
        accuracy: 76.3,
        precision: 74.1,
        recall: 78.9,
        f1Score: 76.4,
        lastTrained: "2024-01-10 16:20:00",
        predictionsToday: 445,
        status: "degraded",
      },
    ]

    setRiskTrajectories(mockRiskTrajectories)
    setThreatPredictions(mockThreatPredictions)
    setVulnerabilityForecasts(mockVulnerabilityForecasts)
    setAiModels(mockAiModels)
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "immediate":
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

  const getModelStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return "text-accent border-accent bg-accent/10"
      case "retraining":
        return "text-secondary border-secondary bg-secondary/10"
      case "degraded":
        return "text-destructive border-destructive bg-destructive/10"
      default:
        return "text-muted-foreground border-muted bg-muted/10"
    }
  }

  const addThreatLandscape = () => {
    if (newThreatType.trim()) {
      const newThreat: ThreatPrediction = {
        id: `TP${String(threatPredictions.length + 1).padStart(3, "0")}`,
        threatType: newThreatType,
        probability: Math.floor(Math.random() * 100),
        timeframe: "Next 7 days",
        severity: "medium",
        targetSectors: ["General"],
        mitigationRecommendations: ["Monitor closely", "Update security policies"],
        confidence: Math.floor(Math.random() * 100),
      }
      setThreatPredictions([...threatPredictions, newThreat])
      setNewThreatType("")
      setShowAddThreatDialog(false)
    }
  }

  const archiveThreat = (id: string) => {
    setThreatPredictions(threatPredictions.filter((threat) => threat.id !== id))
  }

  const addVulnerability = () => {
    if (newVulnCve.trim()) {
      const newVuln: VulnerabilityForecast = {
        cve: newVulnCve,
        description: "New vulnerability requiring assessment",
        exploitProbability: Math.floor(Math.random() * 100),
        weaponizationEta: "2-4 weeks",
        affectedSystems: Math.floor(Math.random() * 1000),
        patchPriority: "medium",
        riskScore: Math.floor(Math.random() * 10),
      }
      setVulnerabilityForecasts([...vulnerabilityForecasts, newVuln])
      setNewVulnCve("")
      setShowAddVulnDialog(false)
    }
  }

  const archiveVulnerability = (cve: string) => {
    setVulnerabilityForecasts(vulnerabilityForecasts.filter((vuln) => vuln.cve !== cve))
  }

  const changeModelPriority = (modelName: string, direction: "up" | "down") => {
    const currentIndex = aiModels.findIndex((model) => model.modelName === modelName)
    if (currentIndex === -1) return

    const newModels = [...aiModels]
    if (direction === "up" && currentIndex > 0) {
      ;[newModels[currentIndex], newModels[currentIndex - 1]] = [newModels[currentIndex - 1], newModels[currentIndex]]
    } else if (direction === "down" && currentIndex < newModels.length - 1) {
      ;[newModels[currentIndex], newModels[currentIndex + 1]] = [newModels[currentIndex + 1], newModels[currentIndex]]
    }
    setAiModels(newModels)
  }

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

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Brain className="h-8 w-8 text-primary cyber-glow" />
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Predictive Analytics Center
            </h2>
            <p className="text-muted-foreground">AI-powered threat forecasting and risk modeling</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {isAdmin && (
            <div className="flex gap-2">
              <Dialog open={showAddThreatDialog} onOpenChange={setShowAddThreatDialog}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline" className="glass-morphism bg-transparent">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Threat
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-morphism">
                  <DialogHeader>
                    <DialogTitle>Add New Threat Landscape</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Enter threat type"
                      value={newThreatType}
                      onChange={(e) => setNewThreatType(e.target.value)}
                      className="glass-morphism"
                    />
                    <div className="flex gap-2">
                      <Button onClick={addThreatLandscape} className="flex-1">
                        Add
                      </Button>
                      <Button variant="outline" onClick={() => setShowAddThreatDialog(false)} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={showAddVulnDialog} onOpenChange={setShowAddVulnDialog}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline" className="glass-morphism bg-transparent">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Vulnerability
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-morphism">
                  <DialogHeader>
                    <DialogTitle>Add New Vulnerability</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Enter CVE ID"
                      value={newVulnCve}
                      onChange={(e) => setNewVulnCve(e.target.value)}
                      className="glass-morphism"
                    />
                    <div className="flex gap-2">
                      <Button onClick={addVulnerability} className="flex-1">
                        Add
                      </Button>
                      <Button variant="outline" onClick={() => setShowAddVulnDialog(false)} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}

          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32 glass-morphism">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">24 Hours</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedSector} onValueChange={setSelectedSector}>
            <SelectTrigger className="w-40 glass-morphism">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sectors</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="government">Government</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Risk Trajectory Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {riskTrajectories.map((trajectory, index) => (
          <Card key={index} className="glass-morphism">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">{trajectory.timeframe}</h4>
                  <Badge variant="outline" className="text-xs">
                    {trajectory.confidence}% confidence
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current</span>
                    <span className="font-bold text-primary">{trajectory.currentRisk}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Predicted</span>
                    <span
                      className={`font-bold ${
                        trajectory.predictedRisk > trajectory.currentRisk ? "text-destructive" : "text-accent"
                      }`}
                    >
                      {trajectory.predictedRisk}%
                    </span>
                  </div>
                  <Progress value={trajectory.predictedRisk} className="h-2" />
                </div>

                <div className="flex items-center gap-1">
                  {trajectory.predictedRisk > trajectory.currentRisk ? (
                    <TrendingUp className="h-3 w-3 text-destructive" />
                  ) : (
                    <TrendingUp className="h-3 w-3 text-accent rotate-180" />
                  )}
                  <span className="text-xs">{Math.abs(trajectory.predictedRisk - trajectory.currentRisk)}% change</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Predictive Analysis Controls */}
      <Card className="glass-morphism">
        <CardHeader>
          <CardTitle>Predictive Analysis Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            <Button
              size="sm"
              variant="outline"
              className={`glass-morphism ${highlightedButtons.has("threat-predictions") ? "cyber-glow border-primary text-primary" : ""}`}
              onClick={() => handleButtonClick("threat-predictions")}
            >
              <Target className="h-4 w-4 mr-2" />
              Threat Predictions
            </Button>
            <Button
              size="sm"
              variant="outline"
              className={`glass-morphism ${highlightedButtons.has("vulnerability-forecast") ? "cyber-glow border-secondary text-secondary" : ""}`}
              onClick={() => handleButtonClick("vulnerability-forecast")}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Vulnerability Forecast
            </Button>
            <Button
              size="sm"
              variant="outline"
              className={`glass-morphism ${highlightedButtons.has("model-performance") ? "cyber-glow border-accent text-accent" : ""}`}
              onClick={() => handleButtonClick("model-performance")}
            >
              <Brain className="h-4 w-4 mr-2" />
              Model Performance
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Predictive Analytics Tabs */}
      <Tabs defaultValue="threat-predictions" className="space-y-4">
        <TabsList className="glass-morphism">
          <TabsTrigger value="threat-predictions">Threat Predictions</TabsTrigger>
          <TabsTrigger value="vulnerability-forecast">Vulnerability Forecast</TabsTrigger>
          <TabsTrigger value="model-performance">Model Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="threat-predictions" className="space-y-4">
          <Card className="glass-morphism">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-destructive" />
                Future Threat Landscape
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threatPredictions.map((prediction) => (
                  <div key={prediction.id} className="p-4 rounded-lg glass-morphism border border-border/50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{prediction.threatType}</h4>
                        <p className="text-sm text-muted-foreground">Expected: {prediction.timeframe}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getSeverityColor(prediction.severity)}>
                          {prediction.severity.toUpperCase()}
                        </Badge>
                        {isAdmin && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => archiveThreat(prediction.id)}
                            className="h-6 w-6 p-0"
                          >
                            <Archive className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Probability</span>
                        <span className="text-sm font-medium">{prediction.confidence}% confidence</span>
                      </div>
                      <Progress value={prediction.probability} className="h-2" />

                      <div>
                        <p className="text-sm font-medium mb-2">Target Sectors:</p>
                        <div className="flex flex-wrap gap-1">
                          {prediction.targetSectors.map((sector, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {sector}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Recommended Mitigations:</p>
                        <ul className="text-xs space-y-1">
                          {prediction.mitigationRecommendations.map((rec, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <Shield className="h-3 w-3 text-accent" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vulnerability-forecast" className="space-y-4">
          <Card className="glass-morphism">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-secondary" />
                Exploitation Probability Matrix
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vulnerabilityForecasts.map((vuln, index) => (
                  <div key={index} className="p-4 rounded-lg glass-morphism border border-border/50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{vuln.cve}</h4>
                        <p className="text-sm text-muted-foreground">{vuln.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getPriorityColor(vuln.patchPriority)}>
                          {vuln.patchPriority.toUpperCase()}
                        </Badge>
                        {isAdmin && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => archiveVulnerability(vuln.cve)}
                            className="h-6 w-6 p-0"
                          >
                            <Archive className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-muted-foreground">Exploit Probability</p>
                        <p className="font-bold text-destructive">{vuln.exploitProbability}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Weaponization ETA</p>
                        <p className="font-semibold">{vuln.weaponizationEta}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Affected Systems</p>
                        <p className="font-semibold text-secondary">{vuln.affectedSystems.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Risk Score</p>
                        <p className="font-bold text-primary">{vuln.riskScore}/10</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Exploitation Timeline</span>
                        <span>{vuln.exploitProbability}%</span>
                      </div>
                      <Progress value={vuln.exploitProbability} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="model-performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiModels.map((model, index) => (
              <Card key={index} className="glass-morphism">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-primary" />
                      {model.modelName}
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getModelStatusColor(model.status)}>
                        {model.status.toUpperCase()}
                      </Badge>
                      {isAdmin && (
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => changeModelPriority(model.modelName, "up")}
                            className="h-6 w-6 p-0"
                            disabled={index === 0}
                          >
                            ↑
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => changeModelPriority(model.modelName, "down")}
                            className="h-6 w-6 p-0"
                            disabled={index === aiModels.length - 1}
                          >
                            ↓
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Accuracy</p>
                        <p className="text-lg font-bold text-primary">{model.accuracy}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">F1 Score</p>
                        <p className="text-lg font-bold text-secondary">{model.f1Score}%</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Precision</span>
                        <span>{model.precision}%</span>
                      </div>
                      <Progress value={model.precision} className="h-1" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Recall</span>
                        <span>{model.recall}%</span>
                      </div>
                      <Progress value={model.recall} className="h-1" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Last Trained</p>
                        <p className="font-medium">{model.lastTrained}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Predictions Today</p>
                        <p className="font-medium text-accent">{model.predictionsToday.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs flex-1 bg-transparent">
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs flex-1 bg-transparent">
                        <Activity className="h-3 w-3 mr-1" />
                        Retrain
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
