<template>
  <div class="tw-chat tw-chat-start">
    <div class="tw-chat-image tw-avatar">
      <div class="tw-w-10 tw-rounded-full">
        <img :src="props.img" />
      </div>
    </div>
    <div class="tw-chat-header">
      {{ props.name }}
      <time class="tw-text-xs tw-opacity-50">{{
        useDayjs()(props.time).format('DD/MM/YYYY HH:mm')
      }}</time>

      <!-- <div>
        {{ dayjs().format('YYYY-MM-DD') }}
      </div> -->
    </div>
    <div class="tw-chat-bubble">{{ props.msg }}</div>
    <div class="tw-chat-footer tw-opacity-50">Delivered</div>
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
