<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { storeToRefs } from 'pinia';
import useNotify from 'src/composables/useNotify';
import useAuthService from 'src/services/auth.service';
import { useAuthStore } from 'src/stores/auth.store';
import { type UserDto } from 'src/types/dto/User.dto';
import { type Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';

defineOptions({
  name: 'FormUser',
});

const service = useAuthService();
const { t } = useI18n();
const notify = useNotify();
const formUser = ref();
const authStore = useAuthStore();
const { user, token } = storeToRefs(authStore);

const form: Ref<UserDto> = ref({
  name: user.value.name,
  email: user.value.email,
});
const rules = {
  name: { required },
  email: { email, required },
};
const v$ = useVuelidate(rules, form);

const handleSubmit = async () => {
  try {
    const validate = await v$.value.$validate();
    if (!validate) return false;
    await service.updateUser(user.value.uuid, form.value);
    await service.me(token.value);
    notify.success(t('success'));
  } catch (error: any) {
    console.log(error);
    const message = error?.response?.data?.message ?? error;
    notify.error(message);
  }
};

const clear = () => {
  form.value = {
    name: user.value.name,
    email: user.value.email,
  };
  formUser.value.reset();
};
</script>

<template>
  <q-form ref="formUser" class="q-gutter-y-lg" @submit.prevent="handleSubmit">
    <div class="row q-col-gutter-md">
      <div class="col-sm-12 col-md-12 col-lg-12 col-xs-12">
        <q-input
          v-model="v$.name.$model"
          :label="$t('app.components.formUser.name')"
          lazy-rules
          outlined
          :rules="[() => !v$.email.required.$invalid || $t('validations.required')]"
          rounded
          dense
        />
      </div>
      <div class="col-sm-12 col-md-12 col-lg-12 col-xs-12">
        <q-input
          v-model="v$.email.$model"
          :label="$t('app.components.formUser.email')"
          lazy-rules
          outlined
          :rules="[
            () => !v$.email.required.$invalid || $t('validations.required'),
            () => !v$.email.email.$invalid || $t('validations.email'),
          ]"
          rounded
          dense
        />
      </div>
      <div class="col-sm-12 col-md-12 col-lg-12 col-xs-12 q-gutter-sm">
        <q-btn type="submit" color="primary" outline rounded :disable="v$.$invalid">{{
          $t('app.components.formUser.save')
        }}</q-btn>
        <q-btn @click="clear" type="button" color="negative" outline rounded>{{
          $t('app.components.formUser.clear')
        }}</q-btn>
      </div>
    </div>
  </q-form>
</template>
