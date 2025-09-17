"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertTriangle,
  Activity,
  Eye,
  Zap,
  Globe,
  TrendingUp,
  Server,
  Lock,
  Crown,
  Crosshair,
  Brain,
  Radio,
  LogOut,
} from "lucide-react"
import ThreatDetectionEngine from "@/components/threat-detection-engine"
import ExecutiveCommandCenter from "@/components/executive-command-center"
import TacticalOperationsDashboard from "@/components/tactical-operations-dashboard"
import PredictiveAnalyticsCenter from "@/components/predictive-analytics-center"
import RealTimeDataFeeds from "@/components/real-time-data-feeds"

export default function CyberSecurityDashboard() {
  const [activeView, setActiveView] = useState("overview")
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")
  const [showAdminDialog, setShowAdminDialog] = useState(false)

  const [activeThreats, setActiveThreats] = useState(12)
  const [blockedAttacks, setBlockedAttacks] = useState(1847)
  const [systemHealth, setSystemHealth] = useState(94)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveThreats((prev) => {
        const change = Math.floor(Math.random() * 3) - 1 // -1, 0, or 1
        return Math.max(8, Math.min(25, prev + change))
      })

      setBlockedAttacks((prev) => {
        const change = Math.floor(Math.random() * 15) + 1 // 1-15
        return prev + change
      })

      setSystemHealth((prev) => {
        const change = (Math.random() - 0.5) * 2 // -1 to 1
        return Math.max(85, Math.min(99, Math.round((prev + change) * 10) / 10))
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleAdminLogin = () => {
    if (adminPassword === "admin") {
      setIsAdminAuthenticated(true)
      setShowAdminDialog(false)
      setAdminPassword("")
    } else {
      alert("Incorrect password")
    }
  }

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false)
    setActiveView("overview")
  }

  const requiresAdmin = (viewId: string) => {
    return ["threats", "executive", "tactical"].includes(viewId)
  }

  const handleNavigation = (viewId: string) => {
    if (requiresAdmin(viewId) && !isAdminAuthenticated) {
      setShowAdminDialog(true)
      return
    }
    setActiveView(viewId)
  }

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold gradient-text">RAMnet</h1>
            </div>
            <Badge variant="outline" className="glass-morphism border-accent text-accent">
              PROACTIVE MODE
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            {isAdminAuthenticated && (
              <Button
                onClick={handleAdminLogout}
                variant="outline"
                className="glass-morphism border-destructive text-destructive hover:bg-destructive/10 cyber-glow bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Admin Logout
              </Button>
            )}
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="text-2xl font-bold text-accent">STANDBY</p>
            </div>
            <div className="w-16 h-16 rounded-full glass-morphism flex items-center justify-center cyber-pulse">
              <AlertTriangle className="h-8 w-8 text-accent" />
            </div>
          </div>
        </div>
      </header>

      {/* Admin Authentication Dialog */}
      <Dialog open={showAdminDialog} onOpenChange={setShowAdminDialog}>
        <DialogContent className="glass-morphism">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Admin Authentication Required
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This section requires administrator privileges. Please enter the admin password.
            </p>
            <Input
              type="password"
              placeholder="Enter admin password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAdminLogin()}
              className="glass-morphism"
            />
            <div className="flex gap-2">
              <Button onClick={handleAdminLogin} className="flex-1">
                Authenticate
              </Button>
              <Button variant="outline" onClick={() => setShowAdminDialog(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Navigation */}
      <nav className="mb-8">
        <div className="flex gap-2 flex-wrap">
          {[
            {
              id: "overview",
              label: "Overview",
              icon: Activity,
            },
            {
              id: "threats",
              label: "Threat Detection",
              icon: Eye,
              requiresAdmin: true,
            },
            {
              id: "executive",
              label: "Executive Center",
              icon: Crown,
              requiresAdmin: true,
            },
            {
              id: "tactical",
              label: "Tactical Ops",
              icon: Crosshair,
              requiresAdmin: true,
            },
            {
              id: "analytics",
              label: "Predictive Analytics",
              icon: Brain,
            },
            {
              id: "feeds",
              label: "Data Feeds",
              icon: Radio,
            },
            {
              id: "network",
              label: "Network Map",
              icon: Globe,
            },
          ].map(({ id, label, icon: Icon, requiresAdmin }) => (
            <Button
              key={id}
              variant={activeView === id ? "default" : "ghost"}
              onClick={() => handleNavigation(id)}
              className={`glass-morphism ${activeView === id ? "cyber-glow" : ""} ${
                requiresAdmin && !isAdminAuthenticated ? "opacity-60" : ""
              }`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {label}
              {requiresAdmin && !isAdminAuthenticated && <Lock className="h-3 w-3 ml-2" />}
            </Button>
          ))}
        </div>
      </nav>

      {/* Main Dashboard Grid */}
      {activeView === "threats" ? (
        <ThreatDetectionEngine />
      ) : activeView === "executive" ? (
        <ExecutiveCommandCenter />
      ) : activeView === "tactical" ? (
        <TacticalOperationsDashboard />
      ) : activeView === "analytics" ? (
        <PredictiveAnalyticsCenter isAdmin={isAdminAuthenticated} />
      ) : activeView === "feeds" ? (
        <RealTimeDataFeeds />
      ) : activeView === "network" ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Globe className="h-16 w-16 text-primary mx-auto mb-4 cyber-glow" />
            <h3 className="text-xl font-bold mb-2">Network Map</h3>
            <p className="text-muted-foreground max-w-md">
              Interactive network topology visualization showing device connections, traffic flows, and security zones
              in real-time.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Threat Overview */}
          <Card className="glass-morphism threat-gradient card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Zap className="h-5 w-5 text-primary" />
                Real-Time Threats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-card-foreground">Active Threats</span>
                  <Badge variant="destructive" className="cyber-glow">
                    {activeThreats}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-card-foreground">Blocked Today</span>
                  <span className="text-accent font-bold">{blockedAttacks.toLocaleString()}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-card-foreground">System Health</span>
                    <span className="text-sm text-accent">{systemHealth}%</span>
                  </div>
                  <Progress value={systemHealth} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Predictive Analysis */}
          <Card className="glass-morphism card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <TrendingUp className="h-5 w-5 text-secondary" />
                Predictive Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gradient-to-r from-secondary/20 to-primary/20">
                  <h4 className="font-semibold text-secondary mb-2">Next 24 Hours</h4>
                  <p className="text-sm text-card-foreground">87% probability of phishing attempt</p>
                  <p className="text-sm text-card-foreground">23% chance of DDoS activity</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent animate-pulse"></div>
                  <span className="text-sm text-card-foreground">AI models learning...</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Network Status */}
          <Card className="glass-morphism card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Server className="h-5 w-5 text-accent" />
                Network Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-card-foreground">Connected Devices</span>
                  <span className="font-bold text-card-foreground">2,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-card-foreground">Secure Endpoints</span>
                  <span className="text-accent font-bold">99.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-card-foreground">VPN Connections</span>
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-primary" />
                    <span className="text-card-foreground">847</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card className="lg:col-span-2 glass-morphism card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Recent Security Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    time: "14:32",
                    type: "HIGH",
                    message: "Suspicious login attempt from unknown IP",
                    status: "blocked",
                  },
                  {
                    time: "14:28",
                    type: "MEDIUM",
                    message: "Unusual data transfer pattern detected",
                    status: "monitoring",
                  },
                  { time: "14:15", type: "LOW", message: "Failed authentication attempts", status: "resolved" },
                  {
                    time: "14:02",
                    type: "HIGH",
                    message: "Potential malware signature detected",
                    status: "quarantined",
                  },
                ].map((alert, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg glass-morphism">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          alert.type === "HIGH" ? "destructive" : alert.type === "MEDIUM" ? "secondary" : "outline"
                        }
                        className="w-16 justify-center"
                      >
                        {alert.type}
                      </Badge>
                      <div>
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">{alert.time}</p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${
                        alert.status === "blocked"
                          ? "border-destructive text-destructive"
                          : alert.status === "quarantined"
                            ? "border-secondary text-secondary"
                            : alert.status === "resolved"
                              ? "border-accent text-accent"
                              : "border-primary text-primary"
                      }`}
                    >
                      {alert.status.toUpperCase()}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="glass-morphism card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 rounded-lg insight-card-primary">
                  <h4 className="font-semibold text-primary mb-1">Behavioral Anomaly</h4>
                  <p className="text-xs text-card-foreground">
                    User 'admin@company.com' showing unusual access patterns
                  </p>
                </div>
                <div className="p-3 rounded-lg insight-card-secondary">
                  <h4 className="font-semibold text-secondary mb-1">Threat Prediction</h4>
                  <p className="text-xs text-card-foreground">
                    Increased ransomware activity expected in finance sector
                  </p>
                </div>
                <div className="p-3 rounded-lg insight-card-accent">
                  <h4 className="font-semibold text-accent mb-1">System Optimization</h4>
                  <p className="text-xs text-card-foreground">Firewall rules updated based on traffic analysis</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
