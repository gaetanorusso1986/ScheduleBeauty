import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrenotazionePage } from './prenotazione.page';

describe('PrenotazionePage', () => {
  let component: PrenotazionePage;
  let fixture: ComponentFixture<PrenotazionePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrenotazionePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrenotazionePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
