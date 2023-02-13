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
  file: File;

  constructor(private uploadService: ServiceService, private fb: FormBuilder) {}

  ngOnInit(): void {}

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

    console.log(configJSON);

    // append the file to the form data
    formData.append('upload_file', this.form.get('file').value);

    // append the configJSON to the form data
    formData.append('setting', JSON.stringify(configJSON));

    this.uploadService.uploadFile(formData).subscribe((res) => {
      console.log(res)
    });

  }

  uploadFile(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }

  }
}
