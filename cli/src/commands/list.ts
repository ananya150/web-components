import { Command } from 'commander';
import chalk from 'chalk';
import { loadRegistry, getComponentsByCategory } from '../utils/registry.js';

export const listCommand = new Command('list')
  .description('List all available components')
  .option('-c, --category <category>', 'Filter by category')
  .action(async (options) => {
    try {
      const registry = await loadRegistry();
      
      if (options.category) {
        const components = await getComponentsByCategory(options.category);
        if (components.length === 0) {
          console.log(chalk.yellow(`No components found in category: ${options.category}`));
          return;
        }
        
        console.log(chalk.bold(`\n${options.category.toUpperCase()} COMPONENTS:\n`));
        components.forEach(component => {
          console.log(`${chalk.green('●')} ${chalk.bold(component.name)}`);
          console.log(`  ${chalk.gray(component.description)}`);
          console.log(`  ${chalk.blue('Example:')} ${component.example}\n`);
        });
      } else {
        // Group by category
        const categories = [...new Set(registry.map(c => c.category))];
        
        console.log(chalk.bold('\nAVAILABLE COMPONENTS:\n'));
        
        for (const category of categories) {
          const components = registry.filter(c => c.category === category);
          console.log(chalk.bold.cyan(`${category.toUpperCase()}:`));
          
          components.forEach(component => {
            console.log(`  ${chalk.green('●')} ${chalk.bold(component.name)} - ${component.description}`);
          });
          console.log('');
        }
        
        console.log(chalk.gray('Use "ak-ui add <component-name>" to install a component'));
        console.log(chalk.gray('Use "ak-ui list --category <category>" to see components in a specific category'));
      }
    } catch (error) {
      console.error(chalk.red('Error loading components:'), error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  }); 