import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno, presetWebFonts, transformerDirectives, transformerVariantGroup } from 'unocss';

export default defineConfig({
  shortcuts: [
    {
      // 'dr-ellipsis':'text'
    },
    // ...
  ],
  theme: {
    colors: {
      // ...
    },
    fontFamily: {
      title: ['"Source-Han-Sans"'],
      text: ['"Source-Han-Sans"'],
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      autoInstall: true,
      // collections: {
      //   svg: FileSystemIconLoader('src/assets/svg', (svg) => svg.replace(/((fill\=\"))([^"]+)(\")/g, '').replace(/^<svg /, '<svg fill="currentColor" ')),
      // },
      extraProperties: {
        display: 'inline-flex',
        'align-items': 'center',
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
