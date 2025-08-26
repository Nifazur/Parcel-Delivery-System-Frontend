/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Truck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRegisterMutation } from '@/redux/features/authApi';
import { toast } from 'sonner';
import { type SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import config from "@/config";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms?: boolean;
}

const SignUpPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignUpFormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false
    }
  });

  const [signUp, { isLoading }] = useRegisterMutation();

  // Watch password field for confirmation validation
  const watchPassword = watch('password');

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      const { confirmPassword, agreeToTerms, ...signUpData } = data;
      const res = await signUp(signUpData).unwrap();

      if (res.success) {
        toast.success("Account created successfully!");
        navigate("/login");
      }
    } catch (err: any) {

      // Handle Zod validation errors
      if (err?.data?.message === "Zod Error" && err?.data?.errorSources) {
        // Display each validation error
        err.data.errorSources.forEach((error: any) => {
          const fieldName = error.path;
          const message = error.message;
          toast.error(`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}: ${message}`);
        });
      } else if (err?.data?.message) {
        toast.error(err.data.message);
      } 
    }
  };

  const handleGoogleSignUp = () => {
    window.open(`${config.baseUrl}/auth/google`, '_self');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Truck className="w-7 h-7 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Fast Box</h1>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Join{" "}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Fast Box
              </span>
              {" "}today
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Create your account to start tracking packages, managing deliveries, and experiencing lightning-fast logistics services.
            </p>
          </div>

          {/* Feature Points */}
          <div className="space-y-4">
            {[
              'Free account setup',
              'Real-time package tracking',
              'Secure payment options',
              'Express delivery services',
              '24/7 customer support'
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - SignUp Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <Card className="border-0 shadow-2xl bg-card/95 backdrop-blur-sm">
            <CardHeader className="space-y-2 text-center pb-8">
              <div className="flex lg:hidden items-center justify-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Truck className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold text-foreground">Fast Box</span>
              </div>
              
              <CardTitle className="text-2xl md:text-3xl font-bold text-card-foreground">
                Create your account
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Fill in your details to get started with Fast Box
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
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
                      className={`pl-10 h-12 text-base ${
                        errors.name ? 'border-destructive focus:border-destructive' : ''
                      }`}
                      {...register('name', {
                        required: 'Full name is required',
                        minLength: {
                          value: 2,
                          message: 'Name must be at least 2 characters',
                        },
                        pattern: {
                          value: /^[a-zA-Z\s]+$/,
                          message: 'Name can only contain letters and spaces',
                        },
                      })}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-card-foreground">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className={`pl-10 h-12 text-base ${
                        errors.email ? 'border-destructive focus:border-destructive' : ''
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

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-card-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      className={`pl-10 pr-12 h-12 text-base ${
                        errors.password ? 'border-destructive focus:border-destructive' : ''
                      }`}
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters',
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                          message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
                        },
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-card-foreground">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      className={`pl-10 pr-12 h-12 text-base ${
                        errors.confirmPassword ? 'border-destructive focus:border-destructive' : ''
                      }`}
                      {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: (value) =>
                          value === watchPassword || 'Passwords do not match',
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary mt-0.5"
                    {...register('agreeToTerms', {
                      required: 'You must agree to the terms and conditions',
                    })}
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor="agreeToTerms"
                      className="text-sm text-muted-foreground cursor-pointer"
                    >
                      I agree to the{' '}
                      <button
                        type="button"
                        className="text-primary hover:text-primary/80 font-medium underline underline-offset-4 transition-colors"
                      >
                        Terms of Service
                      </button>{' '}
                      and{' '}
                      <button
                        type="button"
                        className="text-primary hover:text-primary/80 font-medium underline underline-offset-4 transition-colors"
                      >
                        Privacy Policy
                      </button>
                    </Label>
                    {errors.agreeToTerms && (
                      <p className="text-sm text-destructive mt-1">{errors.agreeToTerms.message}</p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={!isValid || isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                      <span>Creating account...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>Create account</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Google SignUp */}
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>

              <Button
                onClick={handleGoogleSignUp}
                type="button"
                variant="outline"
                className="w-full h-12 text-base font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Sign up with Google
              </Button>

              {/* Sign In Link */}
              <div className="text-center pt-4 border-t border-border">
                <p className="text-muted-foreground">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    replace 
                    className="text-primary hover:text-primary/80 font-semibold transition-colors underline underline-offset-4"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
