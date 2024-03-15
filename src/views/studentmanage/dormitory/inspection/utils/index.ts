import { debounce } from 'lodash-es';
import { computed, unref, ref } from 'vue';

const dormitoryKeyword = ref<string>('');

export const dormitoryParams = computed<Recordable<string | number>>(() => {
  return { dormitoryDetail: unref(dormitoryKeyword), pageSize: 5000 };
});

export const onDormitorySearch = debounce((e) => {
  dormitoryKeyword.value = e.target._value;
}, 500);
