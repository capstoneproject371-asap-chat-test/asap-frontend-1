<template>
  <v-navigation-drawer
    permanent
    width="200"
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

  <!-- <div>
    <v-card
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
    </v-card>
  </div> -->
</template>
<script setup lang="ts">
useHead({
  title: 'แชต',
})
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
