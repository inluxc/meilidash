<template>
  <div class="search">
    <h1>Search</h1>
  </div>
  <n-card>
    <ais-instant-search
      :search-client="searchClient"
      :index-name="selectedIndex"
    >
      <ais-search-box />
      <ais-hits>
        <template v-slot:item="{ item }">
          <h2>{{ item.name }}</h2>
        </template>
      </ais-hits>
      <ais-pagination />
    </ais-instant-search>
  </n-card>
</template>
<script lang="ts">
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { useServerStore } from "@/stores/server";
import { useIndexStore } from "@/stores/indexes";
const server = useServerStore();
const indexStore = useIndexStore();
const apiKey = server.getServerData.masterkey;
const selectedIndex = indexStore.getIndex;
const domain = server.getServerData.domain;
export default {
  data() {
    return {
      selectedIndex: selectedIndex,
      searchClient: instantMeiliSearch(domain, apiKey),
    };
  },
};
</script>

<style></style>
