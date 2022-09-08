<template>
  <h4>{{ title }}</h4>
  <div>
    <n-dynamic-input
      v-model:value="value"
      placeholder="Please type here"
      show-sort-button
      :min="1"
      :max="100"
    />
    <n-form-item>
      <n-button @click="saveData()" v-if="dataChanged">Save</n-button>
    </n-form-item>
  </div>
</template>

<script lang="ts">
import type { Synonyms } from "meilisearch";
import { defineComponent, ref, onMounted, useAttrs } from "vue";
import { useLoadingBar } from "naive-ui";
import { callApi } from "@/api/api";

export default defineComponent({
  watch: {
    value: {
      handler() {
        this.dataChanged =
          JSON.stringify(this.value) !== JSON.stringify(this.defaultData);
      },
      deep: true,
    },
  },

  emits: ["attribute", "label"],
  props: {
    attribute: {
      type: String,
    },
    label: {
      type: String,
    },
  },
  setup(props) {
    const loadingBar = useLoadingBar();
    const attrs = useAttrs();
    const dataChanged = ref(false);
    const optionsRef = ref([]);
    const optionsDefault = ref([]);
    const title = props.label?.toString();

    const attributeData = async () => {
      const { index } = await callApi();
      let resData = [] as string[];

      switch (props.attribute) {
        case "displayed-attributes": {
          resData = await index.getDisplayedAttributes();
          break;
        }
        case "searchable-attributes": {
          resData = await index.getSearchableAttributes();
          break;
        }
        case "filterable-attributes": {
          resData = await index.getFilterableAttributes();
          break;
        }
        case "sortable-attributes": {
          resData = await index.getSortableAttributes();
          break;
        }
        case "ranking-rules": {
          resData = await index.getRankingRules();
          console.log(resData);
          break;
        }
        case "synonyms": {
          let res = await index.getSynonyms();
          resData = Object.values(res);
          break;
        }
        case "distinct-attribute": {
          let res = await index.getDistinctAttribute();
          if (res !== null) {
            resData.push(res);
          }
          break;
        }
        case "stop-words": {
          resData = await index.getStopWords();
          break;
        }
        case "typoTolerance": {
          resData = await index.getTypoTolerance();
          break;
        }
      }

      return JSON.stringify(resData);
    };

    const saveData = async () => {
      const { index } = await callApi();
      let resData = null;

      switch (attrs.attribute) {
        case "displayed-attributes": {
          resData = await index.updateDisplayedAttributes(optionsRef.value);
          break;
        }
        case "searchable-attributes": {
          resData = await index.updateSearchableAttributes(optionsRef.value);
          break;
        }
        case "filterable-attributes": {
          resData = await index.updateFilterableAttributes(optionsRef.value);
          break;
        }
        case "sortable-attributes": {
          resData = await index.updateSortableAttributes(optionsRef.value);
          break;
        }
        case "ranking-rules": {
          resData = await index.updateRankingRules(optionsRef.value);
          break;
        }
        case "synonyms": {
          let val: Synonyms = {};
          val = optionsRef.value[0];
          resData = await index.updateSynonyms(val);
          break;
        }
        case "distinct-attribute": {
          resData = await index.updateDistinctAttribute(optionsRef.value[0]);
          break;
        }
        case "stop-words": {
          resData = await index.updateStopWords(optionsRef.value);
          break;
        }
      }
      return resData;
    };

    onMounted(async () => {
      loading();
      const data = await attributeData();
      optionsRef.value = JSON.parse(data);
      optionsDefault.value = JSON.parse(data);
      stopLoading();
    });

    const loading = () => {
      loadingBar.start();
    };

    const stopLoading = () => {
      loadingBar.finish();
    };

    return {
      value: optionsRef,
      defaultData: optionsDefault,
      title,
      dataChanged: dataChanged,
      saveData: saveData,
      watch: {
        // whenever question changes, this function will run
        serverStatus() {
          return;
        },
      },
    };
  },
});
</script>
