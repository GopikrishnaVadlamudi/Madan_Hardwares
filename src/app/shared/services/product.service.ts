import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase, private http: HttpClient) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products');
  }

  get(productId) {
    return this.db.object('/products/' + productId);
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
  sendEmail() {

    let url = `https://us-central1-emailservice-d09fe.cloudfunctions.net/httpEmail`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      })
    };
    // let headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    const data = {
      toEmail: 'gopi.vadlamudi10@gmail.com',
      toName: 'Jeff Delaney'
    }

    return this.http.post(url, data).subscribe();


  }
}
