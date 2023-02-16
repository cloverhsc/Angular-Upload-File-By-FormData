import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Service/service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(public service: ServiceService) {}

  ngOnInit(): void {}

  /**
   * Use the uuid to find the task in the UploadTasks array then unsubscribe from the task.
   * @param uuid : string
   */
  abort(uuid: string) {
    this.service.UploadTasks.find(task => task.uuid === uuid).task.unsubscribe();
    this.service.updateUploadStatus({ message: 'Aborted', uuid })
  }

  ngOnDestroy(): void {}
}
