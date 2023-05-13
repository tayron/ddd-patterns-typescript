import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustumerCreatedEvent from "../customer-created.event";

export default class ExecuteConsoleLog1WhenCustumerIsCreatedHandler
  implements EventHandlerInterface<CustumerCreatedEvent>
{
  handle(event: CustumerCreatedEvent): void {
    console.log('Esse é o segundo console.log do evento: CustomerCreated');

    const custumer = event.eventData;
    const address = `${event.eventData.Address.street},${event.eventData.Address.number}, 
      ${event.eventData.Address.city} - ${event.eventData.Address.zip}`;

    console.log(`Endereço do cliente: ${custumer.id}, ${custumer.name} foi alterado para: ${address}`)
  }
}
