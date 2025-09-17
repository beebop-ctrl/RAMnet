"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Radar, Target, Activity, Shield, Clock, Network, Eye, Brain, Crosshair, Radio, Gauge } from "lucide-react"

interface ThreatRadarItem {
  id: string
  type: string
  severity: "critical" | "high" | "medium" | "low"
  distance: number // 0-100, distance from center
  angle: number // 0-360 degrees
  speed: number
  eta: string
}

interface NetworkSegment {
  id: string
  name: string
  status: "secure" | "compromised" | "investigating" | "isolated"
  threatLevel: number
  devices: number
  lastScan: string
}

interface HuntingActivity {
  id: string
  analyst: string
  target: string
  status: "active" | "completed" | "paused"
  findings: number
  duration: string
  confidence: number
}

export default function TacticalOperationsDashboard() {
  const [radarThreats, setRadarThreats] = useState<ThreatRadarItem[]>([])
  const [networkSegments, setNetworkSegments] = useState<NetworkSegment[]>([])
  const [huntingActivities, setHuntingActivities] = useState<HuntingActivity[]>([])
  const [radarRange, setRadarRange] = useState([50])
  const [autoScan, setAutoScan] = useState(true)
  const [alertThreshold, setAlertThreshold] = useState([75])

  useEffect(() => {
    // Mock tactical data
    const mockRadarThreats: ThreatRadarItem[] = [
      {
        id: "R001",
        type: "Advanced Persistent Threat",
        severity: "critical",
        distance: 25,
        angle: 45,
        speed: 3,
        eta: "2 min",
      },
      {
        id: "R002",
        type: "Lateral Movement",
        severity: "high",
        distance: 60,
        angle: 120,
        speed: 1,
        eta: "8 min",
      },
      {
        id: "R003",
        type: "Data Exfiltration",
        severity: "high",
        distance: 35,
        angle: 200,
        speed: 5,
        eta: "1 min",
      },
      {
        id: "R004",
        type: "Reconnaissance",
        severity: "medium",
        distance: 80,
        angle: 300,
        speed: 2,
        eta: "15 min",
      },
      {
        id: "R005",
        type: "Phishing Campaign",
        severity: "medium",
        distance: 70,
        angle: 15,
        speed: 1,
        eta: "12 min",
      },
    ]

    const mockNetworkSegments: NetworkSegment[] = [
      {
        id: "DMZ",
        name: "DMZ Network",
        status: "investigating",
        threatLevel: 67,
        devices: 23,
        lastScan: "2 min ago",
      },
      {
        id: "INTERNAL",
        name: "Internal Network",
        status: "secure",
        threatLevel: 12,
        devices: 1247,
        lastScan: "5 min ago",
      },
      {
        id: "GUEST",
        name: "Guest Network",
        status: "compromised",
        threatLevel: 89,
        devices: 45,
        lastScan: "1 min ago",
      },
      {
        id: "SERVERS",
        name: "Server Farm",
        status: "secure",
        threatLevel: 8,
        devices: 156,
        lastScan: "3 min ago",
      },
      {
        id: "IOT",
        name: "IoT Devices",
        status: "investigating",
        threatLevel: 34,
        devices: 892,
        lastScan: "7 min ago",
      },
    ]

    const mockHuntingActivities: HuntingActivity[] = [
      {
        id: "H001",
        analyst: "Sarah Chen",
        target: "Suspicious PowerShell Activity",
        status: "active",
        findings: 7,
        duration: "45 min",
        confidence: 87,
      },
      {
        id: "H002",
        analyst: "Mike Rodriguez",
        target: "Anomalous Network Traffic",
        status: "completed",
        findings: 3,
        duration: "2h 15min",
        confidence: 94,
      },
      {
        id: "H003",
        analyst: "Alex Kim",
        target: "Privilege Escalation Patterns",
        status: "active",
        findings: 12,
        duration: "1h 30min",
        confidence: 76,
      },
      {
        id: "H004",
        analyst: "Emma Watson",
        target: "DNS Tunneling Investigation",
        status: "paused",
        findings: 2,
        duration: "20 min",
        confidence: 45,
      },
    ]

    setRadarThreats(mockRadarThreats)
    setNetworkSegments(mockNetworkSegments)
    setHuntingActivities(mockHuntingActivities)
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-400 bg-red-400/20 border-red-400"
      case "high":
        return "text-orange-400 bg-orange-400/20 border-orange-400"
      case "medium":
        return "text-yellow-400 bg-yellow-400/20 border-yellow-400"
      case "low":
        return "text-blue-400 bg-blue-400/20 border-blue-400"
      default:
        return "text-gray-400 bg-gray-400/20 border-gray-400"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "secure":
        return "text-accent border-accent bg-accent/10"
      case "compromised":
        return "text-destructive border-destructive bg-destructive/10"
      case "investigating":
        return "text-secondary border-secondary bg-secondary/10"
      case "isolated":
        return "text-primary border-primary bg-primary/10"
      case "active":
        return "text-accent border-accent bg-accent/10"
      case "completed":
        return "text-primary border-primary bg-primary/10"
      case "paused":
        return "text-secondary border-secondary bg-secondary/10"
      default:
        return "text-muted-foreground border-muted bg-muted/10"
    }
  }

  return (
    <div className="space-y-6">
      {/* Tactical Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Crosshair className="h-8 w-8 text-primary cyber-glow" />
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Tactical Operations Center
            </h2>
            <p className="text-muted-foreground">Real-time threat monitoring and response</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch checked={autoScan} onCheckedChange={setAutoScan} />
            <span className="text-sm">Auto Scan</span>
          </div>
          <Badge variant="outline" className="border-accent text-accent animate-pulse">
            OPERATIONAL
          </Badge>
        </div>
      </div>

      {/* Tactical Controls */}
      <Card className="glass-morphism">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="h-5 w-5 text-primary" />
            Tactical Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Radar Range (km)</label>
              <Slider value={radarRange} onValueChange={setRadarRange} max={100} min={10} step={5} className="w-full" />
              <p className="text-xs text-muted-foreground">{radarRange[0]} km radius</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Alert Threshold (%)</label>
              <Slider
                value={alertThreshold}
                onValueChange={setAlertThreshold}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">{alertThreshold[0]}% threat level</p>
            </div>
            <div className="flex items-center justify-center">
              <Button className="cyber-glow">
                <Radio className="h-4 w-4 mr-2" />
                Emergency Broadcast
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tactical Operations Tabs */}
      <Tabs defaultValue="threat-radar" className="space-y-4">
        <TabsList className="glass-morphism">
          <TabsTrigger value="threat-radar">Threat Radar</TabsTrigger>
          <TabsTrigger value="network-heatmap">Network Heatmap</TabsTrigger>
          <TabsTrigger value="threat-hunting">Threat Hunting</TabsTrigger>
        </TabsList>

        <TabsContent value="threat-radar" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Real-Time Threat Radar */}
            <Card className="glass-morphism card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Radar className="h-5 w-5 text-primary" />
                  Real-Time Threat Radar
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  360-degree threat detection radar showing incoming security threats with distance and severity
                  indicators
                </p>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Radar Display */}
                  <div className="w-80 h-80 mx-auto relative rounded-full border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10">
                    {/* Radar Tick Marks */}
                    {Array.from({ length: 36 }, (_, i) => {
                      const angle = i * 10
                      const isMainTick = angle % 30 === 0
                      const tickLength = isMainTick ? 12 : 6
                      const tickWidth = isMainTick ? 2 : 1
                      const x1 = 50 + 48 * Math.cos(((angle - 90) * Math.PI) / 180)
                      const y1 = 50 + 48 * Math.sin(((angle - 90) * Math.PI) / 180)
                      const x2 = 50 + (48 - tickLength) * Math.cos(((angle - 90) * Math.PI) / 180)
                      const y2 = 50 + (48 - tickLength) * Math.sin(((angle - 90) * Math.PI) / 180)

                      return (
                        <div
                          key={i}
                          className={`absolute bg-primary/40 ${isMainTick ? "bg-primary/60" : ""}`}
                          style={{
                            left: `${Math.min(x1, x2)}%`,
                            top: `${Math.min(y1, y2)}%`,
                            width: `${Math.abs(x2 - x1) || tickWidth}px`,
                            height: `${Math.abs(y2 - y1) || tickWidth}px`,
                            transformOrigin: "center",
                            transform: `rotate(${angle}deg)`,
                          }}
                        />
                      )
                    })}

                    {/* Radar Rings */}
                    <div className="absolute inset-4 rounded-full border border-primary/20"></div>
                    <div className="absolute inset-8 rounded-full border border-primary/20"></div>
                    <div className="absolute inset-12 rounded-full border border-primary/20"></div>
                    <div className="absolute inset-16 rounded-full border border-primary/20"></div>

                    {/* Radar Lines */}
                    <div className="absolute top-0 left-1/2 w-px h-full bg-primary/20 transform -translate-x-px"></div>
                    <div className="absolute top-1/2 left-0 w-full h-px bg-primary/20 transform -translate-y-px"></div>

                    {/* Center Point */}
                    <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 cyber-pulse"></div>

                    {/* Threat Indicators */}
                    {radarThreats.map((threat) => {
                      const x = 50 + threat.distance * 0.35 * Math.cos(((threat.angle - 90) * Math.PI) / 180)
                      const y = 50 + threat.distance * 0.35 * Math.sin(((threat.angle - 90) * Math.PI) / 180)

                      return (
                        <div
                          key={threat.id}
                          className={`absolute w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 cyber-pulse ${
                            threat.severity === "critical"
                              ? "bg-red-400 shadow-lg shadow-red-400/50"
                              : threat.severity === "high"
                                ? "bg-orange-400 shadow-lg shadow-orange-400/50"
                                : threat.severity === "medium"
                                  ? "bg-yellow-400 shadow-lg shadow-yellow-400/50"
                                  : "bg-blue-400 shadow-lg shadow-blue-400/50"
                          }`}
                          style={{ left: `${x}%`, top: `${y}%` }}
                          title={`${threat.type} - ETA: ${threat.eta}`}
                        />
                      )
                    })}

                    {/* Radar Sweep */}
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-0 origin-center animate-spin"
                        style={{
                          transformOrigin: "50% 50%",
                          animationDuration: "4s",
                          background: `conic-gradient(from 0deg at center, 
                            transparent 0deg, 
                            transparent 300deg, 
                            rgba(0, 229, 255, 0.02) 310deg, 
                            rgba(0, 229, 255, 0.05) 320deg, 
                            rgba(0, 229, 255, 0.1) 330deg, 
                            rgba(0, 229, 255, 0.2) 340deg, 
                            rgba(0, 229, 255, 0.4) 350deg, 
                            rgba(0, 229, 255, 0.7) 355deg, 
                            rgba(0, 229, 255, 0.9) 360deg, 
                            rgba(0, 229, 255, 1) 5deg, 
                            rgba(0, 229, 255, 0.8) 10deg, 
                            rgba(0, 229, 255, 0.5) 20deg, 
                            rgba(0, 229, 255, 0.3) 30deg, 
                            rgba(0, 229, 255, 0.15) 40deg, 
                            rgba(0, 229, 255, 0.08) 50deg, 
                            rgba(0, 229, 255, 0.03) 60deg, 
                            transparent 70deg)`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Radar Legend */}
                  <div className="mt-4 flex justify-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span>Critical</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      <span>High</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>Medium</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Low</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Incoming Threats List */}
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-destructive" />
                  Incoming Threats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {radarThreats
                    .sort((a, b) => a.distance - b.distance)
                    .map((threat) => (
                      <div key={threat.id} className="p-3 rounded-lg glass-morphism border border-border/50">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className={getSeverityColor(threat.severity)}>
                            {threat.severity.toUpperCase()}
                          </Badge>
                          <div className="text-right">
                            <p className="text-sm font-bold text-destructive">ETA: {threat.eta}</p>
                            <p className="text-xs text-muted-foreground">{threat.distance}km away</p>
                          </div>
                        </div>

                        <h4 className="font-semibold mb-1">{threat.type}</h4>
                        <div className="flex items-center justify-between text-sm">
                          <span>Speed: {threat.speed} km/min</span>
                          <span>Bearing: {threat.angle}°</span>
                        </div>

                        <div className="mt-2 flex gap-2">
                          <Button size="sm" variant="outline" className="text-xs bg-transparent">
                            Track
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs bg-transparent">
                            Intercept
                          </Button>
                          <Button size="sm" variant="destructive" className="text-xs">
                            Block
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="network-heatmap" className="space-y-4">
          <Card className="glass-morphism">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5 text-secondary" />
                Network Segment Heatmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {networkSegments.map((segment) => (
                  <div key={segment.id} className={`p-4 rounded-lg border ${getStatusColor(segment.status)}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{segment.name}</h4>
                      <Badge variant="outline" className={getStatusColor(segment.status)}>
                        {segment.status.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Threat Level</span>
                        <span className="font-bold">{segment.threatLevel}%</span>
                      </div>
                      <Progress value={segment.threatLevel} className="h-2" />

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Devices</p>
                          <p className="font-semibold">{segment.devices.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Last Scan</p>
                          <p className="font-semibold">{segment.lastScan}</p>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" className="text-xs flex-1 bg-transparent">
                          <Eye className="h-3 w-3 mr-1" />
                          Monitor
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs flex-1 bg-transparent">
                          <Shield className="h-3 w-3 mr-1" />
                          Isolate
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="threat-hunting" className="space-y-4">
          <Card className="glass-morphism">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-accent" />
                Active Threat Hunting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {huntingActivities.map((activity) => (
                  <div key={activity.id} className="p-4 rounded-lg glass-morphism border border-border/50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{activity.target}</h4>
                        <p className="text-sm text-muted-foreground">Analyst: {activity.analyst}</p>
                      </div>
                      <Badge variant="outline" className={getStatusColor(activity.status)}>
                        {activity.status.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-muted-foreground">Findings</p>
                        <p className="font-semibold text-accent">{activity.findings}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Duration</p>
                        <p className="font-semibold">{activity.duration}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Confidence</p>
                        <p className="font-semibold text-primary">{activity.confidence}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Status</p>
                        <div className="flex items-center gap-1">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              activity.status === "active"
                                ? "bg-accent animate-pulse"
                                : activity.status === "completed"
                                  ? "bg-primary"
                                  : "bg-secondary"
                            }`}
                          ></div>
                          <span className="capitalize">{activity.status}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{activity.confidence}%</span>
                      </div>
                      <Progress value={activity.confidence} className="h-2" />
                    </div>

                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="text-xs bg-transparent">
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs bg-transparent">
                        <Activity className="h-3 w-3 mr-1" />
                        Join Hunt
                      </Button>
                      {activity.status === "active" && (
                        <Button size="sm" variant="secondary" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          Pause
                        </Button>
                      )}
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
