"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation';

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cookies } from 'next/headers'
import { generateJWT } from "@/lib/jwtUtil"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
 
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | null>(null)
  const { push } = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault() 
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');

    setIsLoading(true); // Set loading state for UI feedback
    setError(null); // Clear any previous errors

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: formData
      });
      console.log(response.status);
      if (response.ok) {
        console.log('Login successful');
        // Redirect handled on the server-side
        // Handle success case in UI if needed (e.g., success message)
        push("/dashboard/company")
      } else {
        const errorData = await response.json();
        setError(errorData.error); // Update error state
      }
    } catch (error) {
      console.error('Error submitting login form:', error);
      setError('An unexpected error occurred'); // Generic error message
    } finally {
      setIsLoading(false); // Reset loading state
    }
  }


  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button> */}
    </div>
  )
}