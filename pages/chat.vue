<template>
  <div>
    <v-navigation-drawer
      permanent
      width="150"
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

    <v-navigation-drawer
      permanent
      width="300"
    >
      <v-list>
        <v-list-item
          class="tw-gap-x-3"
          v-for="message in filteredMessages"
          height="80"
          :prepend-avatar="message.senderDetail.pictureUrl"
          :title="message.senderDetail.displayName"
          :subtitle="message.message"
          :value="message.senderDetail.userId"
          @click="setShowIndex(message.senderDetail.userId)"
        ></v-list-item>
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
      <div v-for="message in fetchChat.data">
        <div v-if="message.senderDetail.userId === showIndex">
          <common-chat-bubble
            :msg="message.message"
            :name="message.senderDetail.displayName"
            :img="message.senderDetail.pictureUrl"
            :time="message.sourceTimestamp"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
useHead({
  title: 'แชต',
})

const showIndex = ref()

const setShowIndex = (userId: any) => {
  showIndex.value = userId
}

const fetchChat = ref()
const filteredMessages = ref()

const testfunc = async () => {
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
    console.log('🍪🥛 ~ file: chat.vue:84 ~ test:', fetchChat.value)
  } catch (error: any) {
    console.log(error)
  }
}
testfunc()
</script>
<style>
.v-list-item-title {
  font-size: 14px;
  font-weight: bold;
}
.v-list-item__prepend {
  display: grid;
}
</style>
