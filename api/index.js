const express = require("express");
const app = express();

//Metrics
const metrics = require("../server/data/metrics");
const { getCpuUsage, getMemoryInfo, getStorageUsage, getNetworkSpeed } = metrics;

//Config
const { token: requiredToken, port: PORT } = require("../config.json");

//Chalk
const chalk = require("chalk");

// IP helper (optional)
const ip = require("ip");

app.get("/server-data-api", async (req, res) => {
    console.log(chalk.yellow("[ API ] Attempt to use the API"));
  try {
    //1. Check token from request headers.
    //Often sent as:  Authorization: Bearer YOUR_TOKEN
    const token = req.headers["authorization"];

    if (!token) {
        console.log(chalk.red("[ API ] No token provided."));
        return res.status(401).json({ error: "No token provided." });
    }
    if (token !== requiredToken) {
        console.log(chalk.red("[ API ] Invalid token provided."));
        return res.status(403).json({ error: "Invalid token." });
    }

    console.log(chalk.green("[ API ] Authorization successfull! Sent the servers spec data."));

    //2. Gather metrics.
    const cpuUsage = await getCpuUsage();
    const memoryInfo = await getMemoryInfo();
    const storageUsage = await getStorageUsage();
    const networkSpeed = await getNetworkSpeed();

    //3. Return as JSON.
    return res.json({
      cpuUsage,
      memoryInfo,
      storageUsage,
      networkSpeed,
    });
  } catch (err) {
    console.error(chalk.red("[ ERROR ] Error fetching server data:"), err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//4. Start listening on specified port.
app.listen(PORT, () => {
  console.log(chalk.green(`Server is running on port ${PORT}!`));

  //5. Display IP in the console.  
  //Use your IP + port + route for direct access.
  const ipAddress = ip.address();
  console.log(
    chalk.blue(
      `You can access the API at: http://${ipAddress}:${PORT}/server-data-api (Or the domain you configured on the server)\n` +
      `Use the token: ${requiredToken} in the Authorization header.`
    )
  );
});
