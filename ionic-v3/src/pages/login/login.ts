import { Component } from "@angular/core";
import { UserPage } from "../user/user";

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  constructor(

  ) {}

  doGoogleLogin() {
    let nav = this.navCtrl;
    let loading = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loading.present();
    this.googlePlus
      .login({
        scopes: "", // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
        webClientId:
          "52411444122-j6d58li1bcj1qoii98ot9ggm5fvohlv6.apps.googleusercontent.com", // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
        offline: true
      })
      .then(
        user => {
          loading.dismiss();

          this.nativeStorage
            .setItem("user", {
              name: user.displayName,
              email: user.email,
              picture: user.imageUrl
            })
            .then(
              () => {
                nav.push(UserPage);
              },
              error => {
                console.log(error);
              }
            );
        },
        error => {
          loading.dismiss();
        }
      );
  }
}
