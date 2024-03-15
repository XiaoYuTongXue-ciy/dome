import { debounce } from 'lodash-es';
import { computed, unref, ref } from 'vue';

const majorKeyword = ref<string>('');
const studentKeyword = ref<string>('');
const dormitoryKeyword = ref<string>('');

export const majorParams = computed<Recordable<string | number>>(() => {
  return { majorName: unref(majorKeyword), pageSize: 5000 };
});
export const studentParams = computed<Recordable<string | number>>(() => {
  return { name: unref(studentKeyword), pageSize: 5000 };
});
export const dormitoryParams = computed<Recordable<string | number>>(() => {
  return { dormitoryDetail: unref(dormitoryKeyword), pageSize: 5000 };
});

export const onMajorSearch = debounce((e) => {
  majorKeyword.value = e.target._value;
}, 500);

export const onStudentSearch = debounce((e) => {
  studentKeyword.value = e.target._value;
}, 500);

export const onDormitorySearch = debounce((e) => {
  dormitoryKeyword.value = e.target._value;
}, 500);
