#!/usr/bin/env bash
#
# Installer script for CPTCR-Hosting/server-metrics-api
# Installs in /opt/server-metrics-api (or your chosen path), then starts the server.

set -e  # Exit on any error

# Check if running as root/sudo
if [[ $EUID -ne 0 ]]; then
  echo "Please run this installer with sudo or as root."
  exit 1
fi

# You can change the default install path here:
INSTALL_PATH="/opt/server-metrics-api"

echo "==> Updating package list..."
apt-get update -y

echo "==> Installing required packages (git, curl, speedtest-cli)..."
apt-get install -y git curl speedtest-cli

echo "==> Installing Node.js 16.x..."
curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
apt-get install -y nodejs

# If the folder already exists, we can remove or update it:
if [ -d "$INSTALL_PATH" ]; then
  echo "==> The folder $INSTALL_PATH already exists. Removing..."
  rm -rf "$INSTALL_PATH"
fi

echo "==> Cloning server-metrics-api into $INSTALL_PATH..."
git clone https://github.com/CPTCR-Hosting/server-metrics-api.git "$INSTALL_PATH"

echo "==> Installing Node.js dependencies (including chalk@4.1.0) in $INSTALL_PATH..."
cd "$INSTALL_PATH"
npm install chalk@4.1.0
npm install

echo "==> Installation complete!"
echo "--------------------------------------------------------"
echo "Installation Path: $INSTALL_PATH"
echo "Starting the server in the foreground..."
echo "Press Ctrl+C to stop the server."
echo "--------------------------------------------------------"

# Remain in this folder and run the server
node src/index.js
