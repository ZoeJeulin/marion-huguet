<template>
  <section class="section-contact">
    <h1 class="contact-title t-h2">
      <ui-icon name="etoile" class="star" />
      {{ contactTitle }}
      <ui-icon name="etoile" class="star" />
    </h1>
    <div class="contact-content">
      <div class="contact-text t-body-1" v-html="contactText"></div>
      <form
        id="form-contact"
        ref="formContainer"
        name="Formulaire de contact"
        method="post"
        novalidate
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <input name="bot-field" type="hidden" />
        <input type="hidden" name="formulaire" value="Formulaire de contact" />
        <input type="hidden" name="form-name" value="Formulaire de contact" />

        <div class="field">
          <label for="nom" class="t-body-1">Nom</label>
          <input id="nom" type="text" name="nom" required />
          <span v-if="error.nom" class="required t-body-3"
            >Ce champ est obligatoire</span
          >
        </div>

        <div class="field">
          <label for="prenom" class="t-body-1">Prénom</label>
          <input id="prenom" type="text" name="prenom" required />
          <span v-if="error.prenom" class="required t-body-3"
            >Ce champ est obligatoire</span
          >
        </div>

        <div class="field">
          <label for="email" class="t-body-1">Adresse mail</label>
          <input id="email" type="email" name="email" required />
          <span v-if="error.email" class="required t-body-3"
            >Une adresse mail valide est obligatoire</span
          >
        </div>

        <div class="field">
          <label for="sujet" class="t-body-1">Sujet</label>
          <input id="sujet" type="text" name="sujet" required />
          <span v-if="error.sujet" class="required t-body-3"
            >Ce champ est obligatoire</span
          >
        </div>

        <div class="field -big">
          <label for="message" class="t-body-1"> Message </label>
          <textarea id="message" name="message"></textarea>
          <span v-if="error.message" class="required t-body-3"
            >Ce champ est obligatoire</span
          >
        </div>
        <div class="btn-wrapper">
          <ui-link
            class="t-cta-1"
            type="button"
            label="Envoyer"
            @click.native.prevent="submitForm"
          />
        </div>
      </form>
      <div class="form-confirmation -hide">
        <h2 class="confirmation-title t-body-1">
          {{ contactConfirmationText }}
        </h2>
        <div class="confirmation-subtitle t-body-2">
          {{ contactConfirmationSubtext }}
        </div>
        <ui-link
          class="confirmation-btn t-cta-1"
          type="button"
          label="Envoyer un autre message"
          @click.native="reloadPage"
        />
      </div>
    </div>

    <ui-frame ref="frameContact" :desktop-corners="[2, 3]" />
  </section>
</template>

<script>
import { gsap } from 'gsap'

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
    contactConfirmationText: {
      type: String,
      required: true,
    },
    contactConfirmationSubtext: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isValid: false,
      error: {
        nom: false,
        prenom: false,
        email: false,
        sujet: false,
        message: false,
      },
    }
  },
  mounted() {
    this.$nextTick(() => {
      const mq = gsap.matchMedia()
      mq.add('(min-width: 769px)', () => {
        this.$refs.frameContact.$refs.corner.forEach((corner) => {
          gsap.to(corner.$refs.vertical, {
            scaleY: 1,
            duration: 0.2,
            delay: 0.6,
            ease: 'ease-out',
            scrollTrigger: {
              trigger: '.contact-content',
              start: 'top 95%',
            },
          })
          gsap.to(corner.$refs.horizontal, {
            scaleX: 1,
            duration: 0.2,
            delay: 0.8,
            ease: 'ease-out',
            scrollTrigger: {
              trigger: '.contact-content',
              start: 'top 95%',
            },
          })
        })

        gsap.to('.contact-title', {
          opacity: 1,
          x: 0,
          duration: 0.5,
          delay: 0.3,
          ease: 'ease-out',
          scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 95%',
          },
        })

        gsap.to('.contact-content', {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.6,
          ease: 'ease-out',
          scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 95%',
          },
        })
      })

      mq.add('(max-width: 768px)', () => {
        gsap.to('.contact-title', {
          opacity: 1,
          y: 0,
          duration: 0.3,
          delay: 0.3,
          ease: 'ease-out',
          scrollTrigger: {
            trigger: '.contact-content',
            start: 'top bottom',
          },
        })

        gsap.to('.contact-text', {
          opacity: 1,
          y: 0,
          duration: 0.3,
          delay: 0.5,
          ease: 'ease-out',
          scrollTrigger: {
            trigger: '.contact-content',
            start: 'top bottom',
          },
        })

        gsap.to('#form-contact', {
          opacity: 1,
          y: 0,
          duration: 0.3,
          delay: 0.7,
          ease: 'ease-out',
          scrollTrigger: {
            trigger: '.contact-content',
            start: 'top bottom',
          },
        })
      })
    })

    document
      .getElementById('form-contact')
      .querySelectorAll('input:not([type=hidden]), textarea')
      .forEach((input) => {
        input.addEventListener('change', () => {
          this.checkValue(input)
        })
        input.addEventListener('focus', () => {
          input.parentElement.classList.add('-active')
        })
        input.addEventListener('blur', () => {
          input.parentElement.classList.remove('-active')
        })
      })
  },
  methods: {
    emailIsValid(email) {
      return email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    },
    checkValue(input) {
      input.value
        ? (this.error[input.name] = false)
        : (this.error[input.name] = true)

      if (input.type === 'email' && !this.emailIsValid(input.value)) {
        this.error[input.name] = true
      }
    },
    validateForm() {
      this.isValid = true
      this.error = {
        nom: false,
        prenom: false,
        email: false,
        sujet: false,
        message: false,
      }

      document
        .getElementById('form-contact')
        .querySelectorAll('input:not([type=hidden]), textarea')
        .forEach((input) => {
          if (
            input.value === '' ||
            (input.type === 'email' && !this.emailIsValid(input.value))
          ) {
            this.isValid = false
            this.error[input.name] = true
          }
        })
      return this.isValid
    },
    submitForm() {
      const isValid = this.validateForm()

      if (isValid) {
        this.contactForm = document.getElementById('form-contact')
        this.formData = new FormData(this.contactForm)

        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(this.formData).toString(),
        })
          .then(() => {
            document.getElementById('form-contact').classList.add('-hide')
            document
              .querySelector('.form-confirmation')
              .classList.remove('-hide')
            window.dispatchEvent(new Event('resize'))
          })
          .catch((error) => alert(error))
      }
    },
    reloadPage() {
      window.location.reload()
    },
  },
}
</script>

<style lang="scss">
.section-contact {
  position: relative;
  display: flex;
  width: 70%;
  margin-top: 180px;

  @include below('lg') {
    width: 100%;
    margin-top: 80px;
  }

  @include below('md') {
    display: block;
  }

  .contact-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    writing-mode: vertical-lr;
    -webkit-writing-mode: vertical-lr;
    transform: translateX(30px) rotate(180deg);
    text-align: center;
    margin: 40px 0;
    opacity: 0;

    @include below('md') {
      writing-mode: horizontal-tb;
      -webkit-writing-mode: horizontal-tb;
      transform: none;
      text-align: left;
      margin: 0 0 10px 0;
      transform: translateY(15px);
    }

    .star {
      &:first-of-type {
        margin-bottom: 40px;
        @include below('md') {
          display: none;
        }
      }
      &:last-of-type {
        margin-top: 40px;
        @include below('md') {
          margin-top: 0;
          margin-left: 20px;
        }
      }
    }
  }

  .contact-content {
    padding-left: 60px;
    margin: 60px 60px 60px 0;
    transform: translateY(30px);
    opacity: 0;

    @include below('lg') {
      padding-left: 40px;
    }

    @include below('md') {
      padding-left: 0;
      margin: 0;
      transform: translateY(0);
      opacity: 1;
    }

    .-hide {
      display: none;
    }

    .contact-text {
      @include below('md') {
        opacity: 0;
        transform: translateY(15px);
      }
    }

    form {
      margin-top: 60px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      @include below('md') {
        margin-top: 40px;
        opacity: 0;
        transform: translateY(15px);
      }

      .field {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 45%;

        @include below('md') {
          width: 100%;
        }

        &.-active {
          label {
            transform: translateY(-10px) scale(0.8);
          }
        }

        &.-big {
          flex-grow: 2;
        }

        &:not(:last-child) {
          margin-bottom: 60px;

          @include below('md') {
            margin-bottom: 20px;
          }
        }

        label {
          transform: translateY(0px) scale(1);
          transform-origin: bottom left;
          transition: transform 0.2s ease-out;
        }

        input,
        textarea {
          z-index: 1;
          border: none;
          border-bottom: 1px solid $beige;
          background: transparent;
          outline: none;
          height: 30px;
          font-family: 'Playfair Display', serif;
          font-size: 18;
          line-height: 1.2;
        }

        textarea {
          resize: none;
          overflow-y: auto;
          height: 120px;
        }

        .required {
          position: absolute;
          bottom: -20px;
          left: 0;
          margin-top: 5px;
          font-style: italic;
          opacity: 0.8;
        }
      }

      .btn-wrapper {
        width: 100%;
        margin-top: 40px;
        text-align: center;

        button {
          cursor: pointer;
        }
      }
    }

    .form-confirmation {
      margin-top: 60px;
      text-align: center;

      .confirmation-title {
        margin-bottom: 10px;
      }

      .confirmation-btn {
        margin-top: 60px;
        cursor: pointer;
      }
    }
  }
}
</style>
