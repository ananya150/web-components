import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import { detectProjectStructure, ensureUtilsFile } from '../utils/files.js';
import { installUtilsDependencies, getPackageManager } from '../utils/dependencies.js';
import { loadRegistry } from '../utils/registry.js';

async function createComponentsConfig(config: { aliases: { components: string; utils: string } }): Promise<void> {
  const configPath = path.join(process.cwd(), 'components.json');
  
  // Don't overwrite existing config
  if (await fs.pathExists(configPath)) {
    return;
  }
  
  const componentsConfig = {
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
      "components": config.aliases.components,
      "utils": config.aliases.utils
    }
  };
  
  await fs.writeJson(configPath, componentsConfig, { spaces: 2 });
}

async function createAkUiRegistry(): Promise<void> {
  const registryPath = path.join(process.cwd(), 'ak-ui.json');
  
  // Don't overwrite existing registry
  if (await fs.pathExists(registryPath)) {
    return;
  }
  
  try {
    // Load the registry from the source
    const registry = await loadRegistry();
    await fs.writeJson(registryPath, registry, { spaces: 2 });
  } catch (error) {
    console.warn(chalk.yellow('⚠️  Could not create ak-ui.json registry file:'), error instanceof Error ? error.message : String(error));
  }
}

async function detectProjectType(): Promise<string> {
  const cwd = process.cwd();
  const packageJsonPath = path.join(cwd, 'package.json');
  
  if (await fs.pathExists(packageJsonPath)) {
    const packageJson = await fs.readJson(packageJsonPath);
    
    if (packageJson.dependencies?.next || packageJson.devDependencies?.next) {
      return 'Next.js';
    }
    
    if (packageJson.dependencies?.react || packageJson.devDependencies?.react) {
      return 'React';
    }
  }
  
  return 'Unknown';
}

export const initCommand = new Command('init')
  .description('Initialize your project with AK UI')
  .action(async () => {
    try {
      console.log(chalk.bold.blue('🚀 Initializing AK UI...\n'));
      
      const spinner = ora('Detecting project structure...').start();
      const config = await detectProjectStructure();
      const projectType = await detectProjectType();
      const packageManager = await getPackageManager();
      spinner.succeed(`${projectType} project detected (using ${packageManager})`);
      
      spinner.start('Creating components configuration...');
      await createComponentsConfig(config);
      spinner.succeed('Components configuration created');
      
      spinner.start('Installing utility dependencies...');
      await installUtilsDependencies();
      spinner.succeed('Utility dependencies installed');
      
      spinner.start('Setting up utils file...');
      await ensureUtilsFile(config);
      spinner.succeed('Utils file created');
      
      spinner.start('Creating component registry...');
      await createAkUiRegistry();
      spinner.succeed('Component registry created');
      
      console.log(chalk.green('\n✅ AK UI initialization complete!\n'));
      console.log(chalk.gray('Project setup:'));
      console.log(chalk.blue(`  • Project type: ${projectType}`));
      console.log(chalk.blue(`  • Package manager: ${packageManager}`));
      console.log(chalk.blue(`  • Components path: ${config.componentsDir}`));
      console.log(chalk.blue(`  • Utils path: ${config.utilsDir}/utils.ts\n`));
      
      console.log(chalk.gray('You can now install components using:'));
      console.log(chalk.blue('  ak-ui add <component-name>\n'));
      console.log(chalk.gray('To see all available components:'));
      console.log(chalk.blue('  ak-ui list\n'));
      
    } catch (error) {
      console.error(chalk.red('\n❌ Initialization failed:'), error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  }); 