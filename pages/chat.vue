<template>
  <div>
    <v-navigation-drawer
      permanent
      width="145"
    >
      <v-list>
        <v-list-item
          title="ทั้งหมด"
          value="home"
          prepend-icon="mdi-message-outline"
          exact
        ></v-list-item>

        <v-list-subheader> สถานะแชต </v-list-subheader>
        <v-divider></v-divider>
        <v-list-item
          title="รอดำเนินการ"
          value="pending"
          prepend-icon="mdi-emoticon-neutral-outline"
        ></v-list-item>

        <v-list-item
          title="ดำเนินการ"
          value="doing"
          prepend-icon="mdi-emoticon-confused-outline"
        ></v-list-item>
        <v-list-item
          title="เสร็จสิ้น"
          value="done"
          prepend-icon="mdi-emoticon-happy-outline"
        ></v-list-item>

        <v-list-subheader> Social Media </v-list-subheader>
        <v-divider></v-divider>
        <v-list-item
          title="Line"
          value="line"
          prepend-icon="fa:fa-brands fa-line"
        ></v-list-item>

        <v-list-item
          title="Facebook"
          value="facebook"
          prepend-icon="mdi-facebook"
        ></v-list-item>
        <v-list-item
          title="Instagram"
          value="instagram"
          prepend-icon="mdi-instagram"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- drawer รายชื่อ -->
    <v-navigation-drawer
      permanent
      width="280"
    >
      <v-list
        class="tw-p-0"
        v-for="message in filteredMessages"
      >
        <v-list-item
          class="tw-gap-x-3"
          height="90"
          :prepend-avatar="message.senderDetail.pictureUrl"
          :title="message.senderDetail.displayName"
          :subtitle="message.message"
          :value="message.senderDetail.userId"
          :active="
            message.senderDetail.userId === selectCustomer.senderDetail.userId
          "
          @click="
            setSelectCustomer(
              message.senderDetail.userId,
              message.senderDetail.displayName,
              message.senderDetail.pictureUrl
            )
          "
        >
          <!-- Todo: อ่านแล้ว -->
          <template v-slot:append>
            <v-badge
              dot
              color="error"
            >
              <v-icon
                color="#02c153"
                :icon="message.source === 'LINE' ? 'fa:fa-brands fa-line' : ''"
                variant="text"
              ></v-icon>
            </v-badge>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>

  <div>
    <!-- <v-card
      class="mx-auto text-center"
      width="500"
      height="150"
    >
      <div>
        <v-icon
          icon="mdi-alert-circle-outline"
          size="50"
          color="error"
        />
        <v-card-title>
          โปรดเชื่อมต่อบัญชี Social Media ก่อนใช้งานระบบ
        </v-card-title>
      </div>
    </v-card> -->
    <div v-if="fetchChat">
      <div
        v-if="
          selectCustomer.senderDetail.userId.trim() !== '' &&
          selectCustomer.senderDetail.displayName.trim() !== ''
        "
      >
        <v-navigation-drawer
          v-model="drawer"
          permanent
          width="280"
          location="right"
          :rail="rail"
          @click="rail = false"
        >
          <div class="pa-3 pt-6">
            <div class="text-center mb-3">
              <h2>
                ข้อมูล
                <span
                  ><v-btn
                    variant="text"
                    icon="mdi-pencil-outline"
                  ></v-btn
                ></span>
              </h2>
            </div>
            <div>
              <h3>ชื่อ</h3>
              <p>{{ selectCustomer.senderDetail.displayName }}</p>
              <h3 class="tw-mt-5">เบอร์โทรศัพท์</h3>
              <p>000000000</p>
              <h3 class="tw-mt-5">อีเมล</h3>
              <p>Example@gmail.com</p>
              <h3 class="tw-mt-5">หมายเหตุ</h3>
              <p>Example</p>
              <h3 class="tw-mt-5">ที่อยู่</h3>
              <p>Example</p>
            </div>
          </div>
        </v-navigation-drawer>
        <v-app-bar :elevation="2">
          <template v-slot:prepend>
            <v-img
              :width="40"
              :height="40"
              aspect-ratio="1/1"
              cover
              class="tw-rounded-full"
              :src="selectCustomer.senderDetail.pictureUrl"
            ></v-img>
          </template>
          <v-app-bar-title class="font-weight-bold">
            {{ selectCustomer.senderDetail.displayName }}
          </v-app-bar-title>
          <template v-slot:append>
            <v-btn
              icon="mdi-information-outline"
              @click.stop="drawer = !drawer"
            ></v-btn>
          </template>
        </v-app-bar>
      </div>

      <div v-for="message in fetchChat.data">
        <div v-if="message.senderDetail.userId === showIndex">
          <ChatBubble
            :msg="message.message"
            :name="message.senderDetail.displayName"
            :img="message.senderDetail.pictureUrl"
            :time="message.sourceTimestamp"
          />
        </div>
      </div>
    </div>

    <v-footer
      v-if="
        selectCustomer.senderDetail.userId.trim() !== '' &&
        selectCustomer.senderDetail.displayName.trim() !== ''
      "
      app
      name="footer"
    >
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12">
              <CommonTextField
                v-model="sendMsg"
                append-icon="mdi-send"
                type="text"
                @click:append=""
              />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-footer>
  </div>
</template>
<script setup lang="ts">
useHead({
  title: 'แชต',
})

const drawer = ref(false)
const rail = ref(false)
const showIndex = ref()
const sendMsg = ref()

const selectCustomer = ref<any>({
  senderDetail: {
    userId: '',
    displayName: '',
    pictureUrl: '',
  },
})

const setSelectCustomer = (userId: any, displayName: any, pictureUrl: any) => {
  showIndex.value = userId
  selectCustomer.value.senderDetail = { userId, displayName, pictureUrl }
  console.log(
    '🍪🥛 ~ file: chat.vue:159 ~ setSelectCustomer ~ selectCustomer:',
    selectCustomer
  )
}

const fetchChat = ref()
const filteredMessages = ref()

const fetchAllChat = async () => {
  try {
    const data = await useFetch(
      'http://localhost:3000/api/social-message/ASAP-Shop/pisenuta'
    )
    fetchChat.value = await data.data.value
    if (fetchChat.value) {
      const latestMessages: any = {}

      fetchChat.value.data.forEach((message: any) => {
        const userId = message.senderDetail.userId
        latestMessages[userId] = message
      })

      filteredMessages.value = Object.values(latestMessages)
    }
    console.log(
      '🍪🥛 ~ file: chat.vue:246 ~ fetchAllChat ~ fetchChat:',
      fetchChat
    )
  } catch (error: any) {
    console.log(error)
  }
}
fetchAllChat()
</script>
<style>
.v-list-item-title {
  font-size: 14px;
  font-weight: bold;
}
.v-list-item__prepend {
  display: grid;
}
.v-list-item--one-line .v-list-item-subtitle {
  -webkit-line-clamp: 2;
  line-height: 1.5rem;
}
.v-footer {
  display: grid;
}
.v-badge--dot .v-badge__badge {
  display: none;
}
</style>
