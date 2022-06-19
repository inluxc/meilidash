import { defineStore } from "pinia";

export interface ServerType {
  domain: string;
  masterkey: string;
}

export const useServerStore = defineStore("server", {
  state: () => ({
    server: {
      domain: "",
      masterkey: "",
      status: "",
      version: "",
    },
  }),
  getters: {
    getServerData(state) {
      if (state.server.domain == "") {
        if (localStorage.getItem("domain") != "") {
          state.server.domain = String(localStorage.getItem("domain"));
        }
      }
      if (state.server.masterkey == "") {
        if (localStorage.getItem("masterkey") != "") {
          state.server.masterkey = String(localStorage.getItem("masterkey"));
        }
      }
      if (state.server.status == "") {
        if (localStorage.getItem("status") != "") {
          state.server.status = String(localStorage.getItem("ststus"));
        }
      }
      if (state.server.version == "") {
        if (localStorage.getItem("version") != "") {
          state.server.version = String(localStorage.getItem("version"));
        }
      }
      return state.server;
    },
  },
  actions: {
    setServerData(server: ServerType) {
      this.server.domain = server.domain;
      localStorage.setItem("domain", this.server.domain);

      this.server.masterkey = server.masterkey;
      localStorage.setItem("masterkey", this.server.masterkey);
    },
    setStatus(status: string) {
      if (status == "online") {
        this.server.status = "online";
        localStorage.setItem("serverStatus", status);
      } else {
        this.server.status = "offline";
        localStorage.removeItem("version");
        localStorage.setItem("serverStatus", status);
      }
    },
    setVersion(version: string) {
      if (version != "") {
        this.server.status = version;
        localStorage.setItem("version", version);
      } else {
        this.server.status = "d";
        localStorage.removeItem("version");
      }
    },
  },
});
