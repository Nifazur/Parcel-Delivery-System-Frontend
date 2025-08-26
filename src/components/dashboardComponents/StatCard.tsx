import { Card, CardContent } from "@/components/ui/card";
import type { ReactNode } from "react";

interface StatCardProps {
  value: number | string;
  label: string;
  icon: ReactNode;
}

const StatCard = ({ value, label, icon }: StatCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardContent className="p-4 text-center flex justify-between items-center">
        <div>
          <div className="text-2xl font-bold text-primary mb-1">{value}</div>
          <div className="text-xs text-muted-foreground">{label}</div>
        </div>
        <div className="p-3 rounded-2xl bg-primary/10">{icon}</div>
      </CardContent>
    </Card>
  );
};

export default StatCard;