export function formattedMovieTitle(title: string, originalTitle: string, releaseDate: string): string {
  const movieTitle: string = title;
  const movieYearDate: Date = new Date(releaseDate);
  const movieYear: number = movieYearDate.getFullYear();
  let movieFormattedTitle: string = movieTitle.toLowerCase().includes(originalTitle.toLowerCase())
    ? `${movieTitle}`
    : `${movieTitle} (${originalTitle})`;
  let movieFormattedYear: string = movieYear ? `${movieYear}` : 'No Release Date';
  const titleStr: string = `${movieFormattedTitle} (${movieFormattedYear})`;
  return titleStr;
}
