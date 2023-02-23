import { Component, OnDestroy, OnInit, ElementRef } from '@angular/core';
import { ServiceService } from 'src/app/Service/service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(public service: ServiceService, private element: ElementRef) {}

  ngOnInit(): void {}

  /**
   * Use the uuid to find the task in the UploadTasks array then unsubscribe from the task.
   * @param uuid : string
   */
  abort(uuid: string) {
    this.service.UploadTasks.find(task => task.uuid === uuid).task.unsubscribe();
    this.service.updateUploadStatus({ message: 'Aborted', uuid })

    // disable Abort button
    this.element.nativeElement.querySelector(`[data-uuid="${uuid}"]`).disabled = true;
  }

  ngOnDestroy(): void {}
}
