<script setup lang="ts">
import { RouterView } from "vue-router";
import { NIcon } from "naive-ui";
import {
  Menu as MenuIcon,
  OverflowMenuVertical as OverflowMenuVerticalIcon,
} from "@vicons/carbon";

// Verify if server is available
import { callApi } from "@/api/api";
import { useServerStore } from "@/stores/server";
import Logo from "./components/Logo.vue";
import Nav from "./components/header/Nav.vue";
import Config from "./components/config/Index.vue";

const server = useServerStore();
setInterval(async () => {
  if (
    server.getServerData.domain != "" &&
    server.getServerData.masterkey != ""
  ) {
    try {
      const { client } = await callApi();
      const version = await client.getVersion();
      server.setStatus("online");
      server.setVersion(version.pkgVersion);
    } catch (e) {
      server.setStatus("offline");
      server.setVersion("");
      console.log(e);
    }
  }
}, 5000);
</script>

<template>
  <n-message-provider>
    <n-space
      justify="space-between"
      style="
        margin: 15px 0;
        -webkit-box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.11);
        -moz-box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.11);
        box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.11);
        padding: 0 20px;
      "
    >
      <n-button text>
        <template #icon>
          <n-icon>
            <MenuIcon />
          </n-icon>
        </template>
      </n-button>
      <Logo />
      <Config />
    </n-space>
    <n-space vertical>
      <n-loading-bar-provider>
        <n-layout has-sider>
          <Nav />
          <n-layout id="content-container">
            <RouterView :key="$route.fullPath" />
          </n-layout>
        </n-layout>
      </n-loading-bar-provider>
    </n-space>
  </n-message-provider>
</template>

<style>
#content-container {
  padding: 0 20px;
  min-height: 90.5vh;
}

#content-container h1 {
  margin-top: 0;
}
</style>
