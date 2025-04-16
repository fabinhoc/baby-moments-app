<script setup lang="ts">
import useNotify from 'src/composables/useNotify';
import useAuthService from 'src/services/auth.service';
import { useAuthStore } from 'src/stores/auth.store';

defineOptions({
  name: 'EmailVerificationPage',
});

const service = useAuthService();
const notify = useNotify();
const { user } = useAuthStore();

const resend = async () => {
  try {
    const response = await service.resendVerification();
    console.log(response);
  } catch (error: any) {
    console.log(error);
    const message = error?.response?.message ?? error.message;
    notify.error(message);
  }
};
</script>

<template>
  <q-page class="row items-center justify-evenly" align="center">
    <div class="col-md-4 col-sm-6 col-xs-10">
      <q-card class="text-center" flat :square="false" style="background-color: transparent">
        <q-card-section>
          <q-avatar size="80px" font-size="32px" color="grey-3" text-color="primary" icon="email" />
        </q-card-section>
        <q-card-section>
          <p class="text-h5 text-weight-medium">
            {{ $t('app.pages.emailVerification.title') }}
          </p>
        </q-card-section>
        <q-card-section>
          <p class="">
            {{
              $t('app.pages.emailVerification.message', {
                email: user.email,
              })
            }},
            <br />
            {{ $t('app.pages.emailVerification.checkIt') }}.
          </p>
        </q-card-section>
        <q-card-section>
          <p>
            {{ $t('app.pages.emailVerification.notReceivedYet') }}
            <q-btn @click="resend" flat color="primary">{{
              $t('app.pages.emailVerification.resend')
            }}</q-btn>
          </p>
          <p>
            <q-btn flat color="primary" @click="$router.push({ name: 'login' })">{{
              $t('app.pages.emailVerification.gotoLogin')
            }}</q-btn>
          </p>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
