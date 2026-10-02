import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MemberModel } from '../Models/MemberModel';

//décorateur qui daclare que le service est injectable et peut être utilisé dans d'autres composants ou services
@Injectable({
  providedIn: 'root', //injection dans toute la route de l'application, ce qui signifie que le service sera disponible pour tous les composants et services de l'application
})
export class MemberService {
  constructor(private http: HttpClient) { }
  // toutes les méthodes qui génèrent des requêtes http vers le backend 
  // pour récupérer, créer, mettre à jour ou supprimer des membres
  getAllMembers() {
    return this.http.get<any[]>('http://localhost:3000/member');
  }

  AddMember(m: MemberModel) {
    return this.http.post<void>('http://localhost:3000/member', m)
  }

  delMember(id: string) {
    return this.http.delete(`http://localhost:3000/member/${id}`);
  }

  deleteMember(id: string) {
    return this.http.delete(`http://localhost:3000/member/${id}`);
  }

  updateMember(id: string, member: any) {
    return this.http.put(`http://localhost:3000/member/${id}`, member);
  }
}
