import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientsService } from 'src/app/services/clients.service';
import { ColasService } from 'src/app/services/colas.service';

@Component({
  selector: 'app-modal-ticket',
  templateUrl: './modal-ticket.component.html',
  styleUrls: ['./modal-ticket.component.scss'],
})
export class ModalTicketComponent implements OnInit {
  allColas: any;

  formNewClient: FormGroup = new FormGroup({
    client_name: new FormControl(),
    cola_id: new FormControl(),
    // cola_name: new FormControl(),
    // cola_time: new FormControl(),
  });

  constructor(
    private colas: ColasService,
    private clients: ClientsService,
    public dialogRef: MatDialogRef<ModalTicketComponent>
  ) {}

  ngOnInit(): void {
    this.getColas();
  }

  getColas() {
    this.colas.getColasList().subscribe((data) => {
      this.allColas = data;
      // this.clientList = this.allClients.data.results;
      console.log('Colas', this.allColas);
    });
  }

  createNewUser() {
    console.log('entra');
    console.log('entra', this.formNewClient.value);

    this.clients
      .newClient({
        ...this.formNewClient.value,
        client_name: `${this.formNewClient.value['client_name']}`,
        id_cola: `${this.formNewClient.value['cola_id']}`,
      })
      .subscribe((data) => {
        console.log(data);
      });
  }

  closed() {
    this.dialogRef.close();
  }
}
