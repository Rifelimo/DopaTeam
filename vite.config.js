import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({plugins:[react()],base:'./',build:{outDir:'prototype-dist',rollupOptions:{input:['index.html','impact.html','hackathon.html','prototype.html']}}});
