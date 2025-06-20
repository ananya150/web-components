import Link from "next/link";
import { Button } from "@/components/ui/buttons/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center px-6">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Web Components Showcase
        </h1>
        <p className="text-muted-foreground text-lg mb-8">
          A collection of modern, interactive React components with beautiful animations and effects.
        </p>
        
        <div className="space-y-4">
          <Link href="/buttons">
            <Button size="lg" className="group">
              View Button Components
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          
          <p className="text-sm text-muted-foreground">
            Explore our comprehensive button component library with interactive examples
          </p>
        </div>
      </div>
    </div>
  );
}
