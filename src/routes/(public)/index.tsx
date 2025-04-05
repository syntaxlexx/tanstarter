import HeroSection from "@/components/hero-section";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/")({
  component: Home,
  loader: ({ context }) => {
    return { user: context.user };
  },
});

function Home() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <HeroSection />
      <SiteFooter />
    </div>
  );
}
