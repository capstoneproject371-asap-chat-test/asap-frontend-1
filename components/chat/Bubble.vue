<template>
  <div class="tw-chat tw-chat-start">
    <div class="tw-chat-image tw-avatar">
      <div class="tw-w-10 tw-rounded-full">
        <img :src="props.img" />
      </div>
    </div>
    <div class="tw-chat-header">
      <span class="font-weight-bold">{{ props.name }}</span>
      <time class="tw-text-xs tw-opacity-50 tw-ms-2">{{
        useDayjs()(props.time).format('ddd, DD/MM/YYYY HH:mm')
      }}</time>
    </div>
    <div class="tw-chat-bubble">{{ props.msg }}</div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  name?: string
  img?: any
  msg: any
  time?: any
}>()
</script>
