# Server Metrics API

This repository provides a Node.js + Express API to fetch essential server metrics, including:

- **CPU Usage**  
- **Memory (RAM) Usage**  
- **Storage Usage**  
- **Network Speed** (via `speedtest-cli`)  

[![GitHub all releases](https://img.shields.io/github/downloads/CPTCR-Hosting/server-metrics-api/total.svg)](https://github.com/CPTCR-Hosting/server-metrics-api/releases)


---

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features

1. **Secure Token-Based Access**  
   - A token set in `config.json` (or updated during installation) restricts unauthorized requests.

2. **Customizable Port**  
   - Choose your desired port in `config.json` or via the installer prompt.

3. **Endpoints**  
   - **GET** `/server-data-api` – returns JSON with CPU, RAM, Storage, and Network Speed data.

4. **Automatic Installer**  
   - A single `install.sh` script that installs all dependencies, clones the repo, configures your token/port, and runs the server.

---

## Requirements

- **Ubuntu/Debian** system (e.g., Ubuntu 24.04 LTS).  
- **sudo** or root privileges to run the installer (since it installs system packages).  
- **Node.js 16.x** or higher (automatically installed via the installer).  
- **speedtest-cli** (also installed by the script).  
- **git**, **curl** (installed by the script).  

---

## Project Structure

Below is a simplified view of how the code is organized:

```
.
├─ api/
│  └─ index.js          # Main server entry point
├─ server/
│  └─ data/
│     └─ metrics.js     # Logic for gathering CPU, RAM, Storage, and Network Speed
├─ testing/
│  └─ test.js           # Example tests (if any)
├─ config.json          # Holds default port/token
├─ install.sh           # Installer script
├─ package.json
├─ package-lock.json
└─ README.md
```

---

## Installation

1. **Download** and **run** the installer script:
   ```bash
   # Move into a temporary directory or your preferred location
   cd /tmp

   # Download the install script
   curl -fsSL https://raw.githubusercontent.com/CPTCR-Hosting/server-metrics-api/main/install.sh -o install.sh

   # Make it executable
   chmod +x install.sh

   # Run it with sudo
   sudo ./install.sh
   ```

2. **Enter Token & Port (Optional)**  
   - During installation, the script prompts you for a **token** and **port**.  
   - If you press Enter without typing anything, it keeps the defaults in `config.json`.

3. **Foreground Launch**  
   - After installing dependencies and updating `config.json`, the installer **automatically starts** `node api/index.js` in the **foreground**.  
   - Press **Ctrl + C** to stop the server.

---

## Usage

- **Default Port**: The API typically listens on `3000` (or whatever you set in `config.json` or during the installer prompt).  
- **Token**: The API expects an `Authorization` header matching the token in `config.json`.  

### Example Request

```bash
curl -H "Authorization: your_token_here" http://YOUR_SERVER_IP:3000/server-data-api
```

You should receive a JSON response with server metrics. Adjust the port/token to match your configuration.

---

## Contributing

Contributions, bug reports, and feature requests are welcome!

1. **Fork** the repo.  
2. Create a **new branch**: `git checkout -b feature-branch`.  
3. Commit changes: `git commit -am 'Add new feature'`.  
4. Push to your branch: `git push origin feature-branch`.  
5. Open a **Pull Request** on GitHub.

---

## License

This project is available under the [MIT License](LICENSE). You are free to use, modify, and distribute this software. See the `LICENSE` file for more details.

---

**Enjoy your Server Metrics API!**