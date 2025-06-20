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
import { MagneticButton } from "@/components/ui/buttons/magnetic";
import { LiquidGlassButton } from "@/components/ui/buttons/liquid-glass";
import { Heart, Search, Plus, Magnet } from "lucide-react";

export default function ScreenshotsPage() {
  const components = [
    {
      name: "button",
      title: "Button",
      component: <Button>Default</Button>
    },
    {
      name: "copy-button",
      title: "Copy Button",
      component: <CopyButton content="Hello World!" />
    },
    {
      name: "flip-button",
      title: "Flip Button",
      component: <FlipButton frontText="Hover Me" backText="Flipped!" />
    },
    {
      name: "github-stars-button",
      title: "GitHub Stars Button",
      component: <GitHubStarsButton username="vercel" repo="next.js" formatted={true} />
    },
    {
      name: "icon-button",
      title: "Icon Button",
      component: <IconButton icon={Heart} />
    },
    {
      name: "input-button",
      title: "Input Button",
      component: (
        <InputButtonProvider className="w-48">
          <InputButton>
            <InputButtonAction>Search...</InputButtonAction>
            <InputButtonInput placeholder="Type something..." />
            <InputButtonSubmit icon={Search}>Search</InputButtonSubmit>
          </InputButton>
        </InputButtonProvider>
      )
    },
    {
      name: "liquid-button",
      title: "Liquid Button",
      component: (
        <LiquidButton>
          <Plus className="mr-2" />
          Hover Effect
        </LiquidButton>
      )
    },
    {
      name: "ripple-button",
      title: "Ripple Button",
      component: <RippleButton>Click for Ripple</RippleButton>
    },
    {
      name: "magnetic-button",
      title: "Magnetic Button",
      component: (
        <MagneticButton>
          <Magnet className="mr-2" />
          Magnetic Effect
        </MagneticButton>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold mb-8">Component Screenshots</h1>
        
        {components.map((comp) => (
          <div key={comp.name} className="space-y-2">
            <h2 className="text-lg font-semibold">{comp.title}</h2>
                         <div 
               id={comp.name}
               className="w-[300px] h-[150px] border rounded-lg bg-card flex items-center justify-center"
             >
              {comp.component}
            </div>
                         <p className="text-sm text-muted-foreground">
               Screenshot area: {comp.name}.png
             </p>
          </div>
        ))}

        {/* Special case for Liquid Glass - full component */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Liquid Glass Button</h2>
          <div 
            id="liquid-glass-button"
            className="w-[300px] h-[150px] border rounded-lg overflow-hidden relative"
            style={{
              background: `url("https://images.unsplash.com/photo-1432251407527-504a6b4174a2?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") center center`,
              backgroundSize: 'cover',
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <LiquidGlassButton>
                <span className="text-sm">Glass Button</span>
              </LiquidGlassButton>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Screenshot area: liquid-glass-button.png
          </p>
        </div>

        <div className="mt-12 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">Instructions for Screenshots:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Open browser developer tools</li>
            <li>Use element selector to select each container</li>
            <li>Take a screenshot of the component area</li>
            <li>Save as thumbs/[component-name].png</li>
            <li>Or better yet, use: <code>npm run screenshots</code> for automation</li>
          </ol>
        </div>
      </div>
    </div>
  );
} 