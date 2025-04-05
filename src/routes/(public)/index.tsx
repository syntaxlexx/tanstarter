import HeroSection from "@/components/hero-section";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/")({
  component: Home,
  loader: ({ context }) => {
    return { user: context.user };
  },
});

function Home() {
  return <HeroSection />;
}
