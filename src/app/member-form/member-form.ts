import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MemberService } from '../../services/member-service';

@Component({
  selector: 'app-member-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    RouterModule
  ],
  templateUrl: './member-form.html',
  styleUrl: './member-form.css',
})
export class MemberForm implements OnInit {
  form: FormGroup;
  memberId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private memberService: MemberService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      cin: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
      createdDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.memberId = this.route.snapshot.paramMap.get('id');
    if (this.memberId) {
      // If we are in edit mode, fetch the member details
      // Assuming MemberService has a getMemberById method, if not we will just leave form empty for now or fetch from list
      // For now, let's just attempt to get it if a method exists, or just leave it for user to implement fetching single member.
      this.memberService.getAllMembers().subscribe(members => {
        const member = members.find(m => m.id === this.memberId);
        if (member) {
          this.form.patchValue(member);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const memberData = this.form.value;
      if (this.memberId) {
        // Edit mode
        this.memberService.updateMember(this.memberId, memberData).subscribe(() => {
          this.router.navigate(['/members']);
        });
      } else {
        // Create mode
        this.memberService.AddMember(memberData).subscribe(() => {
          this.router.navigate(['/members']);
        });
      }
    }
  }
}
