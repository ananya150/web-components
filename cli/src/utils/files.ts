import fs from 'fs-extra';
import path from 'path';
import fetch from 'node-fetch';

export interface ProjectConfig {
  srcDir: string;
  componentsDir: string;
  utilsDir: string;
  aliases: {
    components: string;
    utils: string;
  };
}

export async function detectProjectStructure(): Promise<ProjectConfig> {
  const cwd = process.cwd();
  
  // Check for Next.js app directory structure
  if (await fs.pathExists(path.join(cwd, 'src/app'))) {
    return {
      srcDir: 'src',
      componentsDir: 'src/components/ui',
      utilsDir: 'src/lib',
      aliases: {
        components: '@/components',
        utils: '@/lib'
      }
    };
  }
  
  // Check for src directory
  if (await fs.pathExists(path.join(cwd, 'src'))) {
    return {
      srcDir: 'src',
      componentsDir: 'src/components/ui',
      utilsDir: 'src/lib',
      aliases: {
        components: '@/components',
        utils: '@/lib'
      }
    };
  }
  
  // Default structure
  return {
    srcDir: '.',
    componentsDir: 'components/ui',
    utilsDir: 'lib',
    aliases: {
      components: '@/components',
      utils: '@/lib'
    }
  };
}

export async function ensureUtilsFile(config: ProjectConfig): Promise<void> {
  const utilsPath = path.join(config.utilsDir, 'utils.ts');
  
  // Check if utils file already exists
  if (await fs.pathExists(utilsPath)) {
    const content = await fs.readFile(utilsPath, 'utf-8');
    if (content.includes('export function cn')) {
      return; // Utils file exists with cn function
    }
  }
  
  await fs.ensureDir(config.utilsDir);
  
  const utilsContent = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`;
  
  await fs.writeFile(utilsPath, utilsContent);
}

export async function downloadComponentFile(componentPath: string, targetPath: string): Promise<void> {
  const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/notacoder/web-components/main/src';
  
  // For development, try local files first
  const localSourcePath = path.resolve(process.cwd(), '../src', componentPath + '.tsx');
  
  if (await fs.pathExists(localSourcePath)) {
    const content = await fs.readFile(localSourcePath, 'utf-8');
    await fs.ensureDir(path.dirname(targetPath));
    await fs.writeFile(targetPath, content);
    return;
  }
  
  // Fallback to GitHub download
  const githubUrl = `${GITHUB_RAW_BASE}/${componentPath}.tsx`;
  
  const response = await fetch(githubUrl);
  if (!response.ok) {
    throw new Error(`Failed to download component: ${response.statusText}`);
  }
  
  const content = await response.text();
  await fs.ensureDir(path.dirname(targetPath));
  await fs.writeFile(targetPath, content);
}

export function transformImports(content: string, config: ProjectConfig): string {
  // Transform @/lib/utils imports to match project structure
  const utilsAlias = config.aliases.utils;
  content = content.replace(/@\/lib\/utils/g, `${utilsAlias}/utils`);
  
  // Transform @/components imports
  const componentsAlias = config.aliases.components;
  content = content.replace(/@\/components/g, componentsAlias);
  
  return content;
}

export async function handleMultiFileComponent(component: { name: string; export: string; import: string }, config: ProjectConfig): Promise<string[]> {
  const installedFiles: string[] = [];
  
  // Special handling for InputButton which has multiple exports
  if (component.name === 'InputButton' && component.export.includes(',')) {
    // InputButton is a single file with multiple exports
    const importPath = component.import.replace('@/', '');
    const fileName = `${path.basename(importPath)}.tsx`;
    
    let targetDir: string;
    if (importPath.includes('/buttons/')) {
      targetDir = path.join(config.componentsDir, 'buttons');
    } else {
      targetDir = config.componentsDir;
    }
    
    const targetPath = path.join(targetDir, fileName);
    await downloadComponentFile(importPath, targetPath);
    installedFiles.push(targetPath);
  }
  
  return installedFiles;
}

export async function convertToJavaScript(tsxContent: string): Promise<string> {
  // Basic TypeScript to JavaScript conversion
  // Remove type annotations and interfaces
  const jsContent = tsxContent
    .replace(/: [A-Za-z<>[\]|&{}.,\s]+(?=\s*[=;,)])/g, '') // Remove type annotations
    .replace(/interface\s+\w+\s*{[^}]*}/g, '') // Remove interfaces
    .replace(/export\s+interface\s+\w+\s*{[^}]*}/g, '') // Remove exported interfaces
    .replace(/import\s+type\s+{[^}]+}\s+from\s+['"][^'"]+['"];?\n/g, '') // Remove type imports
    .replace(/\s*:\s*React\.FC.*?(?=\s*=)/g, '') // Remove React.FC types
    .replace(/\.tsx/g, '.jsx'); // Change file extensions in imports
  
  return jsContent;
} 