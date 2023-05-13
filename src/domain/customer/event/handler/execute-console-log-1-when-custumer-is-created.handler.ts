import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustumerCreatedEvent from "../customer-created.event";

export default class ExecuteConsoleLog1WhenCustumerIsCreatedHandler
  implements EventHandlerInterface<CustumerCreatedEvent>
{
  handle(event: CustumerCreatedEvent): void {
    console.log('Esse é o primeiro console.log do evento: CustomerCreated');
  }
}
