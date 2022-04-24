import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
@Component({
  selector: 'app-chestionar-end',
  templateUrl: './chestionar-end.component.html',
  styleUrls: ['./chestionar-end.component.css']
})
export class ChestionarEndComponent implements OnInit {

  constructor(private route:ActivatedRoute ) { }
  textHeader = ""
  textAdditional = ""

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        let headerElement = (document.getElementById('message-header') as HTMLElement)
        if(params['status'] == 'success') {
          this.textHeader = "FELICITARI!";
          this.textAdditional = "Ati luat testul de examen auto cu success!"
          headerElement.classList.add('success');
        } else {
          this.textHeader = "NE PARE RAU!";
          this.textAdditional = "Dar nu ati reusit sa luati testul de examen auto!"
          headerElement.classList.add('fail');
        }
      }
    );
  }

}
