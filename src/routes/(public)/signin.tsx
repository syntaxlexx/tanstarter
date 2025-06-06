import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import authClient from "@/lib/auth-client";
import { seo } from "@/lib/seo";
import { cn, site } from "@/lib/utils";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState, type ComponentProps } from "react";
import { toast } from "sonner";

const REDIRECT_URL = "/dashboard";

export const Route = createFileRoute("/(public)/signin")({
  component: Page,
  beforeLoad: async ({ context }) => {
    if (context.user) {
      throw redirect({
        to: REDIRECT_URL,
      });
    }
  },
  head: () => ({
    meta: [
      ...seo({
        title: "Sign In | " + site.name,
        description: site.description,
      }),
    ],
  }),
});

function Page() {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Hero Image */}
      <div className="hidden w-1/2 lg:block">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
          alt="Abstract futuristic space visualization"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right side - Sign In Form */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>
              <Link to="/">
                <h3 className="text-2xl font-bold">{site.name}</h3>
              </Link>
            </CardTitle>
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
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <EmailPasswordSignIn />
          </CardContent>
        </Card>
      </div>
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter an email and password");
      return;
    }

    setIsLoading(true);
    setError(null);

    if (isSignUp) {
      const { error } = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: REDIRECT_URL,
      });

      setIsLoading(false);

      if (error) {
        setError(error.message || "An error occurred");
        return;
      }

      toast.success("Account created successfully");
      setIsSignUp(false);

      return;
    }

    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: REDIRECT_URL,
    });

    setIsLoading(false);

    if (error) {
      setError(error.message || "An error occurred");
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      {isSignUp && (
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <Eye /> : <EyeOff />}
        </Button>
      </div>

      {isSignUp && (
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </Button>
        </div>
      )}

      <Button type="submit" disabled={isLoading}>
        {isSignUp ? "Sign Up" : "Login"}
        {isLoading && <Loader2 className="ml-2 size-4 animate-spin" />}
      </Button>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {isSignUp ? (
        <Button type="button" variant="link" onClick={() => setIsSignUp(false)}>
          Already have an account? Login
        </Button>
      ) : (
        <Button type="button" variant="link" onClick={() => setIsSignUp(true)}>
          Don't have an account? Sign up
        </Button>
      )}
    </form>
  );
}
