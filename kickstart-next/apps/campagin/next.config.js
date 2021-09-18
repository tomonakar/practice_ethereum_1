// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
require('dotenv');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
    webpack5: false,
    env: {
      MNEMONIC: process.env.PRIVATE_KEY,
      PRIVATE_KEY: process.env.PRIVATE_KEY,
      NETWORK: process.env.NETWORK,
      ADDRESS: process.env.ADDRESS,
    },
  },
};

module.exports = withNx(nextConfig);
