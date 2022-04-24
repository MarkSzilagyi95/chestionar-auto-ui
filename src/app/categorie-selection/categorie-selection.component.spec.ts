import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieSelectionComponent } from './categorie-selection.component';

describe('CategorieSelectionComponent', () => {
  let component: CategorieSelectionComponent;
  let fixture: ComponentFixture<CategorieSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorieSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
