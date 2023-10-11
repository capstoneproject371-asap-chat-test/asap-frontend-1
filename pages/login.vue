<template>
  <!-- TODO: connect with firebase -->
  <div class="tw-hero tw-min-h-screen lg:tw-bg-base-200 xs:tw-bg-white">
    <div
      class="tw-card tw-flex-shrink-0 sm:tw-max-w-xl tw-max-w-sm lg:tw-shadow-2xl tw-bg-base-100"
      style="width: 1500px"
    >
      <div class="tw-card-body">
        <div class="text-center">
          <v-img
            :width="100"
            aspect-ratio="1/1"
            src="/images/logo.png"
            class="tw-mx-auto"
          />
          <p class="tw-mb-5">
            ระบบจัดการแชตลูกค้า<br />สำหรับร้านค้าใน Social Media
          </p>
          <h5 class="tw-text-3xl font-weight-bold tw-mb-4">เข้าสู่ระบบ ASAP</h5>
        </div>
        <v-form v-model="isFormValid">
          <div class="form-control">
            <CommonTextField
              :rules="[required, checkEmail]"
              v-model="email"
              id="email"
              name="email"
              type="email"
              label="อีเมล"
            />
          </div>
          <div class="form-control tw-mt-2">
            <CommonTextField
              :rules="[required]"
              v-model="password"
              id="password"
              name="password"
              label="รหัสผ่าน"
              @click:append-inner="visible = !visible"
              :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
              :type="visible ? 'text' : 'password'"
            />
          </div>
          <div class="form-control tw-my-2">
            <v-btn
              block
              size="large"
              color="primary"
              rounded="lg"
              type="submit"
              class="font-weight-bold"
              :disabled="!isFormValid"
            >
              เข้าสู่ระบบ
            </v-btn>
          </div>
        </v-form>
        <p class="text-medium-emphasis tw-text-black">
          ยังไม่เคยมีบัญชี?
          <NuxtLink to="/signup">
            <a class="text-primary text-decoration-underline">
              ลงทะเบียนที่นี่</a
            >
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Welcome to ASAP',
})

const email = ref('')
const password = ref('')
const isFormValid = ref(false)

const visible = ref(false)

const { checkEmail, required } = useFormRules()
</script>
