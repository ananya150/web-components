import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import prompts from 'prompts';
import { getComponent } from '../utils/registry.js';
import { detectProjectStructure } from '../utils/files.js';
import { removeComponentCSS } from '../utils/css.js';

export const removeCommand = new Command('remove')
  .description('Remove a component from your project')
  .argument('<component>', 'Component name to remove')
  .option('-f, --force', 'Force removal without confirmation')
  .action(async (componentName: string, options: { force?: boolean }) => {
    try {
      console.log(chalk.bold.red(`🗑️  Removing ${componentName}...\n`));
      
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
      
      // Determine component file path
      let targetDir: string;
      if (component.category === 'buttons') {
        targetDir = path.join(config.componentsDir, 'buttons');
      } else if (component.category === 'text') {
        targetDir = path.join(config.componentsDir, 'text');
      } else {
        targetDir = config.componentsDir;
      }
      
      const importPath = component.import.replace('@/', '');
      const fileName = `${path.basename(importPath)}.tsx`;
      const targetPath = path.join(targetDir, fileName);
      
      // Check if component exists
      if (!(await fs.pathExists(targetPath))) {
        console.log(chalk.yellow(`Component "${componentName}" is not installed`));
        process.exit(0);
      }
      
      // Confirmation prompt
      if (!options.force) {
        const response = await prompts({
          type: 'confirm',
          name: 'confirm',
          message: `Are you sure you want to remove ${componentName}?`,
          initial: false
        });
        
        if (!response.confirm) {
          console.log(chalk.gray('Operation cancelled'));
          process.exit(0);
        }
      }
      
      // Remove component file
      spinner.start('Removing component file...');
      await fs.remove(targetPath);
      spinner.succeed('Component file removed');
      
      // Remove CSS if any
      spinner.start('Cleaning up CSS...');
      const cssRemoved = await removeComponentCSS(component.name);
      if (cssRemoved) {
        spinner.succeed('Component CSS removed');
      } else {
        spinner.succeed('No CSS cleanup needed');
      }
      
      // Check if directory is empty and remove it
      try {
        const files = await fs.readdir(targetDir);
        if (files.length === 0) {
          await fs.rmdir(targetDir);
          spinner.succeed('Empty directory removed');
        }
      } catch {
        // Directory not empty or doesn't exist, ignore
      }
      
      console.log(chalk.green(`\n✅ ${component.name} removed successfully!\n`));
      console.log(chalk.yellow('Note: Dependencies are not automatically removed.'));
      console.log(chalk.gray('You may want to manually remove unused packages from package.json\n'));
      
    } catch (error) {
      console.error(chalk.red('\n❌ Removal failed:'), error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  }); 