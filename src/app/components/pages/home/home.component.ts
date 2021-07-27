import { Component, OnInit } from '@angular/core';
import { observable } from 'rxjs';
import { ClientsService } from 'src/app/services/clients.service';
import { ColasService } from 'src/app/services/colas.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalTicketComponent } from '../modal-ticket/modal-ticket.component';
import { FormControl, FormGroup } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ClientsService],
})
export class HomeComponent implements OnInit {
  newTicket = false;
  allClients: any;
  newClient: any;
  allColas: any;
  clientFina: any;
  tamCola: any;
  //clientFinal: any[];
  clientFinal: any[] = [];

  constructor(
    private clients: ClientsService,
    private colas: ColasService,
    public dialog: MatDialog,
    private _router: Router
  ) {}

  ngOnInit() {
    this.getClient();
  }

  getListCola() {
    this.colas.getColasList().subscribe((data) => {
      this.tamCola = data.length;
      return (this.allColas = data);
    });
  }

  getClient() {
    this.getListCola();
    this.clients.getClientsList().subscribe((data = []) => {
      this.allClients = data;
      for (let j = 0; j <= this.allClients.length; j++) {
        for (let k = 0; k < this.allColas.length; k++) {
          if (this.allClients[j]?.id_cola == this.allColas[k].cola_id) {
            if (this.allClients[j].client_status == 'No Atendido') {
              this.clientFinal.push({
                client_id: this.allClients[j].client_id,
                client_name: this.allClients[j].client_name,
                client_status: this.allClients[j].client_status,
                cola_name: this.allColas[k].cola_name,
                cola_time: this.allColas[k].cola_time,
              });
            }
          }
        }
      }
    });
  }

  atender(client: any) {
    console.log('value', client);
    let idCol;

    for (let i = 0; i < this.allColas.length; i++) {
      if (client.cola_name == this.allColas[i].cola_name) {
        idCol = this.allColas[i].cola_id;
      }
    }
    console.log('dggd', idCol);
    let id = client.client_id;
    let body = {
      id_cola: idCol,
      client_id: client.client_id,
      client_name: client.client_name,
      client_status: 'Atendido',
    };
    this.clients.atenerClient(id, body).subscribe((data) => {
      //this.tamCola = data.length;
      this.allColas = data;
    });
  }

  openDialog() {
    console.log('abre');
    const dialogRef = this.dialog.open(ModalTicketComponent, {
      height: '350px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      // this.getClient();
      this._router.navigate(['/home']);
    });
  }
}
