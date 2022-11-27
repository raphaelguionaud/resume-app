import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SubSink } from 'subsink';

export interface Project {
  name: string;
  description: string;
  typeTags: string[];
  languageTags: string[];
  toolTags: string[];
  link: string;
}

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {
  subs = new SubSink();
  
  filteredList: Project[] = [];
  projectList: Project[] = [
    {
      name: 'microservices-app',
      description: 'A backend with microservice architecture for a social media app, made with NodeJS, Express, React, Docker and Kubernetes',
      typeTags: ['backend', 'microservices'],
      languageTags: ['Javascript'],
      toolTags: ['NodeJS', 'ExpressJS', 'React', 'Docker', 'Kubernetes'],
      link: 'https://github.com/raphaelguionaud/microservices-app'
    },
    {
      name: 'resume-app',
      description: 'A resume app built with Angular & NodeJS hosted on Heroku',
      typeTags: ['frontend', 'backend'],
      languageTags: ['Javascript', 'Typescript'],
      toolTags: ['NodeJS', 'ExpressJS', 'Angular'],
      link: 'https://github.com/raphaelguionaud/microservices-app'
    }
  ];

  searchCtrl = new UntypedFormControl;
  languageCtrl = new FormControl('');
  languageList: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.filteredList = this.projectList;

    this.setLanguages();

    this.subs.sink = this.searchCtrl.valueChanges
    .pipe(debounceTime(400), distinctUntilChanged())
    .subscribe((res: string) => {
      const search = res.toLowerCase();
      this.filteredList = this.projectList.filter(project => {
        return (project.name.toLowerCase().includes(search) ||
        project.description.toLowerCase().includes(search) ||
        project.typeTags.some(t => t.toLowerCase().includes(search)) ||
        project.languageTags.some(t => t.toLowerCase().includes(search)) ||
        project.toolTags.some(t => t.toLowerCase().includes(search)));
      });
    });
  }

  setLanguages() {
    this.languageList = [];
    this.projectList.map(project => {
      project.languageTags?.map(tag => {
        if(!this.languageList.includes(tag)) {
          this.languageList.push(tag);
        }
      });
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
