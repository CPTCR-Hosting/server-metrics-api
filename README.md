# Server Metrics API

This repository provides an API for gathering real-time server metrics:

1. **CPU Usage**  
2. **Memory (RAM) Usage**  
3. **Storage Usage**  
4. **Network Speed** (using `speedtest-cli`)  

The API is built using **Node.js** and **Express**.

---

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Systemd Service Management](#systemd-service-management)
- [Contributing](#contributing)
- [License](#license)

---

## Features

1. **Secure Access with Token**  
   - Configurable token-based authentication via `config.json`.

2. **Modular Code**  
   - All metrics logic is in `metrics.js` (or similar).  
   - Easily expandable for additional endpoints.

3. **Automatic Startup (Optional)**  
   - Includes a sample systemd unit file (`server-metrics-api.service`) to run the API on system boot.

---

## Requirements

- **Ubuntu/Debian** system (tested on Ubuntu 24.04 LTS).
- **Node.js 16.x or higher**  
- **speedtest-cli** (Python-based)
- **git**, **curl**, etc.  
- **Systemd** (most modern distros have this by default).

---

## Installation

We provide a convenient shell script [`install.sh`](https://github.com/CPTCR-Hosting/server-metrics-api/blob/main/install.sh) that:

1. Installs prerequisites (Node.js, `speedtest-cli`, etc.).  
2. Clones this repository into `/opt/server-metrics-api/`.  
3. Runs `npm install` to fetch Node.js dependencies.  
4. (Optional) Creates a systemd service so the API runs automatically on boot.

### Running the Installer

```bash
# 1. Download the script
curl -fsSL https://raw.githubusercontent.com/CPTCR-Hosting/server-metrics-api/main/install.sh -o install.sh

# 2. Make it executable
chmod +x install.sh

# 3. Run with sudo or root privileges
sudo ./install.sh
```

After the script finishes, you can check if the service is running:

```bash
systemctl status server-metrics-api
```

---

## Usage

1. **API Port and Token**  
   - Adjust `port` and `token` in `config.json`.
   - Example default port is `3000`.

2. **Access the API**  
   - `http://YOUR_SERVER_IP:3000/server-data-api`
   - Include your token in the `Authorization` header (e.g., `Authorization: mysecret`).

3. **Logs & Debugging**  
   - You can view real-time logs:  
     ```bash
     journalctl -u server-metrics-api -f
     ```

---

## Systemd Service Management

The installer creates a systemd unit file:  
`/etc/systemd/system/server-metrics-api.service`

You can manage the service with:

```bash
# Check status
systemctl status server-metrics-api

# Stop service
sudo systemctl stop server-metrics-api

# Restart service (after updating code/config)
sudo systemctl restart server-metrics-api

# View logs in real time
journalctl -u server-metrics-api -f
```

---

## Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository  
2. Create a new feature branch (`git checkout -b feature-branch`)  
3. Commit changes (`git commit -am 'Add a feature'`)  
4. Push to the branch (`git push origin feature-branch`)  
5. Create a new Pull Request

---

## License

This project is available under the [MIT License](LICENSE). You’re free to use it, fork it, and modify it. See the `LICENSE` file for details.

---

**Enjoy your Server Metrics API!**
```

You can adjust any sections (version requirements, feature descriptions, etc.) as needed for your particular setup.
