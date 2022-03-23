<style lang="scss">
.login-page {
  background-image: linear-gradient(to right bottom, $blue-6, $blue-10);
  &__card {
    width: 1000px;
    height: 496px;
    background-image: linear-gradient(
      105deg,
      rgba(#fff, 0.9),
      rgba(#fff, 0.9) 60%,
      rgba($blue-6, 1) 60%,
      rgba($blue-10, 1)
    );
    background-size: 100%;
    overflow: hidden;
  }

  &__tapgo {
    position: absolute;
    right: 50px;
    color: #555;
    font-size: 300px;
    font-weight: bold;

    &--t {
      top: -150px;
      right: 150px;
    }
    &--a {
      top: -20px;
      right: 200px;
    }
    &--p {
      top: 185px;
      right: 235px;
    }
    &--g {
      top: -98px;
      right: 5px;
    }
    &--o {
      top: 122px;
      right: 5px;
    }
  }
}
</style>

<template>
  <q-page class="login-page flex flex-center">
    <q-card class="login-page__card">
      <div class="row full-height">
        <div class="col-7 q-my-auto q-px-xl">
          <h4 class="q-mt-none">
            Login
            <span v-if="error.show" class="q-ml-md text-red text-h5">{{
              error.msg
            }}</span>
          </h4>
          <q-form @submit.prevent="onSubmit" class="q-gutter-md">
            <q-input
              v-model="form.username"
              label="Username"
              outlined
              bg-color="white"
              lazy-rules
              maxlength="12"
              :rules="rules.username"
            />
            <q-input
              v-model="form.password"
              label="Password"
              outlined
              bg-color="white"
              lazy-rules
              :rules="rules.password"
            />
            <q-btn
              label="Submit"
              type="submit"
              rounded
              unelevated
              color="primary"
              padding="10px 80px"
              class=""
            />
          </q-form>
        </div>
      </div>
      <div class="row">
        <h1 class="login-page__tapgo login-page__tapgo--t">T</h1>
        <h1 class="login-page__tapgo login-page__tapgo--a">A</h1>
        <h1 class="login-page__tapgo login-page__tapgo--p">P</h1>
        <h1 class="login-page__tapgo login-page__tapgo--g">G</h1>
        <h1 class="login-page__tapgo login-page__tapgo--o">O</h1>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { computed, defineComponent, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

function required(field) {
  return function (v) {
    return !!v || `${field} is a required field`;
  };
}
function charactor(field) {
  return function (v) {
    return (
      /^[a-zA-Z0-9]{4,12}$/.test(v) ||
      `${field} must be between 4 and 12 English and numbers`
    );
  };
}

export default defineComponent({
  name: "LoginPage",
  setup() {
    const store = useStore();
    const router = useRouter();
    const form = reactive({ username: "wota", password: "wota123" });
    const rules = computed(() => ({
      username: [required("username"), charactor("username")],
      password: [required("password"), charactor("password")],
    }));
    const error = reactive({ show: false, msg: "" });

    function onSubmit() {
      store
        .dispatch("user/authenticate", form)
        .then(() => router.push("/"))
        .catch((e) => {
          error.show = String(e.response.data.status).charAt(0) === "4";
          error.msg = e.response.data.error;
        });
    }

    return { form, rules, error, onSubmit };
  },
});
</script>
