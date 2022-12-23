<template>
  <section class="section-contact">
    <h1 class="contact-title t-h2">
      <ui-icon name="etoile" class="star" />
      {{ contactTitle }}
      <ui-icon name="etoile" class="star" />
    </h1>
    <div class="contact-content">
      <div class="contact-text t-body-1">{{ contactText }}</div>
      <form
        id="form-contact"
        ref="formContainer"
        name="Formulaire de contact"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <input name="bot-field" type="hidden" />
        <input type="hidden" name="subject" value="Formulaire de contact" />
        <!-- <input
          type="hidden"
          name="form-name"
          value="Contact - Faire affaire avec Morneau"
        /> -->

        <div class="field">
          <label for="nom" class="t-body-1"> Nom </label>
          <input type="text" name="nom" required />
          <!-- <span v-if="error.name" class="required t-body-4">{{
            $t('form.required')
          }}</span> -->
        </div>

        <div class="field">
          <label for="prenom" class="t-body-1">Prénom</label>
          <input type="text" name="prenom" required />
          <!-- <span v-if="error.job" class="required t-body-4">{{
            $t('form.required')
          }}</span> -->
        </div>

        <div class="field">
          <label for="email" class="t-body-1">Adresse mail</label>
          <input type="email" name="email" required />
          <!-- <span v-if="error.email" class="required t-body-4">{{
            $t('form.required')
          }}</span> -->
        </div>

        <div class="field">
          <label for="sujet" class="t-body-1">Sujet</label>
          <input type="text" name="sujet" required />
          <!-- <span v-if="error.company" class="required t-body-4">{{
            $t('form.required')
          }}</span> -->
        </div>

        <div class="field -big">
          <label for="message" class="t-body-1"> Message </label>
          <textarea name="message"></textarea>
        </div>

        <!-- <button class="t-cta-1" @click.prevent="submitFormBusiness">
          {{ $t('form.submit') }}
        </button> -->
        <!-- <ui-link label="Envoyer" /> -->
      </form>
    </div>

    <ui-frame :desktop-corners="[2, 3]" />
  </section>
</template>

<script>
export default {
  props: {
    contactTitle: {
      type: String,
      required: true,
    },
    contactText: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.section-contact {
  position: relative;
  display: flex;
  width: 70%;
  margin-top: 120px;

  @include below('sm') {
    display: block;
    width: 100%;
    margin-top: 60px;
  }

  .contact-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    writing-mode: vertical-lr;
    -webkit-writing-mode: vertical-lr;
    transform: rotate(180deg);
    text-align: center;
    margin: 40px 0;

    @include below('sm') {
      writing-mode: horizontal-tb;
      -webkit-writing-mode: horizontal-tb;
      transform: none;
      text-align: left;
      margin: 0 0 10px 0;
    }

    .star:first-of-type {
      @include below('sm') {
        display: none;
      }
    }
  }

  .contact-content {
    padding-left: 60px;
    margin: 40px 40px 40px 0;

    @include below('sm') {
      padding-left: 0;
      margin: 0;
    }

    form {
      margin-top: 60px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      @include below('sm') {
        margin-top: 40px;
      }

      .field {
        display: flex;
        flex-direction: column;
        width: 45%;

        @include below('sm') {
          width: 100%;
        }

        &.-big {
          flex-grow: 2;
        }

        &:not(:last-child) {
          margin-bottom: 40px;

          @include below('sm') {
            margin-bottom: 20px;
          }
        }

        input,
        textarea {
          z-index: 1;
          border: none;
          border-bottom: 1px solid $beige;
          background: transparent;
          outline: none;
          height: 30px;
          font-family: inherit;
          font-size: inherit;
        }

        textarea {
          resize: vertical;
          height: 90px;
        }
      }
    }
  }
}
</style>
