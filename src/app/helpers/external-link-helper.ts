import { environment } from "../../environments/environment.development";

export function setImdbNamePage(imdbId: string): string {
  return imdbId ? `${environment.imdbPersonUrl}${imdbId}` : '';
}

export function setFacebookPage(facebookId: string): string {
  return facebookId ? `${environment.facebookUrl}${facebookId}` : '';
}

export function setInstagramPage(instagramId: string): string {
  return instagramId ? `${environment.instagramUrl}${instagramId}` : '';
}

export function setTwitterPage(twitterId: string): string {
  return twitterId ? `${environment.twitterUrl}${twitterId}` : '';
}

export function setTiktokPage(tiktokId: string): string {
  return tiktokId ? `${environment.tiktokUrl}${tiktokId}` : '';
}

export function setYouTubePage(youtubeId: string): string {
  return youtubeId ? `${environment.youtubeUrl}${youtubeId}` : '';
}

