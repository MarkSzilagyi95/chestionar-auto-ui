import { core } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../config/api.service';
import { Router } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-chestionar',
  templateUrl: './chestionar.component.html',
  styleUrls: ['./chestionar.component.css']
})
export class ChestionarComponent implements OnInit {
  totalTime = 1800;
  totalQuestions = 26;
  questionsAnswered = 0;
  goodAnswers:number = 0;
  badAnswers:number = 0;

  minutesRemained = "30";
  secondsRemained = "00";

  skippedQuestionIds:any = []

  questionList:any = [];
  questionOptions = {
    option:"",
    optionLabel:"",
    correct:false
  }
  currentQuestion = {
    id: 0,
    question: "",
    imageUrl: "",
    questionOptions: [this.questionOptions]
  }


  constructor(
    private router: Router,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.getQuestion();
    setInterval(()=> { this.checkIfTimeIsElapsed() }, 1000);
  }

  public skipQuestion() {
    if(this.questionsAnswered + this.skippedQuestionIds.length >= this.totalQuestions) {
      if(this.skippedQuestionIds.length > 0) {
        let questionID = this.skippedQuestionIds[0]
        this.getQuestionById(questionID);

        this.skippedQuestionIds = this.skippedQuestionIds.filter(() => !this.skippedQuestionIds.includes(questionID));
      }
    } else {
      this.skippedQuestionIds.push(this.currentQuestion.id)
      this.resetCheckboxStates();
  
      this.getQuestion();
    }
  }

  private checkIfTimeIsElapsed() {
    if(this.totalTime - 1 <= 0) {
      this.totalTime--;
      if(this.goodAnswers >= 22) {
        this.router.navigateByUrl('chestionar-end?status=success');
      } else {
        this.router.navigateByUrl('chestionar-end?status=fail');
      }
    } else {
      this.totalTime--;
    }

    var minutes = Math.floor(this.totalTime / 60);
    var seconds = this.totalTime - minutes * 60;

    if(minutes < 10) {
      this.minutesRemained = "0" + minutes.toString()
    } else {
      this.minutesRemained = minutes.toString()
    }

    if(seconds < 10) {
      this.secondsRemained = "0" + seconds.toString()
    } else {
      this.secondsRemained = seconds.toString()
    }
  }
  private getQuestion() {
    this.apiService.loadRandomQuestion().subscribe(
      (data) => {
        this.currentQuestion = data;
        let index = 0;
        let label = ['A', 'B', 'C']
        this.currentQuestion.questionOptions.forEach(element => {
          element.optionLabel = label[index]
          index++;
        });
      }
    )
  }

  private getQuestionById(questionId:any) {
    this.apiService.getQuestionById(questionId).subscribe(
      (data) => {
        this.currentQuestion = data;
        let index = 0;
        let label = ['A', 'B', 'C']
        this.currentQuestion.questionOptions.forEach(element => {
          element.optionLabel = label[index]
          index++;
        });
      }
    )
  }

  public checkboxClick(option:any) {
    let answer = (document.getElementById("answer-"+option) as HTMLElement)
    if(answer.classList.contains('selected')) {
      answer.classList.remove('selected')
    } else {
      answer.classList.add('selected')
    }
  }

  public sendResponse() {
    this.questionsAnswered++;
    if(this.isValidResponse()) {
      this.goodAnswers++;
    } else {
      this.badAnswers++;
      if(this.badAnswers == 5) {
        this.router.navigateByUrl('chestionar-end?status=failed');
      }
    }

    if(this.testIsDone()) {
      this.router.navigateByUrl('chestionar-end?status=success');
    }

    this.resetCheckboxStates();

    if(this.questionsAnswered + this.skippedQuestionIds.length >= this.totalQuestions) {
      if(this.skippedQuestionIds.length > 0) {
        let questionID = this.skippedQuestionIds[0]
        this.getQuestionById(questionID);
        this.skippedQuestionIds = this.skippedQuestionIds.filter(() => !this.skippedQuestionIds.includes(questionID));
      }
    } else {
      this.getQuestion();
    }
    console.log(this.skippedQuestionIds)
  }

  private testIsDone() {
    return (this.goodAnswers + this.badAnswers) == 26
  }

  private resetCheckboxStates() {
    let checkboxes = ((document.querySelectorAll("input[type=checkbox]")))
    checkboxes.forEach(element => {
      (element as HTMLInputElement).checked = false
    });
  }

  private isValidResponse() {
    let option1 = (document.getElementById("check_1") as HTMLInputElement).checked
    let option2 = (document.getElementById("check_2") as HTMLInputElement).checked
    let option3 = (document.getElementById("check_3") as HTMLInputElement).checked
    let userOptions = [option1, option2, option3];


    for(let i=0; i<this.currentQuestion.questionOptions.length; i++) {
      let optionValue = this.currentQuestion.questionOptions[i].correct
      if(optionValue !== userOptions[i]) {
        return false;
      } 
    }
    return true;
  }

}
