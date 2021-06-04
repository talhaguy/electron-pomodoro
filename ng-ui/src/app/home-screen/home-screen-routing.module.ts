import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeScreenComponent } from './components/home-screen/home-screen.component';
import { SavedDataResolver } from './resolvers/saved-data.resolver';

const routes: Routes = [
    {
        path: '',
        component: HomeScreenComponent,
        resolve: {
            didSavedDataLoad: SavedDataResolver,
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeScreenRoutingModule {}
