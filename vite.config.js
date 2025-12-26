import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

export default defineConfig(({ mode }) => {
  // 加载环境变量：true 表示加载 process.env 中的所有变量
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [vue(), vueDevTools()],
    // 适配 CF Pages：将环境变量在构建阶段注入为全局常量
    define: {
      __APP_CONFIG__: JSON.stringify({
        socket: env.SOCKETURL || "ws://192.168.31.64:3000/ws",
        apiURL: env.APIURL || "http://192.168.31.64:3000",
      }),
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    // 确保构建产物适合静态托管
    build: {
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: false,
    },
  };
});
