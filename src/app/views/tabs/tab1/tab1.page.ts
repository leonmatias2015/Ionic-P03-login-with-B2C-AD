import {Component, NgZone, ViewChild} from '@angular/core';
import {NavController} from "@ionic/angular";
import {MsalService} from "@azure/msal-angular";
import {UserModel} from "../../../core/models/user.model";
import jwt_decode from "jwt-decode";
import {AuthenticationService} from "../../../core/services/authentication.service";

// (window as any).handleOpenURL = (url: string) => {
//     (window as any).handleOpenURL_LastURL = url;
// };

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    userModel: UserModel = new UserModel();

    @ViewChild("rootNav")
    private navCtrl: NavController;

    constructor(private ngZone: NgZone,
                private authService: MsalService,
                public authenticationService: AuthenticationService) {
        (window as any).handleOpenURL = (url: string) => {
            // this context is called outside of angular zone!
            setTimeout(() => {
                // so we need to get back into the zone..
                this.ngZone.run(() => {
                    // this is in the zone again..
                    this.handleOpenUrl(url);
                });
            }, 0);
        };
        const lastUrl: string = (window as any).handleOpenURL_LastURL || "";
        if (lastUrl && lastUrl !== "") {
            delete (window as any).handleOpenURL_LastURL;
            this.handleOpenUrl(lastUrl);
        }
        this.acountUser();
    }

    private acountUser() {
        console.log(JSON.stringify(this.authService.getAccount()));

    }

    private handleOpenUrl(url: string) {
        this.authenticationService.isLoginCorrect = true;
        // custom url parsing, etc...
        console.log(url);
        localStorage.setItem('token', url.split('=')[3]);
        this.userModel = jwt_decode(url.split('=')[3])
        // navigate to page with reactive forms
        // this.navCtrl.push(MyReactiveFormsPage, { param: "my param" });
    }


}
