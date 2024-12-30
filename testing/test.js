const { getCpuUsage, getMemoryInfo, getStorageUsage, getNetworkSpeed } = require("../server/data/metrics");

(async () => {
    try {
      console.log('CPU Usage:', await getCpuUsage());
      console.log('Memory Info:', await getMemoryInfo());
      console.log('Storage Usage:', await getStorageUsage());
      console.log('Network Speed:', await getNetworkSpeed());
    } catch (err) {
      console.error('Error gathering metrics:', err);
    }
})();
  