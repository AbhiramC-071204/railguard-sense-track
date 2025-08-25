import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, AlertCircle, WifiOff } from "lucide-react";

interface Sensor {
  id: string;
  location: string;
  status: "active" | "inactive" | "error";
  signalStrength: number;
  lastPing: string;
  detectionType?: "person" | "animal" | null;
}

interface SensorGridProps {
  sensors: Sensor[];
}

const SensorCard = ({ sensor }: { sensor: Sensor }) => {
  const getStatusConfig = (status: Sensor['status']) => {
    switch (status) {
      case 'active':
        return { 
          color: 'safe', 
          icon: Activity, 
          label: 'Active',
          pulseClass: 'animate-pulse bg-safe/20'
        };
      case 'inactive':
        return { 
          color: 'warning', 
          icon: WifiOff, 
          label: 'Offline',
          pulseClass: ''
        };
      case 'error':
        return { 
          color: 'danger', 
          icon: AlertCircle, 
          label: 'Error',
          pulseClass: 'animate-pulse bg-danger/20'
        };
    }
  };

  const config = getStatusConfig(sensor.status);
  const Icon = config.icon;

  return (
    <Card className="relative border-border/30 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-colors">
      {config.pulseClass && (
        <div className={`absolute inset-0 rounded-lg ${config.pulseClass}`} />
      )}
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-sm">
          <span className="font-mono">{sensor.id}</span>
          <Badge 
            variant="outline" 
            className={`
              border-${config.color} text-${config.color}-foreground 
              bg-${config.color}/10 text-xs
            `}
          >
            <Icon className="w-3 h-3 mr-1" />
            {config.label}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Location</span>
          <span className="font-mono">{sensor.location}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Signal</span>
          <div className="flex items-center space-x-1">
            <div className="flex space-x-0.5">
              {[1, 2, 3, 4, 5].map((bar) => (
                <div
                  key={bar}
                  className={`w-0.5 h-2 rounded-full ${
                    bar <= sensor.signalStrength 
                      ? 'bg-primary' 
                      : 'bg-border'
                  }`}
                />
              ))}
            </div>
            <span className="font-mono text-xs">{sensor.signalStrength}/5</span>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Last Ping</span>
          <span className="font-mono">{sensor.lastPing}</span>
        </div>
        {sensor.detectionType && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Detection</span>
            <Badge 
              variant="outline" 
              className={`
                text-xs ${sensor.detectionType === 'person' 
                  ? 'border-danger text-danger bg-danger/10' 
                  : 'border-warning text-warning bg-warning/10'
                }
              `}
            >
              {sensor.detectionType.toUpperCase()}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const SensorGrid = ({ sensors }: SensorGridProps) => {
  const activeSensors = sensors.filter(s => s.status === 'active').length;
  const errorSensors = sensors.filter(s => s.status === 'error').length;
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Sensor Network</h2>
        <div className="flex space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-safe"></div>
            <span>{activeSensors} Active</span>
          </div>
          {errorSensors > 0 && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-danger animate-pulse"></div>
              <span className="text-danger">{errorSensors} Error</span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sensors.map((sensor) => (
          <SensorCard key={sensor.id} sensor={sensor} />
        ))}
      </div>
    </div>
  );
};