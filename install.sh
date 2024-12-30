#!/usr/bin/env bash
#
# Installer for CPTCR-Hosting/server-metrics-api
# Installs in the current directory,
# applies optional token/port from environment variables,
# and starts the server in the background.
#
# Usage:
#   sudo ./install.sh
# Optional environment variables:
#   API_TOKEN="myToken" API_PORT="3022" sudo ./install.sh

set -e  # Exit on any error
export DEBIAN_FRONTEND=noninteractive

# Set INSTALL_PATH to the current directory
INSTALL_PATH="$(pwd)"

# 1) Update apt quietly, but show a brief message
echo "==> [1/8] Updating package list..."
apt-get update -qq -y

# 2) Install required packages quietly, showing a status line
echo "==> [2/8] Installing git, curl, speedtest-cli..."
apt-get install -qq -y git curl speedtest-cli

# 3) Install Node.js 22.x quietly
echo "==> [3/8] Installing Node.js 22.x..."
curl -s https://deb.nodesource.com/setup_22.x | bash - >/dev/null 2>&1
apt-get install -qq -y nodejs

# 4) Remove old folder if it exists, then clone the repo
echo "==> [4/8] Cloning server-metrics-api into ${INSTALL_PATH}..."
rm -rf "$INSTALL_PATH"
git clone https://github.com/CPTCR-Hosting/server-metrics-api.git "$INSTALL_PATH" >/dev/null 2>&1

# 5) Install Node.js dependencies (including chalk@4.1.0)
echo "==> [5/8] Installing Node.js dependencies..."
cd "$INSTALL_PATH"
npm install chalk@4.1.0 --silent
npm install --silent

# 6) Update config.json if present, using environment variables
echo "==> [6/8] Configuring token/port if specified..."
if [ -f "config.json" ]; then
  # If API_TOKEN is set, replace the "token" field in config.json
  if [ -n "$API_TOKEN" ]; then
    sed -i "s/\"token\": *\"[^\"]*\"/\"token\": \"$API_TOKEN\"/" config.json
    echo "    - Set token to: $API_TOKEN"
  fi

  # If API_PORT is set, replace the "port" field in config.json
  if [ -n "$API_PORT" ]; then
    sed -i "s/\"port\": *[0-9][0-9]*/\"port\": $API_PORT/" config.json
    echo "    - Set port to: $API_PORT"
  fi
else
  echo "    - WARNING: No config.json found; skipping token/port update."
fi

# 7) Validate essential files
echo "==> [7/8] Checking required files..."
if [ ! -f "api/index.js" ]; then
  echo "ERROR: api/index.js not found. Please confirm your repo structure."
  exit 1
fi

# 8) Start the server in the background, discarding logs
echo "==> [8/8] Starting the server in the background..."
nohup node api/index.js >/dev/null 2>&1 &

# Final message
echo "--------------------------------------------------"
echo "Installation complete! Your server is running in the background."
echo "To verify it's running, you can use 'pgrep -a node' or set up logs."
echo "--------------------------------------------------"