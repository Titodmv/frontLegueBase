// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";
import { envField } from 'astro/config';
import 'dotenv/config';


// https://astro.build/config
export default defineConfig({
    output: "server",
    adapter: cloudflare(),
    vite: {
        plugins: [tailwindcss()],
    },
    env: {
    schema: {
        USER: envField.string({ context: 'server', access: 'secret'}),
        API_KEY: envField.string({ context: 'server', access:'secret'}),
        API_URL: envField.string({ context: 'server', access: 'secret'}),
    }
  },
});
