<script setup lang="ts">
import { type RegisterDto } from 'src/types/dto/Register.dto';
import { computed, type Ref, ref } from 'vue';
import { required, sameAs, email } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import useAuthService from 'src/services/auth.service';
import { useRouter } from 'vue-router';
import useNotify from 'src/composables/useNotify';

defineOptions({
  name: 'FormRegister',
});

const elForm = ref();
const isPwd: Ref<boolean> = ref(true);
const isPwdConfirm: Ref<boolean> = ref(true);
const service = useAuthService();
const router = useRouter();
const notify = useNotify();
const form: Ref<RegisterDto> = ref({
  name: null,
  email: null,
  password: null,
  password_confirmation: null,
});
const rules = computed(() => {
  return {
    name: { required },
    email: { required, email },
    password: { required },
    password_confirmation: {
      required,
      sameAsPassword: sameAs(form.value.password),
    },
  };
});
const v$ = useVuelidate(rules, form);

const handleSubmit = async () => {
  try {
    const validate = await v$.value.$validate();
    if (!validate) return false;
    await service.register(form.value);
    await router.push({ name: 'list-timeline' });
  } catch (error: any) {
    console.log(error);
    const message = error?.response?.data?.message ?? error;
    notify.error(message);
  }
};

const handlePwd = () => {
  isPwd.value = !isPwd.value;
};

const handlePwdConfirmPassword = () => {
  isPwdConfirm.value = !isPwdConfirm.value;
};
</script>

<template>
  <q-form ref="elForm" class="q-gutter-y-lg" @submit.prevent="handleSubmit">
    <q-input
      v-model="v$.name.$model"
      :label="$t('app.components.formRegister.name')"
      lazy-rules
      outlined
      :rules="[() => !v$.name.required.$invalid || $t('validations.required')]"
      rounded
      dense
    />
    <q-input
      v-model="v$.email.$model"
      type="email"
      :label="$t('app.components.formRegister.email')"
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
      :label="$t('app.components.formRegister.password')"
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
    <q-input
      v-model="v$.password_confirmation.$model"
      :type="isPwdConfirm ? 'password' : 'text'"
      :label="$t('app.components.formRegister.passwordConfirmation')"
      lazy-rules
      outlined
      :rules="[
        () => !v$.password_confirmation.required.$invalid || $t('validations.required'),
        () =>
          !v$.password_confirmation.sameAsPassword.$invalid ||
          $t('validations.passwordConfirmation'),
      ]"
      rounded
      dense
    >
      <template v-slot:append>
        <q-icon
          :name="isPwdConfirm ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="handlePwdConfirmPassword"
        />
      </template>
    </q-input>
    <q-btn
      type="submit"
      :label="$t('app.components.formRegister.register')"
      outline
      rounded
      class="full-width"
      color="primary"
      :disable="v$.$invalid"
    />
  </q-form>
</template>
