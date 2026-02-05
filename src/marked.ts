import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'

// marked v17: highlight 옵션이 제거되어 marked-highlight 패키지 사용
marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code: string, lang: string) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    },
  })
)

marked.setOptions({
  pedantic: false,
  gfm: true,
  breaks: false,
})

export default marked
