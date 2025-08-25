import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrackStatus } from "@/components/TrackStatus";
import { SensorGrid } from "@/components/SensorGrid";
import { AlertHistory } from "@/components/AlertHistory";
import { Badge } from "@/components/ui/badge";
import { Train, Shield, Activity, AlertTriangle } from "lucide-react";

// Mock data
const mockTracks = [
  { trackId: "T001", status: "safe" as const, sensorCount: 12, activeSensors: 12 },
  { trackId: "T002", status: "warning" as const, sensorCount: 8, activeSensors: 7, lastDetection: "14:23:45" },
  { trackId: "T003", status: "danger" as const, sensorCount: 10, activeSensors: 9, lastDetection: "14:45:12" },
  { trackId: "T004", status: "safe" as const, sensorCount: 6, activeSensors: 6 }
];

const mockSensors = [
  { id: "S001", location: "KM 12.3", status: "active" as const, signalStrength: 5, lastPing: "2s ago" },
  { id: "S002", location: "KM 12.8", status: "active" as const, signalStrength: 4, lastPing: "1s ago", detectionType: "animal" as const },
  { id: "S003", location: "KM 13.1", status: "error" as const, signalStrength: 0, lastPing: "5m ago" },
  { id: "S004", location: "KM 13.6", status: "active" as const, signalStrength: 5, lastPing: "1s ago", detectionType: "person" as const },
  { id: "S005", location: "KM 14.2", status: "active" as const, signalStrength: 3, lastPing: "3s ago" },
  { id: "S006", location: "KM 14.8", status: "inactive" as const, signalStrength: 2, lastPing: "30s ago" },
  { id: "S007", location: "KM 15.3", status: "active" as const, signalStrength: 5, lastPing: "2s ago" },
  { id: "S008", location: "KM 15.9", status: "active" as const, signalStrength: 4, lastPing: "1s ago" }
];

const mockAlerts = [
  {
    id: "A001",
    timestamp: "14:45:12",
    type: "person" as const,
    trackId: "T003",
    sensorId: "S004",
    confidence: 94,
    status: "active" as const
  },
  {
    id: "A002",
    timestamp: "14:23:45",
    type: "animal" as const,
    trackId: "T002",
    sensorId: "S002",
    confidence: 87,
    status: "investigating" as const
  },
  {
    id: "A003",
    timestamp: "13:58:32",
    type: "person" as const,
    trackId: "T001",
    sensorId: "S001",
    confidence: 92,
    status: "resolved" as const
  },
  {
    id: "A004",
    timestamp: "13:12:18",
    type: "animal" as const,
    trackId: "T004",
    sensorId: "S007",
    confidence: 78,
    status: "resolved" as const
  }
];

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const totalSensors = mockSensors.length;
  const activeSensors = mockSensors.filter(s => s.status === 'active').length;
  const activeAlerts = mockAlerts.filter(a => a.status === 'active').length;
  const dangerousTracks = mockTracks.filter(t => t.status === 'danger').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-primary text-primary-foreground">
                <Train className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Railway Safety Monitor</h1>
                <p className="text-sm text-muted-foreground">Real-time Person & Animal Detection System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-primary text-primary bg-primary/10">
                <Activity className="w-3 h-3 mr-1" />
                System Online
              </Badge>
              <div className="text-right text-sm">
                <div className="font-mono">{currentTime.toLocaleTimeString()}</div>
                <div className="text-xs text-muted-foreground">{currentTime.toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Sensors</CardTitle>
              <Activity className="h-4 w-4 text-safe" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeSensors}/{totalSensors}</div>
              <p className="text-xs text-muted-foreground">Network operational</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className={`h-4 w-4 ${activeAlerts > 0 ? 'text-danger' : 'text-muted-foreground'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${activeAlerts > 0 ? 'text-danger' : 'text-foreground'}`}>
                {activeAlerts}
              </div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
              <Shield className={`h-4 w-4 ${dangerousTracks > 0 ? 'text-danger' : 'text-safe'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${dangerousTracks > 0 ? 'text-danger' : 'text-safe'}`}>
                {dangerousTracks > 0 ? 'HIGH' : 'LOW'}
              </div>
              <p className="text-xs text-muted-foreground">
                {dangerousTracks} track{dangerousTracks !== 1 ? 's' : ''} at risk
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <Train className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-safe">OPERATIONAL</div>
              <p className="text-xs text-muted-foreground">All systems online</p>
            </CardContent>
          </Card>
        </div>

        {/* Track Status Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center space-x-2">
            <Train className="w-5 h-5" />
            <span>Track Monitoring</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockTracks.map((track) => (
              <TrackStatus key={track.trackId} {...track} />
            ))}
          </div>
        </div>

        {/* Sensor Grid and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SensorGrid sensors={mockSensors} />
          </div>
          <div className="lg:col-span-1">
            <AlertHistory alerts={mockAlerts} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;