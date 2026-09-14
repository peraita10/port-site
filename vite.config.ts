import {defineConfig} from 'vite';
export default defineConfig({base:'/port-site/',server:{proxy:{'/api':'http://127.0.0.1:3000'}}});
