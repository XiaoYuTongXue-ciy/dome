import { debounce } from 'lodash-es';
import { computed, unref, ref } from 'vue';

const addMajorKeyword = ref<string>('');
const searchMajorKeyword = ref<string>('');
const dormitoryKeyword = ref<string>('');

// 专业添加
export const addMajorParams = computed<Recordable<string | number>>(() => {
  return { majorName: unref(addMajorKeyword), pageSize: 5000 };
});

export const onAddMajorSearch = debounce((e) => {
  addMajorKeyword.value = e.target._value;
}, 500);

// 专业搜索
export const searchMajorParams = computed<Recordable<string | number>>(() => {
  return { majorName: unref(searchMajorKeyword), pageSize: 5000 };
});

export const onSearchMajorSearch = debounce((e) => {
  searchMajorKeyword.value = e.target._value;
}, 500);

export const dormitoryParams = computed<Recordable<string | number>>(() => {
  return { dormitoryDetail: unref(dormitoryKeyword), pageSize: 5000 };
});
export const onDormitorySearch = debounce((e) => {
  dormitoryKeyword.value = e.target._value;
}, 500);
