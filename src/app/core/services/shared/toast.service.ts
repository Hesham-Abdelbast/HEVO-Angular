import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public success(message: string) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 3000
    });
  }

  public error(message: string) {
    Swal.fire({
      toast: true,
      position: 'center',
      icon: 'error',
      title: message,
      showConfirmButton: true
    });
  }
}
