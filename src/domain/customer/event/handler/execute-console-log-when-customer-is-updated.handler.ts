import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerUpdatedEvent from "../customer-updated.event";

export default class ExecuteConsoleLogWhenCustomerIsUpdatedHandler
  implements EventHandlerInterface<CustomerUpdatedEvent>
{
  handle(event: CustomerUpdatedEvent): void {
    console.log('Esse é o segundo console.log do evento: CustomerUpdatedEvent');
  }
}
