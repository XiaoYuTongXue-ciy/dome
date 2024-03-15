import { debounce } from 'lodash-es';
import { computed, unref, ref } from 'vue';

const classKeyword = ref<string>(''); // 班级
const teacherKeyword = ref<string>(''); // 教师

export const classParams = computed<Recordable<string | number>>(() => {
  return { className: unref(classKeyword), pageSize: 5000 };
});
export const teacherParams = computed<Recordable<string | number>>(() => {
  return { name: unref(teacherKeyword), pageSize: 5000 };
});

export const onClassSearch = debounce((e) => {
  classKeyword.value = e.target._value;
}, 500);

export const onTeacherSearch = debounce((e) => {
  teacherKeyword.value = e.target._value;
}, 500);
