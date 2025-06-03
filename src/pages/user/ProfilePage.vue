<script setup lang="ts">
import BreadCrumb from 'src/components/system/BreadCrumb.vue';
import CardPage from 'src/components/system/CardPage.vue';
import CardSectionPageTitle from 'src/components/system/CardSectionPageTitle.vue';
import { type BreadCrumbType } from 'src/types/BreadCrumb.type';
import ProfileSectionTitle from 'src/components/user/ProfileSectionTitle.vue';
import { useI18n } from 'vue-i18n';
import FormUser from 'src/components/user/FormUser.vue';
import UpdatedPasswordForm from 'src/components/user/UpdatedPasswordForm.vue';
// import { useAuthStore } from 'src/stores/auth.store';

defineOptions({
  name: 'ProfilePage',
});
const { t } = useI18n();
const pageTitle = t('app.pages.user.profile.infoTitle');
// const { user } = useAuthStore();

const breadCrumbs: BreadCrumbType[] = [
  {
    label: pageTitle,
    link: '/profile',
    icon: 'las la-user',
  },
];
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
        <div
          class="text-body2 text-dark"
          v-html="$t('app.pages.user.profile.signatureInfo', { signature: '100 GB' })"
        />
        <ul class="text-body2 text-dark text-weight-light">
          <li>100 GB</li>
          <li>Timelines ilimitadas</li>
          <li>Albuns ilimitados</li>
        </ul>
      </q-card-section>
    </CardPage>
  </q-page>
</template>
