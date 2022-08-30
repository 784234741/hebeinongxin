<template>
  <div class="sun-content">
    <sun-table
      table-ref="tableRef"
      :loading="listLoading"
      :table-data="tableData"
      :page-list="pageList"
      :selection="true"
      :index-number="false"
      @selection-change="handleSelectionChange"
      @pagination="getList"
    >
      <template slot="tableColumn">
        <el-table-column
          v-for="item in tableColumn"
          :key="item.id"
          :prop="item.name"
          :label="item.label"
          :width="item.width"
          align="center"
        >
          <div slot-scope="{ row }">
            <span v-if="item.name === 'open_date'">{{
              row[item.name] | date10Format
            }}</span>
            <span v-else-if="item.name === 'report_date'">{{
              row[item.name] | date10Format
            }}</span>
           <span v-else-if="item.name === 'report_state'">{{
             row[item.name] | repState
           }}</span>
            <span v-else-if="item.name === 'organ_no'">{{
              row[item.name] | organNameFormat
            }}</span>
            <span v-else>{{ row[item.name] }}</span>
          </div>
        </el-table-column>
      </template>
    </sun-table>
    <div class="list-btn">
      <sun-button
        :btn-handreport="$attrs['btn-all'].btnHandreport"
        :btn-download="$attrs['btn-all'].btnDownload"
        @handleHandreport="handleHandreport"
        @handleDownload="handleDownload"
      />
    </div>
  </div>
</template>
<script>
import { commonBlank } from '@/utils/common.js'
import {
  commonMsgWarn,
  commonMsgConfirm,
  commonMsgSuccess
} from '@/utils/message.js' // 提示信息
import { dictionaryGet } from '@/utils/dictionary.js' // 字典常量

import { configTable } from './info' // 表头、表单配置
import { SunButton, SunTable } from '@/components'
import { RepOff } from '@/api'
const { queryData } = RepOff

export default {
  name: 'TableList',
  components: { SunButton, SunTable },
  filters: {
    // date10Format
    // dateTimeFormat,
    // organNameFormat
  },
  props: {
    defaultForm: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      listLoading: false,
      tableColumn: configTable(),
      tableData: [],
      currentRow: [], // 选中行
      org: this.$store.getters.organNo,
      modelPath: '',
      pageList: {
        totalNum: 0,
        page: 1, // 当前页
        pageSize: 10 // 当前页显示条数
      },
      reportState: {
        color: 'red'
      },
      offState: {
        color: 'green'
      }
    }
  },
  watch: {
    loading(value) {
      this.listLoading = this.loading
    }
  },
  created() {
    this.listLoading = this.loading
  },
  methods: {
    queryList(currentPage) {
      this.showLoading()
      const msg = {
        parameterList: [{ ...this.defaultForm }],
        oper_type: dictionaryGet('OPERATE_QUERY'),
        currentPage: currentPage || this.pageList.page,
        pageSize: this.pageList.pageSize,
        start_date: this.defaultForm.create_year ? this.defaultForm.create_year[0] : '',
        end_date: this.defaultForm.create_year ? this.defaultForm.create_year[1] : '',
        report_state: this.defaultForm.report_state,
        organ_no:
          this.defaultForm.organ_no === ''
            ? this.org
            : this.defaultForm.organ_no
      }
      // 查询
      queryData(msg).then((response) => {
        const { list, totalNum, path } = response.retMap
        this.tableData = list
        this.pageList.totalNum = totalNum
        this.modelPath = path
        this.showLoading()
      })
    },
    // 选择多行
    handleSelectionChange(val) {
      const currentRow = val
      if (currentRow.length > 1) {
        currentRow.sort(function(a, b) {
          return a.rn - b.rn
        }) // 选中行排序
      }
      this.currentRow = val
    },
    /**
     *页码更新 */
    getList(pageParam) {
      const { currentPage, pageSize } = pageParam
      this.pageList.pageSize = pageSize
      this.pageList.page = currentPage
      this.queryList()
    },
    // 手动报备
    handleHandreport() {
      if (commonBlank(this.currentRow)) {
        commonMsgWarn('未选中任何数据', this)
        return false
      } else if (this.currentRow.length > 1) {
        commonMsgWarn('修改项只能唯一，请重新勾选', this)
      } else {
        const { file_name, report_state, organ_no, report_date, serial_no, open_date } = this.currentRow[0]
        if (!commonBlank(report_state) && report_state === '1') {
          commonMsgWarn('选中的数据已报备成功，无需手动报备', this)
        } else {
          const msg = {
            parameterList: [],
            oper_type: 'toReport',
            organ_no,
            file_name,
            report_state,
            report_date,
            serial_no,
            open_date
          }
          queryData(msg).then((res) => {
            if (res.retCode === '200') {
              commonMsgSuccess('手动报备成功', this)
              this.queryList()
            } else {
              commonMsgWarn('手动报备失败', this)
            }
          })
        }
      }
    },
    handleDownload() {
      const { file_name, open_date } = this.currentRow[0]
      const arr = file_name.split('_')
      const time = arr[0];
			let organ = arr[1];
      const arr1 = organ.split('.');
			organ = arr1[0];
      const path = this.modelPath + "/" + organ + "/" + time + "/" + file_name
      console.log(path)
      commonMsgConfirm("是否确认下载报备文件？", this,  (flag) => {
        if (flag) {
          const msg = {
            parameterList: [],
            oper_type: 'download',
            open_date,
            file_name
        };
        queryData(msg).then(res => {
          const { Path, ip } = res.retMap
          var form = document.createElement("form");
          document.getElementsByTagName('body')[0].appendChild(form);
          form.setAttribute('style','display:none');
          form.setAttribute('target','');
          form.setAttribute('method','post');
          // form.setAttribute('action','http://' + ip + ':7001/SunAOS/fileDownload.do');//下载文件的请求路径
          form.setAttribute('action','http://10.10.161.12:7001/SunAOS/fileDownload.do');//下载文件的请求路径   生产环境
          // form.setAttribute('action','http://10.6.11.122:7001/SunAOS/fileDownload.do');//下载文件的请求路径 测试环境

          var input1 = document.createElement('input');
          var input2 = document.createElement('input');

          input1.setAttribute('type','text');
          input1.setAttribute('name','fileName');
          input1.setAttribute('value',file_name.replace(/\s+/g, ''));

          input2.setAttribute('type','text');
          input2.setAttribute('name','saveFileName');
          input2.setAttribute('value',Path);
          form.appendChild(input1);
          form.appendChild(input2);

          form.submit();

        })
        }
      })
    },
    /**
     * 加载中动画配置*/
    showLoading() {
      this.listLoading = !this.listLoading
    }
  }
}
</script>
<style lang="scss" scoped></style>
