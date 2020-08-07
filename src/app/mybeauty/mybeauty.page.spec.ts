import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MybeautyPage } from './mybeauty.page';

describe('MybeautyPage', () => {
  let component: MybeautyPage;
  let fixture: ComponentFixture<MybeautyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MybeautyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MybeautyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
