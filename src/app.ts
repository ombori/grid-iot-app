import { connect, signals } from '@ombori/ga-module';

import { Settings } from './schema.js';

// TODO: Update 'name' field in package.json with 'organisation-name.module-name' identifier
// TODO: Update 'description' field in package.json with module's descriptive name
// TODO: Update 'container-registry' field in package.json with your container registry hostname
// TODO: Create .env file with <your-registry>_USERNAME and <your-registry>_PASSWORD values

const module = await connect<Settings>();

// Sample Grid Signals event
// See more: https://developer.omborigrid.com/#/grid-signals/edge-modules-integration
await signals.detectMood({ mood: 'HAPPY', certainty: 90 });

// TODO: insert your code here

// Example of settings handling
console.log(`testSetting value is ${module.settings.testSetting}`);
module.onSettings(settings => {
  console.log('settings updated:', settings)
});

// In this example we send TestModule.Event message every second
let seq = 0;
setInterval(() => {
  module.broadcast('MyModule.Event', { some: 'data', seq });
  seq += 1;
}, 1000);

// Example of module method
module.onMethod('someMethod', async (payload) => {
  console.log('Received method call', payload);
  return 'hello there';
})

// Example of an event coming from app or another module
module.onEvent('Test.Event', async (data) => {
  console.log('Received event', data);
});

// Example of MQTT topic subscription
module.subscribe('ombori', (data, topic) => {
  console.log(`Incoming MQTT data on ${topic}:`, data.toString());
});

// Example of publishing to MQTT topic
let mqttSeq = 0;
setInterval(() => {
  module.publish('ombori', `hello ${mqttSeq}`);
  mqttSeq += 1;
}, 1000);