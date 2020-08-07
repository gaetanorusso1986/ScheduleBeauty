import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateSocialPage } from './update-social.page';

describe('UpdateSocialPage', () => {
  let component: UpdateSocialPage;
  let fixture: ComponentFixture<UpdateSocialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSocialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateSocialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
