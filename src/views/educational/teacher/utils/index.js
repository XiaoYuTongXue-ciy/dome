/* eslint-disable @typescript-eslint/no-unused-vars */
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

export const genderMap = {
  0: '未说明性别',
  1: '男',
  2: '女',
  3: '其他',
};
// 导入照片

export function uploadAvatatAfter({ source, data }) {
  values.value = `${data.result.filePath}/${data.result.name}`;
  setFieldsValue({
    avatar: values.value,
  });
  fileList.value = `${data.result.url}`;
}
