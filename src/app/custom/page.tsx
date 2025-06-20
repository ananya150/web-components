'use client';

import { useState, useEffect } from "react";
import { AvatarGroup, AvatarGroupTooltip } from "@/components/ui/custom/avatar-group";
import { CodeEditor } from "@/components/ui/custom/code-editor";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/buttons/button";

// Sample avatar data for demonstrations
const sampleUsers = [
  { name: "Alice Johnson", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face&auto=format" },
  { name: "Bob Smith", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&fit=crop&crop=face&auto=format" },
  { name: "Carol Williams", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&auto=format" },
  { name: "David Brown", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format" },
  { name: "Emma Davis", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face&auto=format" },
  { name: "Frank Miller", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format" },
  { name: "Grace Wilson", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face&auto=format" },
  { name: "Henry Taylor", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face&auto=format" },
];

// Avatar component for displaying individual avatars
function Avatar({ src, alt, size = 'default' }: { src: string; alt: string; size?: 'sm' | 'default' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    default: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-muted flex items-center justify-center`}>
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback to initials if image fails to load
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = `<span class="text-xs font-medium text-muted-foreground">${alt.split(' ').map(n => n[0]).join('')}</span>`;
          }
        }}
      />
    </div>
  );
}

const navigationItems = [
  { id: 'components', label: 'Components', section: 'components', isHeader: true },
  { id: 'avatar-group', label: 'Avatar Group', section: 'components' },
  { id: 'code-editor', label: 'Code Editor', section: 'components' },
];

export default function CustomPage() {
  const [activeSection, setActiveSection] = useState('avatar-group');

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
          <h2 className="text-lg font-semibold mb-6">Custom Components</h2>
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
              <h1 className="text-2xl font-bold">Custom Components</h1>
              <p className="text-muted-foreground">Specialized components for enhanced user experiences.</p>
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

          {/* Avatar Group */}
          <section id="avatar-group" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Avatar Group</h2>
              <p className="text-muted-foreground mb-6">
                Display a collection of avatars in an overlapping group layout with hover animations and tooltips.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-col gap-8 items-center justify-center p-8">
                      
                      {/* Basic Avatar Group */}
                      <div className="flex flex-col items-center gap-4">
                        <h3 className="text-sm font-medium text-muted-foreground">Basic Group</h3>
                        <AvatarGroup>
                          {sampleUsers.slice(0, 4).map((user, index) => (
                            <div key={index}>
                              <Avatar src={user.avatar} alt={user.name} />
                              <AvatarGroupTooltip>
                                <div className="text-sm font-medium">{user.name}</div>
                              </AvatarGroupTooltip>
                            </div>
                          ))}
                        </AvatarGroup>
                      </div>

                      {/* Large Avatar Group */}
                      <div className="flex flex-col items-center gap-4">
                        <h3 className="text-sm font-medium text-muted-foreground">Large Avatars</h3>
                        <AvatarGroup className="h-12 -space-x-3">
                          {sampleUsers.slice(0, 5).map((user, index) => (
                            <div key={index}>
                              <Avatar src={user.avatar} alt={user.name} size="lg" />
                              <AvatarGroupTooltip>
                                <div className="text-sm font-medium">{user.name}</div>
                              </AvatarGroupTooltip>
                            </div>
                          ))}
                        </AvatarGroup>
                      </div>

                      {/* Inverted Overlap */}
                      <div className="flex flex-col items-center gap-4">
                        <h3 className="text-sm font-medium text-muted-foreground">Inverted Overlap</h3>
                        <AvatarGroup invertOverlap={true}>
                          {sampleUsers.slice(0, 6).map((user, index) => (
                            <div key={index}>
                              <Avatar src={user.avatar} alt={user.name} />
                              <AvatarGroupTooltip>
                                <div className="text-sm font-medium">{user.name}</div>
                              </AvatarGroupTooltip>
                            </div>
                          ))}
                        </AvatarGroup>
                      </div>

                      {/* Custom Animation */}
                      <div className="flex flex-col items-center gap-4">
                        <h3 className="text-sm font-medium text-muted-foreground">Custom Animation</h3>
                        <AvatarGroup 
                          translate={-8}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          tooltipProps={{ side: 'bottom', sideOffset: 16 }}
                        >
                          {sampleUsers.slice(0, 7).map((user, index) => (
                            <div key={index}>
                              <Avatar src={user.avatar} alt={user.name} />
                              <AvatarGroupTooltip>
                                <div className="text-sm font-medium">{user.name}</div>
                                <div className="text-xs text-muted-foreground">Team Member</div>
                              </AvatarGroupTooltip>
                            </div>
                          ))}
                        </AvatarGroup>
                      </div>

                    </div>
                </div>
            </div>
          </section>

          {/* Code Editor */}
          <section id="code-editor" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Code Editor</h2>
              <p className="text-muted-foreground mb-6">
                An animated code editor with syntax highlighting, typing animation, and copy functionality.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-col gap-8 items-center justify-center p-8">
                  
                  {/* Basic Code Editor */}
                  <div className="flex flex-col items-center gap-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Basic Editor</h3>
                    <CodeEditor
                      cursor
                      className="w-full max-w-[500px] h-[300px]"
                      lang="tsx"
                      title="component.tsx"
                      duration={8}
                      delay={0.5}
                      copyButton
                    >
                      {`'use client';

                        import * as React from 'react';

                        type MyComponentProps = {
                          myProps: string;
                        } & React.HTMLAttributes<HTMLDivElement>;

                        const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
                          ({ myProps, ...props }, ref) => {
                            return (
                              <div ref={ref} {...props}>
                                <p>My Component</p>
                              </div>
                            );
                          },
                        );
                        MyComponent.displayName = 'MyComponent';

                        export { MyComponent, type MyComponentProps };`}
                    </CodeEditor>
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