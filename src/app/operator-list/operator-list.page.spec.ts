import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OperatorListPage } from './operator-list.page';

describe('OperatorListPage', () => {
  let component: OperatorListPage;
  let fixture: ComponentFixture<OperatorListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OperatorListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
