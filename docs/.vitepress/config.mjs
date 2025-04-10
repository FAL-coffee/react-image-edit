import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'React Image Edit',
  description: '画像編集と生成のためのReactコンポーネントライブラリ',
  lang: 'ja-JP',
  lastUpdated: true,
  ignoreDeadLinks: true, // デッドリンクチェックを無効化
  
  head: [
    ['meta', { name: 'theme-color', content: '#4CAF50' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: 'ホーム', link: '/' },
      { text: 'ガイド', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: '例', link: '/examples/' },
      { text: 'GitHub', link: 'https://github.com/FAL-coffee/react-image-edit' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'ガイド',
          items: [
            { text: '紹介', link: '/guide/' },
            { text: 'インストール', link: '/guide/installation' },
            { text: '使い方', link: '/guide/usage' },
            { text: 'テキスト追加', link: '/guide/text' },
            { text: '画像アップロード', link: '/guide/image' },
            { text: 'フレーム追加', link: '/guide/frame' },
            { text: 'ドラッグ機能', link: '/guide/drag' },
            { text: 'エクスポート', link: '/guide/export' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API',
          items: [
            { text: '概要', link: '/api/' },
            { text: 'ImageEditorComponent', link: '/api/image-editor-component' },
            { text: 'TextInput', link: '/api/text-input' },
            { text: 'TextCustomization', link: '/api/text-customization' },
            { text: 'ImageUpload', link: '/api/image-upload' },
            { text: 'FrameSelector', link: '/api/frame-selector' }
          ]
        }
      ],
      '/examples/': [
        {
          text: '例',
          items: [
            { text: '基本的な使い方', link: '/examples/' },
            { text: 'テキストエディタ', link: '/examples/text-editor' },
            { text: '画像エディタ', link: '/examples/image-editor' },
            { text: 'フレームエディタ', link: '/examples/frame-editor' },
            { text: '完全なエディタ', link: '/examples/full-editor' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/FAL-coffee/react-image-edit' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present FAL-coffee'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/FAL-coffee/react-image-edit/edit/main/docs/:path',
      text: 'このページを編集'
    }
  }
})