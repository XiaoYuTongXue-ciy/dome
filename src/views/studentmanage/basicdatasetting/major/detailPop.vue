<template>
  <div>
    <Popover :title="title">
      <span>查看详情</span>
      <Icon :icon="icon" :color="color" :size="size" />
      <template #content>
        <slot></slot>
        <!-- <li v-for="item in data" :key="item.id">{{ item?.info }} </li> -->
      </template>
    </Popover>
  </div>
</template>

<script setup>
  import { Popover } from 'ant-design-vue';
  import Icon from '@/components/Icon/Icon.vue';

  defineProps({
    icon: {
      type: String,
      default: 'ant-design:info-circle-outlined',
    },
    color: {
      type: String,
      default: '#0960bd',
    },
    size: {
      type: Number,
      default: 16,
    },
    title: {
      type: String,
      default: '',
    },
    // data: {
    //   type: Array,
    //   default: () => [],
    // },
  });
</script>

<style lang="scss" scoped></style>
