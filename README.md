# blogger-api-restful: Unit Test

## Table of Contents

- [Setup](#setup)
- [Unit Test Best Practices](#unit-test-best-practices)
  - [Follow Design Principles](#follow-design-principles)
  - [Include 3 parts in each test name](#include-3-parts-in-each-test-name)
  - [Structure tests by the AAA pattern](#structure-tests-by-the-aaa-pattern)
  - [Describe expectations using BDD-style assertions](#describe-expectations-using-bdd-style-assertions)
  - [Avoid mocks in favor of stubs and spies](#avoid-mocks-in-favor-of-stubs-and-spies)

## Setup

- Clone Project

```bash
git clone https://github.com/m-ibrahim-khalil/blogger-api-restful.git
```

- Install Dependencies

```bash
npm install
```

- Run Unit Test

```bash
git checkout feature/issue-7-unit-test
npm run test
```

# Unit Test Best Practices

This is a guideline of best practices that we can apply to our JavaScript project.

## Follow Design Principles

The key to good unit testing is to write testable code.
Applying simple design principles can help:

- Use a good naming convention and comment the code;
- Avoid code duplication;
- Single responsibility: each object/function must focus on a single task;
- Any given behaviour should be specified in one and only one test;
- The execution/order of execution of one test cannot affect the others;
- Minimize dependencies between components;
- Use design patterns;
- Avoid global mutable state.

## Include 3 parts in each test name

A test report should tell whether the current application revision satisfies the requirements for the people who are not necessarily familiar with the code: the tester, the DevOps engineer who is deploying and the future you two years from now. This can be achieved best if the tests speak at the requirements level and include 3 parts:

(1) What is being tested? For example, the ProductsService.addNewProduct method

(2) Under what circumstances and scenario? For example, no price is passed to the method

(3) What is the expected result? For example, the new product is not approved

<br/>

❌ **Otherwise:** A deployment just failed, a test named “Add product” failed. Does this tell you what exactly is malfunctioning?

<br/>

### Right Example: A test name that constitutes 3 parts

```javascript
//1. unit under test
describe('Blog Service', function() {
  describe('Create new blog', function() {
    //2. scenario and 3. expectation
    it('When no title/description specified, then the blog status should be...', ()=> {
      const newProduct = new ProductService().add(...);
      expect(newProduct.status).to.equal('Blog Should not be empty!');
    });
  });
});

```

<br/><br/>

## Structure tests by the AAA pattern

Structure your tests with 3 well-separated sections Arrange, Act & Assert (AAA). Following this structure guarantees that the reader spends no brain-CPU on understanding the test plan:

1st A - Arrange: All the setup code to bring the system to the scenario the test aims to simulate. This might include instantiating the unit under test constructor, adding DB records, mocking/stubbing on objects, and any other preparation code

2nd A - Act: Execute the unit under test. Usually 1 line of code

3rd A - Assert: Ensure that the received value satisfies the expectation. Usually 1 line of code

<br/>

❌ **Otherwise:** Not only do you spend hours understanding the main code but what should have been the simplest part of the day (testing) stretches your brain

<br/>

### Right Example: A test structured with the AAA pattern

```javascript
describe('Customer classifier', () => {
  test('When customer spent more than 500$, should be classified as premium', () => {
    //Arrange
    const customerToClassify = { spent: 505, joined: new Date(), id: 1 };
    const DBStub = sinon
      .stub(dataAccess, 'getCustomer')
      .reply({ id: 1, classification: 'regular' });

    //Act
    const receivedClassification =
      customerClassifier.classifyCustomer(customerToClassify);

    //Assert
    expect(receivedClassification).toMatch('premium');
  });
});
```

<br/>

### Anti-Pattern Example: No separation, one bulk, harder to interpret

```javascript
test('Should be classified as premium', () => {
  const customerToClassify = { spent: 505, joined: new Date(), id: 1 };
  const DBStub = sinon
    .stub(dataAccess, 'getCustomer')
    .reply({ id: 1, classification: 'regular' });
  const receivedClassification =
    customerClassifier.classifyCustomer(customerToClassify);
  expect(receivedClassification).toMatch('premium');
});
```

<br/><br/>

## Describe expectations using BDD-style assertions

Coding your tests in a declarative-style allows the reader to get the grab instantly without spending even a single brain-CPU cycle. When you write imperative code that is packed with conditional logic, the reader is forced to exert more brain-CPU cycles. In that case, code the expectation in a human-like language, declarative BDD style using expect or should and not using custom code.

<br/>

❌ **Otherwise:** The team will write less tests and decorate the annoying ones with .skip()

<br/>

### Anti-Pattern Example: The reader must skim through not so short, and imperative code just to get the test story

```javascript
test('When asking for an admin, ensure only ordered admins in results', () => {
  //assuming we've added here two admins "admin1", "admin2" and "user1"
  const allAdmins = getUsers({ adminOnly: true });

  let admin1Found,
    adming2Found = false;

  allAdmins.forEach((aSingleUser) => {
    if (aSingleUser === 'user1') {
      assert.notEqual(aSingleUser, 'user1', 'A user was found and not admin');
    }
    if (aSingleUser === 'admin1') {
      admin1Found = true;
    }
    if (aSingleUser === 'admin2') {
      admin2Found = true;
    }
  });

  if (!admin1Found || !admin2Found) {
    throw new Error('Not all admins were returned');
  }
});
```

<br/>

### Right Example: Skimming through the following declarative test is a breeze

```javascript
it('When asking for an admin, ensure only ordered admins in results', () => {
  //assuming we've added here two admins
  const allAdmins = getUsers({ adminOnly: true });

  expect(allAdmins)
    .to.include.ordered.members(['admin1', 'admin2'])
    .but.not.include.ordered.members(['user1']);
});
```

<br/><br/>

### Avoid mocks in favor of stubs and spies

Test doubles are a necessary evil because they are coupled to the application internals, yet some provide immense value (<a href="https://martinfowler.com/articles/mocksArentStubs.html" data-href="https://martinfowler.com/articles/mocksArentStubs.html" class="markup--anchor markup--p-anchor" rel="noopener nofollow" target="_blank">[Read here a reminder about test doubles: mocks vs stubs vs spies](https://martinfowler.com/articles/mocksArentStubs.html)</a>).

Before using test doubles, ask a very simple question: Do I use it to test functionality that appears, or could appear, in the requirements document? If not, it’s a white-box testing smell.
<br/>

❌ **Otherwise:** Any refactoring of code mandates searching for all the mocks in the code and updating accordingly. Tests become a burden rather than a helpful friend

<br/>

### Anti-pattern example: Mocks focus on the internals

```javascript
it('When a valid product is about to be deleted, ensure data access DAL was called once, with the right product and right config', async () => {
  //Assume we already added a product
  const dataAccessMock = sinon.mock(DAL);
  //hmmm BAD: testing the internals is actually our main goal here, not just a side-effect
  dataAccessMock
    .expects('deleteProduct')
    .once()
    .withArgs(DBConfig, theProductWeJustAdded, true, false);
  new ProductService().deletePrice(theProductWeJustAdded);
  dataAccessMock.verify();
});
```

<br/>

### Right Example: spies are focused on testing the requirements but as a side-effect are unavoidably touching to the internals

```javascript
it('When a valid product is about to be deleted, ensure an email is sent', async () => {
  //Assume we already added here a product
  const spy = sinon.spy(Emailer.prototype, 'sendEmail');
  new ProductService().deletePrice(theProductWeJustAdded);
  //hmmm OK: we deal with internals? Yes, but as a side effect of testing the requirements (sending an email)
  expect(spy.calledOnce).to.be.true;
});
```

**Reference**: [Javascript testing best practice](https://github.com/goldbergyoni/javascript-testing-best-practices)
