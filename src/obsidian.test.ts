import { describe, it, expect } from 'vitest'
import { transformWikiLinks, transformImageEmbeds, transformObsidianMarkdown } from './obsidian'

describe('transformWikiLinks', () => {
  const publishedSlugs = new Set(['LIT-docker-basics', 'REF-k8s-setup'])

  it('published 노트 링크를 <a> 태그로 변환', () => {
    const input = '참고: [[LIT-docker-basics]]'
    const result = transformWikiLinks(input, publishedSlugs)
    expect(result).toBe('참고: <a href="/blog/LIT-docker-basics">LIT-docker-basics</a>')
  })

  it('비published 노트 링크를 회색 italic span으로 변환', () => {
    const input = '참고: [[some-private-note]]'
    const result = transformWikiLinks(input, publishedSlugs)
    expect(result).toBe('참고: <span class="wikilink-dead">some-private-note</span>')
  })

  it('alias가 있는 wiki-link 처리', () => {
    const input = '[[LIT-docker-basics|도커 기초]]'
    const result = transformWikiLinks(input, publishedSlugs)
    expect(result).toBe('<a href="/blog/LIT-docker-basics">도커 기초</a>')
  })

  it('alias가 있는 비published wiki-link 처리', () => {
    const input = '[[private-note|비공개 노트]]'
    const result = transformWikiLinks(input, publishedSlugs)
    expect(result).toBe('<span class="wikilink-dead">비공개 노트</span>')
  })

  it('한 줄에 여러 wiki-link 처리', () => {
    const input = '[[LIT-docker-basics]]와 [[some-private-note]] 참고'
    const result = transformWikiLinks(input, publishedSlugs)
    expect(result).toBe('<a href="/blog/LIT-docker-basics">LIT-docker-basics</a>와 <span class="wikilink-dead">some-private-note</span> 참고')
  })

  it('wiki-link가 없으면 원본 그대로 반환', () => {
    const input = '일반 텍스트입니다.'
    const result = transformWikiLinks(input, publishedSlugs)
    expect(result).toBe('일반 텍스트입니다.')
  })
})

describe('transformImageEmbeds', () => {
  it('![[image.png]]를 img 태그로 변환', () => {
    const input = '스크린샷: ![[screenshot.png]]'
    const result = transformImageEmbeds(input)
    expect(result).toBe('스크린샷: <img src="/attachments/screenshot.png" alt="screenshot.png" />')
  })

  it('reference 첨부파일 경로 처리', () => {
    const input = '![[REF-arxiv-transformer-1.pdf]]'
    const result = transformImageEmbeds(input)
    expect(result).toBe('<img src="/attachments/REF-arxiv-transformer-1.pdf" alt="REF-arxiv-transformer-1.pdf" />')
  })

  it('서브디렉토리 경로가 있는 이미지', () => {
    const input = '![[Attachments/reference/img.png]]'
    const result = transformImageEmbeds(input)
    expect(result).toBe('<img src="/attachments/reference/img.png" alt="img.png" />')
  })

  it('노트 임베드(![[note]])는 변환하지 않음 (확장자 없는 경우)', () => {
    const input = '![[some-note]]'
    const result = transformImageEmbeds(input)
    expect(result).toBe('![[some-note]]')
  })

  it('이미지 임베드가 없으면 원본 그대로', () => {
    const input = '일반 텍스트'
    const result = transformImageEmbeds(input)
    expect(result).toBe('일반 텍스트')
  })
})

describe('transformObsidianMarkdown', () => {
  const publishedSlugs = new Set(['LIT-docker-basics'])

  it('wiki-link와 이미지 임베드를 모두 변환', () => {
    const input = '[[LIT-docker-basics]] 참고\n\n![[screenshot.png]]'
    const result = transformObsidianMarkdown(input, publishedSlugs)
    expect(result).toContain('<a href="/blog/LIT-docker-basics">')
    expect(result).toContain('<img src="/attachments/screenshot.png"')
  })

  it('frontmatter를 제거하고 본문만 반환', () => {
    const input = '---\ntype: literature\npublish: true\n---\n\n## 본문 시작'
    const result = transformObsidianMarkdown(input, publishedSlugs)
    expect(result).not.toContain('---')
    expect(result).not.toContain('publish: true')
    expect(result).toContain('## 본문 시작')
  })
})
