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
    /><!--修改弹出框-->
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
              >上传</el-button>
              <!-- <el-button @click="downLoadImg">下载</el-button> -->
              <el-button @click="deleteImg">删除</el-button>
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
} from '@/utils/message.js' // 提示信息
import { dictionaryGet } from '@/utils/dictionary.js' // 字典常量
import { commonBlank } from '@/utils/common'

import { config, configTable, config3 } from './info' // 表头、表单配置
import {
  SunButton,
  SunFormDialog,
  SunTable,
  AllViews,
  TreeImage
} from '@/components' // 按钮

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
          label: '账户影像',
          id: '0',
          children: [
            {
              label: '开户',
              id: '11',
              children: []
            },
            {
              label: '变更',
              id: '22',
              children: []
            }
          ]
        }
      ],
      imageArr: [
        {
          label: '账户影像',
          id: '0',
          children: [
            {
              label: '开户',
              id: '11',
              children: []
            },
            {
              label: '变更',
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
      currentRow: null, // 选中行
      isFileSize: false, // 判断文件大小
      hasDownload: false, // 判断文件是否已经下载
      pageList: {
        totalNum: 0,
        page: 1, // 当前页
        pageSize: this.$store.getters.pageSize // 当前页显示条数
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
          { name: 'khxx', label: '客户信息', type: 'describe', active: true },
          { name: 'zhxx', label: '账户信息', type: 'describe' },
          // { name: 'glzhxx', label: '关联账户信息', type: 'table' },
          // { name: 'khbgxx', label: '客户关联信息', type: 'tableB' },
          { name: 'yxxx', label: '影像信息', type: 'image' },
          { name: 'bbxx', label: '报备信息', type: 'table' }
        ]
      },
      dialog3: {
        title: '同步',
        visible: false,
        formData: {
          cus_type: '',
          acc_no: '',
          acc_type: '',
          depo_type: ''
        },
        config: config3(this)
      },
      actionUrl: '' // 上传地址
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
    // 同步
    handleSynchro() {
      this.dialog3.visible = true
      this.$nextTick(() => { // 弹出框加载完成后赋值
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
    // 判断图片和视频是否已经下载
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
    // 点击树节点
    async handleNodeClick({ e, node }) {
      this.checkNode = node
      if (
        node.data.label === '开户' ||
        node.data.label === '变更' ||
        node.data.label === '账户影像'
      ) {
        return
      }
      let a = e.src
      let s = a.replace(/http?.+?:\d*/, '')
      e.src = 'http://10.10.161.12:7001' + s    // 生产环境
      // e.src = 'http://10.6.11.122:7001' + s  // 测试环境
      await this.checkImg(e.src, e.type).then(() => {
        this.hasDownload = true
      }).catch(() => {
        this.hasDownload = false
        if (!this.hasDownload) {
          // 下载影像信息
          commonMsgConfirm('是否确定下载当前图片或者视频？', this, (flag) => {
            if (flag) {
              const msg = {
                parameterList: [{}],
                file_name: this.checkNode.data.label,
                oper_type: 'downloadFile',
                organ_no: this.$store.getters.organNo,
                acc_no: this.currentRow.acc_no
              }
              uploadFile(msg).then((res) => {
                commonMsgSuccess('下载成功', this)
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
                // 更新节点数据
                this.checkNode.setData(nodeData) // setData方法调用后，自己的子节点辉丢失
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
        commonMsgWarn('请选择上传的影像类型', this)
        return
      }
      if (
        this.checkNode.data.label !== '开户' &&
        this.checkNode.data.label !== '变更' &&
        this.checkNode.data.label !== '账户影像'
      ) {
        commonMsgWarn('请选择上传的影像类型节点', this)
        return
      }
      this.$refs['upload'].$refs['upload-inner'].handleClick()

      // const obj = {
      //   label: '凭证',
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

        // 上传成功
        let file_url = ''
        if (!commonBlank(upLoadData.retMap)) {
          const files = upLoadData.retMap.uploadFileList
          for (var int = 0; int < files.length; int++) {
            file_url = files[int].saveFileName
          }
        }
        const open_change = this.checkNode.data.label === '开户' ? '0' : '1'

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
          commonMsgSuccess('上传成功', this)
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
    // 上传文件前判断文件大小
    beforeUpload(file) {
      if(Number(file.size) > (50 * 1024 * 1024)) {
        this.isFileSize = true
        commonMsgInfo('文件不能超过50M', this)
      } else {
        this.isFileSize = false
      }
    },
    // 删除图片
    deleteImg() {
      if (
        this.checkNode.data.label === '开户' ||
        this.checkNode.data.label === '变更' ||
        this.checkNode.data.label === '账户影像'
      ) {
        return
      }
      if (commonBlank(this.checkNode)) {
        commonMsgWarn('请选择节点', this)
        return
      }
      commonMsgConfirm('是否确定删除当前图片或者视频？', this, (flag) => {
        if (flag) {
          const msg = {
            parameterList: [{}],
            file_name: this.checkNode.data.label,
            oper_type: 'delFile',
            organ_no: this.$store.getters.organNo,
            acc_no: this.currentRow.acc_no
          }
          uploadFile(msg).then((res) => {
            commonMsgSuccess('删除成功', this)
            this.$refs['treeImage'].$refs['tree'].remove(this.checkNode)
            this.$refs['treeImage'].makeSrcBlank()
            this.checkNode = null
          })
        }
      })
    },
    // 点击tab切换
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
    // 打开弹框
    openDialog(row) {
      this.currentRow = row
      this.dialog2 = Object.assign({}, this.dialog2, {
        title: '账户全息视图',
        visible: true
      })
    },
    // 选择单行
    currentChange(val) {
      this.currentRow = val
      console.log(val)
    },
    /**
     * 按钮：查询*/
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
     * 弹出框账户类型设置*/
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
     * btn - 修改账户类型*/
    editAccType() {
      const row = this.currentRow
      if (commonBlank(row)) {
        commonMsgWarn('请选择要修改的行', this)
        return
      }
      this.dialog = Object.assign({}, this.dialog, {
        title: '修改账户类型'
      })
      this.changeVisible(true)
      this.$nextTick(() => {
        this.dialog.config = config(this)
        // 弹出框加载完成后赋值
        this.dialog.formData = Object.assign({}, row)
        this.resetVal(row.bank_acc_type, this.dialog)
      })
    },
    /**
     * 弹出框 - 关闭
     * @param {Boolean} param 弹出框显示隐藏配置*/
    changeVisible(param) {
      this.dialog.visible = param
    },
    /**
     * 弹出框 - 关闭
     * @param {Boolean} param 弹出框显示隐藏配置*/
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
     * 弹出框 - 确认 - 编辑*/
    dialogSumbit() {
      commonMsgConfirm('是否确认提交当前数据？', this, (param) => {
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
          this.changeVisible(false) // 弹出框关闭
        }
      })
    },
    /**
     *页码更新 */
    getList(pageParam) {
      const { currentPage, pageSize } = pageParam
      this.pageList.pageSize = pageSize
      this.pageList.page = currentPage
      this.queryList()
    },
    /**
     * 加载中动画配置*/
    showLoading() {
      this.listLoading = !this.listLoading
    },
    /**
     * 加载中动画配置*/
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
