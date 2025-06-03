<script setup lang="ts">
import { type UpdatePasswordDto } from 'src/types/dto/UpdatedPassword.dto';
import { computed, type Ref, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, sameAs } from '@vuelidate/validators';
import useAuthService from 'src/services/auth.service';
import { useAuthStore } from 'src/stores/auth.store';
import useNotify from 'src/composables/useNotify';
import { useI18n } from 'vue-i18n';

defineOptions({
  name: 'UpdatePasswordForm',
});

const formUpdatePassword = ref();
const form: Ref<UpdatePasswordDto> = ref({
  current_password: null,
  password: null,
  password_confirmation: null,
});

const isPwd: Ref<boolean> = ref(true);
const isPwdCurrentPassword: Ref<boolean> = ref(true);
const isPwdConfirm: Ref<boolean> = ref(true);
const service = useAuthService();
const { user } = useAuthStore();
const notify = useNotify();
const { t } = useI18n();
const rules = computed(() => {
  return {
    current_password: { required },
    password: { required },
    password_confirmation: {
      required,
      sameAsPassword: sameAs(form.value.password),
    },
  };
});
const v$ = useVuelidate(rules, form);

const handlePwd = () => {
  isPwd.value = !isPwd.value;
};

const handlePwdCurrentPassword = () => {
  isPwdCurrentPassword.value = !isPwdCurrentPassword.value;
};

const handlePwdConfirm = () => {
  isPwdConfirm.value = !isPwdConfirm.value;
};

const handleSubmit = async () => {
  try {
    const validate = await v$.value.$validate();
    if (!validate) return false;
    await service.updatePassword(user.uuid, form.value);
    notify.success(t('success'));
    clear();
  } catch (error: any) {
    console.log(error);
    const message = error?.response?.data?.message ?? error;
    notify.error(message);
  }
};

const clear = () => {
  form.value = {
    current_password: null,
    password: null,
    password_confirmation: null,
  };
  formUpdatePassword.value.reset();
};
</script>

<template>
  <q-form ref="formUpdatePassword" class="q-gutter-y-lg" @submit.prevent="handleSubmit">
    <div class="row q-col-gutter-md">
      <div class="col-sm-12 col-md-12 col-lg-12 col-xs-12">
        <q-input
          v-model="v$.current_password.$model"
          :type="isPwdCurrentPassword ? 'password' : 'text'"
          :label="$t('app.components.updatePasswordForm.currentPassword')"
          lazy-rules
          outlined
          dense
          rounded
          :rules="[() => !v$.current_password.required.$invalid || $t('validations.required')]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwdCurrentPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="handlePwdCurrentPassword"
            />
          </template>
        </q-input>
      </div>
      <div class="col-sm-12 col-md-12 col-lg-12 col-xs-12">
        <q-input
          v-model="v$.password.$model"
          :type="isPwd ? 'password' : 'text'"
          :label="$t('app.components.updatePasswordForm.newPassword')"
          lazy-rules
          outlined
          dense
          rounded
          :rules="[() => !v$.password.required.$invalid || $t('validations.required')]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="handlePwd"
            />
          </template>
        </q-input>
      </div>
      <div class="col-sm-12 col-md-12 col-lg-12 col-xs-12">
        <q-input
          v-model="v$.password_confirmation.$model"
          :type="isPwdConfirm ? 'password' : 'text'"
          :label="$t('app.components.updatePasswordForm.passwordConfirmation')"
          lazy-rules
          outlined
          dense
          rounded
          :rules="[
            () => !v$.password_confirmation.required.$invalid || $t('validations.required'),
            () =>
              !v$.password_confirmation.sameAsPassword.$invalid ||
              $t('validations.passwordConfirmation'),
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwdConfirm ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="handlePwdConfirm"
            />
          </template>
        </q-input>
      </div>
      <div class="col-sm-12 col-md-12 col-lg-12 col-xs-12 q-gutter-sm">
        <q-btn type="submit" color="primary" outline rounded :disable="v$.$invalid">{{
          $t('app.components.updatePasswordForm.save')
        }}</q-btn>
        <q-btn @click="clear" type="button" color="negative" outline rounded>{{
          $t('app.components.updatePasswordForm.clear')
        }}</q-btn>
      </div>
    </div>
  </q-form>
</template>
