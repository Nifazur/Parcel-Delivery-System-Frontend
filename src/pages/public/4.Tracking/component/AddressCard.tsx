import { Navigation, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AddressesCardProps {
    fromAddress?: string;
    toAddress?: string;
}

const AddressesCard = ({ fromAddress, toAddress }: AddressesCardProps) => {
    return (
        <Card className="shadow-lg">
            <CardHeader className='mt-4'>
                <CardTitle className="text-lg text-primary">Addresses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 mt-5">
                <div>
                    <p className="text-sm font-semibold text-card-foreground mb-2 flex items-center gap-2">
                        <Navigation className="w-4 h-4" />
                        Pickup Address
                    </p>
                    <p className="text-sm text-muted-foreground pl-6">{fromAddress}</p>
                </div>

                <div className="border-t pt-4">
                    <p className="text-sm font-semibold text-card-foreground mb-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Delivery Address
                    </p>
                    <p className="text-sm text-muted-foreground pl-6">{toAddress}</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default AddressesCard;