const si = require('systeminformation');
const { exec } = require('child_process');

/**
 * Retrieves memory information:
 * RAM: usedMegabytes/AvailableGigabytes
 * @returns {Promise<string>}
 */
async function getMemoryInfo() {
  const mem = await si.mem();
  const usedMegabytes = (mem.used / (1024 * 1024)).toFixed(2); // Convert bytes to MB
  const availableGigabytes = (mem.available / (1024 * 1024 * 1024)).toFixed(2); // Convert bytes to GB
  return `RAM: ${usedMegabytes}MB/${availableGigabytes}GB`;
}

/**
 * Retrieves storage usage:
 * Storage: storageUsedGB/storageTotalGB
 * @returns {Promise<string[]>}
 */
async function getStorageUsage() {
  const fsData = await si.fsSize();
  return fsData.map((disk) => {
    const storageUsedGB = (disk.used / (1024 * 1024 * 1024)).toFixed(2); // Convert bytes to GB
    const storageTotalGB = (disk.size / (1024 * 1024 * 1024)).toFixed(2); // Convert bytes to GB
    return `Storage: ${storageUsedGB}GB/${storageTotalGB}GB`;
  });
}

/**
 * Gets current CPU load:
 * CPU: usedCpu%/maxCpu%
 * @returns {Promise<string>}
 */
async function getCpuUsage() {
  const load = await si.currentLoad();
  const usedCpu = load.currentLoad.toFixed(2); // Current CPU load percentage
  const maxCpu = 100; // Assuming max CPU load is 100%
  return `CPU: ${usedCpu}%/${maxCpu}%`;
}

/**
 * Runs the Python-based `speedtest-cli --json` command
 * and returns download, upload, and ping.
 * - download/upload are in bits per second
 * - ping is in milliseconds
 *
 * @returns {Promise<{ download: number, upload: number, ping: number }>}
 */
async function getNetworkSpeed() {
  return new Promise((resolve, reject) => {
    // speedtest-cli with JSON output
    exec('speedtest-cli --json', (error, stdout) => {
      if (error) {
        return reject(error);
      }

      try {
        const data = JSON.parse(stdout);

        // speedtest-cli JSON format typically has:
        // download (bits/s), upload (bits/s), ping (ms)
        const download = data.download || 0; 
        const upload = data.upload || 0;
        const ping = data.ping || 0;

        resolve({ 
          upload: `Upload Speed: ${upload}`, 
          download: `Download Speed: ${download}`, 
          ping: `Ping: ${ping}` 
        });
      } catch (err) {
        reject(err);
      }
    });
  });
}

module.exports = {
  getMemoryInfo,
  getCpuUsage,
  getStorageUsage,
  getNetworkSpeed,
};