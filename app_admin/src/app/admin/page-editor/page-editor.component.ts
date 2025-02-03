import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Page } from '../../interfaces/page';
import { EditTextIntroComponent } from '../edit-text-intro/edit-text-intro.component';

@Component({
  selector: 'app-page-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, EditTextIntroComponent],
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.css']
})
export class PageEditorComponent implements OnInit {
  pageForm!: FormGroup;
  pageId!: string;
  pageData!: Page;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pageId = this.route.snapshot.paramMap.get('id')!;
    this.pageForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      components: this.fb.array([])
    });

    if (this.pageId) {
      this.apiService.getPageByIdentifier(`page-${this.pageId}`).subscribe((page: Page) => {
        this.pageData = page;
        this.pageForm.patchValue({
          title: page.title,
          description: page.description
        });
        this.loadComponents(page.components);
      });
    }
  }

  get components(): FormArray {
    return this.pageForm.get('components') as FormArray;
  }

  // Helper method to cast an AbstractControl to FormGroup.
  asFormGroup(control: AbstractControl | null): FormGroup {
    return control as FormGroup;
  }

  loadComponents(components: any[]): void {
    this.components.clear();
    components.forEach(component => {
      if (component.kind === 'TypeIntro') {
        const componentGroup = this.fb.group({
          kind: ['TypeIntro'],
          data: this.fb.group({
            _id: [component._id],
            title: [component.title, Validators.required],
            description: [component.description],
            leftPadding: [component.leftPadding],
            width: [component.width],
            height: [component.height],
            identifier: [component.identifier],
            tags: [component.tags],
            kind: [component.kind]
          })
        });
        this.components.push(componentGroup);
      }
    });
  }

  onSubmit(): void {
    if (this.pageForm.valid) {
      const formValue = this.pageForm.value;
      const updatedPage = {
        ...formValue,
        components: formValue.components.map((component: any) => ({
          kind: component.kind, 
          data: component.data 
        }))
      };
  
      this.apiService.updatePageByIdentifier(`page-${this.pageId}`, updatedPage).subscribe({
        next: () => {
          console.log('Page updated successfully');
          this.router.navigate(['/admin']);
        },
        error: (error) => {
          console.error('Error updating page:', error);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}