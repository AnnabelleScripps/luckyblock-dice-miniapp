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
