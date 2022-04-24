import { Component, OnInit } from '@angular/core';
import { ApiService } from '../config/api.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private apiService: ApiService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getQuestion();

  }
  closeResult: string | undefined;

  modelQuestions = {
    id: "",
    option: "",
    correct: ""
  }
  modalText = {
    id: "",
    question: "",
    imageUrl: "",
    questionOptions: [this.modelQuestions]
  }

  openNew(content:any) {
    let modelQuestions = {
      id: "",
      option: "",
      correct: ""
    }
    this.modalText = {
      id: "",
      question: "",
      imageUrl: "",
      questionOptions: [modelQuestions, modelQuestions, modelQuestions]
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  open(content: any, questionID:any) {
    this.getQuestionById(questionID)
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  save() {

    let questionId = this.modalText.id
    let question = (document.getElementById("modalQuestion") as HTMLInputElement).value
    let answer1 = (document.getElementById("answer1") as HTMLInputElement).value
    let answer2 = (document.getElementById("answer2") as HTMLInputElement).value
    let answer3 = (document.getElementById("answer3") as HTMLInputElement).value
    let imageUrl = (document.getElementById("modal-img") as HTMLInputElement).value
    let answer1_correct = (document.getElementById("answer_correct1") as HTMLInputElement).checked
    let answer2_correct = (document.getElementById("answer_correct2") as HTMLInputElement).checked
    let answer3_correct = (document.getElementById("answer_correct3") as HTMLInputElement).checked
    this.modalService.dismissAll()

    let payload = {
      "question": question,
      "option1": answer1,
      "option1IsCorrect": answer1_correct,
      "option2": answer2,
      "option2IsCorrect": answer2_correct,
      "option3": answer3,
      "option3IsCorrect": answer3_correct,
      "imageUrl": imageUrl
    }

    if(this.modalText.id != "") {
      this.apiService.updateQuestion(questionId, payload).subscribe();
    } else {
      this.apiService.addQuestion(payload).subscribe();
    }
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  currentQuestion = {
    id: 0,
    question: "",
    dificultate_class: "bg-danger",
    dificultate_percent: 0
  }
  questions:any = [this.currentQuestion]


  private getQuestionById(questionId:any) {
    this.apiService.getQuestionById(questionId).subscribe(
      (data) => {
        this.modalText = data
      }
    )
  }

  private getQuestion() {
    this.apiService.getAllQuestions().subscribe(
      (data) => {
        this.questions = data
        this.questions.forEach((element: any) => {
          element.question = element.question.substring(0,100) + "..."
          if(element.difficulty == 'HARD') {
          element.dificultate_percent = 100
        } else if(element.difficulty == 'MEDIUM') {
            element.dificultate_percent = 50
          } else {
            element.dificultate_percent = 25
          }
        });
      }
    )
  }

}
