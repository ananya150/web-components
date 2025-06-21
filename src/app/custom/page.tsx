'use client';

import { useState, useEffect } from "react";
import { AvatarGroup, AvatarGroupTooltip } from "@/components/ui/custom/avatar-group";
import { CodeEditor } from "@/components/ui/custom/code-editor";
import { CodeTabs } from "@/components/ui/custom/code-tabs";
import { Counter } from "@/components/ui/custom/counter";
import { CursorProvider, Cursor, CursorFollow } from "@/components/ui/custom/cursor";
import { Files, Folder, File } from "@/components/ui/custom/files";
import { ManagementBar } from "@/components/ui/custom/management-bar";
import { PlayfulTodolist } from "@/components/ui/custom/playful-todolist";
import { MotionGrid } from "@/components/ui/custom/motion-grid";
import { PinList } from "@/components/ui/custom/pin-list";
import { ScrollProgress } from "@/components/ui/custom/scroll-progress";
import { SpringElement } from "@/components/ui/custom/spring-element";
import { StarsScrollingWheel } from "@/components/ui/custom/stars-scrolling-wheel";

import { ChevronLeft, ChevronRight, Home, User, Settings, Mail, Heart, Bookmark } from "lucide-react";
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

// Sample data for PinList component
const samplePinItems = [
  { id: 1, name: "Dashboard", info: "Main overview", icon: Home, pinned: true },
  { id: 2, name: "Profile", info: "User settings", icon: User, pinned: false },
  { id: 3, name: "Settings", info: "App preferences", icon: Settings, pinned: true },
  { id: 4, name: "Messages", info: "Communication", icon: Mail, pinned: false },
  { id: 5, name: "Favorites", info: "Liked items", icon: Heart, pinned: false },
  { id: 6, name: "Bookmarks", info: "Saved content", icon: Bookmark, pinned: true },
];

// Sample grid frames for MotionGrid  
const sampleGridFrames: [number, number][][] = [
  [[1, 1], [2, 1], [3, 1]],
  [[1, 1], [1, 2], [1, 3]],
  [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4]],
  [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2]],
  [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4]],
  [[4, 0], [3, 1], [2, 2], [1, 3], [0, 4]],
];

// Counter Demo Component
function CounterDemo() {
  const [count, setCount] = useState(0);
  return (
    <Counter 
      number={count} 
      setNumber={setCount}
      slidingNumberProps={{ className: "text-xl font-semibold" }}
    />
  );
}

// Sample code snippets for CodeTabs
const sampleCodeSnippets = {
  'npm': 'npm install ak-ui-components',
  'yarn': 'yarn add ak-ui-components', 
  'pnpm': 'pnpm add ak-ui-components',
  'bun': 'bun add ak-ui-components'
};

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
  { id: 'code-tabs', label: 'Code Tabs', section: 'components' },
  { id: 'counter', label: 'Counter', section: 'components' },
  { id: 'cursor', label: 'Cursor', section: 'components' },
  { id: 'files', label: 'Files', section: 'components' },
  { id: 'management-bar', label: 'Management Bar', section: 'components' },
  { id: 'playful-todolist', label: 'Playful Todo List', section: 'components' },
  { id: 'motion-grid', label: 'Motion Grid', section: 'components' },
  { id: 'pin-list', label: 'Pin List', section: 'components' },
  { id: 'scroll-progress', label: 'Scroll Progress', section: 'components' },
  { id: 'spring-element', label: 'Spring Element', section: 'components' },
  { id: 'stars-scrolling-wheel', label: 'Stars Scrolling Wheel', section: 'components' },
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

          {/* Code Tabs */}
          <section id="code-tabs" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Code Tabs</h2>
              <p className="text-muted-foreground mb-6">
                A tabbed code viewer with syntax highlighting, copy functionality, and theme support for displaying multiple code snippets.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-col gap-8 items-center justify-center p-8">
                  
                  {/* Code Tabs Demo */}
                  <div className="flex flex-col items-center gap-4 w-full">
                    <h3 className="text-sm font-medium text-muted-foreground">Installation Commands</h3>
                    <div className="w-full max-w-md">
                      <CodeTabs
                        codes={sampleCodeSnippets}
                        lang="bash"
                        copyButton={true}
                        defaultValue="npm"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="text-center max-w-md">
                    <p className="text-sm text-muted-foreground">
                      Syntax highlighting with theme support, copy functionality, and smooth tab transitions.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* Counter */}
          <section id="counter" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Counter</h2>
              <p className="text-muted-foreground mb-6">
                An interactive counter component with animated increment/decrement buttons and sliding number transitions.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-col gap-8 items-center justify-center p-8">
                  
                  {/* Counter Demo */}
                  <div className="flex flex-col items-center gap-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Interactive Counter</h3>
                    <CounterDemo />
                  </div>

                  {/* Description */}
                  <div className="text-center max-w-md">
                    <p className="text-sm text-muted-foreground">
                      Features smooth number transitions, hover/tap animations, and customizable styling.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* Cursor */}
          <section id="cursor" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Cursor</h2>
              <p className="text-muted-foreground mb-6">
                Custom cursor effects with provider context, smooth animations, and follow behaviors for enhanced user interactions.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-col gap-8 items-center justify-center p-8">
                  
                  {/* Cursor Demo */}
                  <div className="flex flex-col items-center gap-4 w-full">
                    <h3 className="text-sm font-medium text-muted-foreground">Custom Cursor Effects</h3>
                    <CursorProvider className="w-full max-w-md h-48 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center bg-muted/20">
                      <Cursor>
                        <div className="w-4 h-4 bg-primary rounded-full" />
                      </Cursor>
                      <CursorFollow align="bottom-right">
                        <div className="px-2 py-1 bg-background border rounded-md text-xs shadow-lg">
                          Custom Cursor
                        </div>
                      </CursorFollow>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Move your mouse here</p>
                        <p className="text-xs text-muted-foreground mt-1">Custom cursor with follow effect</p>
                      </div>
                    </CursorProvider>
                  </div>

                  {/* Description */}
                  <div className="text-center max-w-md">
                    <p className="text-sm text-muted-foreground">
                      Provider-based cursor system with customizable effects, smooth spring animations, and positioning control.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* Files */}
          <section id="files" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Files</h2>
              <p className="text-muted-foreground mb-6">
                A file explorer component with expandable folders, file icons, and smooth animations for displaying file structures.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-col gap-8 items-center justify-center p-8">
                  
                  {/* Files Demo */}
                  <div className="flex flex-col items-center gap-4 w-full">
                    <h3 className="text-sm font-medium text-muted-foreground">File Explorer</h3>
                    <div className="w-full max-w-sm h-64">
                      <Files defaultOpen={['src', 'components']}>
                        <Folder name="src">
                          <Folder name="components">
                            <Folder name="ui">
                              <File name="button.tsx" />
                              <File name="input.tsx" />
                              <File name="card.tsx" />
                            </Folder>
                            <File name="header.tsx" />
                            <File name="footer.tsx" />
                          </Folder>
                          <Folder name="pages">
                            <File name="index.tsx" />
                            <File name="about.tsx" />
                          </Folder>
                          <File name="app.tsx" />
                        </Folder>
                        <Folder name="public">
                          <File name="favicon.ico" />
                          <File name="logo.png" />
                        </Folder>
                        <File name="package.json" />
                        <File name="README.md" />
                      </Files>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="text-center max-w-md">
                    <p className="text-sm text-muted-foreground">
                      Interactive file tree with expand/collapse animations, hover effects, and customizable folder/file icons.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* Management Bar */}
          <section id="management-bar" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Management Bar</h2>
              <p className="text-muted-foreground mb-6">
                An interactive management bar with pagination, action buttons, and smooth animations. Perfect for data management interfaces.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-col gap-8 items-center justify-center p-8">
                  
                  {/* Management Bar Demo */}
                  <div className="flex flex-col items-center gap-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Interactive Management Bar</h3>
                    <ManagementBar />
                  </div>

                  {/* Description */}
                  <div className="text-center max-w-md">
                    <p className="text-sm text-muted-foreground">
                      Features pagination controls, expandable action buttons with hover animations, 
                      and a keyboard shortcut indicator. Try hovering over the action buttons!
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* Playful Todo List */}
          <section id="playful-todolist" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Playful Todo List</h2>
              <p className="text-muted-foreground mb-6">
                A fun and interactive todo list with animated strikethrough effects using SVG paths and smooth animations.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-col gap-8 items-center justify-center p-8">
                  
                  {/* Playful Todo List Demo */}
                  <div className="flex flex-col items-center gap-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Animated Todo List</h3>
                    <PlayfulTodolist />
                  </div>

                  {/* Description */}
                  <div className="text-center max-w-md">
                    <p className="text-sm text-muted-foreground">
                      Features custom animated strikethrough effects with SVG paths, 
                      smooth transitions, and playful todo items. Check off items to see the animation!
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* Motion Grid */}
          <section id="motion-grid" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Motion Grid</h2>
              <p className="text-muted-foreground mb-6">
                An animated grid component that cycles through different patterns with smooth transitions.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-col gap-8 items-center justify-center p-8">
                  
                  {/* Motion Grid Demo */}
                  <div className="flex flex-col items-center gap-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Animated Pattern Grid</h3>
                    <MotionGrid 
                      gridSize={[5, 5]} 
                      frames={sampleGridFrames}
                      duration={800}
                      className="p-4 bg-muted/50 rounded-lg"
                    />
                  </div>

                  {/* Description */}
                  <div className="text-center max-w-md">
                    <p className="text-sm text-muted-foreground">
                      Displays animated patterns that transition smoothly between different configurations. 
                      Perfect for loading states or decorative animations.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* Pin List */}
          <section id="pin-list" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Pin List</h2>
              <p className="text-muted-foreground mb-6">
                An interactive list component where items can be pinned/unpinned with smooth layout animations.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-col gap-4 items-center justify-start p-8 overflow-hidden">
                  
                  {/* Pin List Demo */}
                  <div className="flex flex-col items-center gap-4 w-full">
                    <h3 className="text-sm font-medium text-muted-foreground">Interactive Pin List</h3>
                    <div className="w-full max-w-sm max-h-64 overflow-y-auto">
                      <PinList items={samplePinItems} />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="text-center max-w-md">
                    <p className="text-sm text-muted-foreground">
                      Click items to pin/unpin them. Pinned items appear at the top with smooth layout transitions.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* Scroll Progress */}
          <section id="scroll-progress" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Scroll Progress</h2>
              <p className="text-muted-foreground mb-6">
                A scroll progress indicator that shows reading progress with smooth spring animations.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-col gap-8 items-center justify-center p-8">
                  
                  {/* Scroll Progress Demo */}
                  <div className="flex flex-col items-center gap-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Scroll Progress Bar</h3>
                    <div className="w-full max-w-md h-64 relative border rounded-lg overflow-hidden">
                      <ScrollProgress 
                        className="h-full"
                        progressProps={{
                          className: "absolute top-0 inset-x-0 h-1 bg-blue-500 origin-left z-10"
                        }}
                      >
                        <div className="p-6 space-y-4">
                          <h4 className="font-semibold">Scrollable Content</h4>
                          <p className="text-sm text-muted-foreground">
                            Scroll through this content to see the progress bar at the top fill up.
                          </p>
                          {Array.from({ length: 20 }, (_, i) => (
                            <p key={i} className="text-sm text-muted-foreground">
                              This is paragraph {i + 1} of the scrollable content. Keep scrolling to see more content and watch the progress bar fill up smoothly.
                            </p>
                          ))}
                        </div>
                      </ScrollProgress>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="text-center max-w-md">
                    <p className="text-sm text-muted-foreground">
                      Shows reading progress with a smooth animated bar. Works for both window scroll and container scroll.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* Spring Element */}
          <section id="spring-element" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Spring Element</h2>
              <p className="text-muted-foreground mb-6">
                A draggable element connected with an animated spring path that follows the drag motion.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-col gap-8 items-center justify-center p-8 relative">
                  
                  {/* Spring Element Demo */}
                  <div className="flex flex-col items-center gap-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Draggable Spring Element</h3>
                    <SpringElement className="relative z-10">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                        Drag
                      </div>
                    </SpringElement>
                  </div>

                  {/* Description */}
                  <div className="text-center max-w-md">
                    <p className="text-sm text-muted-foreground">
                      Drag the element around to see the spring animation. The spring path connects the original position with the dragged position.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* Stars Scrolling Wheel */}
          <section id="stars-scrolling-wheel" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Stars Scrolling Wheel</h2>
              <p className="text-muted-foreground mb-6">
                An animated counter that scrolls through numbers with star animations when reaching the target.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-col gap-8 items-center justify-center p-8">
                  
                  {/* Stars Scrolling Wheel Demo */}
                  <div className="flex flex-col items-center gap-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Animated Star Counter</h3>
                    <StarsScrollingWheel 
                      stars={1500} 
                      step={50}
                      inView={true}
                      delay={500}
                      className="border rounded-lg"
                    />
                  </div>

                  {/* Description */}
                  <div className="text-center max-w-md">
                    <p className="text-sm text-muted-foreground">
                      Animated number counter with a scrolling wheel effect. Features a star animation when reaching the target value.
                    </p>
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