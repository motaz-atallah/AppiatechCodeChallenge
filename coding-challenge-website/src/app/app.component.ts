import { Component } from '@angular/core';
import { CodingChallengeApiService } from './services';
import { take } from 'rxjs/operators';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public faThumbsUp = faThumbsUp;
  public faThumbsDown = faThumbsDown;
  public title = ' Coding Challenge!';
  public CodingChallengeApiIsActive = false;
  public CodingChallengeApiActiveIcon = this.faThumbsDown;
  public CodingChallengeApiActiveIconColour = 'red';

  constructor(private CodingChallengeApiService: CodingChallengeApiService) {
    CodingChallengeApiService.getHealth().pipe(take(1))
    .subscribe(
      apiHealth => {
        this.CodingChallengeApiIsActive = apiHealth === 'Healthy';
        this.CodingChallengeApiActiveIcon = this.CodingChallengeApiIsActive
          ? this.faThumbsUp
          : this.faThumbsUp;
        this.CodingChallengeApiActiveIconColour = this.CodingChallengeApiIsActive
          ? 'green'
          : 'red';
      },
      _ => {
        this.CodingChallengeApiIsActive = false;
        this.CodingChallengeApiActiveIcon = this.faThumbsDown;
        this.CodingChallengeApiActiveIconColour = 'red';
      });
  }
}
