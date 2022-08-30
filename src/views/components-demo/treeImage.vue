<!--  -->
<template>
  <div style="width:100%;height:100%">
    <TreeImage :arr="data" :activeitem="activeItem" />
  </div>
</template>

<script>
import TreeImage from '@/components/TreeImage'

export default {
  name: 'TreeImageDemo',
  components: {
    TreeImage
  },
  data() {
    return {
      data: [
        {
          label: '批次号001',
          id: '0',
          children: [
            {
              label: '凭证',
              id: '99',
              children: [
                {
                  label: '凭证',
                  id: '11',
                  type: 'img',
                  src: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=488030022,1694816207&fm=173&app=25&f=JPEG?w=580&h=347&s=A08FB35A5E0616C664F5631C030010D6'
                },
                {
                  label: '凭证2',
                  id: '2',
                  type: 'img',
                  src: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2574767313,3929397124&fm=173&app=25&f=JPEG?w=580&h=868&s=B784EEA3460236E17A1F137F0300A058'
                }
              ]
            }
            // {
            //   label: '票据',
            //   id: '98',
            //   children: [
            //     {
            //       label: 'pdf文件显示',
            //       id: '3',
            //       type: 'pdf',
            //       src: 'http://localhost:9527/bjui.pdf'
            //       // src: "https://daishengloda.github.io/review/dist/static/pdf/p1.pdf",
            //     }
            //   ]
            // }
          ]
        }
      ],
      activeItem: '11'
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
</style>
