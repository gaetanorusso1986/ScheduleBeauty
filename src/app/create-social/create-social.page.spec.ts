import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateSocialPage } from './create-social.page';

describe('CreateSocialPage', () => {
  let component: CreateSocialPage;
  let fixture: ComponentFixture<CreateSocialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSocialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSocialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
