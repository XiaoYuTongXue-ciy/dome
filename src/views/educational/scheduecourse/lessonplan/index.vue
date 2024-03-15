<template>
  <div>
    <BasicTable @register="registerTable">
      <template #form-semester="{ model, field }">
        <ApiSelect
          ref="semSearchKey"
          :api="getSemesterInfo"
          showSearch
          v-model:value="model[field]"
          placeholder="请选择"
          :filterOption="false"
          resultField="items"
          labelField="value"
          valueField="id"
          labelInValue
          :params="semSearchParams"
          @search="debSemesterSearch"
          @select="onSemesterSelect($event, model)"
        />
      </template>
      <template #form-course="{ model, field }"
        ><ApiSelect
          ref="courseSearchKey"
          :api="getCourseInfo"
          showSearch
          v-model:value="model[field]"
          :filterOption="false"
          placeholder="请选择"
          resultField="items"
          labelField="courseName"
          valueField="id"
          :params="courseSearchParams"
          @search="debCouSearch"
      /></template>
      <template #toolbar>
        <div class="wrap">
          <div class="wrap-box">
            <BasicUpload
              :maxSize="20"
              :maxNumber="20"
              @change="handleChange"
              :api="uploadApi"
              :value="fileList"
            />
            <a-button type="primary" class="btn" @click="getExportData"> 导 出 </a-button>
            <a-button type="primary" class="btn" @click="getDownload"> 模板下载 </a-button>
            <a-button type="primary" @click="handleShow">未排课教师列表</a-button>
          </div>
        </div>
        <a-button type="primary" @click="handleCreate">新增教学计划</a-button>
      </template>
      <template #bodyCell="{ record, column }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <DetailDrawer @register="registerDrawer" @success="handleSuccess" />
    <Modal v-model:open="open" title="未排课教师列表" width="400px">
      <div class="teacher-box">
        <Spin :spinning="loading">
          <div v-for="item in unrangedTeachers" :key="item.id" class="p-2">{{ item.name }}</div>
        </Spin>
      </div>
      <template #footer>
        <a-button key="submit" type="primary" @click="handleRefresh">刷新</a-button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
  import { ref, unref, computed } from 'vue';
  import { useDebounceFn } from '@vueuse/core';
  import { Modal, Spin } from 'ant-design-vue';
  import { BasicUpload } from '@/components/Upload';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { ApiSelect } from '@/components/Form';
  import { getPageInfo as getSemesterInfo } from '@/api/dictionary'; // 学期
  import { getPageInfo as getCourseInfo } from '@/api/course'; // 课程
  import {
    getPageInfo,
    deleteItem,
    uploadApi,
    getExport,
    getTemplateFile,
    getTeacherByNameList,
  } from '@/api/educational/schedueCourse/lessonPlan.js';
  import { columns, searchFormSchema } from './config';

  import { useDrawer } from '@/components/Drawer';
  import DetailDrawer from './detailDrawer.vue';
  import { useLoading } from '@/components/Loading';
  import { useMessage } from '@/hooks/web/useMessage';
  import { downloadByData } from '@/utils/file/download';
  import dayjs from 'dayjs';

  const { notification } = useMessage();
  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '下载中...',
  });
  const semester = ref('');
  let UploadIds = ref<any[]>([]);
  const fileList = ref();

  const open = ref<boolean>(false);
  const loading = ref<boolean>(false);
  const unrangedTeachers = ref();

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload }] = useTable({
    title: '',
    api: getPageInfo,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      actionColOptions: {
        span: 24,
      },
      showAdvancedButton: true,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: true,
    indexColumnProps: {
      fixed: 'left',
    },
    rowKey: 'id',
    rowSelection: {
      onSelect: (record, selected) => {
        if (selected) {
          UploadIds.value.push(record.id);
        } else {
          const idx = UploadIds.value.indexOf(record.id);
          if (idx > -1) {
            UploadIds.value.splice(idx, 1);
          }
        }
      },
      onSelectAll: (selected, changeRows) => {
        const changeIds = changeRows.map((item) => item.id);
        if (selected) {
          UploadIds.value.push(...changeIds);
        } else {
          UploadIds.value.splice(0);
        }
      },
    },
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
    },
    expandRowByClick: true,
  });

  // 新增教学计划
  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
    });
  }
  // 编辑教学计划
  function handleEdit(record) {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }
  // 删除
  async function handleDelete(record) {
    await deleteItem({ id: record.id });
    notification.success({ message: '操作成功', duration: 2 });
    reload();
  }

  function handleSuccess() {
    notification.success({ message: '操作成功', duration: 2 });
    reload();
  }
  // 未排课教师列表
  async function handleShow() {
    open.value = true;
    loading.value = true;
    getTeachers();
  }
  async function getTeachers() {
    const data = await getTeacherByNameList();
    if (data.length > 0) {
      loading.value = false;
      unrangedTeachers.value = data;
    }
  }
  function handleRefresh() {
    loading.value = true;
    getTeachers();
  }
  // 导入
  function handleChange(fileList) {
    console.log('fileList', fileList);
  }
  // 导出
  async function getExportData() {
    openFullLoading();
    const uniqueArray = [...new Set(UploadIds.value)];
    const data = await getExport({ listIds: uniqueArray });
    // data 为接口返回文件流数据，如果你的接口嵌套一层那就逐层去取
    UploadIds.value = [];
    const currentTime = dayjs();
    const formattedTime = currentTime.format('YYYYMMDDHHmmss');

    downloadByData(data, `教学计划${formattedTime}.xlsx`);
    closeFullLoading();
  }

  // 模板导出
  const getDownload = async () => {
    openFullLoading();
    const data = await getTemplateFile({
      TemplateCode: 'teaching_plan',
    });
    console.log(data);
    downloadByData(data, `教学计划模板.xlsx`);
    closeFullLoading();
  };

  const semSearchKey = ref<string>('');
  const semSearchParams = computed<Recordable<string | number>>(() => {
    return { dictTypeCode: 'semester', name: unref(semSearchKey), pageSize: 5000 };
  });
  const debSemesterSearch = useDebounceFn((value: string) => (semSearchKey.value = value), 500);

  function onSemesterSelect(item, model) {
    semester.value = item.label;
    courseSearchKey.value = '';
    model.courseId = null;
  }

  const courseSearchKey = ref<string>('');
  const courseSearchParams = computed<Recordable<string | number>>(() => {
    return { name: unref(courseSearchKey), semester: unref(semester.value), pageSize: 5000 };
  });
  const debCouSearch = useDebounceFn((value: string) => (courseSearchKey.value = value), 500);
</script>

<style lang="less" scoped>
  .wrap {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 36rem;
    margin-right: 3rem;

    .wrap-box {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100%;
    }
  }

  .export {
    margin-right: 3rem;
  }

  :deep(.ant-picker) {
    width: 100%;
  }

  :deep(.ant-form-item-no-colon) {
    /* 居中对齐 */
    display: inline-block !important;
    width: 100%;
    padding-left: 20px;
    line-height: 32px;
    text-align: justify;
    text-align-last: justify;
  }

  .teacher-box {
    max-height: 200px;
    margin: 10px 20px;
    overflow: auto;
  }

  .btn {
    min-width: 90px;
  }
</style>
