// 숫자를 2자리로 패딩 (예: 1 -> "01")
export function padTwo(num: number): string {
  return num.toString().padStart(2, '0')
}

// ISO 8601 날짜 형식 생성 (예: "2024-01-15")
export function formatDate(year: number, month: number, day: number): string {
  return `${year}-${padTwo(month)}-${padTwo(day)}`
}

// 블로그 경로용 날짜 포맷 (예: "2024/01/15")
export function formatDatePath(year: number, month: number, day: number): string {
  return `${year}/${padTwo(month)}/${padTwo(day)}`
}
