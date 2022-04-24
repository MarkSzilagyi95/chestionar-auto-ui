import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChestionarEndComponent } from './chestionar-end.component';

describe('ChestionarEndComponent', () => {
  let component: ChestionarEndComponent;
  let fixture: ComponentFixture<ChestionarEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChestionarEndComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChestionarEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
