import fs from 'fs-extra';
import chalk from 'chalk';

export interface CSSRequirement {
  variables?: Record<string, string>;
  keyframes?: Record<string, string>;
  customClasses?: Record<string, string>;
}

export function getComponentCSSRequirements(componentName: string): CSSRequirement {
  const requirements: CSSRequirement = {};
  
  switch (componentName) {
    case 'LiquidButton':
      requirements.variables = {
        '--liquid-color': 'rgb(59 130 246)', // blue-500
        '--liquid-bg': 'rgb(239 246 255)', // blue-50
      };
      break;
      
    case 'IconButton':
      requirements.variables = {
        '--icon-color-r': '59',
        '--icon-color-g': '130', 
        '--icon-color-b': '246',
      };
      break;
      
    default:
      // Most components use pure Tailwind - no CSS injection needed
      break;
  }
  
  return requirements;
}

export async function findGlobalCSSFile(): Promise<string | null> {
  const possiblePaths = [
    'src/app/globals.css',
    'src/styles/globals.css',
    'styles/globals.css',
    'src/index.css',
    'src/App.css'
  ];
  
  for (const cssPath of possiblePaths) {
    if (await fs.pathExists(cssPath)) {
      return cssPath;
    }
  }
  
  return null;
}

export async function injectCSS(componentName: string): Promise<boolean> {
  const requirements = getComponentCSSRequirements(componentName);
  
  // If no CSS requirements, skip injection
  if (!requirements.variables && !requirements.keyframes && !requirements.customClasses) {
    return false;
  }
  
  const globalCSSPath = await findGlobalCSSFile();
  if (!globalCSSPath) {
    console.log(chalk.yellow(`Warning: Could not find global CSS file for ${componentName} CSS variables`));
    console.log(chalk.gray('You may need to manually add CSS variables to your global CSS file'));
    return false;
  }
  
  const cssContent = await fs.readFile(globalCSSPath, 'utf-8');
  let injectedContent = '';
  let hasChanges = false;
  
  // Add CSS variables
  if (requirements.variables) {
    const variableBlock = `\n/* ${componentName} CSS Variables */\n:root {\n${
      Object.entries(requirements.variables)
        .map(([key, value]) => `  ${key}: ${value};`)
        .join('\n')
    }\n}\n`;
    
    // Check if variables are already present
    const hasExistingVars = Object.keys(requirements.variables).some(varName => 
      cssContent.includes(varName)
    );
    
    if (!hasExistingVars) {
      injectedContent += variableBlock;
      hasChanges = true;
    }
  }
  
  // Add keyframes
  if (requirements.keyframes) {
    const keyframeBlocks = Object.entries(requirements.keyframes)
      .map(([name, definition]) => `\n@keyframes ${name} {\n${definition}\n}`)
      .join('\n');
    
    // Check if keyframes are already present
    const hasExistingKeyframes = Object.keys(requirements.keyframes).some(keyframeName =>
      cssContent.includes(`@keyframes ${keyframeName}`)
    );
    
    if (!hasExistingKeyframes) {
      injectedContent += keyframeBlocks;
      hasChanges = true;
    }
  }
  
  // Add custom classes
  if (requirements.customClasses) {
    const classBlocks = Object.entries(requirements.customClasses)
      .map(([selector, styles]) => `\n${selector} {\n${styles}\n}`)
      .join('\n');
    
    // Check if classes are already present
    const hasExistingClasses = Object.keys(requirements.customClasses).some(className =>
      cssContent.includes(className)
    );
    
    if (!hasExistingClasses) {
      injectedContent += classBlocks;
      hasChanges = true;
    }
  }
  
  // Write changes if any
  if (hasChanges) {
    await fs.writeFile(globalCSSPath, cssContent + injectedContent);
    console.log(chalk.green(`✓ Added CSS requirements for ${componentName} to ${globalCSSPath}`));
    return true;
  }
  
  return false;
}

export async function removeComponentCSS(componentName: string): Promise<boolean> {
  const requirements = getComponentCSSRequirements(componentName);
  
  if (!requirements.variables && !requirements.keyframes && !requirements.customClasses) {
    return false;
  }
  
  const globalCSSPath = await findGlobalCSSFile();
  if (!globalCSSPath) {
    return false;
  }
  
  let cssContent = await fs.readFile(globalCSSPath, 'utf-8');
  let hasChanges = false;
  
  // Remove component-specific CSS blocks
  const componentComment = `/* ${componentName} CSS Variables */`;
  if (cssContent.includes(componentComment)) {
    // Remove the entire block from comment to the end of the :root block
    const regex = new RegExp(`\\/\\* ${componentName} CSS Variables \\*\\/[\\s\\S]*?\\}\\s*`, 'g');
    cssContent = cssContent.replace(regex, '');
    hasChanges = true;
  }
  
  if (hasChanges) {
    await fs.writeFile(globalCSSPath, cssContent);
    console.log(chalk.green(`✓ Removed CSS for ${componentName} from ${globalCSSPath}`));
    return true;
  }
  
  return false;
} 