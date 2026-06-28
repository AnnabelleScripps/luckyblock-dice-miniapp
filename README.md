# LuckyBlock Dice

LuckyBlock Dice is a Base Mini App for an onchain commit-and-reveal dice interaction with score tracking.

Repository: https://github.com/AnnabelleScripps/luckyblock-dice-miniapp.git

## Overview

LuckyBlock Dice provides a compact dice experience designed for the Base Mini App environment.

The project centers on a commit-and-reveal flow, where a dice interaction is submitted and later revealed onchain.

It also includes score tracking so play results can be recorded and displayed by the app.

## Features

- Base Mini App structure.
- Onchain commit-and-reveal dice interaction.
- Score tracking for dice results.
- Configuration placeholders for deployment-specific values.
- A focused project scope suitable for a small interactive app.

## Project Goals

- Keep the dice interaction transparent.
- Separate app configuration from source code.
- Support a simple user experience around rolling and tracking results.
- Provide a clean foundation for continued development.

## Repository

Clone the repository from GitHub:

`git clone https://github.com/AnnabelleScripps/luckyblock-dice-miniapp.git`

Then move into the project directory:

`cd luckyblock-dice-miniapp`

## Setup

Install project dependencies using the package manager used by the repository.

For example, if the project uses npm:

`npm install`

If the project uses another package manager, use the matching install command for the lockfile included in the repository.

## Configuration

Before running the app, replace the placeholder values with the correct project-specific settings.

The original placeholder values include:

- `LUCKYBLOCKDICESECURE_CONTRACT_ADDRESS_PLACEHOLDER`
- `BASE_APP_ID_PLACEHOLDER`
- `TALENT_VERIFICATION_PLACEHOLDER`
- `BUILDER_CODE_PLACEHOLDER`

Use environment variables or your deployment platform鈥檚 configuration settings to provide these values.

Do not hard-code sensitive or deployment-specific values directly into source files.

## Running Locally

After installing dependencies and configuring required values, start the local development server.

If the project uses npm, the command may be:

`npm run dev`

Then open the local URL shown in your terminal.

## Building

To create a production build, use the build command defined in the project scripts.

If the project uses npm, the command may be:

`npm run build`

Review the build output and resolve any configuration issues before deployment.

## Usage

1. Open the LuckyBlock Dice Mini App.
2. Start a dice interaction.
3. Commit the dice action onchain.
4. Complete the reveal step when prompted.
5. View the resulting dice outcome.
6. Check the updated score tracking display.

## Commit-and-Reveal Flow

The app is designed around a commit-and-reveal pattern.

In this model, a commitment is made first.

The result is revealed later in a separate step.

This helps structure the dice interaction in a way that is appropriate for onchain execution.

## Score Tracking

LuckyBlock Dice includes score tracking as part of the gameplay experience.

Scores can be used to show recent outcomes, progress, or related game state depending on the implementation.

## Development Notes

Keep configuration values outside the committed source whenever possible.

Verify that contract addresses and app identifiers match the intended environment.

Test the full commit-and-reveal flow before publishing changes.

Confirm that score tracking updates correctly after each completed dice interaction.

## Deployment Notes

Configure all required deployment values before publishing the app.

Check that the Base Mini App settings match the deployed app URL.

Run a production build locally when possible before deploying.

Review the deployed version after release to confirm that the dice flow works end to end.

## Troubleshooting

If the app does not start, confirm that dependencies were installed successfully.

If configuration errors appear, check that all required placeholder values have been replaced.

If the dice interaction fails, verify the configured contract address.
