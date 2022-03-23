<template>
  <q-layout view="hHh Lpr fFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title> TAPGO frontend quiz </q-toolbar-title>
        <q-space />
        <q-btn unelevated color="white" class="text-black" @click="logout">
          logout
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "MainLayout",
  setup() {
    const store = useStore();

    function logout() {
      store.dispatch("user/logout");
    }

    return { logout };
  },
});
</script>
