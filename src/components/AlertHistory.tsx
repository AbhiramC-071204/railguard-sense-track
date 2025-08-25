import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, User, Rabbit, Clock } from "lucide-react";

interface Alert {
  id: string;
  timestamp: string;
  type: "person" | "animal";
  trackId: string;
  sensorId: string;
  confidence: number;
  status: "active" | "resolved" | "investigating";
}

interface AlertHistoryProps {
  alerts: Alert[];
}

const AlertItem = ({ alert }: { alert: Alert }) => {
  const getTypeConfig = (type: Alert['type']) => {
    return type === 'person' 
      ? { icon: User, color: 'danger', label: 'Person' }
      : { icon: Rabbit, color: 'warning', label: 'Animal' };
  };

  const getStatusConfig = (status: Alert['status']) => {
    switch (status) {
      case 'active':
        return { color: 'danger', label: 'ACTIVE' };
      case 'investigating':
        return { color: 'warning', label: 'INVESTIGATING' };
      case 'resolved':
        return { color: 'safe', label: 'RESOLVED' };
    }
  };

  const typeConfig = getTypeConfig(alert.type);
  const statusConfig = getStatusConfig(alert.status);
  const TypeIcon = typeConfig.icon;

  return (
    <div className={`
      p-4 rounded-lg border transition-colors
      ${alert.status === 'active' 
        ? 'border-danger/50 bg-danger/5 shadow-danger' 
        : 'border-border/30 bg-card/30'
      }
    `}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className={`
            p-1.5 rounded-full 
            ${alert.type === 'person' 
              ? 'bg-danger/20 text-danger' 
              : 'bg-warning/20 text-warning'
            }
          `}>
            <TypeIcon className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-sm">
              {typeConfig.label} Detection
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              Alert #{alert.id}
            </div>
          </div>
        </div>
        <Badge 
          variant="outline"
          className={`
            border-${statusConfig.color} text-${statusConfig.color}-foreground 
            bg-${statusConfig.color}/10 text-xs font-mono
          `}
        >
          {statusConfig.label}
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-xs">
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Track</span>
            <span className="font-mono">{alert.trackId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sensor</span>
            <span className="font-mono">{alert.sensorId}</span>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Confidence</span>
            <span className="font-mono">{alert.confidence}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Time</span>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span className="font-mono">{alert.timestamp}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AlertHistory = ({ alerts }: AlertHistoryProps) => {
  const activeAlerts = alerts.filter(a => a.status === 'active').length;
  const personAlerts = alerts.filter(a => a.type === 'person').length;
  
  return (
    <Card className="h-full border-border/50 bg-card/50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-primary" />
            <span>Detection Alerts</span>
          </div>
          <div className="flex space-x-3 text-sm">
            {activeAlerts > 0 && (
              <Badge variant="outline" className="border-danger text-danger bg-danger/10">
                {activeAlerts} Active
              </Badge>
            )}
            <Badge variant="outline" className="border-primary text-primary bg-primary/10">
              {alerts.length} Total
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 pb-6">
        <ScrollArea className="h-[400px] px-6">
          <div className="space-y-3">
            {alerts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No alerts recorded
              </div>
            ) : (
              alerts.map((alert) => (
                <AlertItem key={alert.id} alert={alert} />
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};