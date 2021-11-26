export interface Article {
  id: number
  title: string
  text: string
  category: string
  created_at: string
  author: string
}

export interface ArticleForm {
  title: string
  text: string
  category: string
}

export interface InitialState {
  article: Article
  list: Array<Article>
}

export interface Filter {
  query?: string
  order?: 'ASC' | 'DESC'
}
