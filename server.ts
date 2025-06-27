import payload from 'payload';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

async function start() {
  const payloadConfig = (await import('./payload.config.js')).default;
  await payload.init({
    config: payloadConfig,
    onInit: () => {
      console.log('Payload initialized!');
    },
  });

  // Payload's built-in server will start automatically
}

start(); 