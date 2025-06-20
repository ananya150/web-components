import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import path from 'path';
import { getComponent, getNpmDependencies, getComponentDependencies } from '../utils/registry.js';
import { detectProjectStructure, ensureUtilsFile, downloadComponentFile } from '../utils/files.js';
import { installDependencies, installUtilsDependencies, checkDependencyConflicts } from '../utils/dependencies.js';
import { injectCSS } from '../utils/css.js';



export const addCommand = new Command('add')
  .description('Add a component to your project')
  .argument('<component>', 'Component name to install')
  .action(async (componentName: string) => {
    try {
      console.log(chalk.bold.blue(`📦 Installing ${componentName}...\n`));
      
      const spinner = ora('Loading component registry...').start();
      const component = await getComponent(componentName);
      
      if (!component) {
        spinner.fail(chalk.red(`Component "${componentName}" not found`));
        console.log(chalk.gray('\nRun "ak-ui list" to see available components'));
        process.exit(1);
      }
      
      spinner.succeed('Component found in registry');
      
      // Detect project structure
      spinner.start('Detecting project structure...');
      const config = await detectProjectStructure();
      spinner.succeed('Project structure detected');
      
      // Ensure utils file exists
      spinner.start('Setting up utilities...');
      await ensureUtilsFile(config);
      await installUtilsDependencies();
      spinner.succeed('Utilities ready');
      
      // Install internal dependencies first
      const internalDeps = getComponentDependencies(component);
      for (const depPath of internalDeps) {
        // Extract component name from path like "@/components/ui/text/sliding-number" -> "SlidingNumber"
        const depName = depPath.split('/').pop()?.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join('') || '';
        
        spinner.start(`Installing internal dependency: ${depName}...`);
        const depComponent = await getComponent(depName);
        if (depComponent) {
          await installComponentFiles(depComponent);
          const depNpmDeps = getNpmDependencies(depComponent);
          if (depNpmDeps.length > 0) {
            await installDependencies(depNpmDeps);
          }
        }
        spinner.succeed(`Internal dependency ${depName} installed`);
      }
      
      // Install the main component
      spinner.start('Installing component files...');
      await installComponentFiles(component);
      spinner.succeed('Component files installed');
      
      // Install npm dependencies
      const npmDeps = getNpmDependencies(component);
      if (npmDeps.length > 0) {
        spinner.start('Checking for dependency conflicts...');
        const { conflicts, warnings } = await checkDependencyConflicts(npmDeps);
        
        if (conflicts.length > 0) {
          spinner.warn('Dependency conflicts detected');
          console.log(chalk.yellow('Conflicts:'));
          conflicts.forEach(conflict => console.log(chalk.red(`  ⚠️  ${conflict}`)));
        }
        
        if (warnings.length > 0) {
          warnings.forEach(warning => console.log(chalk.yellow(`  ⚠️  ${warning}`)));
        }
        
        spinner.start('Installing npm dependencies...');
        await installDependencies(npmDeps);
        spinner.succeed('Dependencies installed');
      }
      
      // Inject CSS if needed
      spinner.start('Checking CSS requirements...');
      const cssInjected = await injectCSS(component.name);
      if (cssInjected) {
        spinner.succeed('CSS requirements added');
      } else {
        spinner.succeed('No CSS injection needed');
      }
      
      console.log(chalk.green(`\n✅ ${component.name} installed successfully!\n`));
      
      if (internalDeps.length > 0) {
        console.log(chalk.gray('📦 Internal dependencies installed:'));
        internalDeps.forEach(dep => {
          const depName = dep.split('/').pop()?.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join('') || '';
          console.log(chalk.blue(`  ${depName}`));
        });
        console.log('');
      }
      
      console.log(chalk.gray('💡 Usage example:'));
      console.log(chalk.blue(component.example));
      console.log('');
      
    } catch (error) {
      console.error(chalk.red('\n❌ Installation failed:'), error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

async function installComponentFiles(component: { name: string; category: string; import: string }): Promise<void> {
  // Extract the full import path structure
  const importPath = component.import.replace('@/', '');
  
  // Use the full import path to determine the target directory structure
  // e.g., "@/components/ui/custom/avatar-group" -> "components/ui/custom/avatar-group.tsx"
  const targetPath = path.join(process.cwd(), importPath + '.tsx');
  
  // Download and save the component file
  await downloadComponentFile(importPath, targetPath);
} 