import { cn, site } from "@/lib/utils";

export default function SiteFooter({ className }: { className?: string }) {
  return (
    <footer className={cn("text-center py-6", className)}>
      <a
        className="text-muted-foreground underline hover:text-foreground"
        href={site.githubUrl}
        target="_blank"
        rel="noreferrer noopener"
      >
        {site.githubUrl.replace("https://github.com/", "")}
      </a>
      <p className="text-muted-foreground">{site.description}</p>
    </footer>
  );
}
