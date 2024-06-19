import vue from '@vitejs/plugin-vue';
import {resolve} from 'path';

const src = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'build');
const test = resolve(__dirname, 'test');
const snapshots = resolve(__dirname, 'snapshots');

export default {
    plugins: [vue()],
    resolve: {
        alias: {'@': src, '@test': test},
    },
    build: {
        lib: {
            entry: `${src}/index.ts`,
            name: 'LktCarousel',
            fileName: 'build',
            formats: ['es']
        },
        outDir,
        minify: true,
        rollupOptions: {
            external: [
                'vue',
                'vue-router',
                'lkt-loader',
                'lkt-http-client',
                'lkt-modal',
                'lkt-modal-confirm',
                'lkt-events',
                'lkt-control-tools',
                'lkt-string-tools',
                'vue3-carousel',
                'vue3-carousel/dist/carousel.es.js',
            ],
            output: {
                globals: {
                    vue: 'Vue',
                    'lkt-modal': 'LktModal',
                    'lkt-modal-confirm': 'LktModalConfirm',
                    'lkt-http-client': 'LktHttpClient',
                    'lkt-events': 'LktEvents',
                    'lkt-vue-tools': 'LktVueTools',
                    'lkt-control-tools': 'LktControlTools',
                    'lkt-string-tools': 'LktStringTools',
                },
                sourcemapExcludeSources: true,
            },
        },
    },
    test: {
        coverage: {
            reporter: ['text', 'lcov'],
        },
        resolveSnapshotPath: (testPath, snapExtension) => {
            const path = testPath.split('/').splice(-2);
            return `${snapshots}/${path[0]}/${path[1]}${snapExtension}`;
        },
    },
};
