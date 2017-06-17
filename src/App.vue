<template>
    <div id="pdf">
        <p>本仓库首次采用fis3进行模块化打包，基于vue的框架和pdf.js这个插件，进行了简单的线上PDF预览功能，简洁有效，哈哈！</p>
        <button @click="PDFShow">点击预览哦！</button>
        <iframe v-if="show" :src='"/static/PDFShow/generic/web/viewer.html?file=compressed.tracemonkey-pldi-09.pdf"' width="100%" height="500" scrolling="no">
            您的浏览器不支持框架
        </iframe>
        <!--<iframe :src='"/static/PDFShow/generic/web/viewer.html?file=" + PDFUrl' width="100%" height="500" scrolling="no">
			您的浏览器不支持框架
		</iframe>-->
    </div>
</template>
<script>

export default {
    name: 'App',
    data() {
        return {
            show: false
        };
    },
    computed: {
        PDFUrl() {
            // 请求PDF的地址
			return `${types.QUERY_GOODS_DOWNLOAD_URL}` + '.do?'+
			'token=' + window.localStorage.getItem('token');
		}
    },
    methods: {
        PDFShow() {
            this.show = !this.show;
        }
    },
    watch: {
       
    }
};
</script>
<style>

</style>
