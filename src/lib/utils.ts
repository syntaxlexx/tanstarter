import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const site = {
  name: "TanStarter",
  description: "The only TanStack template to kickstart your next project",
  github: "syntaxlexx",
  githubUrl: "https://github.com/syntaxlexx/tanstarter",
};
