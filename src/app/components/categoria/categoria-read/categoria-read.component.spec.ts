import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriaReadComponent } from './categoria-read.component';

describe('CategoriaReadComponent', () => {
  let component: CategoriaReadComponent;
  let fixture: ComponentFixture<CategoriaReadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CategoriaReadComponent]
    });
    fixture = TestBed.createComponent(CategoriaReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
