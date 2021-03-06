import {BrowserModule} from '@angular/platform-browser';
import {NgModule, LOCALE_ID} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {ValidateIccComponent} from './validate-flow/validate-icc.component';
import {ValidateStartInfoComponent} from './validate-flow/validate-icc-start/info/validate-start-info.component';
import {StepComponent} from './components/step/step.component';
import {ValidateStartInputComponent} from './validate-flow/validate-icc-start/input/validate-start-input.component';
import {ExpansionPanelComponent} from './components/expansion-panel/expansion-panel.component';
import {ValidateConfirmInfoComponent} from './validate-flow/validate-icc-confirm/info/validate-confirm-info.component';

import {registerLocaleData} from '@angular/common';
import localeNL from '@angular/common/locales/nl';
import {ValidateIccConfirmComponent} from './validate-flow/validate-icc-confirm/validate-icc-confirm.component';
import {ValidateIccStartComponent} from './validate-flow/validate-icc-start/validate-icc-start.component';

import {ValidateIccFinalComponent} from './validate-flow/validate-icc-final/validate-icc-final.component';
import {AuthGuard, ErrorInterceptor} from './helpers';
import {ImageCarousselComponent} from './components/image-caroussel/image-caroussel.component';
import {AuthComponent} from './auth/auth.component';

import {APP_INITIALIZER} from '@angular/core';
import {AppConfigService, IAppConfig} from './services/app-config.service';
import {ValidateConfirmCheckComponent} from './validate-flow/validate-icc-confirm/check/validate-confirm-check.component';

registerLocaleData(localeNL);

const appInitializer = (appConfig: AppConfigService) => {
    return () => {
        return appConfig.loadAppConfig();
    };
};

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ValidateIccComponent,
        ValidateStartInfoComponent,
        StepComponent,
        ExpansionPanelComponent,
        ValidateStartInputComponent,
        ValidateConfirmInfoComponent,
        ValidateIccFinalComponent,
        ValidateIccConfirmComponent,
        ValidateIccStartComponent,
        ValidateConfirmCheckComponent,
        ValidateIccFinalComponent,
        ImageCarousselComponent
    ],
    imports: [
        FormsModule, ReactiveFormsModule,
        BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot([
            {path: '', component: HomeComponent},
            {path: 'auth', component: AuthComponent},
            {
                path: 'validate',
                component: ValidateIccComponent,
                canActivate: [AuthGuard],
                children: [
                    {
                        path: 'start',
                        component: ValidateIccStartComponent
                    },
                    {
                        path: 'confirm',
                        component: ValidateIccConfirmComponent
                    },
                ]
            },
            {
                path: 'validate_final',
                component: ValidateIccFinalComponent
            }
        ])
    ],
    providers: [
        {provide: LOCALE_ID, useValue: 'nl'},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        AppConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializer,
            multi: true,
            deps: [AppConfigService]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

// {path: 'icc/generate', component: IccGenerateComponent, pathMatch: 'full', canActivate: [AuthGuard]}
