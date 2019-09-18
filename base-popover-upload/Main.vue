<template>
  <el-popover :placement="placement" :title="title" :width="width" :trigger="trigger">
    <el-upload class="upload-demo" ref="upload" action="" :file-list.sync="fileList" :auto-upload="false" 
      :limit="1" :on-change="uploadChange">
      <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="mini" type="success" @click="submitUpload">上 传</el-button>
      <transition name="slide-fade">
        <div v-show="fileData.name" 
          style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);padding:3px 5px;margin-top:10px;display:flex;justify-content:space-between;">
          <div>{{fileData.name}}</div>
          <el-button type="text" icon="el-icon-close" style="padding:0;" @click="clearFile"></el-button>
        </div>
      </transition>
    </el-upload>
    <el-button slot="reference" type="success">{{content}}</el-button>
  </el-popover>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ElUpload } from 'element-ui/types/upload';
import API from './api';

@Component
export default class PopoverUnloadModule extends Vue {
  $refs!: {
    upload: ElUpload;
  }
  @Prop({default: '上传文件'}) private content!: string;
  @Prop({default: '200'}) private width!: string;
  @Prop({default: '标题'}) private title!: string;
  @Prop({default: 'click'}) private trigger!: 'click' | 'hover';
  @Prop({default: 'bottom-start'}) private placement!: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';

  private fileList: any[] = [];
  private fileData = { name: '', data: '' };

  private submitUpload() {
    if(!this.fileData.data) {
      this.$message({type: 'warning', message: '没有选择上传文件!'});
      return;
    }
    this.$emit('submit', this.fileData);
  }

  private async uploadChange({raw: file, name}) {
    this.$refs.upload.clearFiles();
    this.fileData.name = name;
    const arraybuffer = await API.utils.fileToArrayBuffer(file);
    this.fileData.data = API.utils.arrayBufferToBase64(arraybuffer);;
  }

  private clearFile() {
    this.fileData = { name: '', data: '' };
  }

}
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
</style>