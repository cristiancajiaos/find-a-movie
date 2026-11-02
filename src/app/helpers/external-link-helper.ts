import { environment } from "../../environments/environment.development";

export class ExternalLinkHelper {

  public setFacebookPage(facebookId: string): string {
    return facebookId ? `${environment.facebookUrl}${facebookId}` : '';
  }

  public setInstagramPage(instagramId: string): string {
    return instagramId ? `${environment.instagramUrl}${instagramId}` : '';
  }

  public setTwitterPage(twitterId: string): string {
    return twitterId ? `${environment.twitterUrl}${twitterId}` : '';
  }

  public setTiktokPage(tiktokId: string): string {
    return tiktokId ? `${environment.tiktokUrl}${tiktokId}` : '';
  }

  public setYouTubePage(youtubeId: string): string {
    return youtubeId ? `${environment.youtubeUrl}${youtubeId}` : '';
  }
}
