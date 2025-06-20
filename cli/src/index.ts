#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { addCommand } from './commands/add.js';
import { initCommand } from './commands/init.js';
import { listCommand } from './commands/list.js';
import { removeCommand } from './commands/remove.js';

const program = new Command();

program
  .name('ak-ui')
  .description('CLI tool for installing AK UI components')
  .version('1.0.0');

// Add commands
program.addCommand(initCommand);
program.addCommand(addCommand);
program.addCommand(listCommand);
program.addCommand(removeCommand);

// Global error handling
program.exitOverride();

try {
  await program.parseAsync(process.argv);
} catch (error) {
  console.error(chalk.red('Error:'), error instanceof Error ? error.message : String(error));
  process.exit(1);
} 