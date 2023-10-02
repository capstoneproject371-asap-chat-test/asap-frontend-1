<template>
  <div class="hero min-h-screen lg:bg-base-200">
    <div
      class="card flex-shrink-0 sm:max-w-xl max-w-sm sm:shadow-2xl bg-base-100"
      style="width: 1500px"
      :class="{ 'mt-5 mb-5': userInfo?.isOwner }"
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
            :rules="[required, checkEmail]"
            v-model="userInfo.email"
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
            :rules="[required, passwordLength]"
            v-model="userInfo.password"
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
            :rules="[
              required,
              confirmPassword(userInfo.confirmPassword, userInfo.password),
            ]"
            v-model="userInfo.confirmPassword"
            id="confirm-password"
            name="confirm-password"
            label="ยืนยันรหัสผ่าน"
            variant="outlined"
            color="primary"
            @click:append-inner="confirmVisible = !confirmVisible"
            :append-inner-icon="confirmVisible ? 'mdi-eye' : 'mdi-eye-off'"
            :type="confirmVisible ? 'text' : 'password'"
          ></v-text-field>
        </div>
        <div class="form-control">
          <v-radio-group
            label="คุณเป็นเจ้าของร้านค้าใช่หรือไม่?"
            inline
            v-model="userInfo.isOwner"
          >
            <v-radio
              label="ใช่"
              :value="true"
              color="primary"
              class="mr-7"
            ></v-radio>
            <v-radio
              label="ไม่ใช่"
              :value="false"
              color="primary"
              @click="resetShopValue"
            ></v-radio>
          </v-radio-group>
          <p
            class="text-xs text-error"
            v-if="userInfo?.isOwner === false"
          >
            ในกรณีที่ท่านไม่ใช่เจ้าของร้านค้า ท่านจะมีสิทธิ์เป็น Agent Lead หรือ
            Agent เท่านั้น
          </p>
        </div>

        <!-- Biz question -->
        <div v-if="!!userInfo?.isOwner">
          <div class="form-control mb-3">
            <v-text-field
              :rules="[required]"
              v-model="userInfo.shop!.name"
              id="bizName"
              name="bizName"
              type="text"
              label="ชื่อธุรกิจ"
              variant="outlined"
              color="primary"
              class="rounded-xl"
            ></v-text-field>
          </div>
          <div class="form-control mb-3">
            <v-autocomplete
              label="ประเภทธุรกิจ"
              variant="outlined"
              color="primary"
              :rules="[required]"
              :items="categories"
              v-model="userInfo.shop!.category"
            ></v-autocomplete>
          </div>
          <div class="form-controls mb-3">
            <v-text-field
              label="รายละเอียด (ไม่จำเป็น)"
              placeholder="เช่น ร้านขายเสื้อผ้า, ร้านเสริมสวย"
              color="primary"
              variant="outlined"
              v-model="userInfo.shop!.detail"
            ></v-text-field>
          </div>
          <div class="form-control mt-5">
            <p>
              ช่องทาง social media
              <span class="text-error">อย่างน้อย 1 ช่องทาง</span>
            </p>
            <v-checkbox
              v-model="selectedSocial"
              label="Facebook"
              value="facebook"
              color="primary"
              hide-details
            ></v-checkbox>
            <v-text-field
              v-if="selectedSocial.find((value) => value === 'facebook')"
              :rules="[required, facebookLink]"
              v-model="userInfo.shop!.social!.facebook"
              label="Facebook Page Link"
              color="primary"
              variant="outlined"
            ></v-text-field>
            <v-checkbox
              v-model="selectedSocial"
              label="Instagram"
              value="instagram"
              color="primary"
              hide-details
            ></v-checkbox>
            <v-text-field
              v-if="selectedSocial.find((value) => value === 'instagram')"
              :rules="[required, instagramLink]"
              v-model="userInfo.shop!.social!.instagram"
              label="Instagram Page Link"
              color="primary"
              variant="outlined"
            ></v-text-field>
            <v-checkbox
              v-model="selectedSocial"
              label="Line"
              value="line"
              color="primary"
              hide-details
            ></v-checkbox>
            <v-text-field
              v-if="selectedSocial.find((value) => value === 'line')"
              :rules="[required]"
              v-model="userInfo.shop!.social!.line"
              label="ID Line Official Account"
              color="primary"
              variant="outlined"
            ></v-text-field>
          </div>
        </div>
        <div class="form-control my-2">
          <v-btn
            block
            size="large"
            color="primary"
            rounded="lg"
            class="font-weight-bold"
            :disabled="disabledButton"
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { businessCategories } from '~/data/businessCategories.data'
import { SocialLinks } from '~/interfaces/index.interface'
import UserSignup from '~/interfaces/signup.interface'

useHead({
  title: 'Welcome to ASAP',
})
const {
  checkEmail,
  required,
  passwordLength,
  confirmPassword,
  facebookLink,
  instagramLink,
} = useFormRules()

const userInfo = ref<UserSignup>({
  email: '',
  password: '',
  confirmPassword: '',
  isOwner: undefined,
  shop: {
    name: '',
    category: '',
    detail: '',
    social: {
      facebook: '',
      instagram: '',
      line: '',
    },
  },
})

const selectedSocial = ref<string[]>([])

const categories = JSON.parse(JSON.stringify(businessCategories))

const disabledButton = computed(() => {
  if (userInfo.value?.isOwner === true) {
    return (
      selectedSocial.value.length === 0 ||
      !userInfo.value?.shop?.name ||
      isMissingLink('facebook') ||
      isMissingLink('instagram') ||
      isMissingLink('line')
    )
  } else if (userInfo.value?.isOwner === false) {
    return (
      !userInfo.value?.email ||
      !userInfo.value?.password ||
      !userInfo.value?.confirmPassword ||
      isMissingLink('facebook') ||
      isMissingLink('instagram') ||
      isMissingLink('line')
    )
  } else {
    return true
  }
})

const isMissingLink = (social: keyof SocialLinks) => {
  return (
    selectedSocial.value.includes(social) &&
    !userInfo.value.shop?.social[social]
  )
}

const visible = ref(false)
const confirmVisible = ref(false)

const resetShopValue = () => {
  userInfo.value.shop = {
    name: '',
    category: '',
    detail: '',
    social: {
      facebook: '',
      instagram: '',
      line: '',
    },
  }
}
</script>
