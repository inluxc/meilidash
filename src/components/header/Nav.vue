<template>
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :collapsed="collapsed"
    show-trigger
    @collapse="collapsed = true"
    @expand="collapsed = false"
  >
    <n-menu
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
    />
  </n-layout-sider>
</template>
<script lang="ts">
import { RouterLink } from "vue-router";
import type { MenuOption } from "naive-ui";

import { NIcon } from "naive-ui";

import { h, ref, defineComponent, computed } from "vue";
import type { Component } from "vue";

import { useServerStore } from "@/stores/server";

import {
  Bookmark as BookIcon,
  CaretDown as CaretDownOutlineIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
  Information as InformationIcon,
} from "@vicons/carbon";

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "home",
          },
        },
        { default: () => "Dashboard" }
      ),
    key: "home",
    icon: renderIcon(HomeIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "search",
          },
        },
        { default: () => "Search" }
      ),
    key: "search",
    icon: renderIcon(SearchIcon),
  },
  {
    label: "Settings",
    key: "settings",
    icon: renderIcon(SettingsIcon),
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "displayed",
              },
            },
            { default: () => "Displayed Attributes" }
          ),
        key: "displayed",
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "searchable",
                params: {
                  lang: "en-US",
                  attribute: "searchable-attributes",
                },
              },
            },
            { default: () => "Searchable Attributes" }
          ),
        key: "searchable",
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "filterable",
                params: {
                  lang: "en-US",
                  attribute: "filterable-attributes",
                },
              },
            },
            { default: () => "Filterable Attributes" }
          ),
        key: "filterable",
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "sortable",
                params: {
                  lang: "en-US",
                  attribute: "sortable-attributes",
                },
              },
            },
            { default: () => "Sortable Attributes" }
          ),
        key: "sorta ble",
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "rankingRules",
                params: {
                  lang: "en-US",
                  attribute: "ranking-rules",
                },
              },
            },
            { default: () => "Ranking Rules" }
          ),
        key: "rankingRules",
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "synonyms",
                params: {
                  lang: "en-US",
                  attribute: "synonyms",
                },
              },
            },
            { default: () => "Synonyms" }
          ),
        key: "synonyms",
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "distinct",
                params: {
                  lang: "en-US",
                  attribute: "distinct-attribute",
                },
              },
            },
            { default: () => "Distinct Attribute" }
          ),
        key: "distinct",
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "stopWords",
              },
            },
            { default: () => "Stop Words" }
          ),
        key: "stopWords",
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "typoTolerance",
              },
            },
            { default: () => "Typo Tolerance" }
          ),
        key: "typoTolerance",
      },
    ],
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "about",
          },
        },
        { default: () => "About" }
      ),
    key: "about",
    icon: renderIcon(InformationIcon),
  },
];

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
      menuOptions,
      collapsed: ref(true),
      renderMenuLabel(option: MenuOption) {
        if ("href" in option) {
          return h("a", { href: option.href, target: "_blank" }, [
            option.label as string,
          ]);
        }
        return option.label as string;
      },
      renderMenuIcon(option: MenuOption) {
        // return render placeholder for indent
        if (option.key === "sheep-man") return true;
        // return falsy, don't render icon placeholder
        if (option.key === "food") return null;
        return h(NIcon, null, { default: () => h(BookIcon) });
      },
      expandIcon() {
        return h(NIcon, null, { default: () => h(CaretDownOutlineIcon) });
      },
    };
  },
});
</script>
