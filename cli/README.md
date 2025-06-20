# AK UI CLI

A command-line interface for installing beautiful, customizable React components. Similar to shadcn/ui but for AK UI components.

## Features

✨ **Beautiful Components** - 11 professionally designed button and text components  
🚀 **Easy Installation** - One command to install components with all dependencies  
📦 **Smart Dependencies** - Automatically installs required npm packages  
🎨 **CSS Management** - Handles Tailwind classes and CSS variables automatically  
🔧 **Project Detection** - Works with Next.js and React projects  
📱 **TypeScript Ready** - Full TypeScript support with proper types  

## Installation

```bash
# Install globally
npm install -g @notacoder15/ak-ui-cli

# Or use with npx (recommended)
npx @notacoder15/ak-ui-cli --help
```

## Quick Start

1. **Initialize your project**
   ```bash
   npx @notacoder15/ak-ui-cli init
   ```

2. **Install a component**
   ```bash
   npx @notacoder15/ak-ui-cli add copy-button
   ```

3. **Use in your app**
   ```tsx
   import { CopyButton } from "@/components/ui/buttons/copy"
   
   export default function App() {
     return (
       <CopyButton content="Hello World!" variant="default" />
     )
   }
   ```

## Commands

### `ak-ui init`

Initialize your project with AK UI configuration.

```bash
npx ak-ui init
```

**What it does:**
- Detects your project type (Next.js/React)
- Creates `components.json` configuration
- Creates `ak-ui.json` component registry
- Installs utility dependencies (`clsx`, `tailwind-merge`)
- Sets up the `cn` utility function
- Creates component directory structure

### `ak-ui add <component>`

Install a component with all its dependencies.

```bash
npx @notacoder15/ak-ui-cli add button
npx @notacoder15/ak-ui-cli add copy-button
npx @notacoder15/ak-ui-cli add github-stars-button
```

**What it does:**
- Downloads component files to your project
- Installs required npm dependencies
- Handles internal component dependencies
- Injects required CSS variables (when needed)
- Creates directory structure if missing

**Example:**
```bash
# Install the GitHub Stars Button
npx @notacoder15/ak-ui-cli add github-stars-button

# This will install:
# - GitHubStarsButton component
# - SlidingNumber component (dependency)
# - Required npm packages: motion, lucide-react, react-use-measure
```

### `ak-ui list [--category <category>]`

List all available components.

```bash
# List all components
npx @notacoder15/ak-ui-cli list

# List only button components
npx @notacoder15/ak-ui-cli list --category buttons

# List only text components
npx @notacoder15/ak-ui-cli list --category text
```

### `ak-ui remove <component> [--force]`

Remove a component from your project.

```bash
# Remove with confirmation prompt
npx @notacoder15/ak-ui-cli remove copy-button

# Remove without confirmation
npx @notacoder15/ak-ui-cli remove copy-button --force
```

**What it does:**
- Removes component files
- Cleans up empty directories
- Removes component-specific CSS
- Preserves shared dependencies (with warning)

## Available Components

### Buttons (10 components)

| Component | Description | CLI Command |
|-----------|-------------|-------------|
| **Button** | Base button with variants and sizes | `npx @notacoder15/ak-ui-cli add button` |
| **CopyButton** | Copy-to-clipboard with feedback | `npx @notacoder15/ak-ui-cli add copy-button` |
| **FlipButton** | 3D flip animation on hover | `npx @notacoder15/ak-ui-cli add flip-button` |
| **GitHubStarsButton** | GitHub stars with animated counter | `npx @notacoder15/ak-ui-cli add github-stars-button` |
| **IconButton** | Circular button with interactive effects | `npx @notacoder15/ak-ui-cli add icon-button` |
| **InputButton** | Transform between button and input | `npx @notacoder15/ak-ui-cli add input-button` |
| **LiquidButton** | Liquid fill animation on hover | `npx @notacoder15/ak-ui-cli add liquid-button` |
| **LiquidGlassButton** | Glass morphism with backdrop blur | `npx @notacoder15/ak-ui-cli add liquid-glass-button` |
| **MagneticButton** | Magnetic attraction to mouse | `npx @notacoder15/ak-ui-cli add magnetic-button` |
| **RippleButton** | Ripple effect from click point | `npx @notacoder15/ak-ui-cli add ripple-button` |

### Text (1 component)

| Component | Description | CLI Command |
|-----------|-------------|-------------|
| **SlidingNumber** | Animated number transitions | `npx @notacoder15/ak-ui-cli add sliding-number` |

## Project Structure

After running `ak-ui init`, your project will have:

```
your-project/
├── components.json          # shadcn/ui compatible config
├── ak-ui.json              # AK UI component registry
├── src/
│   ├── components/ui/      # Components installed here
│   │   ├── button.tsx
│   │   └── buttons/
│   │       ├── copy.tsx
│   │       └── ...
│   └── lib/
│       └── utils.ts        # cn utility function
```

## Dependencies

The CLI automatically manages these dependencies:

### Core Dependencies (always installed)
- `clsx` - Conditional CSS classes
- `tailwind-merge` - Merge Tailwind classes

### Component Dependencies (installed as needed)
- `motion` (framer-motion) - Animations (9/10 button components)
- `class-variance-authority` - Component variants (6/10 components)
- `lucide-react` - Icons (4/10 components)
- `@radix-ui/react-slot` - Base Button component
- `react-use-measure` - SlidingNumber component

## CSS Requirements

Most components use pure Tailwind CSS. Only 2 components require CSS variables:

### LiquidButton
Requires CSS variables for liquid animation effects.

### IconButton  
Requires CSS variables for color customization.

The CLI automatically injects these CSS variables into your `globals.css` when needed.

## Configuration

### components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

### Path Aliases

All components use `@/` path aliases. Make sure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Examples

### Basic Button Usage

```tsx
import { Button } from "@/components/ui/buttons/button"

export default function Example() {
  return (
    <div className="space-x-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}
```

### Copy Button with Callback

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
      username="vercel" 
      repo="next.js" 
      formatted={true}
    />
  )
}
```

### Magnetic Button with Custom Settings

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

## Troubleshooting

### Common Issues

**Error: Cannot find module '@/lib/utils'**
- Run `npx ak-ui init` to set up the utils file and path aliases

**Error: Module not found: motion**
- The CLI should auto-install dependencies. Try: `npm install motion`

**Components not styled correctly**
- Ensure Tailwind CSS is properly configured
- Check that your `globals.css` imports Tailwind: `@tailwind base; @tailwind components; @tailwind utilities;`

**TypeScript errors**
- Make sure `@/` path aliases are configured in `tsconfig.json`
- Run `npx @notacoder15/ak-ui-cli init` to set up proper configuration

### Getting Help

- Check the [GitHub repository](https://github.com/ananya150/web-components) for issues
- Review component examples in the `/src/app/buttons` directory
- Use `npx @notacoder15/ak-ui-cli --help` for command reference

## Contributing

We welcome contributions! Please see our [Contributing Guide](../CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](../LICENSE) for details. 