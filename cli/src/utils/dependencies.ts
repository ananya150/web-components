import fs from 'fs-extra';
import path from 'path';
import { execa } from 'execa';
import chalk from 'chalk';
import ora from 'ora';

export interface PackageJson {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export async function getPackageManager(): Promise<'npm' | 'yarn' | 'pnpm'> {
  const cwd = process.cwd();
  
  if (await fs.pathExists(path.join(cwd, 'pnpm-lock.yaml'))) {
    return 'pnpm';
  }
  
  if (await fs.pathExists(path.join(cwd, 'yarn.lock'))) {
    return 'yarn';
  }
  
  return 'npm';
}

export async function getInstalledPackages(): Promise<Record<string, string>> {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  
  if (!(await fs.pathExists(packageJsonPath))) {
    return {};
  }
  
  const packageJson: PackageJson = await fs.readJson(packageJsonPath);
  return {
    ...packageJson.dependencies,
    ...packageJson.devDependencies
  };
}

export async function installDependencies(packages: string[]): Promise<void> {
  if (packages.length === 0) return;
  
  const packageManager = await getPackageManager();
  const installedPackages = await getInstalledPackages();
  
  // Filter out already installed packages
  const packagesToInstall = packages.filter(pkg => !installedPackages[pkg]);
  
  if (packagesToInstall.length === 0) {
    console.log(chalk.green('✓ All dependencies already installed'));
    return;
  }
  
  const spinner = ora(`Installing dependencies with ${packageManager}...`).start();
  
  try {
    const installCommand = packageManager === 'yarn' ? 'add' : 'install';
    await execa(packageManager, [installCommand, ...packagesToInstall]);
    
    spinner.succeed(chalk.green(`✓ Installed: ${packagesToInstall.join(', ')}`));
  } catch (error) {
    spinner.fail(chalk.red(`✗ Failed to install dependencies`));
    throw error;
  }
}

export async function installUtilsDependencies(): Promise<void> {
  const utilsPackages = ['clsx', 'tailwind-merge'];
  await installDependencies(utilsPackages);
}

export async function parseImportsFromContent(content: string): Promise<string[]> {
  const dependencies: string[] = [];
  const importRegex = /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g;
  let match;
  
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    
    // Skip relative imports and @/ aliases
    if (!importPath.startsWith('.') && !importPath.startsWith('@/')) {
      // Extract package name (handle scoped packages)
      const packageName = importPath.startsWith('@') 
        ? importPath.split('/').slice(0, 2).join('/')
        : importPath.split('/')[0];
      
      if (!dependencies.includes(packageName)) {
        dependencies.push(packageName);
      }
    }
  }
  
  return dependencies;
}

export async function checkDependencyConflicts(newDeps: string[]): Promise<{ conflicts: string[]; warnings: string[] }> {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const conflicts: string[] = [];
  const warnings: string[] = [];
  
  if (!(await fs.pathExists(packageJsonPath))) {
    return { conflicts, warnings };
  }
  
  const packageJson: PackageJson = await fs.readJson(packageJsonPath);
  const existingDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  for (const dep of newDeps) {
    if (existingDeps[dep]) {
      // Check for potential version conflicts
      const existingVersion = existingDeps[dep];
      if (existingVersion.includes('^') || existingVersion.includes('~')) {
        warnings.push(`${dep} is already installed with version ${existingVersion}`);
      } else {
        conflicts.push(`${dep} has a pinned version ${existingVersion}`);
      }
    }
  }
  
  return { conflicts, warnings };
}

export async function installPeerDependencies(packageName: string): Promise<void> {
  try {
    const packageManager = await getPackageManager();
    const infoCommand = packageManager === 'yarn' ? 'info' : 'view';
    
    const result = await execa(packageManager, [infoCommand, packageName, 'peerDependencies', '--json']);
    const peerDeps = JSON.parse(result.stdout);
    
    if (peerDeps && Object.keys(peerDeps).length > 0) {
      const peerDepNames = Object.keys(peerDeps);
      console.log(chalk.blue(`Installing peer dependencies for ${packageName}: ${peerDepNames.join(', ')}`));
      await installDependencies(peerDepNames);
    }
  } catch {
    // Peer dependencies are optional, so don't fail if we can't get them
    console.log(chalk.gray(`Could not fetch peer dependencies for ${packageName}`));
  }
} 