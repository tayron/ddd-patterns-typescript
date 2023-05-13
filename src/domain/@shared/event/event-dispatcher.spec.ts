import Customer from "../../customer/entity/customer";
import ExecuteConsoleLog1WhenCustumerIsCreatedHandler from "../../customer/event/handler/execute-console-log-1-when-custumer-is-created.handler";
import ExecuteConsoleLog2WhenCustumerIsCreatedHandler from "../../customer/event/handler/execute-console-log-2-when-custumer-is-created.handler";
import Address from "../../customer/value-object/address";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";
import { v4 as uuid } from "uuid";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";



describe("Domain events tests for product", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});

describe("Domain events tests for customer", () => {
  it("should register an event handler to execute console log 1", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new ExecuteConsoleLog1WhenCustumerIsCreatedHandler();

    eventDispatcher.register("CustumerCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["CustumerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustumerCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CustumerCreatedEvent"][0]).toMatchObject(eventHandler);
  });

  it("should register an event handler to execute console log 2", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new ExecuteConsoleLog2WhenCustumerIsCreatedHandler();

    eventDispatcher.register("CustumerCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["CustumerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustumerCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CustumerCreatedEvent"][0]).toMatchObject(eventHandler);
  });

  it("should notify an event handler to execute console.log 1 when customer is created and console.log 2 when address is changed", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new ExecuteConsoleLog1WhenCustumerIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);

    const customer = new Customer(uuid(), "John");
    const address = new Address("Street 1", 1, "12345-678", "City");

    customer.changeAddress(address);

    const customerCreatedEvent = new CustomerCreatedEvent(customer);
    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();

    const address2 = new Address("Street 2", 2, "12345-678", "City");
    customer.changeAddress(address2);

    const eventHandler2 = new ExecuteConsoleLog2WhenCustumerIsCreatedHandler();
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.unregisterAll();
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler2);


    const customerCreatedEvent2 = new CustomerCreatedEvent(customer);
    eventDispatcher.notify(customerCreatedEvent2);

    expect(spyEventHandler2).toHaveBeenCalled();
  })
})