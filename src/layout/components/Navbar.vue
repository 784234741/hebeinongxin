<!--top区-->
<template>
  <div class="navbar">
    <!--左则显示隐藏-->
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <!--显示当前页面的路径-->
    <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" /> -->
    <!--  + '?imageView2/1/w/40/h/40' -->

    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <!--查询-->
        <img
          :src="avatar == '' ? User : avatar"
          class="user-avatar"
          @click="userInfoSet"
        >
        <span> {{ $store.getters.userName }}</span>
        <!--头像-->
        <!-- <search id="header-search" class="right-menu-item" /> -->
        <!--全屏-->
        <!-- <screenfull id="screenfull" class="right-menu-item hover-effect" /> -->
      </template>

      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <!-- <i class="el-icon-caret-bottom" /> -->
          <i class="el-icon-s-tools" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <!-- <router-link to="/">
            <el-dropdown-item>转到主页</el-dropdown-item>
          </router-link> -->
          <el-dropdown-item @click.native="changeColor">
            <span style="display: block">换肤</span>
          </el-dropdown-item>
          <el-dropdown-item @click.native="homePageSet">
            <span style="display: block">主页设置</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出系统</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <change-color ref="dialogRef" />

    <el-dialog
      title="主页设置-区域选择"
      :visible.sync="dialogFormVisible"
      @close="closeDialog"
    >
      <el-checkbox
        v-model="checkAll"
        :indeterminate="isIndeterminate"
        @change="handleCheckAllChange"
      >全选</el-checkbox>
      <div style="margin: 15px 0" />
      <el-checkbox-group
        v-model="checkedItems"
        @change="handleCheckedCitiesChange"
      >
        <el-checkbox v-for="item in items" :key="item" :label="item">{{
          item
        }}</el-checkbox>
      </el-checkbox-group>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保存</el-button>
        <!-- <el-button
          type="primary"
          @click="restoreDefSet"
        >还原默认设置</el-button> -->
      </div>
    </el-dialog>

    <el-dialog title="个人信息" :visible.sync="dialogVisible2">
      <div class="user-left">
        <!-- <el-upload
          class="avatar-uploader"
          :action="actiionUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload> -->
        <img :src="User" class="avatar">
      </div>
      <div class="user-right">
        <el-descriptions title="用户信息" :column="1">
          <el-descriptions-item
            v-for="item in desArr"
            :key="item.name"
            :label="item.label"
          >
            <span
              v-if="
                item.name === 'last_login_time' ||
                  item.name === 'last_modi_date'
              "
            >
              {{ userInfo[item.name] | dateTimeFormat }}
            </span>
            <span v-else-if="item.name === 'organ_no'">
              {{ `${userInfo[item.name]} - ${userInfo.organ_name}` }}
            </span>
            <span v-else>
              {{ userInfo[item.name] }}
            </span>
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="saveHeaderImg">保存头像</el-button> -->
        <el-button type="primary" @click="editPassword">修改密码</el-button>
      </div>
    </el-dialog>

    <sun-form-dialog
      :title="dialog3.title"
      :visible="dialog3.visible"
      :form-config="dialog3.config"
      :form-data="dialog3.formData"
      :width="dialog3.width"
      :label-width="dialog3.labelWidth"
      @dialogClose="changeVisible3"
      @dialogSubmit="dialogSumbit3"
    />
  </div>
</template>

<script>
import { commonMsgSuccess } from '@/utils/message.js' // 提示信息
import { mapGetters } from 'vuex'
import { commonBlank } from '@/utils/common'
import { SunFormDialog } from '@/components' // 表单
import ChangeColor from './ChangeColor' // 换肤
import Hamburger from '@/components/Hamburger' // 左侧显示隐藏图标
// import Screenfull from '@/components/Screenfull' // 全屏
// import Search from '@/components/HeaderSearch' // 菜单搜索
import User from '@/assets/img/main/user.png' // 默认头像
import { dictionaryGet } from '@/utils/dictionary.js' // 字典常量
import cryptoAES from '@/utils/cryptoAES.js'
import { config } from './info' // 表头、表单配置
import { Common } from '@/api'
const { sysDialogController, userController, changePasswordController } = Common
const items = []

export default {
  components: {
    ChangeColor,
    Hamburger,
    // Screenfull,
    // Search,
    SunFormDialog
  },
  data() {
    return {
      // actiionUrl:
      //   'http://172.1.1.21:7002/SunAOS/fileUpload.do?filePath=userImageFilePath', // 上传地址
      // imageUrl: this.$store.getters.avatar, // 头像地址
      User: User,
      dialogFormVisible: false,
      dialogVisible2: false,
      checkAll: false,
      checkedItems: [],
      items: items,
      isIndeterminate: true,
      desArr: [
        { label: '用户', name: 'user_no' },
        { label: '姓名', name: 'user_name' },
        { label: '所属机构', name: 'organ_no' },
        { label: '用户等级', name: 'tellerlvl' },
        { label: '角色', name: 'role' },
        { label: '上次登录时间', name: 'last_login_time' },
        { label: '最后修改时间', name: 'last_modi_date' }
      ],
      userInfo: {},
      dialog3: {
        title: '密码修改',
        labelWidth: '12rem',
        visible: false,
        formData: {
          user_no: this.$store.getters.userNo,
          user_name: this.$store.getters.userName,
          j_userinfo_changepass_oldpass: '',
          j_userinfo_changepass_newpass: '',
          j_userinfo_changepass_confirmpass: ''
        },
        config: config(this)
      }
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'device'])
  },
  mounted() {
    // this.initTopHead()
    this.getUser()
  },
  methods: {
    /**
     * 判断用户密码是否为123456*/
    getUser() {
      const userPassword = cryptoAES.decrypt(this.$store.state.user.password)
      if (userPassword === '123456') this.dialog3.visible = true
    },
    /**
     * 显示隐藏左侧区域*/
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    /**
     * 系统退出*/
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    /**
     * 换肤*/
    changeColor() {
      this.$refs.dialogRef.dialogShow()
    },
    // 主页设置
    homePageSet() {
      this.items = []
      this.checkedItems = []
      const msg = {
        parameterList: [{}],
        oper_type: 'selectMenu',
        user_no: this.$store.getters.userNo,
        role_no: this.$store.getters.roleNo
      }
      const checkedArr = this.$store.getters.homeMoudlesChecked
      sysDialogController(msg).then((res) => {
        const realdata = res.retMap.menuList
        this.menuList = realdata
        realdata.forEach((item) => {
          checkedArr.forEach((item1) => {
            if (item1.page_id === item.menu_id) {
              this.checkedItems.push(item.menu_name)
            }
          })
          this.items.push(item.menu_name)
        })
        this.items.splice(0, 2)
        this.dialogFormVisible = true
      })
    },
    save() {
      const checkedResults = []
      // 通过已选的模块构造参数
      this.menuList.forEach((item) => {
        this.checkedItems.forEach((checkItem) => {
          if (checkItem === item.menu_name) {
            checkedResults.push({
              page_order: checkedResults.length,
              page_id: item.menu_id,
              page_width: 18,
              page_height: 8,
              page_x: checkedResults.length % 2 !== 0 ? 18 : 0,
              page_y: 0
            })
          }
        })
      })
      const msg = {
        parameterList: checkedResults,
        oper_type: dictionaryGet('OPERATE_MODIFY')
      }

      sysDialogController(msg).then((res) => {
        this.dialogFormVisible = false
        // 调用主页getBoxInit方法
        this.$bus.$emit('getBoxInit')
      })
    },
    // restoreDefSet() {
    //   const msg = {
    //     parameterList: [],
    //     oper_type: dictionaryGet('OPERATE_MODIFY')
    //   }
    //   sysDialogController(msg).then((res) => {
    //     console.log('res', res)
    //     this.dialogFormVisible = false
    //     // 调用主页getBoxInit方法
    //     this.$bus.$emit('getBoxInit', 'reset')
    //   })
    // },
    handleCheckAllChange(val) {
      this.checkedItems = val ? this.items : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.items.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.items.length
    },
    closeDialog() {},
    // 设置用户信息弹框
    userInfoSet() {
      const msg = {
        parameterList: [{ user_no: this.$store.getters.userNo }],
        oper_type: 'findUserInfo'
      }
      userController(msg).then((res) => {
        const { userList, roleList } = res.retMap
        let roleInfo = ''
        roleList.forEach((item) => {
          roleInfo += ',' + item.role_no + '-' + item.role_name
        })

        if (!commonBlank(roleInfo)) {
          roleInfo = roleInfo.substring(1)
        }
        userList[0].role = roleInfo
        this.userInfo = userList[0]
      })
      this.dialogVisible2 = true
    },
    saveHeaderImg() {
      this.initTopHead()
      this.dialogVisible2 = false
    },
    editPassword() {
      this.dialog3.visible = true
    },
    changeVisible3() {
      this.dialog3.visible = false
    },
    // 确认修改密码
    dialogSumbit3() {
      const msg = {
        parameterList: [''],
        userNo: this.$store.getters.userNo,
        oldPass: cryptoAES.encrypt(
          this.dialog3.formData.j_userinfo_changepass_oldpass
        ),
        newPass: cryptoAES.encrypt(
          this.dialog3.formData.j_userinfo_changepass_newpass
        ),
        oper_type: 'update'
      }
      changePasswordController(msg).then((res) => {
        commonMsgSuccess(res.retMsg, this)
        this.changeVisible3()
      })
    },
    handleAvatarSuccess(res, file) {
      const upLoadData = res
      this.imageUrl = URL.createObjectURL(file.raw)

      // 上传成功
      let file_url = ''
      if (!commonBlank(upLoadData.retMap)) {
        const files = upLoadData.retMap.uploadFileList
        for (var int = 0; int < files.length; int++) {
          file_url = files[int].saveFileName
        }
      }
      // 表单赋值
      const msg = {
        parameterList: [],
        oper_type: 'uploadIconConfig',
        icon: file_url,
        delete_path: this.imageUrl,
        user_no: this.$store.getters.userNo
      } // 将base64的图片保存至数据库
      userController(msg).then((res) => {
        commonMsgSuccess('上传成功', this)
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    initTopHead() {
      const msg = {
        parameterList: [
          {
            user_no: this.$store.getters.userNo
          }
        ],
        oper_type: 'initTopHead'
      }
      userController(msg).then((data) => {
        const userImage = data.retMap.image
        if (!commonBlank(userImage)) {
          const url =
            './servlet/DownLoadServlet?fileName=' +
            userImage.substring(
              userImage.lastIndexOf('/') + 1,
              userImage.indexOf('##')
            ) +
            '&saveFileName=' +
            userImage.split('##')[0]
          this.$store.commit('user/SET_AVATAR', url)
        } else {
          // this.icon = 'static/img/subPage/exam/user_photo.png' // 初始化页面时将后台保存图片传入
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$color-icon: #fff; // 图标颜色
.el-checkbox {
  margin: 1rem 2rem;
}

.navbar {
  height: 5rem;
  overflow: hidden;
  position: relative;
  // background: #fff;
  box-shadow: 0 0.1rem 0.4rem rgba(0, 21, 41, 0.08);
  .hamburger-container {
    line-height: 4.6rem;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 5rem;
    display: flex;
    align-items: center;

    &:focus {
      outline: none;
    }
    span {
      color: #fff;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 0.8rem;
      height: 100%;
      font-size: 1.8rem;
      color: $color-icon;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
    //头像
    .avatar-container {
      margin-right: 1rem;

      .avatar-wrapper {
        margin-top: 0.3rem;
        position: relative;

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -2rem;
          top: 2.5rem;
          font-size: 1.2rem;
        }
      }
    }
  }
}
//头像
.user-avatar {
  cursor: pointer;
  width: 3rem;
  height: 3rem;
  border-radius: 3rem;
  margin-right: 0.5rem;
}
// 右上角工具：设置
.el-icon-s-tools {
  color: $color-icon;
  font-size: 2.3rem;
}
.user-left {
  width: 40%;
  height: 40vh;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
.user-right {
  width: 60%;
  height: 40vh;
  float: left;
}
</style>
