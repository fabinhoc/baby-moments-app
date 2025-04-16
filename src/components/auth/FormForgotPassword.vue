<script setup lang="ts">
import { ref, Ref } from 'vue';
import { ForgotPasswordDto } from 'src/types/dto/ForgotPassword.dto';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import useAuthService from 'src/services/auth.service';
import { useRouter } from 'vue-router';
import useNotify from 'src/composables/useNotify';

defineOptions({
  name: 'FormForgotPassword',
});

const form: Ref<ForgotPasswordDto> = ref({
  email: null,
});
const rules = {
  email: { email, required },
};
const v$ = useVuelidate(rules, form);
const service = useAuthService();
const router = useRouter();
const notify = useNotify();

const handleSubmit = async () => {
  try {
    const validate = await v$.value.$validate();
    if (!validate) return false;
    await service.forgotPassword(form.value);
    router.push({ name: 'reset-password-confirmation' });
  } catch (error: any) {
    console.log(error);
    const message = error?.response?.data?.message ?? error;
    notify.error(message);
  }
};
</script>

<template>
  <q-form ref="myForm" class="q-gutter-y-lg" @submit.prevent="handleSubmit">
    <q-input
      v-model="v$.email.$model"
      :label="$t('app.components.formForgotPassword.email')"
      lazy-rules
      outlined
      :rules="[
        () => !v$.email.required.$invalid || $t('validations.required'),
        () => !v$.email.email.$invalid || $t('validations.email'),
      ]"
    />
    <q-btn
      type="submit"
      :label="$t('app.components.formForgotPassword.reset')"
      outline
      rounded
      class="full-width"
      color="primary"
      :disable="v$.$invalid"
    />
  </q-form>
</template>
