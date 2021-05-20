import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeScreenRoutingModule } from './home-screen-routing.module';
import { HomeScreenComponent } from './components/home-screen/home-screen.component';
import { ControlButtonComponent } from './components/control-button/control-button.component';
import { ControlsComponent } from './components/controls/controls.component';
import { PlayPauseButtonComponent } from './components/play-pause-button/play-pause-button.component';
import { SkipButtonComponent } from './components/skip-button/skip-button.component';
import { RestartButtonComponent } from './components/restart-button/restart-button.component';
import { ClockTimeComponent } from './components/clock-time/clock-time.component';
import { ClockProgressComponent } from './components/clock-progress/clock-progress.component';
import { ClockComponent } from './components/clock/clock.component';
import { TimePipe } from './pipes/time.pipe';
import { IntervalCountComponent } from './components/interval-count/interval-count.component';
import { SpeechBalloonComponent } from './components/speech-balloon/speech-balloon.component';

@NgModule({
    declarations: [
        HomeScreenComponent,
        ControlButtonComponent,
        ControlsComponent,
        PlayPauseButtonComponent,
        SkipButtonComponent,
        RestartButtonComponent,
        ClockTimeComponent,
        ClockProgressComponent,
        ClockComponent,
        TimePipe,
        IntervalCountComponent,
        SpeechBalloonComponent,
    ],
    imports: [CommonModule, HomeScreenRoutingModule],
})
export class HomeScreenModule {}
