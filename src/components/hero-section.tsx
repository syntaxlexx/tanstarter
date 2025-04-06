import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export default function HeroSection() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8" id="hero-section">
      <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
        {/* Purple gradient blur effect */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-purple-500 to-violet-300 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            The Only AI For Responding To Your Messages
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            You can read and reply to private messages manually or trust our AI based on
            ChatGPT 4. The AI will also promote itself, increasing the number of followers
            and the reach of your posts. Without resorting to spamming. For example, a
            representative will be able to attract the attention of up to 1000 people a
            day.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>

        {/* Decorative image grid */}
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-purple-500 to-violet-300 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
        </div>
      </div>
    </div>
  );
}
