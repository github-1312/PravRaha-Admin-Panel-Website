import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // server: {
  //   proxy: {
  //     '/auth': {
  //       target: 'https://node.pravraha.com',
  //       changeOrigin: true,
  //       secure: false, // Bypass SSL certificate issues locally
  //     },
  //     '/socket.io': {
  //       target: 'wss://node.pravraha.com',
  //       ws: true, // Enables WebSockets
  //       changeOrigin: true,
  //     }
  //   }
  // }
});
