import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html'
})
export class FormComponent {
  recordForm: FormGroup;
  message: string = '';
  isError: boolean = false;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.recordForm = this.fb.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
      reference_date: ['', Validators.required],
      deliveries: [0, [Validators.required, Validators.min(0)]],
      observation: ['']
    });
  }

  onSubmit() {
    if (this.recordForm.valid) {
      this.apiService.createRecord(this.recordForm.value).subscribe({
        next: () => {
          this.message = 'Registro salvo com sucesso!';
          this.isError = false;
          this.recordForm.reset({ deliveries: 0 });
        },
        error: () => {
          this.message = 'Erro ao salvar o registro. Verifique a API.';
          this.isError = true;
        }
      });
    } else {
      this.message = 'Preencha os campos obrigatórios corretamente.';
      this.isError = true;
    }
  }
}