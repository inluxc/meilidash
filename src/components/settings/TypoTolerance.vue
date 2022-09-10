<template>
  <h4>Type Tolerance</h4>
  <n-form ref="formRef" :model="data">
    <n-form-item
      label="Enable or disable the typo tolerance feature"
      path="enabled"
    >
      <n-switch v-model:value="data.enabled" />
    </n-form-item>

    <n-form-item
      label="Configure the minimum word size for 1 typo."
      path="minWordSizeForTypos.oneTypo"
    >
      <n-input-number
        v-model:value="data.minWordSizeForTypos.oneTypo"
        :style="{ width: '100px' }"
      />
    </n-form-item>
    <n-form-item
      label="Configure the minimum word size for 2 typos."
      path="minWordSizeForTypos.twoTypos"
    >
      <n-input-number
        v-model:value="data.minWordSizeForTypos.twoTypos"
        :style="{ width: '100px' }"
      />
    </n-form-item>

    <n-form-item label="Disable typos on specific words" path="disableOnWords">
      <n-dynamic-input
        v-model:value="data.disableOnWords"
        placeholder="Please type here"
        :min="1"
        :max="10"
      />
    </n-form-item>
    <n-form-item
      label="Disable typos on specific document attributes"
      path="disabledOnAttributes"
    >
      <n-dynamic-input
        v-model:value="data.disabledOnAttributes"
        placeholder="Please type here"
        :min="1"
        :max="10"
      />
    </n-form-item>

    <n-form-item>
      <n-button @click="saveData()" v-if="dataChanged">Save</n-button>
    </n-form-item>
  </n-form>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useLoadingBar } from "naive-ui";
import { callApi } from "@/api/api";

export default defineComponent({
  watch: {
    data: {
      handler() {
        this.dataChanged =
          JSON.stringify(this.data) !== JSON.stringify(this.defaultData);
      },
      deep: true,
    },
  },

  setup() {
    const loadingBar = useLoadingBar();
    const dataChanged = ref(false);
    const data = {
      enabled: false,
      minWordSizeForTypos: {
        oneTypo: 0,
        twoTypos: 0,
      },
      disableOnWords: [],
      disabledOnAttributes: [],
    };

    const optionsRef = ref(data);
    const optionsDefault = ref(data);

    onMounted(async () => {
      loading();
      const data = await getTypoTolerance();
      optionsRef.value = JSON.parse(data);
      optionsDefault.value = JSON.parse(data);
      stopLoading();
    });

    const getTypoTolerance = async () => {
      const { index } = await callApi();
      const data = await index.getTypoTolerance();
      return JSON.stringify(data);
    };

    const loading = () => {
      loadingBar.start();
    };

    const stopLoading = () => {
      loadingBar.finish();
    };

    const saveData = async () => {
      const { index } = await callApi();
      await index.updateTypoTolerance(optionsRef.value);
    };
    return {
      data: optionsDefault,
      defaultData: optionsRef,
      dataChanged: dataChanged,
      saveData: saveData,
    };
  },
});
</script>

<style>
.n-card {
  margin-bottom: 10px;
}
</style>
