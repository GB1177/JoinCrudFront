import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoDeleteComponent } from './produto-delete.component';

describe('ProdutoDeleteComponent', () => {
  let component: ProdutoDeleteComponent;
  let fixture: ComponentFixture<ProdutoDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProdutoDeleteComponent]
    });
    fixture = TestBed.createComponent(ProdutoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
