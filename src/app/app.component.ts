import { Component } from "@angular/core";
import { IotService } from "./iot.service";
import { version } from "../../package.json";
import { AuthService } from "./auth.service";
import { ConnectionState } from "@wiklosoft/ng-iot";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  version: string;
  connectionState: ConnectionState = ConnectionState.DISCONNECTED;

  constructor(private iot: IotService, auth: AuthService) {
    this.version = version;
    iot.connect(auth.getToken());
    iot
      .getController()
      .getConnectionState()
      .subscribe((state: ConnectionState) => {
        this.connectionState = state;
      });
  }

  isConnected() {
    return this.connectionState === ConnectionState.CONNECTED;
  }
}
