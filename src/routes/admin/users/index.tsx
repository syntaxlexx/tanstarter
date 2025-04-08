import { Title } from "@/components/title";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchUsers } from "@/queries/users";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    data,
    isFetching: isLoading,
    error: fetchError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return (
    <div className="container space-y-4">
      <Title>Users</Title>

      {fetchError && <div className="text-destructive">Error: {fetchError.message}</div>}

      {isLoading && <div>Loading...</div>}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image || undefined} alt={user.name} />
                    <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span>{user.name}</span>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.role && (
                    <Badge variant="secondary" className="capitalize">
                      {user.role}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.banned
                        ? "destructive"
                        : user.emailVerified
                          ? "default"
                          : "secondary"
                    }
                  >
                    {user.banned
                      ? "Banned"
                      : user.emailVerified
                        ? "Verified"
                        : "Unverified"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" asChild>
                    <Link to={`/admin/users/$userId`} params={{ userId: user.id }}>
                      View
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {!data?.length && (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
