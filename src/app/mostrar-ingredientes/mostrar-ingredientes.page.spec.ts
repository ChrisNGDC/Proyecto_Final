import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MostrarIngredientesPage } from './mostrar-ingredientes.page';

describe('MostrarIngredientesPage', () => {
  let component: MostrarIngredientesPage;
  let fixture: ComponentFixture<MostrarIngredientesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarIngredientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
