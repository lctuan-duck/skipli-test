'use client';

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MdArrowBack } from "react-icons/md";
import Link from "next/link";
import { useAuth } from "@/store/use-auth";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useRouter } from 'next/navigation'

type FormData = {
  email: string;
};

export default function SignIn() {
  const { signInWithEmail } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await signInWithEmail(data.email.trim());

      const params = new URLSearchParams()
      params.set('email', data.email.trim())

      router.push(`/auth/verify-email?${params.toString()}`)
    } catch (error) {
      console.error("Failed to sign in:", error);
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
        <h2 className="text-2xl font-bold text-center mb-2">Sign In</h2>
        <p className="text-center text-gray-600 mb-6">Please enter your email to sign in</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            type="text"
            placeholder="Your Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
          <Button type="submit" className="w-full" size="lg">
            {isLoading && <AiOutlineLoading className="animate-spin mr-2" />}
            {isLoading ? 'Signing in...' : 'Next'}
          </Button>
        </form>
        <p className="text-center text-gray-500 text-sm mb-2">passwordless authentication methods.</p>
        <p className="text-center text-gray-600 text-sm">
          Don't having account? <Link href="/auth/signup" className="text-blue-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
