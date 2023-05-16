import Customer from "../../customer/entity/customer";
import ExecuteConsoleLogWhenCustomerIsCreatedHandler from "../../customer/event/handler/execute-console-log-when-customer-is-created.handler";
import ExecuteConsoleLogWhenCustomerIsUpdatedHandler from "../../customer/event/handler/execute-console-log-when-customer-is-updated.handler";
import Address from "../../customer/value-object/address";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";
import { v4 as uuid } from "uuid";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import CustomerUpdatedEvent from "../../customer/event/customer-updated.event";
import ExecuteConsoleLogWhenCustomerAddressIsUpdatedHandler from "../../customer/event/handler/execute-console-log-when-customer-address-is-updated.handler";





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
    const eventHandler = new ExecuteConsoleLogWhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);
  });

  it("should register an event handler to execute console log 2", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandlerCustomerIsCreated = new ExecuteConsoleLogWhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandlerCustomerIsCreated);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandlerCustomerIsCreated);
  });

  it("should notify an event handler to execute console.log 1 when customer is created and console.log 2 when address is changed", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandlerCustomerIsCreated = new ExecuteConsoleLogWhenCustomerIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandlerCustomerIsCreated, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandlerCustomerIsCreated);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandlerCustomerIsCreated);

    const customer = new Customer(uuid(), "John");
    const address = new Address("Street 1", 1, "12345-678", "City");

    customer.changeAddress(address);

    const customerCreatedEvent = new CustomerCreatedEvent(customer);
    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
    eventDispatcher.unregisterAll();

    // Testing event to update address ...

    const address2 = new Address("Street 2", 2, "12345-678", "City");
    customer.changeAddress(address2);

    const eventHandlerCustomerIsUpdated = new ExecuteConsoleLogWhenCustomerIsUpdatedHandler();
    const eventHandlerUpdateCustomerAddress = new ExecuteConsoleLogWhenCustomerAddressIsUpdatedHandler();

    const spyEventHandlerConsoleLog = jest.spyOn(eventHandlerCustomerIsUpdated, "handle");
    const spyEventHandlerUpdateAddress = jest.spyOn(eventHandlerUpdateCustomerAddress, "handle");

    eventDispatcher.register("CustomerUpdatedEvent", eventHandlerCustomerIsUpdated);
    eventDispatcher.register("CustomerUpdatedEvent", eventHandlerUpdateCustomerAddress);

    expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"].length).toBe(2);
    expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"][0]).toMatchObject(eventHandlerCustomerIsUpdated);
    expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"][1]).toMatchObject(eventHandlerUpdateCustomerAddress);

    const customerUpdatedEvent = new CustomerUpdatedEvent(customer);
    eventDispatcher.notify(customerUpdatedEvent);

    expect(spyEventHandlerConsoleLog).toHaveBeenCalled();
    expect(spyEventHandlerUpdateAddress).toHaveBeenCalled();
  })
})