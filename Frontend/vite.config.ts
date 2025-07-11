import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true, // Automatically opens the bundle analysis report
      filename: 'bundle-analysis.html', // Output file name
      gzipSize: true, // Show gzip size
      brotliSize: true, // Show brotli size
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor modules into separate chunks
          react: ['react', 'react-dom', 'react-router-dom'],
          mui: [
            '@mui/material',
            '@mui/icons-material',
            '@mui/system',
            '@emotion/react',
            '@emotion/styled'
          ],
          vendors: ['axios', 'react-hot-toast'],
          animation: ['react-type-animation'],
          syntax: ['react-syntax-highlighter'],
        },
      },
    },
    chunkSizeWarningLimit: 1500, // Set warning limit to 1500KB
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@mui/material',
      '@mui/icons-material',
      'react-router-dom'
    ],
  },
});