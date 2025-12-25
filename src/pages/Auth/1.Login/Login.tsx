/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Truck, 
  ArrowRight, 
  Shield, 
  Package, 
  Inbox, 
  Users,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

interface DemoAccount {
  id: string;
  label: string;
  role: string;
  email: string;
  password: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [, setSelectedDemo] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  const watchEmail = watch('email');

  const [login, { isLoading }] = useLoginMutation();

  const demoAccounts: DemoAccount[] = [
    {
      id: 'admin',
      label: 'Admin',
      role: 'Super Admin',
      email: 'super@gmail.com',
      password: '12345678',
      icon: <Shield className="w-4 h-4" />,
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950/30',
      borderColor: 'border-red-200 dark:border-red-800 hover:border-red-400',
      description: 'Full system access'
    },
    {
      id: 'sender',
      label: 'Sender',
      role: 'Sender',
      email: 'sender@gmail.com',
      password: 'Nahaz12345!!',
      icon: <Package className="w-4 h-4" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
      borderColor: 'border-blue-200 dark:border-blue-800 hover:border-blue-400',
      description: 'Send parcels'
    },
    {
      id: 'receiver',
      label: 'Receiver',
      role: 'Receiver',
      email: 'receiver@gmail.com',
      password: 'Nahaz12345!!',
      icon: <Inbox className="w-4 h-4" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950/30',
      borderColor: 'border-green-200 dark:border-green-800 hover:border-green-400',
      description: 'Receive parcels'
    },
    {
      id: 'common',
      label: 'Common',
      role: 'Common User',
      email: 'common@gmail.com',
      password: 'Nahaz12345!!',
      icon: <Users className="w-4 h-4" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950/30',
      borderColor: 'border-purple-200 dark:border-purple-800 hover:border-purple-400',
      description: 'Send & Receive'
    },
  ];

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

  const fillDemoCredentials = (account: DemoAccount) => {
    setValue('email', account.email, { shouldValidate: true });
    setValue('password', account.password, { shouldValidate: true });
    setSelectedDemo(account.id);
    toast.success(
      <div className="flex items-center gap-2">
        <span className={account.color}>{account.icon}</span>
        <span>{account.role} credentials filled</span>
      </div>
    );
  };

  const isAccountSelected = (account: DemoAccount) => {
    return watchEmail === account.email;
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/25">
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
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Demo Accounts Info Card */}
          <Card className="bg-muted/50 border-dashed">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Demo Accounts Available</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Try different user roles to explore the full functionality of Fast Box:
              </p>
              <div className="grid grid-cols-2 gap-3">
                {demoAccounts.map((account) => (
                  <div key={account.id} className={`flex items-center gap-2 p-2 rounded-lg ${account.bgColor}`}>
                    <span className={account.color}>{account.icon}</span>
                    <div>
                      <p className="text-sm font-medium">{account.role}</p>
                      <p className="text-xs text-muted-foreground">{account.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <Card className="border-0 shadow-2xl bg-card/95 backdrop-blur-sm">
            <CardHeader className="space-y-2 text-center pb-6">
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
              {/* Demo Credentials Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">Quick Demo Login</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Click to fill
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {demoAccounts.map((account) => (
                    <button
                      key={account.id}
                      type="button"
                      onClick={() => fillDemoCredentials(account)}
                      className={`relative flex items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${account.bgColor} ${account.borderColor} ${
                        isAccountSelected(account) ? 'ring-2 ring-primary ring-offset-2' : ''
                      }`}
                    >
                      {isAccountSelected(account) && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-primary-foreground" />
                        </div>
                      )}
                      <span className={account.color}>{account.icon}</span>
                      <div className="text-left">
                        <p className="text-sm font-semibold">{account.label}</p>
                        <p className="text-xs text-muted-foreground">{account.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or enter manually</span>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
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

          {/* Mobile Demo Info */}
          <div className="lg:hidden mt-6">
            <Card className="bg-muted/50 border-dashed">
              <CardContent className="p-4">
                <p className="text-xs text-center text-muted-foreground">
                  <Sparkles className="w-3 h-3 inline mr-1" />
                  Click any demo account button above to quickly fill credentials
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;