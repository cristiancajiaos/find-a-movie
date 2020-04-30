import { MovieResult } from './movie-result';

export interface PageResult {
  page: number;
  results: MovieResult[];
  total_results: number;
  total_pages: number;
}
