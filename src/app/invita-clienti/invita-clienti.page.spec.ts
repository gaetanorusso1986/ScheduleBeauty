import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvitaClientiPage } from './invita-clienti.page';

describe('InvitaClientiPage', () => {
  let component: InvitaClientiPage;
  let fixture: ComponentFixture<InvitaClientiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitaClientiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvitaClientiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
