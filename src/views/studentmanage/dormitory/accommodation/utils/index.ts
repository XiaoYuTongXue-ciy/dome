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

// 性别
export const genderOptions = [
  {
    label: '未说明性别',
    value: 0,
  },
  {
    label: '男',
    value: 1,
  },
  {
    label: '女',
    value: 2,
  },
  {
    label: '其他',
    value: 3,
  },
];

// 是否关联宿舍
export const dormitoryAssignOptions = [
  {
    label: '无',
    value: null,
  },
  {
    label: '是',
    value: 1,
  },
  {
    label: '否',
    value: 0,
  },
];
export const genderMap = {
  0: '未说明性别',
  1: '男',
  2: '女',
  3: '其他',
};
