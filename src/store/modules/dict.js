import { defineStore } from 'pinia';

import { getAllDictTypes, getDictValueByCode, getDictDataValueList } from '@/api/sysDict/dictType';

export const useDictStore = defineStore({
  id: 'app-dict',
  state: () => ({
    allDictTypes: [],
  }),
  getters: {
    // getDictType: (state) => state.allDictTypes,
  },
  actions: {
    // 获取所有字典类型
    async setAllDictTypes() {
      const dictTypes = await getAllDictTypes();
      this.allDictTypes = dictTypes?.items || [];
    },
    //通过名称找code
    getDictTypeCode(name) {
      return this.allDictTypes.filter((e) => e.name === name);
    },
    //通过code找枚举值
    async getDictValueToCode(params) {
      return getDictValueByCode(params);
    },

    // //通过name找枚举值
    // async getDictValueByName(name) {
    //   return this.getDictValueToCode(this.getDictTypeCode(name));
    // },
  },
});
