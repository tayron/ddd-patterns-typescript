import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerUpdatedEvent from "../customer-updated.event";

export default class ExecuteConsoleLogWhenCustomerAddressIsUpdatedHandler
  implements EventHandlerInterface<CustomerUpdatedEvent>
{
  handle(event: CustomerUpdatedEvent): void {
    const customer = event.eventData;
    const address = `${event.eventData.Address.street},${event.eventData.Address.number}, 
      ${event.eventData.Address.city} - ${event.eventData.Address.zip}`;

    console.log(`Endereço do cliente: ${customer.id}, ${customer.name} foi alterado para: ${address}`)
  }
}
