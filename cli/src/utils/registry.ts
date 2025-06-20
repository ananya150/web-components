/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface ComponentDependency {
  name: string;
  import: string;
}

export interface ComponentProps {
  [key: string]: {
    type: string;
    values?: string[];
    default?: any;
  } | string;
}

export interface Component {
  name: string;
  category: string;
  description: string;
  cli: string;
  import: string;
  export: string;
  dependencies?: string[];
  props: ComponentProps;
  example: string;
  version: string;
}

export type ComponentRegistry = Component[];

const REGISTRY_URL = 'https://raw.githubusercontent.com/ananya150/web-components/main/ak-ui.json';
const LOCAL_REGISTRY_PATH = '../../../ak-ui.json';

export async function loadRegistry(): Promise<ComponentRegistry> {
  try {
    // Try to load from local file first (for development)
    const localPath = path.resolve(__dirname, LOCAL_REGISTRY_PATH);
    if (await fs.pathExists(localPath)) {
      const data = await fs.readJson(localPath);
      return data;
    }
    
    // Fallback to remote registry with cache busting
    const cacheBuster = Date.now();
    const response = await fetch(`${REGISTRY_URL}?v=${cacheBuster}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch registry: ${response.statusText}`);
    }
    
    const data = await response.json() as ComponentRegistry;
    return data;
  } catch (error) {
    throw new Error(`Failed to load component registry: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function getComponent(name: string): Promise<Component | null> {
  const registry = await loadRegistry();
  return registry.find(component => 
    component.name.toLowerCase() === name.toLowerCase() ||
    // Also match by CLI command (e.g., "copy-button" matches "CopyButton")
    component.cli.toLowerCase().includes(name.toLowerCase()) ||
    // Convert PascalCase to kebab-case for matching
    component.name.replace(/([A-Z])/g, '-$1').toLowerCase().slice(1) === name.toLowerCase()
  ) || null;
}

export async function getComponentsByCategory(category: string): Promise<Component[]> {
  const registry = await loadRegistry();
  return registry.filter(component => 
    component.category.toLowerCase() === category.toLowerCase()
  );
}

export async function searchComponents(query: string): Promise<Component[]> {
  const registry = await loadRegistry();
  const lowerQuery = query.toLowerCase();
  
  return registry.filter(component =>
    component.name.toLowerCase().includes(lowerQuery) ||
    component.description.toLowerCase().includes(lowerQuery) ||
    component.category.toLowerCase().includes(lowerQuery)
  );
}

export function getComponentDependencies(component: Component): string[] {
  const dependencies: string[] = [];
  
  // Add internal dependencies
  if (component.dependencies) {
    dependencies.push(...component.dependencies);
  }
  
  return dependencies;
}

export function getNpmDependencies(component: Component): string[] {
  const dependencies: string[] = [];
  
  // Based on component analysis, determine required packages
  switch (component.name) {
    case 'Button':
      dependencies.push('@radix-ui/react-slot', 'class-variance-authority');
      break;
    case 'CopyButton':
      dependencies.push('motion', 'lucide-react', 'class-variance-authority');
      break;
    case 'FlipButton':
      dependencies.push('motion');
      break;
    case 'GitHubStarsButton':
      dependencies.push('motion', 'lucide-react', 'react-use-measure');
      break;
    case 'IconButton':
      dependencies.push('motion');
      break;
    case 'InputButton':
      dependencies.push('motion', 'lucide-react');
      break;
    case 'LiquidButton':
      dependencies.push('motion', 'class-variance-authority');
      break;
    case 'RippleButton':
      dependencies.push('motion', 'class-variance-authority');
      break;
    case 'MagneticButton':
      dependencies.push('motion', 'class-variance-authority');
      break;
    case 'LiquidGlassButton':
      // No additional npm dependencies beyond React
      break;
    case 'SlidingNumber':
      dependencies.push('motion', 'react-use-measure');
      break;
    case 'CountingNumber':
      dependencies.push('motion');
      break;
    case 'GradientText':
      dependencies.push('motion');
      break;
    case 'HighlightText':
      dependencies.push('motion');
      break;
    case 'RollingText':
      dependencies.push('motion');
      break;
    case 'RotatingText':
      dependencies.push('motion');
      break;
    case 'SplittingText':
      dependencies.push('motion');
      break;
    case 'TypingText':
      dependencies.push('motion');
      break;
    case 'WritingText':
      dependencies.push('motion');
      break;
    case 'AvatarGroup':
      dependencies.push('motion');
      break;
    case 'CodeEditor':
      dependencies.push('motion', 'shiki', 'next-themes');
      break;
    case 'Tooltip':
      dependencies.push('motion');
      break;
    default:
      break;
  }
  
  return dependencies;
} 