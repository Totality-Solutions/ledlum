import { PRODUCT_METADATA } from './productMetadata.js';
import { PRODUCT_CONFIGS } from './productConfigs.js';

/**
 * Combines product metadata and configuration data into a single object.
 * * @param {Object} metadata - The object containing categories, heroes, galleries, etc.
 * @param {Object} configs - The object containing configs and permutations.
 * @returns {Object} The combined monolithic product database.
 */
export const buildProductDatabase = (metadata, configs) => {
  const combinedDatabase = {};
  
  // Get unique keys from both objects just in case one has a product the other doesn't
  const productKeys = new Set([
    ...Object.keys(metadata), 
    ...Object.keys(configs)
  ]);

  productKeys.forEach(key => {
    combinedDatabase[key] = {
      ...(metadata[key] || {}),
      ...(configs[key] || {})
    };
  });

  return combinedDatabase;
};

// Export the final assembled database
export const PRODUCT_DATABASE = buildProductDatabase(PRODUCT_METADATA, PRODUCT_CONFIGS);