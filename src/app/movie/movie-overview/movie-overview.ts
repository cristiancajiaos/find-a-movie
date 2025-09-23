import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../classes/movie';
import { Credits } from '../../classes/credits';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseVideo } from '../../classes/response-video';
import { faImdb, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from '../../services/local-storage-service';
import { CastMember } from '../../classes/credits/cast-member';
import { CrewMember } from '../../classes/credits/crew-member';

@Component({
  selector: 'app-movie-overview',
  standalone: false,
  templateUrl: './movie-overview.html',
  styleUrl: './movie-overview.scss',
})
export class MovieOverview implements OnInit, OnDestroy {
  public imdbIcon: IconDefinition = faImdb;
  public globeIcon: IconDefinition = faGlobe;

  public id: number = 0;

  public movie: Movie = new Movie();
  public credits: Credits = new Credits();
  public responseVideo: ResponseVideo = new ResponseVideo();
  public movieReleaseDate: Date = new Date();
  public movieIMDB: string = '';
  public movieHomepage: string = '';

  public mainCast: CastMember[] = [];

  public direction: CrewMember[] = [];
  public writing: CrewMember[] = [];
  public story: CrewMember[] = [];
  public basedOnWorkBy: CrewMember[] = [];
  public producing: CrewMember[] = [];
  public executiveProducing: CrewMember[] = [];

  public loadingMovie: boolean = false;
  public movieFound: boolean = false;
  public movieOverviewError: boolean = false;
  public errorMessage: string = '';

  public loadingCredits: boolean = false;
  public loadingVideo: boolean = false;
  public movieCreditsFound: boolean = false;
  public movieCreditsError: boolean = false;
  public movieCreditsErrorMessage: string = '';

  public activatedRouteParentSubscription: Subscription | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.setId();
  }

  private setId(): void {
    this.activatedRouteParentSubscription = this.activatedRoute.parent?.params.subscribe(
      (params) => {
        this.id = parseInt(params['id']);
        this.getMovie();
        this.getCredits();
        this.getVideo();
      }
    );
  }

  private getMovie() {
    this.movieOverviewError = false;
    this.loadingMovie = true;

    const localMovie: Movie = this.localStorageService.getItem('movie');

    if (localMovie) {
      this.movie = localMovie;
      this.loadingMovie = false;
      this.setReleaseDate();
      this.setMovieIMDB();
      this.setMovieHomepage();
    } else {
      this.movieService
        .getMovie(this.id)
        .then((movie) => {
          this.movie = movie;
          this.movieFound = true;
          this.setReleaseDate();
          this.setMovieIMDB();
          this.setMovieHomepage();
        })
        .catch((error: HttpErrorResponse) => {
          this.handleError(error);
        })
        .finally(() => {
          this.loadingMovie = false;
        });
    }
  }

  private getCredits() {
    this.loadingCredits = true;
    this.movieService
      .getMovieCredits(this.id)
      .then((credits) => {
        this.credits = credits;
        this.movieCreditsFound = true;
        this.setMainCast();
        this.setAndFilterMainCrew();
      })
      .catch((error: HttpErrorResponse) => {
        this.handleCreditsError(error);
      })
      .finally(() => {
        this.loadingCredits = false;
      });
  }

  private getVideo(): void {
    this.loadingVideo = true;
    this.movieService
      .getMovieVideos(this.id)
      .then((responseVideo) => {
        this.responseVideo = responseVideo;
      })
      .catch((error) => {})
      .finally(() => {
        this.loadingVideo = false;
      });
  }

  private setReleaseDate(): void {
    if (this.movie.release_date) {
      this.movieReleaseDate = new Date(this.movie.release_date);
    }
  }

  private setMovieIMDB(): void {
    if (this.movie.imdb_id) {
      this.movieIMDB = `https://www.imdb.com/title/${this.movie.imdb_id}/`;
    }
  }

  private setMovieHomepage(): void {
    if (this.movie.homepage) {
      this.movieHomepage = `${this.movie.homepage}`;
    }
  }

  private setMainCast(): void {
    if (this.credits) {
      this.mainCast = this.credits.cast.slice(0,7);
    }
  }

  private setAndFilterMainCrew(): void {
    if (this.credits) {
      this.direction = this.credits.crew.filter(crewMember => crewMember.job == 'Director');

      this.writing = this.credits.crew.filter(crewMember => crewMember.job == 'Screenplay' || crewMember.job == 'Writer');

      this.story = this.credits.crew.filter(crewMember => crewMember.job == 'Story');

      this.basedOnWorkBy = this.credits.crew.filter(crewMember => crewMember.job == 'Novel');

      this.producing = this.credits.crew.filter(crewMember => crewMember.job == 'Producer');

      this.executiveProducing = this.credits.crew.filter(crewMember => crewMember.job == 'Executive Producer');
    }

  }

  private handleError(error: HttpErrorResponse): void {
    this.movieOverviewError = true;
    this.errorMessage = error.message;
  }

  private handleCreditsError(error: HttpErrorResponse): void {
    this.movieCreditsError = true;
    this.movieCreditsErrorMessage = error.message;

  }

  public reloadMovieOverview(event: boolean) {
    this.getMovie();
  }

  ngOnDestroy(): void {
    this.activatedRouteParentSubscription?.unsubscribe();
  }
}
