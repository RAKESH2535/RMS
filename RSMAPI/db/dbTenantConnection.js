const mongoose = require("mongoose");

const dbTenantConnection = (dbName) => {
  if (!dbName) {
    console.error("Error: Tenant database name not provided");
    throw new Error("Tenant database name is required");
  }

  try {
    const tenantDb = mongoose.connection.useDb(`tenantDb_${dbName}`, {
      useCache: true,
    });

    console.log(
      `Successfully connected to tenant database: tenantDb_${dbName}`
    );
    return tenantDb;
  } catch (error) {
    console.error(
      `Failed to connect to tenant database: tenantDb_${dbName}`,
      error
    );
    throw new Error("Database connection failed");
  }
};

module.exports = dbTenantConnection;
