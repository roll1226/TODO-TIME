<template>
  <div>
    <v-card>
      <v-container>
        <h2>お問い合わせ</h2>
        <v-form
          ref="form"
          v-model="contactFormValidation.valid"
          lazy-validation
        >
          <v-text-field
            v-model="contactForm.name"
            :rules="contactFormValidation.nameRules"
            label="名前"
            required
          />
          <v-text-field
            v-model="contactForm.email"
            :rules="contactFormValidation.emailRules"
            label="メールアドレス"
            required
          />
          <v-textarea
            v-model="contactForm.contents"
            :rules="contactFormValidation.contentsRules"
            label="内容"
            required
          />
          <v-btn
            :loading="contactForm.loading"
            :disabled="!contactFormValidation.valid"
            block
            large
            color="info"
            class="mt-4 font-weight-bold"
            @click="contactMail()"
          >
            送信
          </v-btn>
        </v-form>
      </v-container>
    </v-card>
    <v-snackbar
      v-model="snackBar.show"
      :color="snackBar.color"
      bottom
      right
      :timeout="6000"
      class="font-weight-bold"
    >
      {{ snackBar.message }}
    </v-snackbar>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'

const functions = firebase.functions()

export default {
  data: () => ({
    contactForm: {
      name: '',
      contents: '',
      email: '',
      id: '1',
      loading: false
    },
    contactFormValidation: {
      valid: false,
      nameRules: [(v) => !!v || '名前は必須項目です'],
      emailRules: [(v) => !!v || 'メールアドレスは必須項目です'],
      contentsRules: [(v) => !!v || '内容は必須項目です']
    },
    snackBar: {
      show: false,
      color: '',
      message: ''
    }
  }),
  methods: {
    contactMail() {
      if (this.$refs.form.validate()) {
        this.contactForm.loading = true
        const mailer = functions.httpsCallable('contactMail')

        mailer(this.contactForm)
          .then(() => {
            this.formReset()
            this.showSnackBar(
              'success',
              'お問い合わせありがとうございます。送信完了しました'
            )
          })
          .catch((err) => {
            this.showSnackBar(
              'error',
              '送信に失敗しました。時間をおいて再度お試しください'
            )
            alert(err)
          })
          .finally(() => {
            this.contactForm.loading = false
          })
      }
    },
    showSnackBar(color, message) {
      this.snackBar.message = message
      this.snackBar.color = color
      this.snackBar.show = true
    },
    formReset() {
      this.$refs.form.reset()
    }
  }
}
</script>
