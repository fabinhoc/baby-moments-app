<script setup lang="ts">
import { type LoginDto } from 'src/types/dto/Login.dto';
import { ref, type Ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import useNotify from 'src/composables/useNotify';
import useAuthService from 'src/services/auth.service';

defineOptions({
  name: 'FormLogin',
});

const form: Ref<LoginDto> = ref({
  email: null,
  password: null,
});
const isPwd: Ref<boolean> = ref(true);
const rules = {
  email: { email, required },
  password: { required },
};
const v$ = useVuelidate(rules, form);
const service = useAuthService();
const router = useRouter();
const notify = useNotify();

const handlePwd = () => {
  isPwd.value = !isPwd.value;
};

const handleSubmit = async () => {
  try {
    const validate = await v$.value.$validate();
    if (!validate) return false;
    await service.login(form.value);
    await router.push({ name: 'list-timeline' });
  } catch (error: any) {
    console.log(error);
    const message = error?.response?.data?.message ?? error;
    notify.error(message);
  }
};
</script>

<template>
  <q-form ref="myForm" class="q-gutter-y-sm" @submit.prevent="handleSubmit">
    <q-input
      v-model="v$.email.$model"
      type="email"
      :label="$t('app.components.formLogin.email')"
      lazy-rules
      outlined
      :rules="[
        () => !v$.email.required.$invalid || $t('validations.required'),
        () => !v$.email.email.$invalid || $t('validations.email'),
      ]"
      rounded
      dense
    />
    <q-input
      v-model="v$.password.$model"
      :type="isPwd ? 'password' : 'text'"
      :label="$t('app.components.formLogin.password')"
      lazy-rules
      outlined
      :rules="[() => !v$.password.required.$invalid || $t('validations.required')]"
      rounded
      dense
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="handlePwd"
        />
      </template>
    </q-input>
    <q-btn
      type="submit"
      :label="$t('app.components.formLogin.login')"
      outline
      rounded
      class="full-width"
      color="primary"
      :disable="v$.$invalid"
    />
  </q-form>
</template>
