import { debounce } from 'lodash-es';
import { computed, unref, ref } from 'vue';

const majorKeyword = ref<string>('');

export const majorParams = computed<Recordable<string | number>>(() => {
  return { majorName: unref(majorKeyword), pageSize: 5000 };
});

export const onMajorSearch = debounce((e) => {
  majorKeyword.value = e.target._value;
}, 500);
