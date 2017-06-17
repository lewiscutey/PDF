/**
 * @file fis3 配置文件
 * @author lewis
 **/

// 按需编译
fis.set('project.files', ['/*.html', '/modules/api/data/*.json']);

// 采用 commonjs 模块化方案。
fis.hook('commonjs', {
    baseUrl: './src',
    extList: ['.js', '.vue', '.tsx', '.jsx']
});

// 该用 npm 方案，而不是用 fis-components
fis.unhook('components');
fis.hook('node_modules');

fis.match('node_modules/**.js', {
    useHash: false,
    isMod: true
});
fis.match('::package', {
    // 本项目为纯前端项目，所以用 loader 编译器加载，
    // 如果用后端运行时框架，请不要使用。
    postpackager: fis.plugin('loader', {
        useInlineMap: true
    })
});

fis.match('*.{js,es,es6,jsx,ts,tsx}', {
    // 支持 js 中直接 require css. (es6 的 import 也支持，但是先通过 es6 => es5 的转换。)
    preprocessor: fis.plugin('js-require-css')
});
// src的配置
fis.match('src/**.vue', {
    isMod: true,
    rExt: 'js',
    useSameNameRequire: true,
    parser: [
        fis.plugin('vue-component', {
            cssScopeFlag: 'vue-c'
        }),
        fis.plugin('babel-6.x', {
            sourceMaps: false,
            presets: ['es2015'],
            plugins: [require('babel-plugin-transform-vue-jsx')]
        })
    ]
});
fis.match('src/**.{js,vue:js,html:js}', {
    isMod: true,
    rExt: 'js',
    useSameNameRequire: true,
    parser: [
        function(content) {
            return content.replace(/from[\s]+['"]{1}vue['"]{1}/, 'from "vue/dist/vue"');
        },
        fis.plugin('babel-6.x', {
            sourceMaps: false,
            presets: ['es2015'],
            plugins: [require('babel-plugin-transform-vue-jsx')]
        })
    ]
});