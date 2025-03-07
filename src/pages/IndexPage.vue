<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h4 text-primary text-weight-medium text-title">
        Crie momentos customizados do seu bebê e relembre sempre que desejar.
      </h1>
      <h2 class="text-body2 text-weight-regular text-sub-title">
        Armazene na nuvem as fotos e vídeos de momentos importantes do seu bebê. Organize-os por
        mês, dia, ano... da forma que preferir.
      </h2>
    </div>
    <q-card flat>
      <q-card-section class="text-warning text-center flex flex-center text-weight-bolder text-h6">
        Como Funciona
      </q-card-section>
      <q-card-section>
        <q-list>
          <q-item
            clickable
            v-ripple
            class="bg-secondary q-my-sm q-border-radius-lg border-radius"
            dark
            v-for="(step, key) in steps"
            :key="key"
          >
            <q-item-section side>
              <q-chip rounded color="white" class="text-primary text-caption" :label="key + 1" />
            </q-item-section>
            <q-item-section> {{ step }} </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
    <q-card flat>
      <q-card-section class="text-warning text-center flex flex-center text-weight-bolder text-h6">
        Destaques
      </q-card-section>
      <q-card-section> destaques </q-card-section>
    </q-card>
    <q-card flat>
      <q-card-section class="text-warning text-center flex flex-center text-weight-bolder text-h6">
        Planos
      </q-card-section>
      <q-card-section> planos </q-card-section>
    </q-card>
    <q-card flat>
      <q-card-section class="text-warning text-center flex flex-center text-weight-bolder text-h6">
        Perguntas Frequentes
      </q-card-section>
      <q-card-section>
        <q-list>
          <q-expansion-item
            group="somegroup"
            :label="frequencyQuestion.question"
            class="bg-secondary q-my-sm q-border-radius-lg border-radius"
            dark
            v-for="(frequencyQuestion, key) in frequencyQuestions"
            :key="key"
          >
            <q-card>
              <q-card-section>
                {{ frequencyQuestion.answer }}
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
const steps: Array<string> = [
  'Faça seu cadastro',
  'Crie sua timeline',
  'Adicione os momentos na sua timeline',
  'Adicione fotos e vídeos de cada momento cadastrado',
];
interface FrequencyQuestion {
  question: string;
  answer: string;
}
const frequencyQuestions: Array<FrequencyQuestion> = [
  {
    question: 'O que é o Baby moments?',
    answer:
      'É um aplicativo de armazenamento de foto e vídeos de momentos especiais com o seu bebê. Crie albuns e organize como timeline do seu bebê e tenha acesso a qualquer momento.',
  },
  {
    question: 'Quantas timelines eu posso criar?',
    answer:
      'Você poderá criar infinitas timelines e não será cobrado por isso. Use sua criatividade :)',
  },
  {
    question: 'Quantas fotos e vídeos eu posso armazenar no aplicativo?',
    answer:
      'Cada plano tem a quantidade máxima de espaço e você poderá armazenar até completar o espaço máximo do seu plano. Você poderá trocar de plano a qualquer momento pelo aplicativo, aumentando ou diminuindo o seu espaço disponível.',
  },
  {
    question: 'Quais são as formas de pagamento?',
    answer:
      'O pagamento é uma assinatura e é feito pelo seu cartão de crédito e o valor será debitado todo o mês na data em que o plano escolhido for adquirido.',
  },
  {
    question: 'Como funciona as assinaturas?',
    answer:
      'Uma assinatura terá o valor debitado do seu cartão de crédito, até que você cancele o pause a sua assinatura. Se você optar por cancelar sua assinatura, você não terá mais acesso ao aplicativo e todas as suas fotos e vídeos serão removidos permanentemente.',
  },
  {
    question: 'Qual é a validade da assinatura?',
    answer:
      'Não há validade para a sua assinatura a menos que você pause ou cancele sua assinatura.',
  },
  {
    question: 'Se eu pausar minha assinatura o que acontece?',
    answer:
      'Se você optar por pausar sua assinatura, você não poderá armazenar novas fotos e/ou vídeos e após 3 meses suas fotos e vídeos já armazenados serão excluídos permanentemente do aplicativo.',
  },
  {
    question: 'Se eu cancelar minha assinatura o que acontece?',
    answer:
      'Se você optar por cancelar sua assinatura, automaticamente suas fotos e vídeos serão excluidas e sua conta será totalmente removida do aplicativo.',
  },
];
</script>

<style type="css" scoped>
.text-title {
  line-height: 32px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}
.text-sub-title {
  line-height: 20px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  color: #64b6f7;
}
.border-radius {
  border-radius: 10px;
}
</style>
