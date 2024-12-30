const si = require('systeminformation');
const { exec } = require('child_process');

/**
 * Retrieves memory information:
 * total, free, used, active, available, etc.
 * @returns {Promise<object>}
*/
async function getMemoryInfo() {
  const mem = await si.mem();
  return {
    total: mem.total,       //in bytes
    free: mem.free,         //in bytes
    used: mem.used,         //in bytes
    active: mem.active,     //actively used memory (bytes)
    available: mem.available,
  };
}

/**
 * Gets current CPU load (averaged percentage).
 * @returns {Promise<object>}
*/
async function getCpuUsage() {
  const load = await si.currentLoad();
  return {
    avgLoad: load.avgLoad,               //Average load across cores
    currentLoad: load.currentLoad,       //Overall % CPU load
    currentLoadUser: load.currentLoadUser,
    currentLoadSystem: load.currentLoadSystem,
  };
}

/**
 * Retrieves storage usage (file system sizes).
 * @returns {Promise<object[]>}
*/
async function getStorageUsage() {
  const fsData = await si.fsSize();
  return fsData.map((disk) => ({
    fs: disk.fs,
    type: disk.type,
    size: disk.size,            //total in bytes
    used: disk.used,            //used in bytes
    available: disk.size - disk.used,
    usePercentage: disk.use,    //usage % (0-100)
  }));
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
  
          resolve({ download, upload, ping });
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
