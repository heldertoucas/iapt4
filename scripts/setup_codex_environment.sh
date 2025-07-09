#!/bin/bash
# Set up useful packages for the ChatGPT Codex environment
# Installs missing system dependencies and project npm packages.

set -e

# Update package list if apt-get is available
if command -v apt-get >/dev/null 2>&1; then
  echo "Updating apt package list..."
  sudo apt-get update -y
  # Install tree if not present
  if ! command -v tree >/dev/null 2>&1; then
    echo "Installing tree package..."
    sudo apt-get install -y tree
  fi
else
  echo "apt-get not available. Skipping system package installation."
fi

# Ensure Node.js is available
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is required but not found. Please install Node.js."
  exit 1
fi

# Install npm dependencies only if node_modules is missing
if [ ! -d node_modules ]; then
  echo "Installing npm dependencies..."
  npm install
else
  echo "npm dependencies already installed."
fi

echo "Environment setup complete."
