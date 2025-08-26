/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Truck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLoginMutation } from '@/redux/features/authApi';
import { toast } from 'sonner';
import { type SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import config from "@/config";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const res = await login(data).unwrap();

      if (res.success) {
        toast.success("Logged in successfully");
        navigate("/");
      }
    } catch (err: any) {
      console.error(err);

      if (err?.data?.message) {
        toast.error(err.data.message);
      }
    }
  };

  const handleGoogleLogin = () => {
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
              Welcome back to{" "}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Fast Box
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Access your dashboard to track packages, manage deliveries, and experience lightning-fast logistics services.
            </p>
          </div>

          {/* Feature Points */}
          <div className="space-y-4">
            {[
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

        {/* Right Side - Login Form */}
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
                Sign in to your account
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Enter your credentials to access your dashboard
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                      placeholder="Enter your password"
                      className={`pl-10 pr-12 h-12 text-base ${
                        errors.password ? 'border-destructive focus:border-destructive' : ''
                      }`}
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters',
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

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                      {...register('rememberMe')}
                    />
                    <Label
                      htmlFor="rememberMe"
                      className="text-sm text-muted-foreground cursor-pointer"
                    >
                      Remember me
                    </Label>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Forgot password?
                  </button>
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
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>Sign in</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Google Login */}
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>

              <Button
                onClick={handleGoogleLogin}
                type="button"
                variant="outline"
                className="w-full h-12 text-base font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Login with Google
              </Button>

              {/* Sign Up Link */}
              <div className="text-center pt-4 border-t border-border">
                <p className="text-muted-foreground">
                  Don't have an account?{' '}
                  <Link 
                    to="/register" 
                    replace 
                    className="text-primary hover:text-primary/80 font-semibold transition-colors underline underline-offset-4"
                  >
                    Sign up for free
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

export default LoginPage;