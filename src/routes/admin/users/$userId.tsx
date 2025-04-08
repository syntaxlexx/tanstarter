import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { userQueryOptions } from "@/queries/users";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/users/$userId")({
  loader: async ({ params: { userId }, context }) => {
    const data = await context.queryClient.ensureQueryData(userQueryOptions(userId));

    return {
      title: `${data?.name} - Profile`,
    };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: loaderData.title }] : undefined,
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { userId } = Route.useParams();
  const { data: user, isLoading } = useSuspenseQuery(userQueryOptions(userId));

  return (
    <div className="container space-y-2 py-4">
      {isLoading && <div>Loading...</div>}

      {user && (
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <span className="text-2xl text-muted-foreground">{user.name[0]}</span>
              </div>
              <div>
                <h4 className="text-2xl font-bold ">{user.name}</h4>
                {user.email && <p className="">{user.email}</p>}
              </div>
            </div>
          </CardHeader>

          <CardContent className="border-t">
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="font-medium ">{user.role || "User"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email Status</p>
                <div className="flex items-center">
                  <div
                    className={`w-2 h-2 rounded-full mr-2 ${user.emailVerified ? "bg-green-500" : "bg-gray-400"}`}
                  />
                  <span className="font-medium ">
                    {user.emailVerified ? "Verified" : "Unverified"}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
