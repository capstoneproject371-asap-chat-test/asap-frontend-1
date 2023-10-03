<template>
  <v-text-field
    v-bind="$attrs"
    :density="density"
    :variant="variant"
    :color="color"
  ></v-text-field>
</template>
<script>
export default {
  props: {
    density: {
      type: String,
      default: 'compact',
    },
    variant: {
      type: String,
      default: 'outlined',
    },
    color: {
      type: String,
      default: 'primary',
    },
  },
}
</script>
