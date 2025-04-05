import { site } from "@/lib/utils";

export default function SiteFooter() {
  return (
    <footer className="mt-auto text-center py-6">
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
