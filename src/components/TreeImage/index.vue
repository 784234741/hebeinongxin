<!-- 树图片pdf查看组件-->
<template>
  <div class="container-img">
    <div class="left-tree">
      <div class="tree-main">
        <el-tree
          ref="tree"
          :data="arr"
          :highlight-current="true"
          :props="defaultProps"
          node-key="id"
          :expand-on-click-node="false"
          :default-expand-all="true"
          @node-click="handleNodeClick"
        >
          <span slot-scope="{ node, data }">
            <span
              v-if="data.children"
            ><i class="el-icon-folder-opened" />{{ node.label }}</span>
            <span
              v-if="data.type === 'img'"
            ><i class="el-icon-picture-outline" />{{ node.label }}</span>
            <span
              v-if="data.type === 'pdf'"
            ><i class="el-icon-document" />{{ node.label }}</span>
            <span
              v-if="data.type === 'video'"
            ><i class="el-icon-video-camera" />{{ node.label }}</span>
          </span>
        </el-tree>
      </div>
      <div class="tree-footer">
        <slot name="treefooter" />
      </div>
    </div>
    <div class="right-img">
      <div class="img-single">
        <img
          v-if="type === 'img'"
          ref="image"
          :src="imageSrc"
          style="display: none"
        >
        <div v-if="type === 'pdf'" style="width: 100%; height: 100%">
          <iframe
            :src="'http://localhost:9527/pdf/web/viewer.html?file=' + imageSrc"
            class="pdfFile"
            name="pdfFile"
            frameborder="0"
            width="100%"
            height="100%"
          />
        </div>
        <div v-if="type === 'video'" style="width: 100%; height: 100%;background:#000">
          <video :src="imageSrc" controls autoplay width="100%" height="100%" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'viewerjs/dist/viewer.css'
import Viewer from 'viewerjs'
import User from '@/assets/img/main/nopic.png' // 默认头像

export default {
  name: 'TreeImage',
  props: {
    arr: {
      // 左侧的树的构造数据
      type: Array,
      default: function() {
        return []
      }
    },
    activeitem: {
      type: String,
      default: '' // 当前选中项
    }
  },
  data() {
    return {
      imageSrc: '',
      type: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      viewer: null
    }
  },
  watch: {},
  mounted() {
    if (this.activeitem !== '') {
      this.$refs.tree.setCurrentKey(this.activeitem)
      const node = this.$refs.tree.getNode(this.activeitem)
      this.handleNodeClick(node.data, node)
    }
  },
  methods: {
    handleNodeClick(e, node) {
      this.$emit('handleNodeClick', { e, node })
      const that = this
      if (e.type === 'img') {
        this.type = e.type
        this.imageSrc = e.src
        if (!this.viewer) {
          this.$nextTick(function() {
            this.viewer = new Viewer(this.$refs.image, {
              inline: true,
              navbar: false // 图像下方缩略图隐藏
            })
            this.$refs.image.onload = function() {
              that.viewer.update()
            }
            this.$refs.image.onerror = function() {
              that.makeSrcBlank()
            }
          })
        } else {
          this.$refs.image.onload = function() {
            this.viewer.update()
          }
          this.$refs.image.onerror = function() {
            that.makeSrcBlank()
          }
        }
      } else if (e.type === 'pdf') {
        this.type = e.type
        if (this.viewer) {
          this.viewer.destroy()
          this.viewer = null
        }
        this.imageSrc = e.src
      } else if (e.type === 'video') {
        this.type = e.type
        this.imageSrc = e.src
        let videoObj = document.createElement('video')
        videoObj.src = e.src
        if (this.viewer) {
          videoObj.onerror = function() {
            that.makeSrcBlank()
          }
          this.viewer.destroy()
          this.viewer = null
        } else { 
          videoObj.onerror = function() {
            that.makeSrcBlank()
          }
        }
      }
    },
    makeSrcBlank() {
      const that = this
      this.imageSrc = User
      if (this.type === 'img') {
        this.$refs.image.onload = function() {
          that.viewer.update()
        }
      }
    },
    destroyImage() {
      const that = this
      if (this.viewer) {
        this.$refs.image.onload = function() {
          that.viewer.update()
        }
      }

      // if (this.viewer) {
      //   this.viewer.destroy()
      // }
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep {
  .is-current > .el-tree-node__content {
    background-color: #84b4ea !important
  }
}

.container-img {
  width: 100%;
  height: 100%;
  min-height: 500px;
  position: relative;
  background: #dfdfdf;
  .left-tree {
    width: 260px;
    padding: 20px 10px 10px;
    background: #ffffff;
    position: absolute;
    top: 5px;
    right: auto;
    bottom: 5px;
    left: 5px;
    border: 1px solid #cdcdcd;
    .tree-main {
      width: 100%;
      height: calc(100% - 50px);
      overflow: auto;
    }
    .tree-footer {
      width: 100%;
      height: 36px;
    }
    // ::v-deep {
    //   .el-tree-node__expand-icon.expanded {
    //     transform: rotate(0deg);
    //   }
    // }
  }
  .right-img {
    position: absolute;
    top: 5px;
    right: 5px;
    bottom: 5px;
    left: 270px;
    border: 1px solid #cdcdcd;
    background: #ffffff;
    overflow: auto;
    padding: 10px 5px;
    .img-single {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }
}
</style>
