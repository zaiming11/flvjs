<!--  -->
<template>
  <div>
    <p class="mainContainer">
      <video
        id="videoElement"
        name="videoElement"
        class="centeredVideo"
        muted
        controls
        loop
        width="1024"
        height="576"
      >您的浏览器太旧，不支持HTML5视频。</video>
      <br />
    </p>
    <div class="controls">
      <!--<button onclick="flv_load()">加载</button>-->
      <button @click="flv_start()">开始</button>
      <button @click="flv_pause()">暂停</button>
      <button @click="flv_destroy()">销毁</button>
    </div>
    <div><a  href="https://www.w3school.com.cn/tags/tag_video.asp">查看video标签属性</a></div>
    <div><a  href="https://github.com/bilibili/flv.js/blob/master/docs/api.md#flvjsevents">GitHub中查看文档</a></div>
  </div>
</template>

<script>
// import flvjs from "flv.js/dist/flv.js";
import "../assets/flvjs/flv.min.js";
export default {
  components: {},
  data() {
    return {
      unsupportedMsg: "您的浏览器不支持Video标签",
      flvPlayer: null,
      player: null,
      videoSource: {
        source1:
          "https://www.apple.com/105/media/us/iphone-x/2017/01df5b43-28e4-4848-bf20-490c34a926a7/films/feature/iphone-x-feature-tpl-cc-us-20170912_1280x720h.mp4",
        source2:
          "http://fed.dev.hzmantu.com/oa-project/bce0c613e364122715270faef1874251.flv",
        source3:
          "http://192.168.1.7:7001/live/rfBd56ti2SMtYvSgD5xAV0YU99zampta7Z7S575KLkIZ9PYk.flv"
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.flv_load();
  },
  //方法集合
  methods: {
    flv_load() {
      this.player = document.getElementById("videoElement");
      let url = this.videoSource.source2;
      if (typeof this.flvPlayer !== "undefined") {
        if (this.flvPlayer != null) {
          this.flvPlayer.unload();
          this.flvPlayer.detachMediaElement();
          this.flvPlayer.destroy();
          this.flvPlayer = null;
        }
      }
      if (flvjs.isSupported()) {
        this.flvPlayer = flvjs.createPlayer({
          type: "flv",
          url: url,
          isLive: true, //指示数据源是否为实时流
          cors: true, //指示是否启用CORS进行http提取
          enableWorker: true, //启用分离的线程进行转换（暂时不稳定）
          enableStashBuffer: false, //启用IO隐藏缓冲区。如果您需要实时（最小延迟）来进行实时流播放，则设置为false，但是如果网络抖动，则可能会停顿。
          stashInitialSize: 128, //指示IO暂存缓冲区的初始大小。默认值为384KB。指出合适的尺寸可以改善视频负载/搜索时间
          autoCleanupSourceBuffer: true //对SourceBuffer进行自动清理
        });
        this.flvPlayer.attachMediaElement(this.player);
        this.flvPlayer.load(); //加载

        let playPromise = this.flvPlayer.play(); //自动播放//不写playPromise在标签添加muted静音后，可实现自动播放
        console.log(playPromise);
        if (playPromise) {
          //立即关闭报错解决方法
          playPromise
            .then(() => {
              // 音频加载成功
              // 音频的播放需要耗时
              alert("视频加载成功");
              console.log("视频加载成功");
              console.log("时长", this.flvPlayer.duration + "s");
            })
            .catch(e => {
              // 音频加载失败
              console.log("视频加载失败");
            });
        }
        this.flvPlayer.on(flvjs.Events.ERROR, (errType, errDetail) => {
          // errType是 NetworkError时，对应errDetail有：Exception、HttpStatusCodeInvalid、ConnectingTimeout、EarlyEof、UnrecoverableEarlyEof
          // errType是 MediaError时，对应errDetail是MediaMSEError
          console.log(errType);
          console.log(errDetail);
          if (errType == "NetworkError") {
            console.log("HTTP-FLV视频流网络错误");
            alert("HTTP-FLV视频流网络错误");
          }
          if (errType == "MediaError") {
            console.log("媒体错误");
            alert("媒体错误");
          }
        });
      }
    },
    flv_start() {
      this.flvPlayer.play();
    },
    flv_pause() {
      this.flvPlayer.pause();
    },

    flv_destroy() {
      this.flvPlayer.pause();
      this.flvPlayer.unload();
      this.flvPlayer.detachMediaElement();
      this.flvPlayer.destroy();
      this.flvPlayer = null;
    }
  },

  beforeDestroy() {
    this.flv_destroy();
  } //生命周期 - 销毁之前
};
</script>
<style scoped>
.mainContainer {
  display: block;
  width: 1024px;
  margin-left: auto;
  margin-right: auto;
}
.centeredVideo {
  display: block;
  width: 100%;
  height: 576px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: auto;
}
</style>