import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Package } from 'lucide-react';
import { useNavigate } from 'react-router';

const TrackingSearch = () => {
    const navigate = useNavigate()
    const [trackingId, setTrackingId] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async () => {
        if (!trackingId.trim()) return;

        setIsSearching(true);
        
        // Simulate API call delay
        setTimeout(() => {
            setIsSearching(false);
            navigate(`/track-parcel/${trackingId}`)
        }, 500);
    };

    return (
        <div className="min-h-screen bg-background">

            {/* Main Content */}
            <div className="max-w-2xl mx-auto px-4 py-16">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-accent rounded-full mb-8">
                        <Package className="w-10 h-10 text-accent-foreground" />
                    </div>
                    <h2 className="text-5xl font-bold text-foreground mb-6">
                        Track Your Package
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        Enter your tracking ID below to get real-time updates on your parcel's location and delivery status.
                    </p>
                </div>

                {/* Search Card */}
                <Card className="shadow-xl border-border bg-card backdrop-blur">
                    <CardHeader className="text-center pb-4">
                        <CardTitle className="text-2xl text-card-foreground">Enter Tracking ID</CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Your tracking ID can be found in your shipping confirmation email
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-6">
                            <div className="relative">
                                <Input
                                    type="text"
                                    placeholder="Enter your tracking ID (e.g., TRK123456789)"
                                    value={trackingId}
                                    onChange={(e) => setTrackingId(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    className="h-16 text-lg pl-14 pr-4 rounded-xl border-2 border-input focus:border-ring transition-colors bg-background"
                                />
                                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                            </div>
                            <Button
                                onClick={handleSearch}
                                size="lg"
                                className="w-full h-16 text-lg rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
                                disabled={!trackingId.trim() || isSearching}
                            >
                                {isSearching ? (
                                    <>
                                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary-foreground border-t-transparent mr-3"></div>
                                        Searching...
                                    </>
                                ) : (
                                    <>
                                        <Search className="w-6 h-6 mr-3" />
                                        Track Package
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default TrackingSearch;