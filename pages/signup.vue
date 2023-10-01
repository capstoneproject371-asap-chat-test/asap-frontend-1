<template>
  <div class="hero min-h-screen bg-base-200">
    <div
      class="card flex-shrink-0 sm:max-w-xl max-w-xs shadow-2xl bg-base-100"
      style="width: 1500px"
    >
      <div class="card-body">
        <div class="text-center">
          <v-img
            :width="100"
            aspect-ratio="1/1"
            src="/images/logo.png"
            class="mx-auto"
          ></v-img>
          <p class="mb-5">
            ระบบจัดการแชตลูกค้า<br />สำหรับร้านค้าใน Social Media
          </p>
          <h5 class="text-3xl font-bold mb-4">สร้างบัญชี ASAP</h5>
        </div>
        <div class="form-control">
          <v-text-field
            :rules="[ruleRequired, ruleEmail]"
            v-model="email"
            id="email"
            name="email"
            type="email"
            label="อีเมล"
            variant="outlined"
            color="primary"
            class="rounded-xl"
          ></v-text-field>
        </div>
        <div class="form-control">
          <v-text-field
            :rules="[ruleRequired, rulePassLen]"
            v-model="password"
            id="password"
            name="password"
            label="รหัสผ่าน"
            variant="outlined"
            color="primary"
            @click:append-inner="visible = !visible"
            :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
            :type="visible ? 'text' : 'password'"
          ></v-text-field>
        </div>
        <div class="form-control">
          <v-text-field
            :rules="[ruleRequired, checkPassword]"
            v-model="confirmPassword"
            id="confirm-password"
            name="confirm-password"
            label="ยืนยันรหัสผ่าน"
            variant="outlined"
            color="primary"
            @click:append-inner="visible = !visible"
            :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
            :type="visible ? 'text' : 'password'"
          ></v-text-field>
        </div>
        <div class="form-control my-2">
          <v-btn
            block
            size="large"
            color="primary"
            rounded="lg"
            class="font-weight-bold"
          >
            สร้างบัญชีผู้ใช้งาน
          </v-btn>
        </div>
        <p class="text-medium-emphasis">
          มีบัญชีอยู่แล้ว?
          <NuxtLink to="/login">
            <a class="text-primary text-decoration-underline"> เข้าสู่ระบบ</a>
          </NuxtLink>
        </p>
        <!-- <div class="divider">หรือ</div> -->
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
const confirmPassword = ref('')

const checkPassword = (value: string) => {
  return value === password.value || 'รหัสผ่านไม่ตรงกัน โปรดลองอีกครั้ง'
}
const visible = ref(false)

const { ruleEmail, ruleRequired, rulePassLen } = useFormRules()
</script>
