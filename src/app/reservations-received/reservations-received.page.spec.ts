import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReservationsReceivedPage } from './reservations-received.page';

describe('ReservationsReceivedPage', () => {
  let component: ReservationsReceivedPage;
  let fixture: ComponentFixture<ReservationsReceivedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationsReceivedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationsReceivedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
