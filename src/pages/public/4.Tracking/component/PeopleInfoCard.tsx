import { User, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Person } from '@/types/parcel.type';


interface PeopleInfoCardProps {
    sender: Person;
    receiver: Person;
}

const PeopleInfoCard = ({ sender, receiver }: PeopleInfoCardProps) => {
    return (
        <div className="inline space-y-6">
            {/* Sender Card */}
            <Card className="shadow-lg h-[240px]">
                <CardHeader>
                    <CardTitle className="text-lg text-primary flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Sender Details
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-semibold text-card-foreground">{sender.name}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <div className="flex-1">
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p className="text-sm text-card-foreground break-all">{sender.email}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Receiver Card */}
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-lg text-primary flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Receiver Details
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-semibold text-card-foreground">{receiver.name}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <div className="flex-1">
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p className="text-sm text-card-foreground break-all">{receiver.email}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PeopleInfoCard;