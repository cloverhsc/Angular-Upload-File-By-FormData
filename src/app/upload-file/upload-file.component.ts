import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../Service/service.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  form = this.fb.group({
    file: ['', Validators.required],
    description: ['', Validators.maxLength(64)]
  });
  uuidList: string[] = [];
  url = 'http://localhost:3000/upload';
  file: File;

  constructor(private uploadService: ServiceService, private fb: FormBuilder) {}

  ngOnInit(): void {}

  /**
   * Submit Upload File Form.
   * Pass form data to the upload service.
   */
  postForm() {
    const formData = new FormData();
    const configJSON = {
      file_name: '',
      description: '',
    }


    // update form data with the file
    this.form.patchValue({ file: this.file })
    this.form.get('file').updateValueAndValidity()

    // configJSON file_name and description
    configJSON.description = this.form.value.description;
    configJSON.file_name = this.form.get('file').value.name;

    // append the file to the form data
    formData.append('upload_file', this.form.get('file').value);

    // append the configJSON to the form data
    formData.append('setting', JSON.stringify(configJSON));

    this.uploadService.fileUpload(this.url, formData, configJSON.file_name)
    this.form.reset();

  }

  /**
   * Extract the file from the input field then save in the file variable.
   * @param event : Event
   */
  extractFile(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }

  }
}
