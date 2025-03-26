import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import authClient from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { createFileRoute, redirect } from "@tanstack/react-router";
import type { ComponentProps } from "react";

const REDIRECT_URL = "/dashboard";

export const Route = createFileRoute("/signin")({
  component: Page,
  beforeLoad: async ({ context }) => {
    if (context.user) {
      throw redirect({
        to: REDIRECT_URL,
      });
    }
  },
});

function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Logo Here</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <SignInButton
              provider="discord"
              label="Discord"
              className="bg-[#5865F2] hover:bg-[#5865F2]/80"
            />
            <SignInButton
              provider="github"
              label="GitHub"
              className="bg-neutral-700 hover:bg-neutral-700/80"
            />
            <SignInButton
              provider="google"
              label="Google"
              className="bg-[#DB4437] hover:bg-[#DB4437]/80"
            />
          </div>
          <p className="text-center">--OR--</p>
          <h2>Login via Email and Password</h2>
          <EmailPasswordSignIn />
        </CardContent>
      </Card>
    </div>
  );
}

interface SignInButtonProps extends ComponentProps<typeof Button> {
  provider: "discord" | "google" | "github";
  label: string;
}

function SignInButton({ provider, label, className, ...props }: SignInButtonProps) {
  return (
    <Button
      onClick={() =>
        authClient.signIn.social({
          provider,
          callbackURL: REDIRECT_URL,
        })
      }
      type="button"
      size="lg"
      className={cn("text-white hover:text-white", className)}
      {...props}
    >
      Sign in with {label}
    </Button>
  );
}

function EmailPasswordSignIn() {
  return (
    <div className="flex flex-col gap-2">
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Button type="submit">Login</Button>
    </div>
  );
}
