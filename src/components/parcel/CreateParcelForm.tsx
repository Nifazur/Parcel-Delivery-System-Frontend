/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Package, MapPin, User, Calendar, Weight, Truck, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { type SubmitHandler, useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import { useCreateParcelMutation } from '@/redux/features/parcelApi';
import { useGetAllDivisionsQuery } from '@/redux/features/divisionApi';
import { useUserInfoQuery } from '@/redux/features/authApi';
import { role } from '@/constants/role';

export interface ICreateParcelRequest {
  type: string;
  weight: number;
  receiver: string;
  fromAddress: string;
  toAddress: string;
  division: string;
  deliveryDate?: Date;
}

// Common parcel types - you can modify these based on your needs
const PARCEL_TYPES = [
  { value: 'document', label: 'Document' },
  { value: 'package', label: 'Package' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'food', label: 'Food Items' },
  { value: 'books', label: 'Books' },
  { value: 'fragile', label: 'Fragile Items' },
  { value: 'other', label: 'Other' },
];

const CreateParcelForm: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset
  } = useForm<ICreateParcelRequest>({
    mode: 'onChange',
    defaultValues: {
      type: '',
      weight: 0,
      receiver: '',
      fromAddress: '',
      toAddress: '',
      division: '',
      deliveryDate: undefined
    }
  });

  const { data: divisionsData, isLoading: divisionsLoading } = useGetAllDivisionsQuery();
  const [createParcel, { isLoading: createParcelLoading }] = useCreateParcelMutation();
  const {data: user, isLoading: userLoading} = useUserInfoQuery(undefined)

  const onSubmit: SubmitHandler<ICreateParcelRequest> = async (data) => {
    try {
      const parcelData = {
        ...data,
        deliveryDate: data.deliveryDate ? new Date(data.deliveryDate) : undefined
      };

      const res = await createParcel(parcelData).unwrap();

      if (res.success) {
        toast.success("Parcel created successfully!");
        reset();
        if (user?.data?.role?.includes(role.sender) && user?.data?.role?.includes(role.receiver)) {
          navigate("/common-user/sent-parcels");
        } else if (user?.data?.role?.includes(role.sender)) {
          navigate("/sender/sent-parcels");
        } else {
          navigate("/");
        }
      }
    } catch (err: any) {
      console.error(err);

      // Handle Zod validation errors
      if (err?.data?.message === "Zod Error" && err?.data?.errorSources) {
        err.data.errorSources.forEach((error: any) => {
          const fieldName = error.path;
          const message = error.message;
          toast.error(`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}: ${message}`);
        });
      } else {
        toast.error(err?.data?.message || "Failed to create parcel");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}

      <Card className="border-0 shadow-2xl bg-card/95 backdrop-blur-sm">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold text-card-foreground flex items-center space-x-2">
            <Truck className="w-6 h-6 text-primary" />
            <span>Parcel Information</span>
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Provide all necessary details for your parcel delivery
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Parcel Type & Weight Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Parcel Type */}
              <div className="space-y-2 w-full">
                <Label htmlFor="type" className="text-sm font-medium text-card-foreground">
                  Parcel Type
                </Label>
                <Controller
                  name="type"
                  control={control}
                  rules={{ required: 'Parcel type is required' }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-12 text-base w-full">
                        <div className="flex items-center space-x-2">
                          <Package className="w-5 h-5 text-muted-foreground" />
                          <SelectValue placeholder="Select parcel type" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {PARCEL_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.type && (
                  <p className="text-sm text-destructive mt-1">{errors.type.message}</p>
                )}
              </div>

              {/* Weight */}
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-sm font-medium text-card-foreground">
                  Weight (kg)
                </Label>
                <div className="relative">
                  <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="Enter weight in kg"
                    className={`pl-10 h-9 text-base ${errors.weight ? 'border-destructive focus:border-destructive' : ''
                      }`}
                    {...register('weight', {
                      required: 'Weight is required',
                      min: {
                        value: 0.1,
                        message: 'Weight must be greater than 0',
                      },
                      valueAsNumber: true,
                    })}
                  />
                </div>
                {errors.weight && (
                  <p className="text-sm text-destructive mt-1">{errors.weight.message}</p>
                )}
              </div>
            </div>

            {/* Receiver */}
            <div className="space-y-2">
              <Label htmlFor="receiver" className="text-sm font-medium text-card-foreground">
                Receiver Email/ID
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="receiver"
                  type="email"
                  placeholder="Enter receiver's email address"
                  className={`pl-10 h-12 text-base ${errors.receiver ? 'border-destructive focus:border-destructive' : ''
                    }`}
                  {...register('receiver', {
                    required: 'Receiver email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Please enter a valid email address',
                    },
                  })}
                />
              </div>
              {errors.receiver && (
                <p className="text-sm text-destructive mt-1">{errors.receiver.message}</p>
              )}
            </div>

            {/* Addresses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* From Address */}
              <div className="space-y-2">
                <Label htmlFor="fromAddress" className="text-sm font-medium text-card-foreground">
                  From Address
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Textarea
                    id="fromAddress"
                    placeholder="Enter pickup address"
                    className={`pl-10 min-h-[100px] text-base resize-none ${errors.fromAddress ? 'border-destructive focus:border-destructive' : ''
                      }`}
                    {...register('fromAddress', {
                      required: 'From address is required',
                      minLength: {
                        value: 10,
                        message: 'Address must be at least 10 characters',
                      },
                    })}
                  />
                </div>
                {errors.fromAddress && (
                  <p className="text-sm text-destructive mt-1">{errors.fromAddress.message}</p>
                )}
              </div>

              {/* To Address */}
              <div className="space-y-2">
                <Label htmlFor="toAddress" className="text-sm font-medium text-card-foreground">
                  To Address
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Textarea
                    id="toAddress"
                    placeholder="Enter delivery address"
                    className={`pl-10 min-h-[100px] text-base resize-none ${errors.toAddress ? 'border-destructive focus:border-destructive' : ''
                      }`}
                    {...register('toAddress', {
                      required: 'To address is required',
                      minLength: {
                        value: 10,
                        message: 'Address must be at least 10 characters',
                      },
                    })}
                  />
                </div>
                {errors.toAddress && (
                  <p className="text-sm text-destructive mt-1">{errors.toAddress.message}</p>
                )}
              </div>
            </div>

            {/* Division & Delivery Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Division */}
              <div className="space-y-2">
                <Label htmlFor="division" className="text-sm font-medium text-card-foreground">
                  Division
                </Label>
                <Controller
                  name="division"
                  control={control}
                  rules={{ required: 'Division is required' }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange} disabled={divisionsLoading}>
                      <SelectTrigger className="h-12 text-base w-full">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-5 h-5 text-muted-foreground" />
                          <SelectValue placeholder={divisionsLoading ? "Loading divisions..." : "Select division"} />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {divisionsData?.data?.map((division: any) => (
                          <SelectItem key={division._id || division.id} value={division.name || division}>
                            {division.name || division}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.division && (
                  <p className="text-sm text-destructive mt-1">{errors.division.message}</p>
                )}
              </div>

              {/* Delivery Date */}
              <div className="space-y-2">
                <Label htmlFor="deliveryDate" className="text-sm font-medium text-card-foreground">
                  Preferred Delivery Date (Optional)
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="deliveryDate"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    className="pl-10 h-9 text-base"
                    {...register('deliveryDate')}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => reset()}
                className="flex-1 h-12 text-base font-medium"
              >
                Reset Form
              </Button>
              <Button
                type="submit"
                className="flex-1 h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={!isValid || createParcelLoading}
              >
                {createParcelLoading || userLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    <span>Creating Parcel...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Create Parcel</span>
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

export default CreateParcelForm;