import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MostrarInstrucciones } from './mostrarInstrucciones.page';

describe('MostrarInstrucciones', () => {
  let component: MostrarInstrucciones;
  let fixture: ComponentFixture<MostrarInstrucciones>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarInstrucciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
