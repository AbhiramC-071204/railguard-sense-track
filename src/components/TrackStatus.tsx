import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface TrackStatusProps {
  trackId: string;
  status: "safe" | "warning" | "danger";
  lastDetection?: string;
  sensorCount: number;
  activeSensors: number;
}

const statusConfig = {
  safe: {
    color: "safe",
    icon: CheckCircle,
    label: "All Clear",
    bgClass: "bg-gradient-safe"
  },
  warning: {
    color: "warning", 
    icon: AlertTriangle,
    label: "Animal Detected",
    bgClass: "bg-gradient-warning"
  },
  danger: {
    color: "danger",
    icon: XCircle,
    label: "Person Detected",
    bgClass: "bg-gradient-danger"
  }
};

export const TrackStatus = ({ 
  trackId, 
  status, 
  lastDetection,
  sensorCount,
  activeSensors 
}: TrackStatusProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;
  
  return (
    <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
      <div className={`absolute inset-0 opacity-10 ${config.bgClass}`} />
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span>Track {trackId}</span>
          <Badge 
            variant="outline" 
            className={`
              border-${config.color} text-${config.color}-foreground 
              bg-${config.color}/10 shadow-sm
            `}
          >
            <Icon className="w-3 h-3 mr-1" />
            {config.label}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Sensors Active</span>
          <span className="font-mono">
            {activeSensors}/{sensorCount}
          </span>
        </div>
        {lastDetection && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Last Detection</span>
            <span className="font-mono text-xs">{lastDetection}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Status</span>
          <span className={`font-medium text-${config.color}`}>
            {status.toUpperCase()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};