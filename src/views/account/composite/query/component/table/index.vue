<template>
  <div class="sun-content">
    <div class="list-btn">
      <sun-button
        :edit-acc-type="$attrs['btn-all'].editAccType"
        :btn-synchro="$attrs['btn-all'].btnSynchro"
        @editAccType="editAccType"
        @handleSynchro="handleSynchro"
      />
    </div>
    <sun-table
      table-ref="tableRef"
      :loading="listLoading"
      :table-data="tableData"
      :page-list="pageList"
      @current-change="currentChange"
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
            <span v-if="item.name === 'open_organ'">{{
              row[item.name] | organNameFormat
            }}</span>
            <span
              v-else-if="item.name === 'acc_no'"
              class="jobServer"
              :style="{color: $store.state.settings.theme}"
              @click="openDialog(row)"
            >
              {{ row[item.name] }}
            </span>
            <span v-else-if="item.name === 'open_date'">{{
              row[item.name] | date10Format
            }}</span>

            <span v-else-if="item.name === 'acc_type'">{{
              row[item.name] | accType
            }}</span>

            <span v-else-if="item.name === 'bank_acc_type'">{{
              row[item.name] | amHexinAccType
            }}</span>
            <span
              v-else-if="item.name === 'acc_state'"
              :style="row[item.name] === '0' ? {color:'red'} : {color: $store.state.settings.theme} "
            >{{ row[item.name] | accState }}</span>
            <span v-else>{{ row[item.name] }}</span>
          </div>
        </el-table-column>
      </template></sun-table>
    <sun-form-dialog
      :title="dialog.title"
      :visible="dialog.visible"
      :form-config="dialog.config"
      :form-data="dialog.formData"
      :width="dialog.width"
      :label-width="dialog.labelWidth"
      @dialogClose="changeVisible"
      @dialogSubmit="dialogSumbit"
    /><!--???????????????-->
    <all-views
      :visible="dialog2.visible"
      :title="dialog2.title"
      :width="dialog2.width"
      :height="dialog2.height"
      :top="dialog2.top"
      :row="currentRow"
      :tab-arr="dialog2.tabArr"
      @dialogClose2="changeVisible2"
      @handleClick="handleClick"
    >
      <template slot-scope="{ data, config, allData }">
        <div v-if="data.type === 'describe'">
          <div
            v-for="(item, index) in config[data.name].message"
            :key="item.title + index"
            :style="boxStyle"
          >
            <el-descriptions
              :title="item.title"
              :column="3"
              :label-style="{
                color: '#354052'
              }"
              :content-style="{
                paddingLeft: '6px',
                color: '#767e91'
              }"
            >
              <el-descriptions-item
                v-for="item2 in item.arr"
                :key="item2.name"
                :label="item2.label"
              >
                <span v-if="item2.name === 'acc_state'">
                  {{ allData[data.name][item2.name] | accState }}</span>
                <span
                  v-else-if="
                    item2.name === 'open_date' ||
                      item2.name === 'close_date' ||
                      item2.name === 'expire_date' ||
                      item2.name === 'start_date' ||
                      item2.name === 'end_date' ||
                      item2.name === 'legal_end' ||
                      item2.name === 'agent_end' ||
                      item2.name === 'deffect_date'
                  "
                >
                  {{ allData[data.name][item2.name] | date10Format }}</span>
                <span v-else-if="item2.name === 'hd_type'">
                  {{ allData[data.name][item2.name] | hdType }}</span>
                <span v-else-if="item2.name === 'depo_type'">
                  {{ allData[data.name][item2.name] | depoType }}</span>
                <span v-else-if="item2.name === 'managestype'">
                  {{ allData[data.name][item2.name] | managerType }}</span>
                <span v-else-if="item2.name === 'file_type1'">
                  {{ allData[data.name][item2.name] | saccFileType }}</span>
                <span v-else-if="item2.name === 'file_type2'">
                  {{ allData[data.name][item2.name] | saccFileType }}</span>
                <span v-else-if="item2.name === 'legal_type'">
                  {{ allData[data.name][item2.name] | legalType }}</span>
                <span v-else>{{ allData[data.name][item2.name] }}</span>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
        <div v-else-if="data.type === 'table'">
          <sun-table
            :table-ref="data.name + 'tableRef'"
            :table-data="allData[data.name].tableData"
            :loading="allData[data.name].listLoading"
          >
            <template slot="tableColumn">
              <el-table-column
                v-for="item in allData[data.name].tableColumn"
                :key="item.id"
                :prop="item.name"
                :label="item.label"
                :width="item.width"
              >
                <div slot-scope="{ row }">
                  <span v-if="item.name === 'open_organ'">{{
                    row[item.name] | organNameFormat
                  }}</span>
                  <span v-else-if="item.name === 'acc_type'">{{
                    row[item.name] | accType
                  }}</span>
                  <span v-else-if="item.name === 'oper_type'">{{
                    row[item.name] | handleType
                  }}</span>
                  <span v-else-if="item.name === 'report_state'">{{
                    row[item.name] | repState
                  }}</span>
                  <span
                    v-else-if="
                      item.name === 'report_date' || item.name === 'trans_date'
                    "
                  >{{ row[item.name] | date10Format }}</span>
                  <span v-else>{{ row[item.name] }}</span>
                </div>
              </el-table-column>
            </template></sun-table>
        </div>
        <div
          v-else-if="data.type === 'image'"
          style="width: 100%; height: 100%"
        >
          <TreeImage
            v-if="type === 'yxxx'"
            ref="treeImage"
            :arr="imageArr"
            :activeitem="activeItem"
            @handleNodeClick="handleNodeClick"
          >
            <template slot="treefooter">
              <el-upload
                ref="upload"
                class="upload-demo"
                :action="actionUrl"
                :on-success="uploadSuccess"
                :before-upload="beforeUpload"
                accept=".jpg, .jpeg, .mp4"
                :show-file-list="false"
              />
              <el-button
                size="small"
                type="primary"
                @click="upload"
              >??????</el-button>
              <!-- <el-button @click="downLoadImg">??????</el-button> -->
              <el-button @click="deleteImg">??????</el-button>
            </template>
          </TreeImage>
        </div>
        <div v-else />
      </template>
    </all-views>

    <sun-form-dialog
      :title="dialog3.title"
      :visible="dialog3.visible"
      :form-config="dialog3.config"
      :form-data="dialog3.formData"
      @dialogClose="dialog3.visible = false"
      @dialogSubmit="dialogSumbit3"
    />
  </div>
</template>
<script>
import {
  commonMsgSuccess,
  commonMsgWarn,
  commonMsgConfirm,
  commonMsgInfo
} from '@/utils/message.js' // ????????????
import { dictionaryGet } from '@/utils/dictionary.js' // ????????????
import { commonBlank } from '@/utils/common'

import { config, configTable, config3 } from './info' // ?????????????????????
import {
  SunButton,
  SunFormDialog,
  SunTable,
  AllViews,
  TreeImage
} from '@/components' // ??????

import { SysAccInfo } from '@/api'
const { accInfo, uploadFile, reportInfo } = SysAccInfo
export default {
  name: 'TableList',
  components: {
    SunTable,
    SunFormDialog,
    SunButton,
    AllViews,
    TreeImage
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
      type: '',
      checkNode: null,
      defaultTreeImage: [
        {
          label: '????????????',
          id: '0',
          children: [
            {
              label: '??????',
              id: '11',
              children: []
            },
            {
              label: '??????',
              id: '22',
              children: []
            }
          ]
        }
      ],
      imageArr: [
        {
          label: '????????????',
          id: '0',
          children: [
            {
              label: '??????',
              id: '11',
              children: []
            },
            {
              label: '??????',
              id: '22',
              children: []
            }
          ]
        }
      ],
      activeItem: '',
      boxStyle: {
        padding: '2rem 2rem 2rem 4rem',
        margin: '2rem 3rem 0',
        borderRadius: '4px',
        boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)'
      },
      label: {
        width: '15%',
        textAlign: 'right',
        paddingRight: '2rem'
      },
      content: {
        width: '18%'
      },
      listLoading: false,
      tableColumn: configTable(),
      tableData: [],
      currentRow: null, // ?????????
      isFileSize: false, // ??????????????????
      hasDownload: false, // ??????????????????????????????
      pageList: {
        totalNum: 0,
        page: 1, // ?????????
        pageSize: this.$store.getters.pageSize // ?????????????????????
      },
      // initData: {},
      dialog: {
        title: '',
        width: '60rem',
        labelWidth: '13rem',
        visible: false,
        formData: {
          acc_no: '',
          acc_type: ''
        },
        config: config(this)
      },
      dialog2: {
        title: '',
        width: '98%',
        top: '1vh',
        height: '90vh',
        visible: false,
        tabArr: [
          { name: 'khxx', label: '????????????', type: 'describe', active: true },
          { name: 'zhxx', label: '????????????', type: 'describe' },
          // { name: 'glzhxx', label: '??????????????????', type: 'table' },
          // { name: 'khbgxx', label: '??????????????????', type: 'tableB' },
          { name: 'yxxx', label: '????????????', type: 'image' },
          { name: 'bbxx', label: '????????????', type: 'table' }
        ]
      },
      dialog3: {
        title: '??????',
        visible: false,
        formData: {
          cus_type: '',
          acc_no: '',
          acc_type: '',
          depo_type: ''
        },
        config: config3(this)
      },
      actionUrl: '' // ????????????
    }
  },
  watch: {
    loading(value) {
      this.listLoading = this.loading
      this.dialog2.listLoading3 = this.loading
    }
  },
  created() {
    this.actionUrl = `${process.env.VUE_APP_BASE_API}/fileUpload.do?filePath=uploadFilePath`
    this.listLoading = this.loading
    this.dialog2.listLoading3 = this.loading
  },
  methods: {
    // ??????
    handleSynchro() {
      this.dialog3.visible = true
      this.$nextTick(() => { // ??????????????????????????????
        const dataF = {}
        if (this.currentRow) {
          for (const key in this.dialog.formData) {
            dataF[key] = this.currentRow[key]
          }
          this.dialog3.formData = dataF
          this.resetVal(this.currentRow.bank_acc_type,
          this.dialog3)
        }
      })
    },
    dialogSumbit3() {
      const msg = {
        oper_type: 'syn_info',
        ...this.dialog3.formData,
        user_no: this.$store.getters.userNo,
        organ_no: this.$store.getters.organNo
      }
      reportInfo(msg).then((res) => {
        commonMsgSuccess(res.retMsg, this)
        this.queryList()
        this.dialog3.visible = false
      })
    },
    // ???????????????????????????????????????
    checkImg(url, type) {
      console.log(url);
      return new Promise(function(resolve, reject) {
        let imgObj = ''
        if (type === 'video') {
          imgObj = document.createElement('video')
          imgObj.setAttribute("src",url)
          imgObj.oncanplaythrough = function(res) {
            resolve(res)
          }
        } else {
          imgObj = new Image()
          imgObj.setAttribute("src",url)
          imgObj.onload = function(res) {
            resolve(res)
          }
        }
        imgObj.onerror = function(err) {
          reject(err)
        }
      })
    },
    // ???????????????
    async handleNodeClick({ e, node }) {
      this.checkNode = node
      if (
        node.data.label === '??????' ||
        node.data.label === '??????' ||
        node.data.label === '????????????'
      ) {
        return
      }
      let a = e.src
      let s = a.replace(/http?.+?:\d*/, '')
      e.src = 'http://10.10.161.12:7001' + s    // ????????????
      // e.src = 'http://10.6.11.122:7001' + s  // ????????????
      await this.checkImg(e.src, e.type).then(() => {
        this.hasDownload = true
      }).catch(() => {
        this.hasDownload = false
        if (!this.hasDownload) {
          // ??????????????????
          commonMsgConfirm('?????????????????????????????????????????????', this, (flag) => {
            if (flag) {
              const msg = {
                parameterList: [{}],
                file_name: this.checkNode.data.label,
                oper_type: 'downloadFile',
                organ_no: this.$store.getters.organNo,
                acc_no: this.currentRow.acc_no
              }
              uploadFile(msg).then((res) => {
                commonMsgSuccess('????????????', this)
                const result = res.retMap
                const src = `${
                  this.checkNode.data.src.split('/SunAOS/')[0]
                }/SunAOS/file/${result.ICON_NO}/${result.DOWN_FILE_NAME}`
                const nodeData = {
                  down_file_name: result.DOWN_FILE_NAME,
                  id: result.DOC_DATE,
                  label: result.UP_FILE_NAME,
                  open_change: result.OPEN_CHANGE,
                  src,
                  type: this.checkNode.data.type
                }
                // ??????????????????
                this.checkNode.setData(nodeData) // setData?????????????????????????????????????????????
                console.log(this.checkNode)
                console.log(nodeData)
              })
            } else {
              this.$refs['treeImage'].makeSrcBlank()
            }
          })
        }
      })
    },
    // upload
    upload() {
      if (commonBlank(this.checkNode)) {
        commonMsgWarn('??????????????????????????????', this)
        return
      }
      if (
        this.checkNode.data.label !== '??????' &&
        this.checkNode.data.label !== '??????' &&
        this.checkNode.data.label !== '????????????'
      ) {
        commonMsgWarn('????????????????????????????????????', this)
        return
      }
      this.$refs['upload'].$refs['upload-inner'].handleClick()

      // const obj = {
      //   label: '??????',
      //   id: '2432323',
      //   type: 'img',
      //   src: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=488030022,1694816207&fm=173&app=25&f=JPEG?w=580&h=347&s=A08FB35A5E0616C664F5631C030010D6'
      // }
      // this.imageArr[0].children[0].children.push(obj)

      // this.uploadVisible = true
    },

    uploadSuccess(res, file) {
      if (!this.isFileSize) {
        const upLoadData = res
        // this.imageUrl = URL.createObjectURL(file.raw)

        // ????????????
        let file_url = ''
        if (!commonBlank(upLoadData.retMap)) {
          const files = upLoadData.retMap.uploadFileList
          for (var int = 0; int < files.length; int++) {
            file_url = files[int].saveFileName
          }
        }
        const open_change = this.checkNode.data.label === '??????' ? '0' : '1'

        const msg = {
          parameterList: [{}],
          open_change,
          file_path: file_url,
          oper_type: dictionaryGet('OPERATE_QUERY'),
          organ_no: this.$store.getters.organNo,
          acc_no: this.currentRow.acc_no
        }
        console.log(msg)
        uploadFile(msg).then((res) => {
          commonMsgSuccess('????????????', this)
          const result = res.retMap
          const src = `http://${result.localhost}/SunAOS/file/${result.icon_no}/${result.down_file_name}`
          const nodeData = {
            down_file_name: '',
            id: result.doc_date,
            label: result.up_file_name,
            open_change: result.open_change,
            src,
            type: result.up_file_name.indexOf('mp4') !== -1 ? 'video' : 'img'
          }
          this.$refs['treeImage'].$refs['tree'].append(nodeData, this.checkNode)
        })
      }
    },
    // ?????????????????????????????????
    beforeUpload(file) {
      if(Number(file.size) > (50 * 1024 * 1024)) {
        this.isFileSize = true
        commonMsgInfo('??????????????????50M', this)
      } else {
        this.isFileSize = false
      }
    },
    // ????????????
    deleteImg() {
      if (
        this.checkNode.data.label === '??????' ||
        this.checkNode.data.label === '??????' ||
        this.checkNode.data.label === '????????????'
      ) {
        return
      }
      if (commonBlank(this.checkNode)) {
        commonMsgWarn('???????????????', this)
        return
      }
      commonMsgConfirm('?????????????????????????????????????????????', this, (flag) => {
        if (flag) {
          const msg = {
            parameterList: [{}],
            file_name: this.checkNode.data.label,
            oper_type: 'delFile',
            organ_no: this.$store.getters.organNo,
            acc_no: this.currentRow.acc_no
          }
          uploadFile(msg).then((res) => {
            commonMsgSuccess('????????????', this)
            this.$refs['treeImage'].$refs['tree'].remove(this.checkNode)
            this.$refs['treeImage'].makeSrcBlank()
            this.checkNode = null
          })
        }
      })
    },
    // ??????tab??????
    handleClick(type) {
      this.type = 'yxxx'
      if (type === 'yxxx') {
        const msg = {
          parameterList: [{}],
          oper_type: 'queryDocInfo',
          acc_no: this.currentRow.acc_no
        }
        uploadFile(msg).then((res) => {
          const {
            retMap: { list }
          } = res
          list.forEach((item, index) => {
            const src = `http://${item.localhost}/SunAOS/file/${item.icon_no}/${item.down_file_name}`
            const obj = {
              label: item.up_file_name,
              id: item.doc_date + index,
              type: item.up_file_name.indexOf('mp4') !== -1 ? 'video' : 'img',
              open_change: item.open_change,
              down_file_name: item.down_file_name,
              src: src
            }
            if (item.open_change === '0') {
              this.imageArr[0].children[0].children.push(obj)
            } else {
              this.imageArr[0].children[1].children.push(obj)
            }
          })
        })
      }
    },
    // ????????????
    openDialog(row) {
      this.currentRow = row
      this.dialog2 = Object.assign({}, this.dialog2, {
        title: '??????????????????',
        visible: true
      })
    },
    // ????????????
    currentChange(val) {
      this.currentRow = val
      console.log(val)
    },
    /**
     * ???????????????*/
    queryList(currentPage) {
      console.log(this.defaultForm)
      console.log(this.$store.getters.organNo)
      this.showLoading()
      const msg = {
        parameterList: [
          {
            open_organ: this.defaultForm.open_organ ? this.defaultForm.open_organ : '#' + this.$store.getters.organNo,
            acc_state: this.defaultForm.acc_state,
            acc_no: this.defaultForm.acc_no,
            acc_type: this.defaultForm.acc_type
          }
        ],
        oper_type: dictionaryGet('OPERATE_QUERY'),
        start_date: commonBlank(this.defaultForm.open_date)
          ? ''
          : this.defaultForm.open_date[0],
        acc_name: this.defaultForm.acc_name,
        end_date: commonBlank(this.defaultForm.open_date)
          ? ''
          : this.defaultForm.open_date[1],
        currentPage: currentPage || this.pageList.page,
        accInfo_pageNum: this.pageList.pageSize,
        cus_no: ''
      }
      // query
      accInfo(msg).then((response) => {
        const {
          retMap: { returnList, totalNum }
        } = response
        this.tableData = returnList
        this.pageList.totalNum = totalNum
        this.showLoading()
      })
    },
    /**
     * ???????????????????????????*/
    resetVal(type, data) {
      const { options } = this.dialog.config.acc_type
      if (type === '2') {
        data.formData.acc_type = '6'
        data.config.acc_type.options = options.filter
        (item => item.value === '6')
      } else if (type === '1') {
        data.formData.acc_type = '1'
        data.config.acc_type.options = options.filter
        (item => item.value === '1')
      } else if (type === '3') {
       data.formData.acc_type = ''
       data.config.acc_type.options = options.filter
       (item => item.value === '3' ||  item.value === '4')
      } else {
        data.formData.acc_type = ''
        data.config.acc_type.options = options.filter
        (item => item.value === '2' ||  item.value === '5' ||  item.value === '7')
      }
    },
    /**
     * btn - ??????????????????*/
    editAccType() {
      const row = this.currentRow
      if (commonBlank(row)) {
        commonMsgWarn('????????????????????????', this)
        return
      }
      this.dialog = Object.assign({}, this.dialog, {
        title: '??????????????????'
      })
      this.changeVisible(true)
      this.$nextTick(() => {
        this.dialog.config = config(this)
        // ??????????????????????????????
        this.dialog.formData = Object.assign({}, row)
        this.resetVal(row.bank_acc_type, this.dialog)
      })
    },
    /**
     * ????????? - ??????
     * @param {Boolean} param ???????????????????????????*/
    changeVisible(param) {
      this.dialog.visible = param
    },
    /**
     * ????????? - ??????
     * @param {Boolean} param ???????????????????????????*/
    changeVisible2(param) {
      this.dialog2.visible = param
      // this.imageArr = []
      this.imageArr[0].children[0].children = []
      this.imageArr[0].children[1].children = []
      this.checkNode = null
      this.type = ''
      // this.$refs['treeImage'].makeSrcBlank()
    },
    /**
     * ????????? - ?????? - ??????*/
    dialogSumbit() {
      commonMsgConfirm('?????????????????????????????????', this, (param) => {
        if (param) {
          const msg = {
            parameterList: [{}],
            oper_type: dictionaryGet('OPERATE_MODIFY'),
            acc_no: this.dialog.formData.acc_no,
            acc_type: this.dialog.formData.acc_type
          }
          // update
          accInfo(msg)
            .then((response) => {
              commonMsgSuccess(response.retMsg, this)
              this.queryList()
            })
            .catch(() => {})
          this.changeVisible(false) // ???????????????
        }
      })
    },
    /**
     *???????????? */
    getList(pageParam) {
      const { currentPage, pageSize } = pageParam
      this.pageList.pageSize = pageSize
      this.pageList.page = currentPage
      this.queryList()
    },
    /**
     * ?????????????????????*/
    showLoading() {
      this.listLoading = !this.listLoading
    },
    /**
     * ?????????????????????*/
    showLoading3() {
      this.dialog2.listLoading = !this.dialog2.listLoading
    }
  }
}
</script>
<style lang="scss" scoped>
.jobServer {
  color: #1890ff;
  cursor: pointer;
}
.operator {
  span {
    display: inline-block;
    margin-left: 1rem;
    color: #1890ff;
    cursor: pointer;
  }
}
</style>
