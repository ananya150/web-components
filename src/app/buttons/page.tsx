'use client';

import { useState, useEffect } from "react";
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
import { LiquidGlassButtonDemo } from "@/components/ui/buttons/liquid-glass";
import { Heart, Star, Search, Plus, Download, Settings, ChevronLeft, ChevronRight } from "lucide-react";

const navigationItems = [
  { id: 'components', label: 'Components', section: 'components', isHeader: true },
  { id: 'basic-button', label: 'Button', section: 'components' },
  { id: 'copy-button', label: 'Copy Button', section: 'components' },
  { id: 'flip-button', label: 'Flip Button', section: 'components' },
  { id: 'github-stars', label: 'GitHub Stars', section: 'components' },
  { id: 'icon-button', label: 'Icon Button', section: 'components' },
  { id: 'input-button', label: 'Input Button', section: 'components' },
  { id: 'liquid-button', label: 'Liquid Button', section: 'components' },
  { id: 'ripple-button', label: 'Ripple Button', section: 'components' },
  { id: 'liquid-glass', label: 'Liquid Glass', section: 'components' },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState('basic-button');
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll detection to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.filter(item => !item.isHeader);
      const scrollPosition = window.scrollY + 200; // Offset for better UX

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card/50 sticky top-0 h-screen overflow-y-auto">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-6">Button Components</h2>
          <nav className="space-y-1">
            {navigationItems.map((item) => (
              <div key={item.id}>
                {item.isHeader ? (
                  <div className="text-sm font-medium text-muted-foreground mt-6 mb-2 px-3">
                    {item.label}
                  </div>
                ) : (
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors hover:bg-accent hover:text-accent-foreground ${
                      activeSection === item.id 
                        ? 'bg-accent text-accent-foreground font-medium' 
                        : 'text-muted-foreground'
                    }`}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-none">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold">Button</h1>
              <p className="text-muted-foreground">Displays a button or a component that looks like a button.</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

                 {/* Content */}
         <div className="px-6 py-6 space-y-16">

           {/* Basic Button */}
          <section id="basic-button" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Button</h2>
              <p className="text-muted-foreground mb-6">
                The basic button component with multiple variants and sizes.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 border-b">
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'preview' 
                        ? 'border-primary text-primary' 
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => setActiveTab('code')}
                    className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'code' 
                        ? 'border-primary text-primary' 
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Code
                  </button>
                </div>
                
                                 <div className="border rounded-lg bg-card">
                   {activeTab === 'preview' ? (
                     <div className="h-80 md:h-96 flex flex-wrap gap-4 items-center justify-center p-8">
                       <Button>Default</Button>
                       <Button variant="outline">Outline</Button>
                       <Button variant="secondary">Secondary</Button>
                       <Button variant="ghost">Ghost</Button>
                       <Button variant="destructive">Destructive</Button>
                     </div>
                   ) : (
                     <div className="h-80 md:h-96 flex items-center justify-center p-4">
                       <div className="bg-muted p-4 rounded text-sm w-full max-w-2xl">
                         <pre>{`<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>`}</pre>
                       </div>
                     </div>
                   )}
                 </div>
              </div>
            </div>
          </section>

          {/* Copy Button */}
          <section id="copy-button" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Copy Button</h2>
              <p className="text-muted-foreground mb-6">
                Button with copy functionality and visual feedback animation.
              </p>
              
                             <div className="border rounded-lg bg-card">
                 <div className="h-80 md:h-96 flex flex-wrap gap-4 items-center justify-center p-8">
                   <CopyButton content="Hello World!" />
                   <CopyButton content="Copy me!" variant="outline" />
                   <CopyButton content="Another copy" variant="secondary" />
                 </div>
               </div>
            </div>
          </section>

          {/* Flip Button */}
          <section id="flip-button" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Flip Button</h2>
              <p className="text-muted-foreground mb-6">
                3D flip animation effect with customizable flip directions.
              </p>
              
                             <div className="border rounded-lg bg-card">
                 <div className="h-80 md:h-96 flex flex-wrap gap-4 items-center justify-center p-8">
                   <FlipButton frontText="Hover Me" backText="Flipped!" />
                   <FlipButton frontText="Left Flip" backText="Action" from="left" />
                   <FlipButton frontText="Top Flip" backText="Bottom" from="top" />
                 </div>
               </div>
            </div>
          </section>

          {/* GitHub Stars Button */}
          <section id="github-stars" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">GitHub Stars Button</h2>
              <p className="text-muted-foreground mb-6">
                Displays real GitHub repository star count with animated counter.
              </p>
              
                             <div className="border rounded-lg bg-card">
                 <div className="h-80 md:h-96 flex justify-center items-center p-8">
                   <GitHubStarsButton username="vercel" repo="next.js" formatted={true} />
                 </div>
               </div>
            </div>
          </section>

          {/* Icon Button */}
          <section id="icon-button" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Icon Button</h2>
              <p className="text-muted-foreground mb-6">
                Buttons with icons featuring interactive effects and customizable colors.
              </p>
              
                             <div className="border rounded-lg bg-card">
                 <div className="h-80 md:h-96 flex flex-wrap gap-4 items-center justify-center p-8">
                   <IconButton icon={Heart} />
                   <IconButton icon={Star} active={true} color={[255, 215, 0]} />
                   <IconButton icon={Settings} size="lg" color={[34, 197, 94]} />
                 </div>
               </div>
            </div>
          </section>

          {/* Input Button */}
          <section id="input-button" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Input Button</h2>
              <p className="text-muted-foreground mb-6">
                Compound component that transforms between button and input field.
              </p>
              
                             <div className="border rounded-lg bg-card">
                 <div className="h-80 md:h-96 flex justify-center items-center p-8">
                   <InputButtonProvider className="w-full max-w-sm">
                     <InputButton>
                       <InputButtonAction>Search...</InputButtonAction>
                       <InputButtonInput placeholder="Type something..." />
                       <InputButtonSubmit icon={Search}>Search</InputButtonSubmit>
                     </InputButton>
                   </InputButtonProvider>
                 </div>
               </div>
            </div>
          </section>

          {/* Liquid Button */}
          <section id="liquid-button" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Liquid Button</h2>
              <p className="text-muted-foreground mb-6">
                Hover effect with liquid-like fill animation.
              </p>
              
                             <div className="border rounded-lg bg-card">
                 <div className="h-80 md:h-96 flex flex-wrap gap-4 items-center justify-center p-8">
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
            </div>
          </section>

          {/* Ripple Button */}
          <section id="ripple-button" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Ripple Button</h2>
              <p className="text-muted-foreground mb-6">
                Click effect with ripple animation emanating from the click point.
              </p>
              
                             <div className="border rounded-lg bg-card">
                 <div className="h-80 md:h-96 flex flex-wrap gap-4 items-center justify-center p-8">
                   <RippleButton>Click for Ripple</RippleButton>
                   <RippleButton variant="outline">Outline Ripple</RippleButton>
                   <RippleButton variant="secondary">Secondary</RippleButton>
                 </div>
               </div>
            </div>
          </section>

          {/* Liquid Glass Button */}
          <section id="liquid-glass" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Liquid Glass Button</h2>
              <p className="text-muted-foreground mb-6">
                Interactive glass morphism effect with backdrop blur and realistic lighting.
              </p>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="h-96">
                  <LiquidGlassButtonDemo />
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
