import config from '../config.js';

const waitUntilApiReady = async () => new Promise((resolve, reject) => {
  console.log('INFO: Waiting for API to be available...');
  let availableRetries = 10;
  const interval = setInterval(async () => {
    if (availableRetries < 1) {
      console.error('ERROR: Unable to reach the API.');
      clearInterval(interval);
      return reject('Unable to reach the API.');
    }

    try {
      const res = await fetch(`${config.apiBase}/health`);
      if (res.ok) {
        resolve();
        clearInterval(interval);
      }
    } catch (err) {
      console.log(err);
      console.log(`INFO: API not yet available. Retrying in 5s... (${availableRetries} retr${availableRetries === 1 ? 'y' : 'ies'} left)`);
      availableRetries--;
    }
  }, 5000);
});

export default waitUntilApiReady;