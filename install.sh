#!/usr/bin/env bash
#
# Installer script for CPTCR-Hosting/server-metrics-api
# Installs the repo in the current directory, then runs the server.

set -e  # Exit on any error

# Check if running as root/sudo
if [[ $EUID -ne 0 ]]; then
  echo "Please run this installer with sudo or as root."
  exit 1
fi

echo "==> Updating package list..."
apt-get update -y

echo "==> Installing required packages (git, curl, speedtest-cli)..."
apt-get install -y git curl speedtest-cli

echo "==> Installing Node.js 22.x..."
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install -y nodejs

echo "==> Cloning or updating server-metrics-api in the current directory..."
if [ -d .git ]; then
  echo "Git repository detected. Pulling latest changes..."
  git pull origin main
else
  echo "No .git directory found. Cloning repository here..."
  git clone https://github.com/CPTCR-Hosting/server-metrics-api.git .
fi

echo "==> Installing dependencies (including chalk@4.1.0)..."
npm install chalk@4.1.0
npm install

echo "==> Installation complete!"
echo "--------------------------------------------------------"
echo "The repo is now installed in the current directory."
echo "Running the server in the foreground..."
echo "Press Ctrl+C to stop the server."
echo "--------------------------------------------------------"

node src/index.js