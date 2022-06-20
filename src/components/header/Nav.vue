<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/search" v-if="serverStatus">Search</RouterLink>
    <RouterLink to="/settings" v-if="serverStatus">Settings</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>
</template>
<script lang="ts">
import { RouterLink } from "vue-router";
import { defineComponent, computed } from "vue";
import { useServerStore } from "@/stores/server";

export default defineComponent({
  name: "HeaderNav",
  component: {
    RouterLink,
  },
  setup() {
    const server = useServerStore();
    let serverStatus = computed(function () {
      return server.server.status == "online" ? true : false;
    });
    return {
      serverStatus: serverStatus,
    };
  },
});
</script>
