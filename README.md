# Server Metrics API

This repository provides a Node.js and Express-based API to gather real-time server metrics:

- **CPU Usage**  
- **Memory (RAM) Usage**  
- **Storage Usage**  
- **Network Speed** (via `speedtest-cli`)

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Logs & Debugging](#logs--debugging)
- [Contributing](#contributing)
- [License](#license)

---

## Features

1. **Secure Access with Token**  
   - A token-based authentication flow is set up via `config.json` (e.g., `port` and `token`).

2. **Lightweight & Modular**  
   - All metric-gathering code is modularized in `metrics.js`.  
   - Easily expandable for additional endpoints or metrics.

3. **Automatic Installation Script**  
   - `install.sh` handles installing prerequisites (Node.js 16.x, `speedtest-cli`, `git`, `curl`), cloning or updating this repository in the **current** directory, installing dependencies, and then **running** the server immediately.

---

## Requirements

- **Ubuntu/Debian** server (tested on Ubuntu 24.04 LTS)  
- **Node.js 16.x** or higher (automatically installed by `install.sh`)  
- **speedtest-cli** (Python-based, automatically installed by `install.sh`)  
- **git**, **curl** (also installed by `install.sh`)  
- **Systemd** (already present on most modern distros)

---

## Installation

To install and run the Server Metrics API in the **current directory**:

1. Download the installer script (e.g., from GitHub’s raw link):
   ```bash
   curl -fsSL https://raw.githubusercontent.com/CPTCR-Hosting/server-metrics-api/main/install.sh -o install.sh
   ```
2. Make it executable:
   ```bash
   chmod +x install.sh
   ```
3. Run it with `sudo` or as root:
   ```bash
   sudo ./install.sh
   ```

**What the script does**:
- Updates package lists, installs Node.js 16.x, `git`, `curl`, `speedtest-cli`.
- Clones (or pulls) the `server-metrics-api` repository **into the current folder**.
- Installs all Node dependencies (including `chalk@4.1.0`).
- **Immediately runs** `node src/index.js` in the foreground after installation.

> **Note**: If you want the server to keep running in the background or start on reboot, you can later configure a **systemd** service or a process manager like **pm2**.

---

## Usage

After installation completes, the installer script launches the server in the foreground. Use **Ctrl+C** to stop it. To manually restart it later:

```bash
cd /path/to/server-metrics-api   # if not already there
node src/index.js
```

### API Endpoints

- **GET** `/server-data-api`  
  - Requires an **Authorization** header matching the token defined in `config.json`.  
  - Returns a JSON response with CPU, Memory, Storage, and Network Speed data.

#### Example Request

```bash
curl -H "Authorization: my_token_here" http://localhost:3000/server-data-api
```

---

## Logs & Debugging

Since this repository simply uses `node src/index.js` to run, your logs will appear in the terminal. If you want more advanced logging:

1. Use a **process manager** like **pm2** or **forever**.  
2. Create a **systemd service** to capture logs via `journalctl`.

---

## Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to open a pull request or file an issue on GitHub.

1. **Fork** the repository.  
2. Create a **feature branch**: `git checkout -b feature-name`.  
3. Commit your changes: `git commit -m 'Add a feature'`.  
4. Push your branch: `git push origin feature-name`.  
5. Open a **Pull Request**.

---

## License

This project is available under the [MIT License](LICENSE). You’re free to use it, fork it, and modify it. See the `LICENSE` file for details.

---

**Enjoy your Server Metrics API!**
```
