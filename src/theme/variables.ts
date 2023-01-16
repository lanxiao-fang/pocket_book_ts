interface VariablesOpt {
    [key: string]: {
        [key: string]: string
    }, // 字段扩展声明，避免index.ts报错
}
const baseSize = {
    '--font-size-large-x': '22px',
    '--font-size-large': '18px',
    '--font-size-medium': '14px',
    '--font-size-medium-x': '16px',
    '--font-size-small-s': '10px',
    '--font-size-small': '12px',
}
const baseColor = {
    '--warning-color': '#d38615',
    '--danger-color': '#eb0606',
    '--success-color': '#67c23a',
    '--white-color': '#fff',
    '--info-color': '#909399',
    '--black-color': '#000'

}
export let variablesOpt: VariablesOpt = {
    light: {
        ...baseSize,
        ...baseColor,
        '--bg-color1': '#f5f5f5',
        '--bg-color2': '#f9f9f9',
        '--bg-color3': '#39be77',
        '--bg-color4': '#ffffff',
        '--text-color1': 'rgba(0,0,0,.9)',
        '--text-color2': 'rgba(0,0,0,.5)',
        '--text-color3': 'rgba(0,0,0,.3)',
        '--text-color4': 'rgb(236, 190, 37)',
        '--theme-color': '#39be77',
        '--text-color6': '#ffffff',
        '--border-color': '#f5f5f5'
    },
    pink: {
        ...baseSize,
        ...baseColor,
        '--bg-color1': '#f5f5f5',
        '--bg-color2': '#f9f9f9',
        '--bg-color3': '#faafaa',
        '--bg-color4': '#ffffff',
        '--text-color1': 'rgba(0,0,0,.9)',
        '--text-color2': 'rgba(0,0,0,.5)',
        '--text-color3': 'rgba(0,0,0,.3)',
        '--text-color4': 'rgb(236, 190, 37)',
        '--theme-color': '#faafaa',
        '--text-color6': '#ffffff',
        '--border-color': '#f5f5f5'
    },
    blue: {
        ...baseSize,
        ...baseColor,
        '--bg-color1': '#f5f5f5',
        '--bg-color2': '#f9f9f9',
        '--bg-color3': '#1296db',
        '--bg-color4': '#ffffff',
        '--text-color1': 'rgba(0,0,0,.9)',
        '--text-color2': 'rgba(0,0,0,.5)',
        '--text-color3': 'rgba(0,0,0,.3)',
        '--text-color4': 'rgb(236, 190, 37)',
        '--theme-color': '#1296db',
        '--text-color6': '#ffffff',
        '--border-color': '#f5f5f5'
    },

    dark: {}
}
