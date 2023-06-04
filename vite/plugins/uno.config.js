import {defineConfig, presetAttributify, presetUno} from 'unocss'

export default defineConfig({
    presets: [
        presetUno(),
        presetAttributify({
            prefix: 'uno:'
        })
    ],
    shortcuts: {
        'flex-center': 'flex justify-center items-center',
        'flex-between': 'flex justify-between items-center',
        'flex-around': 'flex justify-around items-center',
        'flex-vertical': 'flex flex-col justify-center items-center',
    }
})