import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateHolidaysPage } from './create-holidays.page';

describe('CreateHolidaysPage', () => {
  let component: CreateHolidaysPage;
  let fixture: ComponentFixture<CreateHolidaysPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateHolidaysPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateHolidaysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
