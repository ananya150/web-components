'use client';

import { useState, useEffect } from "react";
import { CountingNumber } from "@/components/ui/text/counting-number";
import { GradientText } from "@/components/ui/text/gradient";
import { HighlightText } from "@/components/ui/text/highlight";
import { RollingText } from "@/components/ui/text/rolling";
import { RotatingText } from "@/components/ui/text/rotating";
import { SlidingNumber } from "@/components/ui/text/sliding-number";
import { SplittingText } from "@/components/ui/text/splitting";
import { TypingText } from "@/components/ui/text/typing";
import { WritingText } from "@/components/ui/text/writing";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";

const navigationItems = [
  { id: 'components', label: 'Components', section: 'components', isHeader: true },
  { id: 'counting-number', label: 'Counting Number', section: 'components' },
  { id: 'gradient-text', label: 'Gradient Text', section: 'components' },
  { id: 'highlight-text', label: 'Highlight Text', section: 'components' },
  { id: 'rolling-text', label: 'Rolling Text', section: 'components' },
  { id: 'rotating-text', label: 'Rotating Text', section: 'components' },
  { id: 'sliding-number', label: 'Sliding Number', section: 'components' },
  { id: 'splitting-text', label: 'Splitting Text', section: 'components' },
  { id: 'typing-text', label: 'Typing Text', section: 'components' },
  { id: 'writing-text', label: 'Writing Text', section: 'components' },
];

export default function TextPage() {
  const [activeSection, setActiveSection] = useState('counting-number');
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [refreshKey, setRefreshKey] = useState(0);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const refreshAnimations = () => {
    setRefreshKey(prev => prev + 1);
  };

  // Scroll detection to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.filter(item => !item.isHeader);
      const scrollPosition = window.scrollY + 200; // Offset for better UX
      
      // Check if we're at the bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;
      
      if (isAtBottom) {
        // If at bottom, activate the last section
        const lastSection = sections[sections.length - 1];
        if (lastSection) {
          setActiveSection(lastSection.id);
          return;
        }
      }

      // Normal scroll detection logic
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
          <h2 className="text-lg font-semibold mb-6">Text Components</h2>
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
              <h1 className="text-2xl font-bold">Text</h1>
              <p className="text-muted-foreground">Animated text components with various effects and transitions.</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={refreshAnimations}>
                <RefreshCw className="h-4 w-4" />
              </Button>
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

          {/* Counting Number */}
          <section id="counting-number" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Counting Number</h2>
              <p className="text-muted-foreground mb-6">
                Animated number counter with smooth spring transitions and customizable formatting.
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
                    <div className="h-80 md:h-96 flex flex-wrap gap-8 items-center justify-center p-8">
                      <div className="text-center space-y-2">
                        <div className="text-4xl font-bold" key={`counting-1-${refreshKey}`}>
                          <CountingNumber number={1234} />
                        </div>
                        <p className="text-sm text-muted-foreground">Basic Counter</p>
                      </div>
                      <div className="text-center space-y-2">
                        <div className="text-4xl font-bold" key={`counting-2-${refreshKey}`}>
                          <CountingNumber number={99.99} decimalPlaces={2} />
                        </div>
                        <p className="text-sm text-muted-foreground">With Decimals</p>
                      </div>
                      <div className="text-center space-y-2">
                        <div className="text-4xl font-bold" key={`counting-3-${refreshKey}`}>
                          <CountingNumber number={5000} fromNumber={0} padStart />
                        </div>
                        <p className="text-sm text-muted-foreground">Padded Start</p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-80 md:h-96 flex items-center justify-center p-4">
                      <div className="bg-muted p-4 rounded text-sm w-full max-w-2xl">
                        <pre>{`<CountingNumber number={1234} />
<CountingNumber number={99.99} decimalPlaces={2} />
<CountingNumber number={5000} fromNumber={0} padStart />`}</pre>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Gradient Text */}
          <section id="gradient-text" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Gradient Text</h2>
              <p className="text-muted-foreground mb-6">
                Animated gradient text with customizable colors and optional neon glow effect.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-col gap-8 items-center justify-center p-8">
                  <div className="text-4xl font-bold" key={`gradient-1-${refreshKey}`}>
                    <GradientText text="Beautiful Gradient" />
                  </div>
                  <div className="text-3xl font-bold" key={`gradient-2-${refreshKey}`}>
                    <GradientText 
                      text="Neon Glow Effect" 
                      neon 
                      gradient="linear-gradient(90deg, #ff0080 0%, #ff8c00 50%, #40e0d0 100%)"
                    />
                  </div>
                  <div className="text-2xl font-bold" key={`gradient-3-${refreshKey}`}>
                    <GradientText 
                      text="Custom Colors" 
                      gradient="linear-gradient(45deg, #667eea 0%, #764ba2 100%)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Highlight Text */}
          <section id="highlight-text" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Highlight Text</h2>
              <p className="text-muted-foreground mb-6">
                Text with animated highlight background that expands on view.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-col gap-6 items-center justify-center p-8">
                  <div className="text-3xl font-bold" key={`highlight-1-${refreshKey}`}>
                    <HighlightText text="Highlighted Text" inView />
                  </div>
                  <div className="text-2xl" key={`highlight-2-${refreshKey}`}>
                    This is a <HighlightText text="highlighted phrase" inView className="bg-gradient-to-r from-yellow-200 to-orange-200 dark:from-yellow-600 dark:to-orange-600" /> in a sentence.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Rolling Text */}
          <section id="rolling-text" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Rolling Text</h2>
              <p className="text-muted-foreground mb-6">
                3D rolling animation effect with perspective transforms.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex items-center justify-center p-8">
                  <div className="text-4xl font-bold" key={`rolling-${refreshKey}`}>
                    <RollingText text="Rolling Animation"  />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Rotating Text */}
          <section id="rotating-text" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Rotating Text</h2>
              <p className="text-muted-foreground mb-6">
                Cycles through multiple text options with smooth transitions.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex items-center justify-center p-8">
                  <div className="text-4xl font-bold" key={`rotating-${refreshKey}`}>
                    <RotatingText 
                      text={["Amazing", "Beautiful", "Incredible", "Fantastic"]} 
                      duration={2000}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sliding Number */}
          <section id="sliding-number" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Sliding Number</h2>
              <p className="text-muted-foreground mb-6">
                Smooth sliding transitions between number values with digit-by-digit animation.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-wrap gap-8 items-center justify-center p-8">
                  <div className="text-center space-y-2">
                    <div className="text-5xl font-bold" key={`sliding-1-${refreshKey}`}>
                      <SlidingNumber number={9876} />
                    </div>
                    <p className="text-sm text-muted-foreground">Basic Sliding</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-bold" key={`sliding-2-${refreshKey}`}>
                      <SlidingNumber number={123.45} />
                    </div>
                    <p className="text-sm text-muted-foreground">With Decimals</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Splitting Text */}
          <section id="splitting-text" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Splitting Text</h2>
              <p className="text-muted-foreground mb-6">
                Text animation that splits by characters, words, or lines with staggered effects.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-col gap-8 items-center justify-center p-8">
                  <div className="text-3xl font-bold" key={`splitting-1-${refreshKey}`}>
                    <SplittingText text="Character Split" type="chars" inView />
                  </div>
                  <div className="text-2xl font-bold" key={`splitting-2-${refreshKey}`}>
                    <SplittingText text="Word by word animation" type="words" inView />
                  </div>
                  <div className="text-xl" key={`splitting-3-${refreshKey}`}>
                    <SplittingText 
                      text={["First line of text", "Second line appears", "Third line follows"]} 
                      type="lines" 
                      inView 
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Typing Text */}
          <section id="typing-text" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Typing Text</h2>
              <p className="text-muted-foreground mb-6">
                Typewriter effect with optional cursor and support for multiple text sequences.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-col gap-8 items-center justify-center p-8">
                  <div className="text-3xl font-bold" key={`typing-1-${refreshKey}`}>
                    <TypingText text="Hello, World!" cursor duration={100} />
                  </div>
                  <div className="text-2xl" key={`typing-2-${refreshKey}`}>
                    <TypingText 
                      text={["First message", "Second message", "Third message"]} 
                      cursor 
                      loop 
                      duration={80}
                      holdDelay={1500}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Writing Text */}
          <section id="writing-text" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Writing Text</h2>
              <p className="text-muted-foreground mb-6">
                Word-by-word animation with spring transitions and customizable spacing.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex items-center justify-center p-8">
                  <div className="text-3xl font-bold text-center" key={`writing-${refreshKey}`}>
                    <WritingText text="Beautiful writing animation with smooth transitions" inView />
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
} 