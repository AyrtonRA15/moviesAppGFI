import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import * as movieActions from '../../../_redux/actions/movie.actions';
import * as fromMovie from '../../../_redux/reducers/movie.reducer';
import { AuthenticationService } from '../../../_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private store$: Store<fromMovie.State>
  ) {
    // Redireccionar al inicio si el usuario ya se encuentra logueado
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.error = undefined;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService
      .login(this.form.username.value, this.form.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
          this.store$.dispatch(new movieActions.LoadFavorites());
        },
        error => {
          this.error = error;
          this.loading = false;
          this.submitted = false;
        }
      );
  }
}
