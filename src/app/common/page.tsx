'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/buttons/button";
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from "@/components/ui/common/dropdown-menu";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
} from "@/components/ui/common/hover-card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/common/dialog";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from "@/components/ui/common/collapsible";
import { Checkbox } from "@/components/ui/common/checkbox";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from "@/components/ui/common/accordion";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/common/tooltip";
import { ChevronLeft, ChevronRight, RefreshCw, MoreHorizontal, Settings, User, LogOut, Mail, Phone, MapPin, Calendar, ChevronDown, ChevronRight as ChevronRightIcon, Info, Heart, Star, HelpCircle } from "lucide-react";

const navigationItems = [
  { id: 'components', label: 'Components', section: 'components', isHeader: true },
  { id: 'dropdown-menu', label: 'Dropdown Menu', section: 'components' },
  { id: 'hover-card', label: 'Hover Card', section: 'components' },
  { id: 'dialog', label: 'Dialog', section: 'components' },
  { id: 'collapsible', label: 'Collapsible', section: 'components' },
  { id: 'checkbox', label: 'Checkbox', section: 'components' },
  { id: 'accordion', label: 'Accordion', section: 'components' },
  { id: 'tooltip', label: 'Tooltip', section: 'components' },
];

export default function CommonPage() {
  const [activeSection, setActiveSection] = useState('dropdown-menu');
//   const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [refreshKey, setRefreshKey] = useState(0);
  const [checkboxStates, setCheckboxStates] = useState({
    notifications: true,
    marketing: false,
    updates: true
  });

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
    <TooltipProvider>
      <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card/50 sticky top-0 h-screen overflow-y-auto">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-6">Common Components</h2>
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
              <h1 className="text-2xl font-bold">Common</h1>
              <p className="text-muted-foreground">Essential UI components for building interactive interfaces.</p>
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

          {/* Dropdown Menu */}
          <section id="dropdown-menu" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Dropdown Menu</h2>
              <p className="text-muted-foreground mb-6">
                A menu component with animated highlights and comprehensive item types including checkboxes, radio groups, and submenus.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-wrap gap-8 items-center justify-center p-8">
                  <DropdownMenu key={`dropdown-1-${refreshKey}`}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <MoreHorizontal className="h-4 w-4" />
                        Actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu key={`dropdown-2-${refreshKey}`}>
                    <DropdownMenuTrigger asChild>
                      <Button>
                        Options
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuCheckboxItem checked>
                        Show toolbar
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Show sidebar
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          More options
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem>Save as...</DropdownMenuItem>
                          <DropdownMenuItem>Export</DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </section>

          {/* Hover Card */}
          <section id="hover-card" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Hover Card</h2>
              <p className="text-muted-foreground mb-6">
                A card that appears on hover with smooth animations and customizable content.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-wrap gap-8 items-center justify-center p-8">
                  <HoverCard key={`hover-1-${refreshKey}`}>
                    <HoverCardTrigger asChild>
                      <Button variant="link" className="text-blue-600">
                        @username
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">@username</h4>
                          <p className="text-sm text-muted-foreground">
                            Full-stack developer passionate about creating beautiful user experiences.
                          </p>
                          <div className="flex items-center pt-2">
                            <Calendar className="mr-2 h-4 w-4 opacity-70" />
                            <span className="text-xs text-muted-foreground">
                              Joined December 2021
                            </span>
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>

                  <HoverCard key={`hover-2-${refreshKey}`}>
                    <HoverCardTrigger asChild>
                      <Button variant="outline">
                        <Mail className="mr-2 h-4 w-4" />
                        Contact Info
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Mail className="mr-2 h-4 w-4" />
                          <span className="text-sm">contact@example.com</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="mr-2 h-4 w-4" />
                          <span className="text-sm">+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4" />
                          <span className="text-sm">San Francisco, CA</span>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </div>
            </div>
          </section>

          {/* Dialog */}
          <section id="dialog" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Dialog</h2>
              <p className="text-muted-foreground mb-6">
                Modal dialog with 3D flip animations and customizable entry directions.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-wrap gap-8 items-center justify-center p-8">
                  <Dialog key={`dialog-1-${refreshKey}`}>
                    <DialogTrigger asChild>
                      <Button>Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently delete your account
                          and remove your data from our servers.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button variant="destructive">Delete Account</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog key={`dialog-2-${refreshKey}`}>
                    <DialogTrigger asChild>
                      <Button variant="outline">Settings Dialog</Button>
                    </DialogTrigger>
                    <DialogContent from="bottom">
                      <DialogHeader>
                        <DialogTitle>Settings</DialogTitle>
                        <DialogDescription>
                          Manage your account settings and preferences.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Email notifications</label>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              checked={checkboxStates.notifications}
                              onCheckedChange={(checked) => 
                                setCheckboxStates(prev => ({ ...prev, notifications: checked as boolean }))
                              }
                            />
                            <span className="text-sm">Receive email notifications</span>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button>Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </section>

          {/* Collapsible */}
          <section id="collapsible" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Collapsible</h2>
              <p className="text-muted-foreground mb-6">
                Expandable content area with smooth height animations and spring transitions.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex items-center justify-center p-8">
                  <div className="w-full max-w-md space-y-4" key={`collapsible-${refreshKey}`}>
                    <Collapsible className="space-y-2">
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="flex items-center justify-between w-full p-4 hover:bg-accent">
                          <span className="font-medium">Can I use this in my project?</span>
                          <ChevronRightIcon className="h-4 w-4" />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-4 pb-4">
                        <p className="text-sm text-muted-foreground">
                          Yes! This component library is open source and free to use in your projects.
                          You can copy the code and customize it to fit your needs.
                        </p>
                      </CollapsibleContent>
                    </Collapsible>

                    <Collapsible className="space-y-2">
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="flex items-center justify-between w-full p-4 hover:bg-accent">
                          <span className="font-medium">How do I customize the animations?</span>
                          <ChevronRightIcon className="h-4 w-4" />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-4 pb-4">
                        <p className="text-sm text-muted-foreground">
                          All components accept a `transition` prop where you can customize the motion
                          parameters like stiffness, damping, and duration to match your design system.
                        </p>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Checkbox */}
          <section id="checkbox" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Checkbox</h2>
              <p className="text-muted-foreground mb-6">
                Animated checkbox with smooth check mark drawing and hover effects.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-wrap gap-8 items-center justify-center p-8">
                  <div className="space-y-4" key={`checkbox-${refreshKey}`}>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={checkboxStates.notifications}
                        onCheckedChange={(checked) => 
                          setCheckboxStates(prev => ({ ...prev, notifications: checked as boolean }))
                        }
                      />
                      <label className="text-sm font-medium">
                        Email notifications
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={checkboxStates.marketing}
                        onCheckedChange={(checked) => 
                          setCheckboxStates(prev => ({ ...prev, marketing: checked as boolean }))
                        }
                      />
                      <label className="text-sm font-medium">
                        Marketing emails
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={checkboxStates.updates}
                        onCheckedChange={(checked) => 
                          setCheckboxStates(prev => ({ ...prev, updates: checked as boolean }))
                        }
                      />
                      <label className="text-sm font-medium">
                        Product updates
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox disabled />
                      <label className="text-sm font-medium text-muted-foreground">
                        Disabled option
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Accordion */}
          <section id="accordion" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Accordion</h2>
              <p className="text-muted-foreground mb-6">
                Collapsible content sections with smooth animations and rotating chevron indicators.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex items-center justify-center p-8">
                  <div className="w-full max-w-md" key={`accordion-${refreshKey}`}>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Is it accessible?</AccordionTrigger>
                        <AccordionContent>
                          Yes. It adheres to the WAI-ARIA design pattern and uses semantic HTML elements
                          for screen readers and keyboard navigation.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>Is it styled?</AccordionTrigger>
                        <AccordionContent>
                          Yes. It comes with default styles that match the other components aesthetic.
                          You can customize the styling with CSS classes.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>Is it animated?</AccordionTrigger>
                        <AccordionContent>
                          Yes. It uses Framer Motion for smooth height transitions and chevron rotations.
                          All animations can be customized via the transition prop.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tooltip */}
          <section id="tooltip" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Tooltip</h2>
              <p className="text-muted-foreground mb-6">
                Flexible tooltip system with smooth animations, customizable positioning, and arrow indicators.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-wrap gap-8 items-center justify-center p-8">
                  <Tooltip key={`tooltip-1-${refreshKey}`}>
                    <TooltipTrigger>
                      <Button variant="outline">
                        <Info className="mr-2 h-4 w-4" />
                        Hover for info
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      This is a helpful tooltip with information about the button.
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip key={`tooltip-2-${refreshKey}`} side="right">
                    <TooltipTrigger>
                      <Button variant="ghost" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Add to favorites
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip key={`tooltip-3-${refreshKey}`} side="bottom" align="start">
                    <TooltipTrigger>
                      <Button>
                        <Star className="mr-2 h-4 w-4" />
                        Star
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Star this repository to show your support
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip key={`tooltip-4-${refreshKey}`} side="left">
                    <TooltipTrigger>
                      <Button variant="secondary" size="icon">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent arrow={false}>
                      Get help and documentation
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
    </TooltipProvider>
  );
} 