import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@app/_services';

@Component({
  selector: 'app-admin-actions',
  templateUrl: './admin-actions.component.html',
  styleUrls: ['./admin-actions.component.css']
})
export class AdminActionsComponent implements OnInit {

  form!: FormGroup
  submitted = false

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private router: Router
  ) { }

  get f() { return this.form.controls }

  ngOnInit() {
    this.form = this.fb.group({ actionselector: ['', Validators.required] });
  }

  onSubmit() {
    this.submitted = true
    if (this.form.invalid) {
      this.alertService.error('No selection made')
      return
    }
    var destination = ''
    let selectedOption = this.form.value["actionselector"] || ''

    switch (selectedOption) {
      case 'Failed Logins': {
        destination = './failed-logins-summary'
        break
      }
      default: {
        destination = '/portal/admin-actions'
        break
      }
    }
    this.router.navigate([destination])
  }

}
