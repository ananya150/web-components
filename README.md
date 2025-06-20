# AK UI - Beautiful React Components with CLI

A collection of beautiful, customizable React components built with TypeScript, Tailwind CSS, and Framer Motion. Includes a powerful CLI tool for easy installation, similar to shadcn/ui.

## 🎉 **NEW: CLI Tool Available!**

Install components with a single command:

```bash
# Initialize your project
npx @notacoder15/ak-ui-cli init

# Install any component
npx @notacoder15/ak-ui-cli add copy-button
npx @notacoder15/ak-ui-cli add github-stars-button
npx @notacoder15/ak-ui-cli add magnetic-button
```

## ✨ Features

- 🎨 **11 Beautiful Components** - Professionally designed buttons and text components
- 🚀 **CLI Tool** - One-command installation with automatic dependency management
- 📦 **Smart Dependencies** - Automatically installs required npm packages
- 🎭 **Framer Motion** - Smooth animations and interactions
- 🎯 **TypeScript** - Full type safety and IntelliSense support
- 🌊 **Tailwind CSS** - Utility-first styling with custom CSS variables
- 📱 **Responsive** - Mobile-first design principles
- 🔧 **Customizable** - Easy to customize and extend

## 🚀 Quick Start

### Option 1: CLI Tool (Recommended)

```bash
# Install the CLI
npm install -g @notacoder15/ak-ui-cli

# Initialize your project
ak-ui init

# Add components
ak-ui add copy-button
ak-ui list --category buttons
```

### Option 2: Manual Installation

1. Copy component files from `src/components/ui/`
2. Install required dependencies
3. Set up Tailwind CSS configuration

## 📦 Available Components

### Buttons (10 components)

| Component | Description | Animation |
|-----------|-------------|-----------|
| **Button** | Base button with variants | None |
| **CopyButton** | Copy-to-clipboard with feedback | ✅ |
| **FlipButton** | 3D flip animation on hover | ✅ |
| **GitHubStarsButton** | GitHub stars with animated counter | ✅ |
| **IconButton** | Circular button with interactive effects | ✅ |
| **InputButton** | Transform between button and input | ✅ |
| **LiquidButton** | Liquid fill animation on hover | ✅ |
| **LiquidGlassButton** | Glass morphism with backdrop blur | ✅ |
| **MagneticButton** | Magnetic attraction to mouse | ✅ |
| **RippleButton** | Ripple effect from click point | ✅ |

### Text (1 component)

| Component | Description | Animation |
|-----------|-------------|-----------|
| **SlidingNumber** | Animated number transitions | ✅ |

## 🛠️ CLI Tool

The AK UI CLI provides a seamless way to add components to your project:

### Commands

```bash
ak-ui init                    # Initialize project
ak-ui add <component>         # Install component
ak-ui list [--category]       # List components
ak-ui remove <component>      # Remove component
ak-ui --help                  # Show help
```

### Features

- 🔍 **Smart Detection** - Automatically detects Next.js/React projects
- 📦 **Dependency Management** - Installs required npm packages
- 🎨 **CSS Handling** - Injects CSS variables when needed
- 🔗 **Internal Dependencies** - Resolves component dependencies
- ⚡ **Fast Setup** - Zero configuration required

## 📁 Project Structure

```
src/
├── components/ui/
│   ├── button.tsx              # Base button component
│   ├── buttons/                # Button components
│   │   ├── copy.tsx
│   │   ├── flip.tsx
│   │   ├── github-stars.tsx
│   │   ├── icon.tsx
│   │   ├── input.tsx
│   │   ├── liquid.tsx
│   │   ├── liquid-glass.tsx
│   │   ├── magnetic.tsx
│   │   └── ripple.tsx
│   └── text/                   # Text components
│       └── sliding-number.tsx
├── lib/
│   └── utils.ts               # Utility functions
└── app/
    ├── buttons/               # Component examples
    └── screenshots/           # Screenshot generator
```

## 🎯 Usage Examples

### Copy Button

```tsx
import { CopyButton } from "@/components/ui/buttons/copy"

export default function Example() {
  return (
    <CopyButton 
      content="npm install @ak-ui/cli"
      variant="outline"
      onCopy={() => console.log("Copied!")}
    />
  )
}
```

### GitHub Stars Button

```tsx
import { GitHubStarsButton } from "@/components/ui/buttons/github-stars"

export default function Example() {
  return (
    <GitHubStarsButton 
      username="ananya150" 
      repo="web-components" 
      formatted={true}
    />
  )
}
```

### Magnetic Button

```tsx
import { MagneticButton } from "@/components/ui/buttons/magnetic"

export default function Example() {
  return (
    <MagneticButton 
      strength={0.5}
      range={150}
      variant="default"
    >
      Magnetic Effect
    </MagneticButton>
  )
}
```

## 🔧 Dependencies

### Core Dependencies
- **React** 18+ - Component framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **clsx** - Conditional classes
- **tailwind-merge** - Class merging

### Animation Dependencies
- **Framer Motion** - Animations (9/10 button components)
- **class-variance-authority** - Component variants
- **lucide-react** - Icons
- **react-use-measure** - Element measurements

### Optional Dependencies
- **@radix-ui/react-slot** - Base Button component

## 🎨 Customization

All components are built with customization in mind:

1. **Tailwind Classes** - Most styling uses Tailwind utilities
2. **CSS Variables** - Custom properties for advanced styling
3. **Variant Props** - Multiple pre-built variants
4. **Custom Props** - Extensive prop APIs for customization

## 📸 Screenshots

Component screenshots are automatically generated using Playwright and stored in the `thumbs/` directory.

## 🚀 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Generate screenshots
npm run screenshots
```

### CLI Development

```bash
# Navigate to CLI directory
cd cli

# Install CLI dependencies
npm install

# Build CLI
npm run build

# Test locally
npm pack
npm install -g ak-ui-cli-1.0.0.tgz
```

## 📖 Documentation

- **CLI Documentation**: See [`cli/README.md`](cli/README.md)
- **Component Examples**: Visit `/buttons` route in development
- **Screenshots**: Visit `/screenshots` route in development

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🔗 Links

- **GitHub**: [https://github.com/ananya150/web-components](https://github.com/ananya150/web-components)
- **NPM Package**: `@notacoder15/ak-ui-cli`
- **Issues**: [GitHub Issues](https://github.com/ananya150/web-components/issues)

## 🙏 Acknowledgments

- Inspired by [shadcn/ui](https://ui.shadcn.com)
- Built with [Next.js](https://nextjs.org)
- Powered by [Tailwind CSS](https://tailwindcss.com)
- Animations by [Framer Motion](https://framer.com/motion)

---

**Made with ❤️ for the React community**
