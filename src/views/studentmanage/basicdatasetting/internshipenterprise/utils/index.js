import { computed } from 'vue';
import { useUserStore } from '@/store/modules/user';

const userStore = useUserStore();

export const getUserInfo = computed(() => {
  const { realName = '' } = userStore.getUserInfo || {};
  return { realName };
});
export const IsOrNo = [
  {
    label: '是',
    value: true,
  },
  {
    label: '否',
    value: false,
  },
];
