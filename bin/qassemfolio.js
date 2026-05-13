#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { generatePortfolio } from '../src/generator.js';

const program = new Command();

program
  .name('qassemfolio')
  .description('Generate a clean developer portfolio from a GitHub username.')
  .argument('[username]', 'GitHub username')
  .option('-o, --out <dir>', 'output directory', './qassemfolio-site')
  .option('-t, --theme <theme>', 'theme: default | terminal', 'default')
  .option('--no-open', 'do not print preview instructions')
  .action(async (username, options) => {
    const finalUsername = username || process.env.GITHUB_USERNAME;

    if (!finalUsername) {
      console.log(chalk.red('Missing GitHub username.'));
      console.log(chalk.gray('Example: npx qassemfolio qassemadra'));
      process.exit(1);
    }

    const spinner = ora(`Building portfolio for ${finalUsername}...`).start();

    try {
      const result = await generatePortfolio({
        username: finalUsername,
        outDir: options.out,
        theme: options.theme
      });

      spinner.succeed('Portfolio generated successfully.');
      console.log(chalk.green(`\nDone: ${result.outDir}`));
      console.log(chalk.cyan(`Open: ${result.indexPath}`));
      if (options.open) {
        console.log(chalk.gray('\nPreview locally:'));
        console.log(chalk.white(`  cd ${result.outDir}`));
        console.log(chalk.white('  npx serve .'));
      }
    } catch (error) {
      spinner.fail('Failed to generate portfolio.');
      console.error(chalk.red(error.message));
      process.exit(1);
    }
  });

program
  .command('roast')
  .description('Fun GitHub profile roast mode.')
  .argument('<username>', 'GitHub username')
  .action(async (username) => {
    console.log(chalk.magenta(`Roasting @${username}...`));
    console.log(chalk.gray('Your portfolio is so empty even GitHub Pages refused to deploy it 💀'));
  });

program.parse();
