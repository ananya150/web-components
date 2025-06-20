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
import { Input } from "@/components/ui/common/input";
import { Label } from "@/components/ui/common/label";
import { Progress } from "@/components/ui/common/progress";
import {
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/common/radio-group";
import { Separator } from "@/components/ui/common/separator";
import { Skeleton } from "@/components/ui/common/skeleton";
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/common/popover";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose
} from "@/components/ui/common/sheet";
import { Switch } from "@/components/ui/common/switch";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsContents
} from "@/components/ui/common/tabs";
import {
  ToggleGroup,
  ToggleGroupItem
} from "@/components/ui/common/toggle-group";
import { ChevronLeft, ChevronRight, RefreshCw, MoreHorizontal, Settings, User, LogOut, Mail, Phone, MapPin, Calendar, ChevronDown, ChevronRight as ChevronRightIcon, Info, Heart, Star, HelpCircle, Search, Eye, EyeOff, Home, FileText, Users, BarChart3, Cog, Menu, Moon, Sun, Volume2, VolumeX, Wifi, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

const navigationItems = [
  { id: 'components', label: 'Components', section: 'components', isHeader: true },
  { id: 'dropdown-menu', label: 'Dropdown Menu', section: 'components' },
  { id: 'hover-card', label: 'Hover Card', section: 'components' },
  { id: 'dialog', label: 'Dialog', section: 'components' },
  { id: 'collapsible', label: 'Collapsible', section: 'components' },
  { id: 'checkbox', label: 'Checkbox', section: 'components' },
  { id: 'accordion', label: 'Accordion', section: 'components' },
  { id: 'tooltip', label: 'Tooltip', section: 'components' },
  { id: 'input', label: 'Input', section: 'components' },
  { id: 'label', label: 'Label', section: 'components' },
  { id: 'progress', label: 'Progress', section: 'components' },
  { id: 'radio-group', label: 'Radio Group', section: 'components' },
  { id: 'separator', label: 'Separator', section: 'components' },
  { id: 'skeleton', label: 'Skeleton', section: 'components' },
  { id: 'popover', label: 'Popover', section: 'components' },
  { id: 'sheet', label: 'Sheet', section: 'components' },
  { id: 'sidebar', label: 'Sidebar', section: 'components' },
  { id: 'switch', label: 'Switch', section: 'components' },
  { id: 'tabs', label: 'Tabs', section: 'components' },
  { id: 'toggle-group', label: 'Toggle Group', section: 'components' },
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
  const [inputValue, setInputValue] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [progressValue, setProgressValue] = useState(65);
  const [radioValue, setRadioValue] = useState("option1");
  const [switchStates, setSwitchStates] = useState({
    notifications: true,
    darkMode: false,
    sound: true,
    wifi: true
  });
  const [activeTab, setActiveTab] = useState("account");
  const [toggleGroupValues, setToggleGroupValues] = useState({
    single: "bold",
    multiple: ["bold"]
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

          {/* Input */}
          <section id="input" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Input</h2>
              <p className="text-muted-foreground mb-6">
                Styled input field with focus states, validation styling, and file upload support.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-wrap gap-8 items-center justify-center p-8">
                  <div className="space-y-4 w-full max-w-md" key={`input-${refreshKey}`}>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Enter your email"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input 
                          id="password" 
                          type={passwordVisible ? "text" : "password"}
                          placeholder="Enter your password"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                          {passwordVisible ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="search">Search</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="search" 
                          type="search" 
                          placeholder="Search..."
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="disabled">Disabled Input</Label>
                      <Input 
                        id="disabled" 
                        type="text" 
                        placeholder="This input is disabled"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Label */}
          <section id="label" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Label</h2>
              <p className="text-muted-foreground mb-6">
                Accessible label component with proper form association and disabled states.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-wrap gap-8 items-center justify-center p-8">
                  <div className="space-y-6 w-full max-w-md" key={`label-${refreshKey}`}>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" placeholder="Enter username" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="required">Required Field *</Label>
                      <Input id="required" placeholder="This field is required" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="optional">Optional Field</Label>
                      <Input id="optional" placeholder="This field is optional" />
                    </div>

                    <div className="space-y-2">
                      <Label>
                        <Checkbox />
                        I agree to the terms and conditions
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Progress */}
          <section id="progress" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Progress</h2>
              <p className="text-muted-foreground mb-6">
                Animated progress bar with smooth spring transitions and customizable styling.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-wrap gap-8 items-center justify-center p-8">
                  <div className="space-y-6 w-full max-w-md" key={`progress-${refreshKey}`}>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{progressValue}%</span>
                      </div>
                      <Progress value={progressValue} />
                    </div>

                    <div className="space-y-2">
                      <Label>Loading...</Label>
                      <Progress value={33} />
                    </div>

                    <div className="space-y-2">
                      <Label>Complete</Label>
                      <Progress value={100} />
                    </div>

                    <div className="space-y-2">
                      <Label>Custom Progress</Label>
                      <Progress value={75} className="h-3" />
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => setProgressValue(Math.max(0, progressValue - 10))}
                      >
                        -10%
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => setProgressValue(Math.min(100, progressValue + 10))}
                      >
                        +10%
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Radio Group */}
          <section id="radio-group" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Radio Group</h2>
              <p className="text-muted-foreground mb-6">
                Animated radio button group with smooth scaling effects and proper accessibility.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-wrap gap-8 items-center justify-center p-8">
                  <div className="space-y-6 w-full max-w-md" key={`radio-${refreshKey}`}>
                    <div className="space-y-3">
                      <Label>Choose your plan</Label>
                      <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="option1" id="option1" />
                          <Label htmlFor="option1">Free Plan - $0/month</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="option2" id="option2" />
                          <Label htmlFor="option2">Pro Plan - $10/month</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="option3" id="option3" />
                          <Label htmlFor="option3">Enterprise - $50/month</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <Label>Notification preferences</Label>
                      <RadioGroup defaultValue="email">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="email" id="email-pref" />
                          <Label htmlFor="email-pref">Email notifications</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="push" id="push-pref" />
                          <Label htmlFor="push-pref">Push notifications</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="none" id="none-pref" />
                          <Label htmlFor="none-pref">No notifications</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Separator */}
          <section id="separator" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Separator</h2>
              <p className="text-muted-foreground mb-6">
                Visual separator element for dividing content with horizontal and vertical orientations.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-wrap gap-8 items-center justify-center p-8">
                  <div className="space-y-6 w-full max-w-md" key={`separator-${refreshKey}`}>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium">Horizontal Separator</h3>
                        <p className="text-sm text-muted-foreground">Content above</p>
                        <Separator className="my-4" />
                        <p className="text-sm text-muted-foreground">Content below</p>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">Left Content</h4>
                          <p className="text-xs text-muted-foreground">Some text here</p>
                        </div>
                        <Separator orientation="vertical" className="h-16" />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">Right Content</h4>
                          <p className="text-xs text-muted-foreground">Some text here</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Menu Items</h4>
                        <div className="space-y-1">
                          <Button variant="ghost" className="w-full justify-start">Home</Button>
                          <Button variant="ghost" className="w-full justify-start">About</Button>
                          <Separator />
                          <Button variant="ghost" className="w-full justify-start">Settings</Button>
                          <Button variant="ghost" className="w-full justify-start">Logout</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skeleton */}
          <section id="skeleton" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Skeleton</h2>
              <p className="text-muted-foreground mb-6">
                Loading placeholder with pulse animation for better perceived performance.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-wrap gap-8 items-start justify-center p-8 overflow-hidden">
                  <div className="space-y-6 w-full max-w-md" key={`skeleton-${refreshKey}`}>
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Article Card Loading</h3>
                      <div className="space-y-3">
                        <Skeleton className="h-24 w-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-3 w-full" />
                          <Skeleton className="h-3 w-4/5" />
                          <Skeleton className="h-3 w-3/5" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Profile Loading</h3>
                      <div className="flex items-center space-x-4">
                        <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                        <div className="space-y-2 flex-1 min-w-0">
                          <Skeleton className="h-3 w-24" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">List Loading</h3>
                      <div className="space-y-2">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-3/4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Popover */}
          <section id="popover" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Popover</h2>
              <p className="text-muted-foreground mb-6">
                Floating content container with smooth animations and customizable positioning.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-wrap gap-8 items-center justify-center p-8">
                  <div className="space-y-6 w-full max-w-md" key={`popover-${refreshKey}`}>
                    <div className="flex flex-wrap gap-4">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline">Open Popover</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="space-y-2">
                            <h4 className="font-medium">Popover Content</h4>
                            <p className="text-sm text-muted-foreground">
                              This is a popover with some example content.
                            </p>
                          </div>
                        </PopoverContent>
                      </Popover>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button>Settings</Button>
                        </PopoverTrigger>
                        <PopoverContent side="top">
                          <div className="space-y-4">
                            <h4 className="font-medium">Quick Settings</h4>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox />
                                <Label className="text-sm">Enable notifications</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox />
                                <Label className="text-sm">Auto-save changes</Label>
                              </div>
                            </div>
                            <Button size="sm" className="w-full">Save</Button>
                          </div>
                        </PopoverContent>
                      </Popover>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Info className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent side="right" className="w-80">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Info className="h-4 w-4 text-blue-500" />
                              <h4 className="font-medium">Information</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              This popover demonstrates different positioning options and content layouts.
                              You can customize the side, alignment, and offset.
                            </p>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sheet */}
          <section id="sheet" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Sheet</h2>
              <p className="text-muted-foreground mb-6">
                Slide-out panel with smooth animations and multiple entry directions.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-wrap gap-8 items-center justify-center p-8">
                  <div className="space-y-6 w-full max-w-md" key={`sheet-${refreshKey}`}>
                    <div className="flex flex-wrap gap-4">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button>Open Sheet</Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Sheet Title</SheetTitle>
                            <SheetDescription>
                              This is a sheet that slides in from the right side.
                            </SheetDescription>
                          </SheetHeader>
                          <div className="py-4">
                            <p className="text-sm text-muted-foreground">
                              Sheet content goes here. You can add forms, lists, or any other content.
                            </p>
                          </div>
                          <SheetFooter>
                            <SheetClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </SheetClose>
                            <Button>Save changes</Button>
                          </SheetFooter>
                        </SheetContent>
                      </Sheet>

                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="outline">Left Sheet</Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                          <SheetHeader>
                            <SheetTitle>Navigation</SheetTitle>
                          </SheetHeader>
                          <div className="py-4 space-y-2">
                            <Button variant="ghost" className="w-full justify-start">
                              <Home className="mr-2 h-4 w-4" />
                              Home
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                              <FileText className="mr-2 h-4 w-4" />
                              Documents
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                              <Users className="mr-2 h-4 w-4" />
                              Team
                            </Button>
                          </div>
                        </SheetContent>
                      </Sheet>

                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="secondary">Bottom Sheet</Button>
                        </SheetTrigger>
                        <SheetContent side="bottom">
                          <SheetHeader>
                            <SheetTitle>Quick Actions</SheetTitle>
                            <SheetDescription>
                              Choose an action to perform.
                            </SheetDescription>
                          </SheetHeader>
                          <div className="py-4 flex gap-2">
                            <Button size="sm">Action 1</Button>
                            <Button size="sm" variant="outline">Action 2</Button>
                            <Button size="sm" variant="secondary">Action 3</Button>
                          </div>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sidebar */}
          <section id="sidebar" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Sidebar</h2>
              <p className="text-muted-foreground mb-6">
                Collapsible navigation sidebar with responsive behavior and keyboard shortcuts.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex items-center justify-center p-8">
                  <div className="w-full max-w-4xl h-64 relative" key={`sidebar-${refreshKey}`}>
                    <div className="h-full border rounded-lg overflow-hidden bg-background relative">
                      <div className="flex h-full">
                        {/* Mock Sidebar */}
                        <div className="w-64 bg-sidebar text-sidebar-foreground border-r flex flex-col">
                          <div className="p-4 border-b">
                            <div className="flex items-center space-x-2">
                              <div className="h-6 w-6 bg-primary rounded"></div>
                              <span className="font-semibold">App Name</span>
                            </div>
                          </div>
                          <div className="flex-1 p-2">
                            <div className="space-y-1">
                              <div className="px-3 py-2 text-xs font-medium text-muted-foreground">
                                Navigation
                              </div>
                              <Button variant="ghost" size="sm" className="w-full justify-start bg-accent text-accent-foreground">
                                <Home className="mr-2 h-4 w-4" />
                                Dashboard
                              </Button>
                              <Button variant="ghost" size="sm" className="w-full justify-start">
                                <BarChart3 className="mr-2 h-4 w-4" />
                                Analytics
                              </Button>
                              <Button variant="ghost" size="sm" className="w-full justify-start">
                                <Users className="mr-2 h-4 w-4" />
                                Team
                              </Button>
                              <Button variant="ghost" size="sm" className="w-full justify-start">
                                <Cog className="mr-2 h-4 w-4" />
                                Settings
                              </Button>
                            </div>
                          </div>
                          <div className="p-2 border-t">
                            <Button variant="ghost" size="sm" className="w-full justify-start">
                              <User className="mr-2 h-4 w-4" />
                              Profile
                            </Button>
                          </div>
                        </div>
                        {/* Mock Main Content */}
                        <div className="flex-1 flex items-center justify-center bg-background">
                          <div className="text-center space-y-2">
                            <Button variant="outline" size="sm">
                              <Menu className="mr-2 h-4 w-4" />
                              Toggle Sidebar
                            </Button>
                            <p className="text-sm text-muted-foreground">
                              Main content area
                            </p>
                            <p className="text-xs text-muted-foreground">
                              This is a static demo of the sidebar component
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Switch */}
          <section id="switch" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Switch</h2>
              <p className="text-muted-foreground mb-6">
                Animated toggle switch with smooth transitions and optional icons.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-wrap gap-8 items-center justify-center p-8">
                  <div className="space-y-6 w-full max-w-md" key={`switch-${refreshKey}`}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="notifications-switch">Enable notifications</Label>
                        <Switch
                          id="notifications-switch"
                          checked={switchStates.notifications}
                          onCheckedChange={(checked) => 
                            setSwitchStates(prev => ({ ...prev, notifications: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="dark-mode-switch">Dark mode</Label>
                        <Switch
                          id="dark-mode-switch"
                          checked={switchStates.darkMode}
                          onCheckedChange={(checked) => 
                            setSwitchStates(prev => ({ ...prev, darkMode: checked }))
                          }
                          leftIcon={<Moon className="h-3 w-3" />}
                          rightIcon={<Sun className="h-3 w-3" />}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="sound-switch">Sound effects</Label>
                        <Switch
                          id="sound-switch"
                          checked={switchStates.sound}
                          onCheckedChange={(checked) => 
                            setSwitchStates(prev => ({ ...prev, sound: checked }))
                          }
                          leftIcon={<Volume2 className="h-3 w-3" />}
                          rightIcon={<VolumeX className="h-3 w-3" />}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="wifi-switch">Wi-Fi</Label>
                        <Switch
                          id="wifi-switch"
                          checked={switchStates.wifi}
                          onCheckedChange={(checked) => 
                            setSwitchStates(prev => ({ ...prev, wifi: checked }))
                          }
                          thumbIcon={<Wifi className="h-3 w-3" />}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tabs */}
          <section id="tabs" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Tabs</h2>
              <p className="text-muted-foreground mb-6">
                Animated tab navigation with smooth transitions and highlight indicators.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-wrap gap-8 items-center justify-center p-8">
                  <div className="space-y-6 w-full max-w-md" key={`tabs-${refreshKey}`}>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList>
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="password">Password</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                      </TabsList>
                      
                      <TabsContents>
                        <TabsContent value="account">
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Account Information</h3>
                            <div className="space-y-2">
                              <Label htmlFor="name">Full Name</Label>
                              <Input id="name" placeholder="Enter your full name" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email-tab">Email</Label>
                              <Input id="email-tab" type="email" placeholder="Enter your email" />
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="password">
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Change Password</h3>
                            <div className="space-y-2">
                              <Label htmlFor="current-password">Current Password</Label>
                              <Input id="current-password" type="password" placeholder="Enter current password" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="new-password">New Password</Label>
                              <Input id="new-password" type="password" placeholder="Enter new password" />
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="settings">
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Preferences</h3>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <Label>Email notifications</Label>
                                <Switch />
                              </div>
                              <div className="flex items-center justify-between">
                                <Label>Marketing emails</Label>
                                <Switch />
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </TabsContents>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Toggle Group */}
          <section id="toggle-group" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Toggle Group</h2>
              <p className="text-muted-foreground mb-6">
                Group of toggle buttons with single or multiple selection modes and smooth animations.
              </p>
              
              <div className="border rounded-lg bg-card">
                <div className="h-80 md:h-96 flex flex-wrap gap-8 items-center justify-center p-8">
                  <div className="space-y-6 w-full max-w-md" key={`toggle-group-${refreshKey}`}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Text Formatting (Single)</Label>
                        <ToggleGroup
                          type="single"
                          value={toggleGroupValues.single}
                          onValueChange={(value) => 
                            setToggleGroupValues(prev => ({ ...prev, single: value }))
                          }
                        >
                          <ToggleGroupItem value="bold">
                            <Bold className="h-4 w-4" />
                          </ToggleGroupItem>
                          <ToggleGroupItem value="italic">
                            <Italic className="h-4 w-4" />
                          </ToggleGroupItem>
                          <ToggleGroupItem value="underline">
                            <Underline className="h-4 w-4" />
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </div>

                      <div className="space-y-2">
                        <Label>Text Alignment (Multiple)</Label>
                        <ToggleGroup
                          type="multiple"
                          value={toggleGroupValues.multiple}
                          onValueChange={(value) => 
                            setToggleGroupValues(prev => ({ ...prev, multiple: value }))
                          }
                        >
                          <ToggleGroupItem value="left">
                            <AlignLeft className="h-4 w-4" />
                          </ToggleGroupItem>
                          <ToggleGroupItem value="center">
                            <AlignCenter className="h-4 w-4" />
                          </ToggleGroupItem>
                          <ToggleGroupItem value="right">
                            <AlignRight className="h-4 w-4" />
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </div>

                      <div className="space-y-2">
                        <Label>Size Variants</Label>
                        <div className="space-y-2">
                          <ToggleGroup type="single" size="sm">
                            <ToggleGroupItem value="small1">Small</ToggleGroupItem>
                            <ToggleGroupItem value="small2">Size</ToggleGroupItem>
                          </ToggleGroup>
                          <ToggleGroup type="single" size="default">
                            <ToggleGroupItem value="default1">Default</ToggleGroupItem>
                            <ToggleGroupItem value="default2">Size</ToggleGroupItem>
                          </ToggleGroup>
                          <ToggleGroup type="single" size="lg">
                            <ToggleGroupItem value="large1">Large</ToggleGroupItem>
                            <ToggleGroupItem value="large2">Size</ToggleGroupItem>
                          </ToggleGroup>
                        </div>
                      </div>
                    </div>
                  </div>
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