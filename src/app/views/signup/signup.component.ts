import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  states: Array<{ name: string; value: string;}> = states;
  selectedState: string = 'AL';

  constructor(
    private fb: FormBuilder,
    private svc: UsersService
  ) { 

  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      city: [''],
      state: [''],
      phone: [''],
      bio: [''],
      img: ['']
    });
  }

  onChange(state) {
    this.selectedState = state;
  }

  signup() {
    this.form.value.state = this.selectedState;
    console.log(this.form.value);
    this.svc.create(this.form.value)
      .then((id) => {
        console.log(id);
      });
  }

}

const states = [
  {
    name: 'Alabama',
    value: 'AL'
  },
  {
    name: 'Alaska',
    value: 'AK'
  },
  {
    name: 'American Samoa',
    value: 'AS'
  },
  {
    name: 'Arizona',
    value: 'AZ'
  },
  {
    name: 'Arkansas',
    value: 'AR'
  },
  {
    name: 'California',
    value: 'CA'
  },
  {
    name: 'Colorado',
    value: 'CO'
  },
  {
    name: 'Connecticut',
    value: 'CT'
  },
  {
    name: 'Delaware',
    value: 'DE'
  },
  {
    name: 'District Of Columbia',
    value: 'DC'
  },
  {
    name: 'Federated States Of Micronesia',
    value: 'FM'
  },
  {
    name: 'Florida',
    value: 'FL'
  },
  {
    name: 'Georgia',
    value: 'GA'
  },
  {
    name: 'Guam',
    value: 'GU'
  },
  {
    name: 'Hawaii',
    value: 'HI'
  },
  {
    name: 'Idaho',
    value: 'ID'
  },
  {
    name: 'Illinois',
    value: 'IL'
  },
  {
    name: 'Indiana',
    value: 'IN'
  },
  {
    name: 'Iowa',
    value: 'IA'
  },
  {
    name: 'Kansas',
    value: 'KS'
  },
  {
    name: 'Kentucky',
    value: 'KY'
  },
  {
    name: 'Louisiana',
    value: 'LA'
  },
  {
    name: 'Maine',
    value: 'ME'
  },
  {
    name: 'Marshall Islands',
    value: 'MH'
  },
  {
    name: 'Maryland',
    value: 'MD'
  },
  {
    name: 'Massachusetts',
    value: 'MA'
  },
  {
    name: 'Michigan',
    value: 'MI'
  },
  {
    name: 'Minnesota',
    value: 'MN'
  },
  {
    name: 'Mississippi',
    value: 'MS'
  },
  {
    name: 'Missouri',
    value: 'MO'
  },
  {
    name: 'Montana',
    value: 'MT'
  },
  {
    name: 'Nebraska',
    value: 'NE'
  },
  {
    name: 'Nevada',
    value: 'NV'
  },
  {
    name: 'New Hampshire',
    value: 'NH'
  },
  {
    name: 'New Jersey',
    value: 'NJ'
  },
  {
    name: 'New Mexico',
    value: 'NM'
  },
  {
    name: 'New York',
    value: 'NY'
  },
  {
    name: 'North Carolina',
    value: 'NC'
  },
  {
    name: 'North Dakota',
    value: 'ND'
  },
  {
    name: 'Northern Mariana Islands',
    value: 'MP'
  },
  {
    name: 'Ohio',
    value: 'OH'
  },
  {
    name: 'Oklahoma',
    value: 'OK'
  },
  {
    name: 'Oregon',
    value: 'OR'
  },
  {
    name: 'Palau',
    value: 'PW'
  },
  {
    name: 'Pennsylvania',
    value: 'PA'
  },
  {
    name: 'Puerto Rico',
    value: 'PR'
  },
  {
    name: 'Rhode Island',
    value: 'RI'
  },
  {
    name: 'South Carolina',
    value: 'SC'
  },
  {
    name: 'South Dakota',
    value: 'SD'
  },
  {
    name: 'Tennessee',
    value: 'TN'
  },
  {
    name: 'Texas',
    value: 'TX'
  },
  {
    name: 'Utah',
    value: 'UT'
  },
  {
    name: 'Vermont',
    value: 'VT'
  },
  {
    name: 'Virgin Islands',
    value: 'VI'
  },
  {
    name: 'Virginia',
    value: 'VA'
  },
  {
    name: 'Washington',
    value: 'WA'
  },
  {
    name: 'West Virginia',
    value: 'WV'
  },
  {
    name: 'Wisconsin',
    value: 'WI'
  },
  {
    name: 'Wyoming',
    value: 'WY'
  }
];
