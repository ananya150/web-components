'use client';

import { useState, useEffect } from "react";
import { StarsBackground } from "@/components/ui/backgrounds/stars";
import { GradientBackground } from "@/components/ui/backgrounds/gradient";
import { BubbleBackground } from "@/components/ui/backgrounds/bubble";
import { HexagonBackground } from "@/components/ui/backgrounds/hexagon";
import { FireworksBackground } from "@/components/ui/backgrounds/fireworks";
import { HoleBackground } from "@/components/ui/backgrounds/hole";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/buttons/button";

const navigationItems = [
  { id: 'components', label: 'Background Components', section: 'components', isHeader: true },
  { id: 'stars', label: 'Stars Background', section: 'components' },
  { id: 'gradient', label: 'Gradient Background', section: 'components' },
  { id: 'bubble', label: 'Bubble Background', section: 'components' },
  { id: 'hexagon', label: 'Hexagon Background', section: 'components' },
  { id: 'fireworks', label: 'Fireworks Background', section: 'components' },
  { id: 'hole', label: 'Hole Background', section: 'components' },
];

export default function BackgroundsPage() {
  const [activeSection, setActiveSection] = useState('stars');

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
      const scrollPosition = window.scrollY + 200;
      
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;
      
      if (isAtBottom) {
        const lastSection = sections[sections.length - 1];
        if (lastSection) {
          setActiveSection(lastSection.id);
          return;
        }
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card/50 sticky top-0 h-screen overflow-y-auto">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-6">Background Components</h2>
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
              <h1 className="text-2xl font-bold">Background Components</h1>
              <p className="text-muted-foreground">Animated background effects to enhance your user interfaces.</p>
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

          {/* Stars Background */}
          <section id="stars" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Stars Background</h2>
              <p className="text-muted-foreground mb-6">
                An animated starfield background with multiple layers of stars moving at different speeds. Features mouse parallax interaction and customizable colors.
              </p>
              
              <div className="border rounded-lg bg-card overflow-hidden">
                <div className="h-80 md:h-96 relative">
                  
                  {/* Stars Background Demo */}
                  <StarsBackground 
                    className="w-full h-full"
                    starColor="#ffffff"
                    speed={50}
                    factor={0.05}
                  >
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-white z-10">
                        <h3 className="text-2xl font-bold mb-2">Stars Background</h3>
                        <p className="text-white/80">Move your mouse to see parallax effect</p>
                      </div>
                    </div>
                  </StarsBackground>

                </div>
                
                {/* Description */}
                <div className="p-6 border-t">
                  <p className="text-sm text-muted-foreground">
                    Features multiple star layers with different speeds, mouse parallax interaction, and customizable star colors and animation speed.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Gradient Background */}
          <section id="gradient" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Gradient Background</h2>
              <p className="text-muted-foreground mb-6">
                A smooth animated gradient background that cycles through different positions creating a flowing color effect.
              </p>
              
              <div className="border rounded-lg bg-card overflow-hidden">
                <div className="h-80 md:h-96 relative">
                  
                  {/* Gradient Background Demo */}
                  <GradientBackground className="w-full h-full">
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-white z-10">
                        <h3 className="text-2xl font-bold mb-2">Gradient Background</h3>
                        <p className="text-white/90">Smooth flowing gradient animation</p>
                      </div>
                    </div>
                  </GradientBackground>

                </div>
                
                {/* Description */}
                <div className="p-6 border-t">
                  <p className="text-sm text-muted-foreground">
                    Animated gradient that smoothly transitions through different background positions with customizable duration and easing.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Bubble Background */}
          <section id="bubble" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Bubble Background</h2>
              <p className="text-muted-foreground mb-6">
                An interactive bubble background with floating orbs that respond to mouse movement and create organic flowing animations.
              </p>
              
              <div className="border rounded-lg bg-card overflow-hidden">
                <div className="h-80 md:h-96 relative">
                  
                  {/* Bubble Background Demo */}
                  <BubbleBackground 
                    className="w-full h-full"
                    interactive={true}
                  >
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-white z-10">
                        <h3 className="text-2xl font-bold mb-2">Bubble Background</h3>
                        <p className="text-white/90">Move your mouse to interact with bubbles</p>
                      </div>
                    </div>
                  </BubbleBackground>

                </div>
                
                {/* Description */}
                <div className="p-6 border-t">
                  <p className="text-sm text-muted-foreground">
                    Interactive floating bubbles with mouse interaction, customizable colors, and organic movement patterns using blur effects.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Hexagon Background */}
          <section id="hexagon" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Hexagon Background</h2>
              <p className="text-muted-foreground mb-6">
                A geometric hexagon pattern background with hover effects and responsive grid layout that adapts to screen size.
              </p>
              
              <div className="border rounded-lg bg-card overflow-hidden">
                <div className="h-80 md:h-96 relative">
                  
                  {/* Hexagon Background Demo */}
                  <HexagonBackground 
                    className="w-full h-full"
                    hexagonSize={60}
                    hexagonMargin={2}
                  >
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center z-10">
                        <h3 className="text-2xl font-bold mb-2">Hexagon Background</h3>
                        <p className="text-muted-foreground">Hover over hexagons to see effects</p>
                      </div>
                    </div>
                  </HexagonBackground>

                </div>
                
                {/* Description */}
                <div className="p-6 border-t">
                  <p className="text-sm text-muted-foreground">
                    Responsive hexagonal grid with hover effects, customizable size and spacing, and automatic layout adjustment.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Fireworks Background */}
          <section id="fireworks" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Fireworks Background</h2>
              <p className="text-muted-foreground mb-6">
                An animated fireworks display with particle explosions, trails, and click interaction for launching custom fireworks.
              </p>
              
              <div className="border rounded-lg bg-card overflow-hidden">
                <div className="h-80 md:h-96 relative">
                  
                  {/* Fireworks Background Demo */}
                  <FireworksBackground 
                    className="w-full h-full"
                    population={2}
                    color={['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']}
                  >
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-white z-10">
                        <h3 className="text-2xl font-bold mb-2">Fireworks Background</h3>
                        <p className="text-white/90">Click anywhere to launch fireworks</p>
                      </div>
                    </div>
                  </FireworksBackground>

                </div>
                
                {/* Description */}
                <div className="p-6 border-t">
                  <p className="text-sm text-muted-foreground">
                    Interactive fireworks with particle systems, customizable colors, launch speed, and explosion effects. Click to trigger fireworks.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Hole Background */}
          <section id="hole" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Hole Background</h2>
              <p className="text-muted-foreground mb-6">
                A mesmerizing tunnel effect with radiating lines and floating particles creating a depth illusion and hypnotic animation.
              </p>
              
              <div className="border rounded-lg bg-card overflow-hidden">
                <div className="h-80 md:h-96 relative">
                  
                  {/* Hole Background Demo */}
                  <HoleBackground 
                    className="w-full h-full bg-black"
                    strokeColor="#737373"
                    numberOfLines={40}
                    numberOfDiscs={40}
                    particleRGBColor={[255, 255, 255]}
                  >
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-white z-10">
                        <h3 className="text-2xl font-bold mb-2">Hole Background</h3>
                        <p className="text-white/90">Hypnotic tunnel with floating particles</p>
                      </div>
                    </div>
                  </HoleBackground>

                </div>
                
                {/* Description */}
                <div className="p-6 border-t">
                  <p className="text-sm text-muted-foreground">
                    Creates a tunnel effect with radiating lines, floating particles, and depth illusion. Customizable line count, colors, and particle effects.
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
} 