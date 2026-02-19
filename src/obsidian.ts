import matter from 'gray-matter'

// wiki-link 패턴: [[note-name]] 또는 [[note-name|alias]]
const WIKI_LINK_RE = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g

// 이미지/파일 임베드 패턴: ![[filename.ext]] (확장자가 있는 경우만 매칭)
const IMAGE_EMBED_RE = /!\[\[([^\]]+\.(?:png|jpg|jpeg|gif|svg|webp|pdf|mp4))\]\]/gi

/**
 * Obsidian wiki-link를 HTML로 변환한다.
 * - published 노트: <a> 태그로 변환 (클릭 가능한 링크)
 * - 비published 노트: <span class="wikilink-dead">로 변환 (회색 italic 표시용)
 * - alias 지원: [[target|alias]] 형태에서 alias를 표시 텍스트로 사용
 */
export function transformWikiLinks(
  content: string,
  publishedSlugs: Set<string>,
): string {
  return content.replace(WIKI_LINK_RE, (_match, target: string, alias?: string) => {
    const displayText = alias ?? target
    if (publishedSlugs.has(target)) {
      return `<a href="/blog/${target}">${displayText}</a>`
    }
    return `<span class="wikilink-dead">${displayText}</span>`
  })
}

/**
 * Obsidian 이미지/파일 임베드를 <img> 태그로 변환한다.
 * - 확장자가 있는 임베드만 변환 (확장자 없는 노트 임베드는 무시)
 * - Attachments/ 접두사가 있으면 제거하고 /attachments/ 경로로 변환
 */
export function transformImageEmbeds(content: string): string {
  return content.replace(IMAGE_EMBED_RE, (_match, filePath: string) => {
    // 파일명만 추출 (경로에서 마지막 부분)
    const fileName = filePath.split('/').pop() ?? filePath
    // Attachments/ 접두사 처리: Obsidian vault 경로를 웹 경로로 변환
    const src = filePath.startsWith('Attachments/')
      ? `/attachments/${filePath.slice('Attachments/'.length)}`
      : `/attachments/${filePath}`
    return `<img src="${src}" alt="${fileName}" />`
  })
}

/**
 * Obsidian 마크다운을 블로그용 HTML/마크다운으로 통합 변환한다.
 * 1. frontmatter 제거 (gray-matter로 파싱)
 * 2. 이미지 임베드 변환
 * 3. wiki-link 변환
 */
export function transformObsidianMarkdown(
  raw: string,
  publishedSlugs: Set<string>,
): string {
  // frontmatter를 분리하여 본문만 추출
  const { content } = matter(raw)
  let result = content
  // 이미지 임베드를 먼저 변환 (![[...]] 패턴이 [[...]] 패턴에 잘못 매칭되지 않도록)
  result = transformImageEmbeds(result)
  result = transformWikiLinks(result, publishedSlugs)
  return result
}
