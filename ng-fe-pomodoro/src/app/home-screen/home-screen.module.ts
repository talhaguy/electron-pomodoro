import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeScreenRoutingModule } from './home-screen-routing.module';
import { HomeScreenComponent } from './components/home-screen/home-screen.component';
import { ControlButtonComponent } from './components/control-button/control-button.component';
import { ControlsComponent } from './components/controls/controls.component';
import { PlayPauseButtonComponent } from './components/play-pause-button/play-pause-button.component';
import { SkipButtonComponent } from './components/skip-button/skip-button.component';
import { RestartButtonComponent } from './components/restart-button/restart-button.component';

@NgModule({
    declarations: [HomeScreenComponent, ControlButtonComponent, ControlsComponent, PlayPauseButtonComponent, SkipButtonComponent, RestartButtonComponent],
    imports: [CommonModule, HomeScreenRoutingModule],
})
export class HomeScreenModule {}
