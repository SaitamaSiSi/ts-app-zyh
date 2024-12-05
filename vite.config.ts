import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "src/common/theme.scss" as *;
        @use "src/common/common.scss" as *;
        `,
      },
    },
  },
});
