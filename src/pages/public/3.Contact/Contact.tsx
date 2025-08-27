/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { Mail, User, MessageSquare, Send, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { type SubmitHandler, useForm } from "react-hook-form";
import { useUserInfoQuery } from '@/redux/features/authApi';
import { useCreateContactMessageMutation } from '@/redux/features/contactUs';
import { useNavigate } from 'react-router';

export interface IContactFormRequest {
    name: string;
    email: string;
    message: string;
}

const ContactUsPage: React.FC = () => {
    const navigate = useNavigate()
    const { data: userInfo, isLoading: userLoading } = useUserInfoQuery(undefined);
    const [createContact, { isLoading: contactLoading }] = useCreateContactMessageMutation();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
        reset
    } = useForm<IContactFormRequest>({
        mode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            message: ''
        }
    });

    // Set user data when available
    useEffect(() => {
        if (userInfo?.data) {
            setValue('name', userInfo.data.name || '');
            setValue('email', userInfo.data.email || '');
        }
    }, [userInfo, setValue]);

    const onSubmit: SubmitHandler<IContactFormRequest> = async (data) => {
        try {
            await createContact(data).unwrap();
            toast.success("Message sent successfully! We'll get back to you soon.");
            setValue('message', '');
            navigate("/")
        } catch (err: any) {
            console.error('Contact form error:', err);
            toast.error("Failed to send message. Please try again.");
        }
    };

    const handleReset = () => {
        if (userInfo?.data) {
            setValue('name', userInfo.data.name || '');
            setValue('email', userInfo.data.email || '');
            setValue('message', '');
        } else {
            reset();
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-4">
                    Contact Us
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Have questions or need assistance? We're here to help! Send us a message and we'll get back to you as soon as possible.
                </p>
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="border-0 shadow-lg bg-card/95 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                        <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
                        <h3 className="font-semibold text-card-foreground mb-2">Email</h3>
                        <p className="text-sm text-muted-foreground">support@parceldelivery.com</p>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-card/95 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                        <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
                        <h3 className="font-semibold text-card-foreground mb-2">Phone</h3>
                        <p className="text-sm text-muted-foreground">+880 1234-567890</p>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-card/95 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                        <MessageSquare className="w-8 h-8 text-primary mx-auto mb-3" />
                        <h3 className="font-semibold text-card-foreground mb-2">Live Chat</h3>
                        <p className="text-sm text-muted-foreground">Available 24/7</p>
                    </CardContent>
                </Card>
            </div>

            {/* Contact Form */}
            <Card className="border-0 shadow-2xl bg-card/95 backdrop-blur-sm">
                <CardHeader className="space-y-2">
                    <CardTitle className="text-2xl font-bold text-card-foreground flex items-center space-x-2">
                        <MessageSquare className="w-6 h-6 text-primary" />
                        <span>Send us a Message</span>
                    </CardTitle>
                    <CardDescription className="text-base text-muted-foreground">
                        Fill out the form below and we'll respond to your inquiry promptly
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name & Email Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium text-card-foreground">
                                    Full Name
                                </Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        className={`pl-10 h-12 text-base ${errors.name ? 'border-destructive focus:border-destructive' : ''
                                            }`}
                                        {...register('name', {
                                            required: 'Name is required',
                                            minLength: {
                                                value: 2,
                                                message: 'Name must be at least 2 characters',
                                            },
                                        })}
                                    />
                                </div>
                                {errors.name && (
                                    <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-card-foreground">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email address"
                                        className={`pl-10 h-12 text-base ${errors.email ? 'border-destructive focus:border-destructive' : ''
                                            }`}
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Please enter a valid email address',
                                            },
                                        })}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Message */}
                        <div className="space-y-2">
                            <Label htmlFor="message" className="text-sm font-medium text-card-foreground">
                                Message
                            </Label>
                            <div className="relative">
                                <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                <Textarea
                                    id="message"
                                    placeholder="Type your message here..."
                                    className={`pl-10 min-h-[150px] text-base resize-none ${errors.message ? 'border-destructive focus:border-destructive' : ''
                                        }`}
                                    {...register('message', {
                                        required: 'Message is required',
                                        minLength: {
                                            value: 10,
                                            message: 'Message must be at least 10 characters',
                                        },
                                        maxLength: {
                                            value: 1000,
                                            message: 'Message cannot exceed 1000 characters',
                                        },
                                    })}
                                />
                            </div>
                            {errors.message && (
                                <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleReset}
                                className="flex-1 h-12 text-base font-medium"
                            >
                                Reset Form
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1 h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                disabled={!isValid || userLoading || contactLoading}
                            >
                                {(userLoading || contactLoading) ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                                        <span>Sending...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <Send className="w-4 h-4" />
                                        <span>Send Message</span>
                                    </div>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ContactUsPage;