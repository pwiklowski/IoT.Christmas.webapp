import { Component, OnInit, Input } from "@angular/core";
import { IotService } from "../iot.service";

interface SensorsData {
  temperature: number;
  temperatureFormated: string;
  humidity: number;
  light: number;
  moisture: number;
}
@Component({
  selector: "app-sensors",
  templateUrl: "./sensors.component.html",
  styleUrls: ["./sensors.component.scss"]
})
export class SensorsComponent implements OnInit {
  value: SensorsData = undefined;
  @Input() deviceUuid: string;
  @Input() variableUuid: string;

  constructor(private iot: IotService) {}

  ngOnInit() {
    setTimeout(() => {
      this.iot
        .getController()
        .observe(this.deviceUuid, this.variableUuid)
        .subscribe((newValue: any) => {
          console.log("new value", newValue);
          if (newValue !== undefined) {
            this.value = newValue;
            this.value.temperatureFormated = this.value.temperature.toFixed(1);
          } else {
            this.value = undefined;
          }
        });
    }, 1000);
  }
}
