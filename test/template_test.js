const Template = artifacts.require("Template");

contract("Template", (accounts) => {
  let template;
  const owner = accounts[0];
  const user1 = accounts[1];
  const user2 = accounts[2];

  beforeEach(async () => {
    template = await Template.new();
  });

  it("should initialize count to 0", async () => {
    const count = await template.count();
    assert.equal(count.toNumber(), 0, "Initial count should be 0");
  });

  it("should add a new user and emit NewUser event", async () => {
    const initialBalance = 100;
    const result = await template.addUser(initialBalance, { from: user1 });
    const newUserEvent = result.logs[0];

    assert.equal(newUserEvent.event, "NewUser", "NewUser event not emitted");
    assert.equal(newUserEvent.args.user, user1, "Incorrect user added");
    assert.equal(newUserEvent.args.initialBalance.toNumber(), initialBalance, "Incorrect initial balance");

    const userBalance = await template.getBalance(user1);
    assert.equal(userBalance.toNumber(), initialBalance, "User balance not correctly set");
  });

  it("should update user balance", async () => {
    const initialBalance = 100;
    const newBalance = 200;

    await template.addUser(initialBalance, { from: user1 });
    await template.updateUserBalance(user1, newBalance);

    const updatedUserBalance = await template.getBalance(user1);
    assert.equal(updatedUserBalance.toNumber(), newBalance, "User balance not updated");
  });

  it("should increment and decrement the count", async () => {
    await template.increment();
    await template.increment();
    await template.increment();

    let currentCount = await template.count();
    assert.equal(currentCount.toNumber(), 3, "Count not incremented correctly");

    await template.decrement();
    currentCount = await template.count();
    assert.equal(currentCount.toNumber(), 2, "Count not decremented correctly");
  });
});
