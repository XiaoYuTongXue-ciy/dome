import { debounce } from 'lodash-es';
import { computed, unref, ref } from 'vue';

const keyword = ref<string>('');
export const searchParams = computed<Recordable<string | number>>(() => {
  return { Name: unref(keyword), pageSize: 5000 };
});

export const onSearch = debounce((e) => {
  keyword.value = e.target._value;
}, 500);
