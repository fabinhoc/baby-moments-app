<script setup lang="ts">
import BreadCrumb from 'src/components/system/BreadCrumb.vue';
import CardPage from 'src/components/system/CardPage.vue';
import CardSectionPageTitle from 'src/components/system/CardSectionPageTitle.vue';
import { type BreadCrumbType } from 'src/types/BreadCrumb.type';
import ProfileSectionTitle from 'src/components/user/ProfileSectionTitle.vue';
import { useI18n } from 'vue-i18n';
import FormUser from 'src/components/user/FormUser.vue';
import UpdatedPasswordForm from 'src/components/user/UpdatedPasswordForm.vue';
import { useAuthStore } from 'src/stores/auth.store';
import { storeToRefs } from 'pinia';
import useDialog from 'src/composables/useDialog';
import useNotify from 'src/composables/useNotify';
import useAuthService from 'src/services/auth.service';
import { useRouter } from 'vue-router';
import StorageMemory from 'src/utils/StorageMemory';

defineOptions({
  name: 'ProfilePage',
});
const { t } = useI18n();
const pageTitle = t('app.pages.user.profile.infoTitle');
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const dialogConfirmation = useDialog();
const notify = useNotify();
const service = useAuthService();
const router = useRouter();
const { convertBytesToSize } = StorageMemory();

const breadCrumbs: BreadCrumbType[] = [
  {
    label: pageTitle,
    link: '/profile',
    icon: 'las la-user',
  },
];

const remove = () => {
  try {
    dialogConfirmation.confirm(t('app.pages.user.profile.deleteConfirmation')).onOk(() => {
      void (async () => {
        await service.remove(user.value.uuid);
        notify.success(t('success'));
        authStore.logout();
        await router.push({ name: 'remove-account' });
      });
    });
  } catch (error: any) {
    console.log(error);
    const message = error?.response?.data?.message ?? error;
    notify.error(message);
  }
};
</script>

<template>
  <q-page padding class="column q-gutter-md">
    <CardPage class="column items-center">
      <CardSectionPageTitle :title="$t('app.pages.user.profile.infoTitle')" />
    </CardPage>
    <BreadCrumb :bread-crumbs="breadCrumbs" />
    <CardPage class="column">
      <q-card-section class="column items-center">
        <q-avatar icon="las la-user" size="100px"></q-avatar>
      </q-card-section>
      <q-card-section>
        <ProfileSectionTitle
          :title="$t('app.pages.user.profile.infoTitle')"
          :icon="'las la-user'"
        />
        <FormUser />
      </q-card-section>
      <q-card-section>
        <ProfileSectionTitle
          :title="$t('app.pages.user.profile.updatePasswordTitle')"
          :icon="'las la-lock'"
        />
        <UpdatedPasswordForm />
      </q-card-section>
      <q-card-section class="column q-gutter-md">
        <div>
          <ProfileSectionTitle
            :title="$t('app.pages.user.profile.sigature')"
            :icon="'las la-signature'"
          />
        </div>
        <div class="text-body2 text-dark">
          {{
            $t('app.pages.user.profile.signatureInfo', {
              signature: '',
            })
          }}
          <span class="text-uppercase text-weight-bold">{{ user.subscription.plan.name }}.</span>
        </div>
        <ul class="text-body2 text-dark text-weight-light">
          <li v-for="(option, index) in user.subscription.plan.options" :key="index">
            {{ option.title }}
          </li>
        </ul>
      </q-card-section>
      <q-card-section>
        <q-item class="" v-close-popup>
          <q-item-section side> 0 GB </q-item-section>
          <q-item-section>
            <template #default>
              <q-slider
                :min="0"
                :max="user.subscription.plan.available_memory"
                :model-value="Number(user.memory_used)"
                readonly
                color="positive"
                label-always
                switch-label-side
                :label-value="convertBytesToSize(user.memory_used as number)"
              >
              </q-slider>
            </template>
          </q-item-section>
          <q-item-section side>
            {{ convertBytesToSize(user.subscription.plan.available_memory) }}
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section>
        <div class="row q-gutter-md">
          <q-btn
            outline
            rounded
            color="primary"
            icon="las la-cloud-upload-alt"
            :to="{ name: 'checkout' }"
            >{{ $t('app.pages.user.profile.upgrade') }}</q-btn
          >
        </div>
      </q-card-section>

      <q-card-section class="column q-col-gutter-md">
        <div>
          <ProfileSectionTitle
            :title="$t('app.pages.user.profile.accountTitle')"
            :icon="'las la-cog'"
          />
        </div>
        <div>
          <p
            class="text-body2 text-negative"
            v-html="$t('app.pages.user.profile.deleteAccountInfo')"
          />
          <q-btn @click="remove" color="negative" icon="las la-frown" no-caps>{{
            $t('app.pages.user.profile.btnDelete')
          }}</q-btn>
        </div>
      </q-card-section>
    </CardPage>
  </q-page>
</template>
