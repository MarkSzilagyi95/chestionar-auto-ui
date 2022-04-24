import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChestionarStartPageComponent } from './chestionar-start-page.component';

describe('ChestionarStartPageComponent', () => {
  let component: ChestionarStartPageComponent;
  let fixture: ComponentFixture<ChestionarStartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChestionarStartPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChestionarStartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
