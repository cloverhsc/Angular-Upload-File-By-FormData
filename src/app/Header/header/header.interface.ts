import { HttpResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
export interface IUploadTask {
  title: string;
  status: 'Uploading' | 'Completed' | 'Failed' | 'Aborted';
  progress: string | number;
  timestamp: string;
  uuid: string;
  task: Subscription;
}

