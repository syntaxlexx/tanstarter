import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createUserMutationOptions } from "@/queries/users";
import { UserRole } from "@/types";
import { ucwords } from "@acelords/js-utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/users/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutateAsync: createUser,
    isPending: isCreating,
    error: createUserError,
  } = useMutation(createUserMutationOptions());

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError(null);

    try {
      await createUser({
        name,
        email,
        role,
      });

      toast.success("User created successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate({ to: "/admin/users" });
    } catch (error) {
      if (error instanceof Error && error.message === "Email is already taken") {
        setEmailError("This email is already registered");
        toast.error("Email is already taken");
      } else {
        toast.error("Failed to create user");
        console.error(error);
      }
    }
  };

  return (
    <div className="container py-10">
      <Card>
        <CardHeader>
          <CardTitle>Create New User</CardTitle>
          <CardDescription>Add a new user to the system</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(null);
                }}
                required
                aria-invalid={!!emailError}
                aria-errormessage={emailError ? "email-error" : undefined}
              />
              {emailError && (
                <p id="email-error" className="text-sm text-destructive">
                  {emailError}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={role}
                onValueChange={setRole}
                required
                defaultValue={UserRole.USER}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(UserRole).map((role) => (
                    <SelectItem key={role} value={role}>
                      {ucwords(role)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {createUserError && (
              <p className="text-sm text-destructive">{createUserError.message}</p>
            )}

            <Button type="submit" disabled={isCreating}>
              <span>Create User</span>
              {isCreating && <Loader2 className="size-4 ml-1 animate-spin" />}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
