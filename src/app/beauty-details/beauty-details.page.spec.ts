import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BeautyDetailsPage } from './beauty-details.page';

describe('BeautyDetailsPage', () => {
  let component: BeautyDetailsPage;
  let fixture: ComponentFixture<BeautyDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeautyDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BeautyDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
