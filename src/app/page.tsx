'use client';

import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/buttons/copy";
import { FlipButton } from "@/components/ui/buttons/flip";
import { GitHubStarsButton } from "@/components/ui/buttons/github-stars";
import { IconButton } from "@/components/ui/buttons/icon";
import { 
  InputButton, 
  InputButtonProvider, 
  InputButtonAction, 
  InputButtonSubmit, 
  InputButtonInput 
} from "@/components/ui/buttons/input";
import { LiquidButton } from "@/components/ui/buttons/liquid";
import { RippleButton } from "@/components/ui/buttons/ripple";
import { Heart, Star, Search, Plus, Download, Settings } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Button Showcase</h1>
          <p className="text-muted-foreground text-lg">
            A collection of interactive button components with modern animations and effects.
          </p>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Basic Button */}
          <div className="bg-card border rounded-lg p-6 flex flex-col items-center space-y-4">
            <h3 className="text-lg font-semibold">Basic Button</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button>Default</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>

          {/* Copy Button */}
          <div className="bg-card border rounded-lg p-6 flex flex-col items-center space-y-4">
            <h3 className="text-lg font-semibold">Copy Button</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              <CopyButton content="Hello World!" size="default" />
              <CopyButton content="Copy me!" variant="outline" />
              <CopyButton content="Another copy" variant="secondary" />
            </div>
          </div>

          {/* Flip Button */}
          <div className="bg-card border rounded-lg p-6 flex flex-col items-center space-y-4">
            <h3 className="text-lg font-semibold">Flip Button</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              <FlipButton frontText="Hover Me" backText="Flipped!" />
              <FlipButton frontText="Click" backText="Action" from="left" />
              <FlipButton frontText="Top" backText="Bottom" from="top" />
            </div>
          </div>

          {/* GitHub Stars Button */}
          <div className="bg-card border rounded-lg p-6 flex flex-col items-center space-y-4">
            <h3 className="text-lg font-semibold">GitHub Stars</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              <GitHubStarsButton username="vercel" repo="next.js" formatted={true} />
            </div>
          </div>

          {/* Icon Button */}
          <div className="bg-card border rounded-lg p-6 flex flex-col items-center space-y-4">
            <h3 className="text-lg font-semibold">Icon Button</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              <IconButton icon={Heart} />
              <IconButton icon={Star} active={true} color={[255, 215, 0]} />
              <IconButton icon={Settings} size="lg" color={[34, 197, 94]} />
            </div>
          </div>

          {/* Input Button */}
          <div className="bg-card border rounded-lg p-6 flex flex-col items-center space-y-4">
            <h3 className="text-lg font-semibold">Input Button</h3>
            <div className="flex justify-center w-full">
              <InputButtonProvider className="w-full max-w-sm">
                <InputButton>
                  <InputButtonAction>Search...</InputButtonAction>
                  <InputButtonInput placeholder="Type something..." />
                  <InputButtonSubmit icon={Search}>Search</InputButtonSubmit>
                </InputButton>
              </InputButtonProvider>
            </div>
          </div>

          {/* Liquid Button */}
          <div className="bg-card border rounded-lg p-6 flex flex-col items-center space-y-4">
            <h3 className="text-lg font-semibold">Liquid Button</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              <LiquidButton>
                <Plus className="mr-2" />
                Hover Effect
              </LiquidButton>
              <LiquidButton variant="outline">
                <Download className="mr-2" />
                Download
              </LiquidButton>
            </div>
          </div>

          {/* Ripple Button */}
          <div className="bg-card border rounded-lg p-6 flex flex-col items-center space-y-4">
            <h3 className="text-lg font-semibold">Ripple Button</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              <RippleButton>Click for Ripple</RippleButton>
              <RippleButton variant="outline">Outline Ripple</RippleButton>
              <RippleButton variant="secondary">Secondary</RippleButton>
            </div>
          </div>

          {/* Button Sizes */}
          <div className="bg-card border rounded-lg p-6 flex flex-col items-center space-y-4">
            <h3 className="text-lg font-semibold">Button Sizes</h3>
            <div className="flex flex-wrap gap-3 justify-center items-center">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">
                <Star />
              </Button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t">
          <p className="text-muted-foreground">
            Built with Next.js, Tailwind CSS, and Framer Motion
          </p>
        </div>
      </div>
    </div>
  );
}
