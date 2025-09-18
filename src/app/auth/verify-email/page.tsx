'use client';

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MdArrowBack } from "react-icons/md";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/store/use-auth";

type FormData = {
  code: string;
};

export default function VerifyEmail() {
  const { verifyEmail } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const searchParams = useSearchParams()

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const email = searchParams.get('email') || ''

      await verifyEmail(email, data.code.trim());

      router.push('/dashboard');
    } catch (error) {
      console.error("Failed to verify code:", error);
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <Button variant="ghost" className="mb-4 text-gray-500 flex items-center gap-2" type="button">
          <MdArrowBack size={20} /> Back
        </Button>
        <h2 className="text-2xl font-bold text-center mb-2">Email verification</h2>
        <p className="text-center text-gray-600 mb-6">Please enter your code that send to your email address</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter Your code"
            {...register("code", { required: "Code is required" })}
          />
          {errors.code && (
            <p className="text-red-500 text-sm">{errors.code.message}</p>
          )}
          <Button type="submit" className="w-full" size="lg">
            Submit
          </Button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-2">
          Code not receive?{' '}
          <Link href="#" className="text-blue-600 hover:underline">Send again</Link>
        </p>
      </div>
    </div>
  );
}

