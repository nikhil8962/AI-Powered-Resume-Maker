import { Component } from '@angular/core';
import { MaterialDesignModule } from '../material-design/material-design/material-design-module';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResumeService } from '../services/resume-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Snackbar } from '../services/snackbar';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { ResumeTemplate } from '../resume-template/resume-template';



@Component({
  selector: 'app-resume',
  imports: [MaterialDesignModule, FormsModule, CommonModule, NgIf, ReactiveFormsModule, NgFor, RouterOutlet, RouterLinkWithHref,ResumeTemplate],
  templateUrl: './resume.html',
  styleUrl: './resume.css',
})
export class Resume {

  resumeForm!: FormGroup;
  

  constructor(private resumeService: ResumeService,
    private snackbar: Snackbar,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder
  ) { }

  userDescription: string = '';
  loading: boolean = false;
  showResumeForm=false;
  showResumeTemplate = false;

  // ========================
  // TEMPLATE SELECTION
  // ========================

  showTemplateSelector = false;
  selectedTemplate: string = 'premium';

  templates = [
    { id: 'premium', name: 'Premium' },
    { id: 'classic', name: 'Classic' },
    { id: 'modern', name: 'Modern' },
    { id: 'minimal', name: 'Minimal' },
    { id: 'creative', name: 'Creative' },
    { id: 'executive', name: 'Executive' },
    { id: 'compact', name: 'Compact' },
  ];

  previewColors: any = {
    premium:   { header: '#ffffff', body: '#ffffff' },
    classic:   { header: '#ffffff', body: '#f9fafb' },
    modern:    { header: '#2563eb', body: '#1e293b' },
    minimal:   { header: '#ffffff', body: '#ffffff' },
    creative:  { header: '#c1543f', body: '#fff5f2' },
    executive: { header: '#ffffff', body: '#fdf6e3' },
    compact:   { header: '#ffffff', body: '#f3f4f6' },
  };

  selectTemplate(id: string) {
    this.selectedTemplate = id;
    this.showTemplateSelector = false;
    this.showResumeTemplate = true;
  }

  skipTemplateSelection() {
    this.showTemplateSelector = false;
    this.showResumeTemplate = true;
  }

  onChangeTemplate() {
    this.showResumeTemplate = false;
    this.showTemplateSelector = true;
  }


  ngOnInit() {
    this.resumeForm = this.fb.group({
      personalInformation: this.fb.group({
        fullName: [''],
        email: [''],
        phoneNumber: [''],
        location: [''],
        Linkedin: [''],
        Github: [''],
        portfolio: [''],
        summary: ['']
      })
      ,
      education: this.fb.array([])
      , skills: this.fb.array([])
      , experience: this.fb.array([])
      , certifications: this.fb.array([])
      , projects: this.fb.array([])
      , achievements: this.fb.array([])
      , languages: this.fb.array([])
      , interests: this.fb.array([])
    });
  }


  // =================================
  // GETTERS
  // =================================

  get educationArray(): FormArray {
    return this.resumeForm.get('education') as FormArray;
  }
  get skillsArray(): FormArray {
    return this.resumeForm.get('skills') as FormArray;
  }
  get experianceArray(): FormArray {
    return this.resumeForm.get('experience') as FormArray;
  }
  get certificationsArray(): FormArray {
    return this.resumeForm.get('certifications') as FormArray;
  }
  get projectsArray(): FormArray {
    return this.resumeForm.get('projects') as FormArray;
  }
  get achievementsArray(): FormArray {
    return this.resumeForm.get('achievements') as FormArray;
  }
  get languagesArray(): FormArray {
    return this.resumeForm.get('languages') as FormArray;
  }
  get interestsArray(): FormArray {
    return this.resumeForm.get('interests') as FormArray;
  }

  // ========================
  // ADD EDUCATION
  // ========================

  addEducation() {

    if(this.educationArray.length >=2 ){
      return ; 
    }
    this.educationArray.push(
      this.fb.group({
        university: [''],
        degree: [''],
        location: [''],
        graduationYear: ['']
      })
    )
  }

  // ========================
  // ADD SKILLS
  // ========================

  addSkills() {
    if(this.skillsArray.length >=2 ){
      return ; 
    }
    this.skillsArray.push(
      this.fb.group({
        title: [''],
        level: ['']
      })
    )
  }
  
  // ========================
  // ADD EXEPERIENCE
  // ========================

  addExperiance() {
    if(this.experianceArray.length >=2 ){
      return ; 
    }
    this.experianceArray.push(
      this.fb.group({
        jobTitle: [''],
        company: [''],
        location: [''],
        duration: [''],
        responsibility: ['']
      })
    )
  }
  
  // ========================
  // ADD PROJECTS
  // ========================

  addProjects() {
    if(this.projectsArray.length >=2 ){
      return ; 
    }
    this.projectsArray.push(
      this.fb.group({
        title: [''],
        description: [''],
        githubLink: [''],
        technologiesUsed: this.fb.array([])
      })
    )
  }

  addTechnology(projectIndex: number){
    const technologies = this.projectsArray.at(projectIndex).get('technologiesUsed') as FormArray;
    technologies.push(
      this.fb.control('')
    );
  }
  // ========================
  // ADD ACHIVEMENT
  // ========================

  addAchivement() {
    if(this.achievementsArray.length >=2 ){
      return ; 
    }
    this.achievementsArray.push(
      this.fb.group({
        title: [''],
        year: [''],
        extraInformation: ['']
      })
    )
  }
  // ========================
  // ADD CERTIFICATION
  // ========================

  addCertification() {
    if(this.certificationsArray.length >=2 ){
      return ; 
    }
    this.certificationsArray.push(
      this.fb.group({
        title: [''],
        issuingOrganization: [''],
        year: ['']
      })
    )
  }
  // ========================
  // ADD LANGUAGES
  // ========================

  addLanguages() {
    if(this.languagesArray.length >=2 ){
      return ; 
    }
    this.languagesArray.push(
      this.fb.group({
        name: ['']
      })
    )
  }
  // ========================
  // ADD INTERESTS
  // ========================

  addInterest() {
    if(this.interestsArray.length >=2 ){
      return ; 
    }
    this.interestsArray.push(
      this.fb.group({
        name: ['']
      })
    )
  }

  // ========================
  // REMOVE ITEM
  // ========================
  removeItem(arrayName:string,index:number){
    const FormArray = this.resumeForm.get(arrayName) as FormArray;
    FormArray.removeAt(index);
  }


  // ============================
  // CONVERT OBJECT TO ARRAY
  // ============================

  toArray(data: any): any[] {
    if (!data) {
      return [];
    }
    return Array.isArray(data) ? data : [data];
  }


  // ============================
  // HANDLE GENERATE
  // ============================

  async handleGenerate() {

    console.log(this.userDescription);

    try {
      this.loading = true;

      const response = await firstValueFrom(
        this.resumeService.generateResume(this.userDescription)
      ) as any;

      console.log(response);

      const data = response?.data;

      if (!data) {
        this.snackbar.error('The AI could not generate a resume from that description. Please try again, or add a bit more detail.');
        return;
      }

      this.resumeForm.get('personalInformation')?.patchValue(data.personalInformation || {});

      this.educationArray.clear();

      this.toArray(data.education).forEach((edu: any) => {

        this.educationArray.push(
          this.fb.group({
            university: [edu.university || ''],
            degree: [edu.degree || ''],
            location: [edu.location || ''],
            graduationYear: [edu.graduationYear || '']
          })
        );
      });

      this.skillsArray.clear();

      this.toArray(data.skills).forEach((skill: any) => {

        this.skillsArray.push(
          this.fb.group({
            title: [skill.title || ''],
            level: [skill.level || '']
          })
        );
      });

      this.experianceArray.clear();

      this.toArray(data.experience).forEach((exp: any) => {

        this.experianceArray.push(
          this.fb.group({
            jobTitle: [exp.jobTitle || ''],
            company: [exp.company || ''],
            location: [exp.location || ''],
            duration: [exp.duration || ''],
            responsibility: [exp.responsibility || '']
          })
        );
      });

      this.certificationsArray.clear();

      this.toArray(data.certifications).forEach((cert: any) => {

        this.certificationsArray.push(
          this.fb.group({
            title: [cert.title || ''],
            issuingOrganization: [cert.issuingOrganization || ''],
            year: [cert.year || '']
          })
        );
      });

      this.projectsArray.clear();

      this.toArray(data.projects).forEach((project: any) => {

        const techArray = this.fb.array([]);

        this.toArray(project.technologiesUsed).forEach((tech: any) => {
          techArray.push(
            new FormControl(tech)
          );
        })

        this.projectsArray.push(
          this.fb.group({
            title: [project.title || ''],
            description: [project.description || ''],
            githubLink: [project.githubLink || ''],
            technologiesUsed: techArray
          })
        );
      });

      this.achievementsArray.clear();

      this.toArray(data.achievements).forEach((achi: any) => {

        this.achievementsArray.push(
          this.fb.group({
            title: [achi.title || ''],
            year: [achi.year || ''],
            extraInformation: [achi.extraInformation || '']
          })
        );
      });

      this.languagesArray.clear();

      this.toArray(data.languages).forEach((lang: any) => {

        this.languagesArray.push(
          this.fb.group({
            name: [lang.name || '']
          })
        );
      });

      this.interestsArray.clear();

      this.toArray(data.interests).forEach((inte: any) => {

        this.interestsArray.push(
          this.fb.group({
            name: [inte.name || '']
          })
        );
      });

    
      this.showResumeForm=true;
      this.snackbar.success("Resume Generated Successfully");
      this.userDescription = "";

    } catch (error: any) {
      console.log(error);
      const message = error?.error?.message || error?.message || "Something went wrong";
      this.snackbar.error(message);
    } finally {
      this.loading = false;
      this.cd.detectChanges();
    }

  }

  onSubmit() {
    const finalData = this.resumeForm.value;
    console.log('final-Data', finalData);
    this.showTemplateSelector = true;
  }



}